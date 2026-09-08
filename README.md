# 认知星图 / Cognitive Landscape

**Initial public executable snapshot: Boyuan Wang's original implementation**

> **作者顺序 / Authorship**
>
> 1. **王伯元（Boyuan Wang, [@ElvisWang1111](https://github.com/ElvisWang1111)）— 第一作者 / First Author；原始实现作者 / Original Implementation**
> 2. **MoonTzai（[@MoonTzai](https://github.com/MoonTzai)）— 第二作者 / Second Author；仓库托管与发布 / Repository Host & Publisher**
>
> 本仓库由 @MoonTzai 账号代为托管和发布。GitHub repository owner 不决定作者排序，王伯元始终列为本项目第一作者。

## 当前公开版本

本仓库的项目名称始终是 **认知星图 / Cognitive Landscape**。首个公开基线中，当前纳入的是王伯元制作的**原始执行版本**；为了辨认版本，这套原始执行文件自己的界面内部标题仍保留为“论点宇宙”。这只是历史版本标识，不是本仓库或本项目的正式名称。

这一版是一个可以嵌入普通 HTML 的并行辩论认知采样与分布蒸馏模块：

- 同一辩题启动多个彼此独立的 AI 采样分支；
- 分支互相不知道彼此输出，不被强迫追求“新奇”；
- 浏览器控制并发、进度、停止与结果展示；
- 所有成功分支完成后，再对已有样本做一次语义归并与频率标注；
- 高频 / 中频 / 低频都是认知分布的描述，不是价值排序；
- 系统负责把 AI 已想到的内容尽量摊开，人类负责继续深化或走到分布之外。

**新的 Cognitive Landscape / 认知星图 HTML 尚未完成，因此本次首发明确不包含该新 HTML，也不包含其测试生成物或后续 live 工程。**

## 快速入口

直接打开仓库根目录的：

`index.html`

即可打开当前首发的原始执行界面；该原始文件内部仍显示其历史标题“论点宇宙”。

若要执行真实模型请求，需要运行本地 Python 后端并在服务端配置 API Key。不要把真实密钥写入 HTML、JavaScript 或提交到 GitHub。

原始运行代码包括：

```text
index.html
frontend/
  debate-universe.js
  index.html
backend/
  __init__.py
  main.py
requirements.txt
run.sh
```

## 产品原则

Cognitive Landscape / 认知星图的这一原始执行版本不是替人寻找一个“最好的 AI 论点”，而是把同一问题下模型可采样到的论点空间尽量摊开并蒸馏成分布。

核心边界：

- 高频内容不能因为常见而被自动降级；
- 低频内容不能因为稀少而被自动拔高；
- 频率是描述，不是论点质量评分；
- 聚合阶段应整理、归并、计数和呈现，而不是凭空发明输入样本中不存在的“更深论点”；
- 有限采样不能声称数学意义上穷尽模型全部认知空间；
- 人类仍然是深化、判断、表达与超越 AI 分布的主体。

## 原始代码完整性

本次首发的核心运行文件从王伯元原始版本的冻结备份逐文件复制，并记录 SHA-256。详见 [SOURCE_SNAPSHOT.md](SOURCE_SNAPSHOT.md)。

首发明确排除：

- 尚未完成的新版 Cognitive Landscape / 认知星图 HTML；
- 新版 live 工程、测试产物和生成缓存；
- 真人语音、PKF 等私有/非必要媒体；
- 内部讨论与生产资料；
- API Key、凭据和本机环境。

## GitHub 协作

王伯元不仅是第一作者，也应拥有实际仓库编辑权限。

仓库上线后：

1. 邀请 [@ElvisWang1111](https://github.com/ElvisWang1111) 为 collaborator，提供实际 write/push 权限；
2. 邀请接受后，由王伯元本人对 README、AUTHORS 或其它项目内容做一次**真实、非空的编辑并提交到 `main`**；
3. 让 GitHub 根据真实提交历史自然将其计入 Contributors，而不是制作空提交或伪造历史。

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
Initial executable snapshot: **original version whose internal UI title is “论点宇宙”**
