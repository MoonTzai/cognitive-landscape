# 认知星图 / Cognitive Landscape

**Current public release: Cognitive Landscape single-file browser application**

> **作者顺序 / Authorship**
>
> 1. **王伯元（Boyuan Wang, [@ElvisWang1111](https://github.com/ElvisWang1111)）— 第一作者 / First Author；原始实现作者 / Original Implementation**
> 2. **MoonTzai（[@MoonTzai](https://github.com/MoonTzai)）— 第二作者 / Second Author；后续产品化、仓库托管与发布 / Subsequent productization, repository hosting & publishing**
>
> 本仓库由 @MoonTzai 账号托管和发布。GitHub repository owner 不决定作者排序，王伯元始终列为本项目第一作者。

## 当前公开版本

仓库根目录的 `Cognitive-Landscape.html` 是最新的 **认知星图 / Cognitive Landscape 单文件母版**。`index.html` 仅作为 GitHub Pages 根地址的轻量跳转入口。

它是完整、自包含的浏览器应用，不再依赖首发版本的 Python 后端或外部前端脚本即可打开。当前公开版包括：

- S1 朴素背景 / 场景、S2 朴素论点、S3 公共价值 / 规范视角、S4 对立一方攻击的独立多路采样；
- 多路并发采样、整池语义聚合、经验出现频率统计；
- S2 / S4 → S3 的多对多解释关系；
- 思想传统 / 世界观开放分析与价值空间投影；
- 2D / 3D 星图、价值罗盘 / 价值空间、关系图与支线查看；
- 历史会话本地缓存、JSON 导入 / 导出；
- Markdown、HTML、SVG、Flight Recorder 等导出；
- DeepSeek、智谱 GLM、Kimi / Moonshot、OpenAI 与自定义 OpenAI-compatible endpoint；
- API Key 仅保存在当前页面内存中，按供应商与端点隔离，刷新后清除。

当前正式单页：

- `Cognitive-Landscape.html`
- SHA-256: `6d9b07477a70659970767c10349b9907e07ce2b91e2bcc1aa2f35e789606c61e`
- Size: `14,711,964 bytes`

## 快速入口

直接下载或打开仓库根目录：

`Cognitive-Landscape.html`

即可运行当前正式版。

GitHub Pages 在线入口：

`https://moontzai.github.io/cognitive-landscape/`

该地址通过轻量 `index.html` 自动进入 `Cognitive-Landscape.html`。

如果要发起真实模型请求，请在页面内选择供应商并输入对应 API Key。不要把真实密钥写入 HTML、JavaScript、提交记录或 issue。当前页面不会持久化保存 API Key。

> 本程序的本质是多次并发、多路独立 LLM 会话采样并聚合，可能大量消耗 Token。请注意消费风险，并遵守相关法律法规。

## 关于首发原始实现

本仓库最初公开的是王伯元制作的原始执行版本，其界面历史标题为“论点宇宙”。

为了保留项目来源和历史脉络，原始运行文件仍保留在仓库中：

```text
frontend/
  debate-universe.js
  index.html
backend/
  __init__.py
  main.py
requirements.txt
run.sh
```

这些文件现在属于**历史原始实现快照**；仓库根目录的 `Cognitive-Landscape.html` 才是当前正式认知星图单文件应用。

此前曾公开在根目录的旧版 `cognitive-landscape_bytest.html` 已移入 [`history-archive/`](history-archive/) 保存，不再作为当前入口维护。

原始文件的冻结 SHA-256、旧单页归档与当前公开单页信息见 [SOURCE_SNAPSHOT.md](SOURCE_SNAPSHOT.md)。

## 产品原则

Cognitive Landscape / 认知星图不是替人寻找一个“最好的 AI 论点”，而是把同一问题下模型可采样到的认知空间尽量摊开并形成可检查的分布与关系图。

核心边界：

- 高频内容不能因为常见而被自动降级；
- 低频内容不能因为稀少而被自动拔高；
- 频率是描述，不是论点质量评分；
- 各层分布独立采样与统计，不把 S1 / S2 / S3 / S4 混成同一概率池；
- 解释关系不等于强度评分，也不会反向改写分布频率；
- 有限采样不能声称数学意义上穷尽模型全部认知空间；
- 思想传统 / 世界观映射是解释性参考，不用于推断个人政治身份；
- 人类仍然是深化、判断、表达与超越 AI 分布的主体。

## GitHub 协作

王伯元不仅是第一作者，也应拥有实际仓库编辑权限。

详见 [GITHUB_COLLABORATION.md](GITHUB_COLLABORATION.md)。

## 署名

正式署名顺序：

**王伯元（Boyuan Wang, @ElvisWang1111）; MoonTzai (@MoonTzai)**

详见 [AUTHORS.md](AUTHORS.md)。

## 版权与许可

当前仓库**没有擅自附加 MIT、Apache、Creative Commons 等通用许可证**。

公开可访问不等于自动授予复制、改编、再发布或商业使用许可。各文件和贡献的具体权利仍归适用权利人；第三方依赖继续受其自身许可约束。

详见 [COPYRIGHT.md](COPYRIGHT.md)。

---

Repository: **Cognitive Landscape / 认知星图**  
Current executable: **Cognitive-Landscape.html · self-contained single-file browser application**
