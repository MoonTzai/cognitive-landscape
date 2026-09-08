"""Small, stateless streaming proxy for the embeddable debate-universe widget."""

import json
import os
from typing import List, Literal, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field


app = FastAPI(title="Debate Universe API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)


BRANCH_SYSTEM = """你是“论点宇宙”的一个独立辩论认知采样分支。请在完全不知道其他分支输出的前提下，自然、完整地生成一份辩案样本。

采样目的不是替用户挑选“最好的论点”，也不是刻意追求新奇，而是如实暴露模型在当前辩题、持方与赛制条件下会想到什么：
- 简单、常见、直觉性强、公众容易关注的论点必须照常提出，不要为了显得深入而主动绕开；
- 同时保留你自然想到的较少见方向，但不要为了稀奇而硬造；
- 不要假设、模仿或协调其他采样分支；每个分支必须独立判断。

输出 Markdown，并严格包含：
## E1 · 资料搜集
## E3 · 论点穷举
## E4 · 论证架构
## E5 · 我方防守
## E6 · 我方攻击
## E7 · 自由辩套题

要求：给出完整论证链而非口号；明确核心标准 B0；区分我方与对方论点；攻防内容应足够完整，使后续聚合能够识别不同思路。不要解释任务，直接输出辩案样本。"""

AGGREGATE_SYSTEM = """你是“论点宇宙”的认知分布蒸馏器，而不是替用户挑选最佳辩案的裁判或主编。

你的任务是把多份彼此独立的 AI 辩案样本蒸馏成一份可读的“认知分布地图”：尽量保留 AI 在这些样本中实际想到的不同内容，同时显示哪些方向高频、哪些中频、哪些低频。

规则：
1. 只根据输入分支进行归并；识别语义相同或高度相似的观点并合并，尽可能按“出现于多少个独立分支”统计 X/N。
2. 高频内容必须完整保留。高频不等于浅薄、无聊或应该规避；它可能正是最自然、最常见、公众最关注的讨论范围。
3. 低频内容也必须保留。低频表示在本轮采样中较少出现，不自动等于更深、更好或更有创新性。
4. 不要为了制造“深度”而主动绕开高频方向，也不要把输入分支里没有出现的新奇论点擅自补进结果。深化已有论点、说服大众，以及寻找 AI 没想到的内容，留给人类完成。
5. 频率是描述，不是价值排序。可以按频率组织阅读顺序，但不得把低频简单降格为可忽略的“边角料”，也不得把高频包装成唯一正确主框架。
6. 输出完整 Markdown，保留 E1、E3、E4、E5、E6、E7 六个章节，并用 [高频 X/N]、[中频 X/N]、[低频 X/N] 标出重要内容。

最终交付物应帮助人类看见“AI 已经想到什么、通常先想到什么、较少想到什么”，从而在人类层面继续深化这些内容，或尝试走到分布之外。"""


class GenerateRequest(BaseModel):
    kind: Literal["branch", "aggregate"] = "branch"
    motion: str = Field(min_length=1, max_length=500)
    stance: str = Field(default="正方", max_length=20)
    debate_format: str = Field(default="标准传辩", max_length=100)
    branches: List[str] = Field(default_factory=list, max_length=20)
    model: Optional[str] = None
    api_url: Optional[str] = None
    api_key: Optional[str] = None


def event(payload: dict) -> bytes:
    return (json.dumps(payload, ensure_ascii=False) + "\n").encode("utf-8")


def connection(req: GenerateRequest):
    api_key = req.api_key or os.getenv("LLM_API_KEY", "")
    api_url = req.api_url or os.getenv("LLM_API_URL", "https://api.deepseek.com")
    model = req.model or os.getenv("LLM_MODEL", "deepseek-chat")
    if not api_key:
        raise HTTPException(400, "请在服务端设置 LLM_API_KEY，或仅在本地测试时填写 API Key")

    if "anthropic.com" in api_url:
        import anthropic

        return "anthropic", anthropic.AsyncAnthropic(api_key=api_key, base_url=api_url), model

    from openai import AsyncOpenAI

    return "openai", AsyncOpenAI(api_key=api_key, base_url=api_url), model


def prompts(req: GenerateRequest):
    if req.kind == "aggregate":
        if not req.branches:
            raise HTTPException(400, "没有可聚合的分支")
        joined = "\n\n--- 独立分支 ---\n\n".join(
            f"### 分支 {index + 1}\n{text}" for index, text in enumerate(req.branches)
        )
        return AGGREGATE_SYSTEM, (
            f"辩题：{req.motion}\n持方：{req.stance}\n赛制：{req.debate_format}\n"
            f"独立样本数：{len(req.branches)}\n\n{joined}\n\n"
            "请只依据以上独立样本进行认知分布蒸馏：完整保留高频常规方向与低频少见方向，"
            "不要替人类补写样本之外的‘深化’或‘创新’。"
        )

    return BRANCH_SYSTEM, (
        f"辩题：{req.motion}\n持方：{req.stance}\n赛制：{req.debate_format}\n"
        "请从你自己的判断出发独立生成，不要假设其他分支的内容。"
    )


@app.post("/api/generate")
async def generate(req: GenerateRequest):
    provider, client, model = connection(req)
    system, user = prompts(req)

    async def stream():
        try:
            if provider == "anthropic":
                async with client.messages.stream(
                    model=model,
                    max_tokens=8192,
                    system=system,
                    messages=[{"role": "user", "content": user}],
                ) as response:
                    async for token in response.text_stream:
                        yield event({"type": "token", "token": token})
            else:
                response = await client.chat.completions.create(
                    model=model,
                    max_tokens=8192,
                    messages=[
                        {"role": "system", "content": system},
                        {"role": "user", "content": user},
                    ],
                    stream=True,
                )
                async for chunk in response:
                    token = chunk.choices[0].delta.content or ""
                    if token:
                        yield event({"type": "token", "token": token})
            yield event({"type": "done"})
        except Exception as exc:
            yield event({"type": "error", "message": str(exc)})

    return StreamingResponse(
        stream(),
        media_type="application/x-ndjson",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


_FRONTEND = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
app.mount("/", StaticFiles(directory=_FRONTEND, html=True), name="frontend")
