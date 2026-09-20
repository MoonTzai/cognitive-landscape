# Cognitive Landscape Source Snapshot

## Current public executable

Repository/project identity and public title:

**Cognitive Landscape / 认知星图**

The repository root `Cognitive-Landscape.html` is the current public single-file browser application. The root `index.html` is only a lightweight GitHub Pages redirect entry.

| Path | Role | SHA-256 |
|---|---|---|
| `Cognitive-Landscape.html` | Current production single-file application | `6d9b07477a70659970767c10349b9907e07ce2b91e2bcc1aa2f35e789606c61e` |
| `index.html` | GitHub Pages redirect entry | `6584d1a9dfd1ca16c44ed4ce899bf7a2612e33421157508b922d8a52149db86e` |

Current production size: `14,711,964 bytes`.

The current `Cognitive-Landscape.html` is self-contained and includes the Cognitive Landscape UI/runtime required for ordinary browser use.

## Archived superseded standalone

A previous root-level standalone file has been moved to the repository history archive instead of remaining beside the current production entry:

| Path | Historical role | SHA-256 |
|---|---|---|
| `history-archive/2026-09-21-pre-vnext/cognitive-landscape_bytest.html` | Superseded standalone DeepSeek-oriented HTML | `213e99a7afe35ec3284c962e36a836cc091df4d325e6d4042c087b8771af8c0d` |

Historical size: `203,059 bytes`.

See [history-archive/README.md](history-archive/README.md).

## Historical original implementation

The first public release of this repository preserved Boyuan Wang's original implementation byte-for-byte. Its UI used the historical internal title “论点宇宙”.

Those original runtime files remain in the repository as historical source material:

| Path | Historical SHA-256 |
|---|---|
| `requirements.txt` | `8844587a5373066c7bd9cb652af5f3ab76b28c215d94af12b5dd5f4b609b8237` |
| `run.sh` | `c594c6a8b2036f188b4992c17efead724abc9366d9abdf63914fc59937fc1bbd` |
| `backend/__init__.py` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `backend/main.py` | `bc7645f4f1e4b44d31370e4369cedd1f329f075d0eb852712bac23b6ea3e82da` |
| `frontend/debate-universe.js` | `fd49405e6f7e5b286820fbe20fee8e59e2e112638967d1a0f8f637d3fea04e05` |
| `frontend/index.html` | `e6404074bfdafb0110ff7d84097b662aa232d06ea1b88e2fed23d9f7e6acd47c` |

The historical original root `index.html` had SHA-256:

`62c0195591c60b2b04d91c8428f6b781a036f226de393e9a5bc1a1280028952d`

The historical root entry has now been replaced by a lightweight Pages redirect, while the current production application is published as `Cognitive-Landscape.html`.

## Authorship continuity

The public repository update does not change authorship order:

1. **Boyuan Wang / 王伯元 (@ElvisWang1111)** — First Author; Original Implementation.
2. **MoonTzai (@MoonTzai)** — Second Author; subsequent productization, repository hosting and publishing.

Repository ownership and publication mechanics do not alter this order.

## Publication exclusions

The public repository does not intentionally publish:

- API keys, credentials, tokens, Authorization headers or local secret state;
- private production notes or internal discussion archives;
- local virtual environments, dependency caches or browser profiles;
- test artifact directories and generated acceptance screenshots;
- machine-specific configuration.

The current `Cognitive-Landscape.html` is a production deliverable, not a TEST artifact; the root `index.html` is only the Pages redirect entry.
