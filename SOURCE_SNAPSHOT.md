# Initial Public Source Snapshot

## Release scope

Repository/project identity and public title: **Cognitive Landscape / 认知星图**

Initial executable snapshot: **Boyuan Wang's original implementation**. Its frozen HTML internally uses the historical UI title “论点宇宙”; that string is retained only as a source-version identifier.

The initial public source snapshot consists only of the original runtime files frozen from the original implementation plus repository-level authorship/publication documentation.

## Original runtime files

| Path | SHA-256 |
|---|---|
| `index.html` | `62c0195591c60b2b04d91c8428f6b781a036f226de393e9a5bc1a1280028952d` |
| `requirements.txt` | `8844587a5373066c7bd9cb652af5f3ab76b28c215d94af12b5dd5f4b609b8237` |
| `run.sh` | `c594c6a8b2036f188b4992c17efead724abc9366d9abdf63914fc59937fc1bbd` |
| `backend/__init__.py` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `backend/main.py` | `bc7645f4f1e4b44d31370e4369cedd1f329f075d0eb852712bac23b6ea3e82da` |
| `frontend/debate-universe.js` | `fd49405e6f7e5b286820fbe20fee8e59e2e112638967d1a0f8f637d3fea04e05` |
| `frontend/index.html` | `e6404074bfdafb0110ff7d84097b662aa232d06ea1b88e2fed23d9f7e6acd47c` |

The copied runtime files are byte-identical to the frozen original source snapshot.

Both frozen HTML entry files still contain the historical internal UI title **“论点宇宙”**. They are intentionally left byte-identical to the original snapshot; this internal title does not define the repository or project name.

## Explicit exclusions from initial publication

The initial public snapshot does **not** include:

- the unfinished newer `认知星图.html` / Cognitive Landscape HTML;
- current live development code beyond the frozen original runtime;
- test artifacts or generated standalone HTML outputs from the newer implementation;
- local virtual environments, caches or dependency directories;
- voice recordings, PKF files or other production media;
- internal discussion archives and private production notes;
- credentials, API keys or machine-specific configuration.

This exclusion is deliberate: the first GitHub publication of **Cognitive Landscape / 认知星图** uses the original executable snapshot, not an unfinished preview of the newer HTML.
