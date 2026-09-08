const styles = `
  :host {
    --du-bg: #fff;
    --du-ink: #171715;
    --du-muted: #777770;
    --du-line: #deded8;
    --du-accent: #f2c94c;
    display: block;
    color: var(--du-ink);
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  }
  * { box-sizing: border-box; letter-spacing: 0; }
  .shell { background: var(--du-bg); border: 1px solid var(--du-line); padding: 20px; }
  h2 { margin: 0 0 8px; font-size: 24px; }
  .intro { margin: 0 0 18px; color: var(--du-muted); font-size: 12px; line-height: 1.7; }
  .form { display: grid; gap: 14px; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  label { display: grid; gap: 6px; color: var(--du-muted); font-size: 12px; font-weight: 600; }
  input, textarea, select, button { font: inherit; }
  input, textarea, select {
    width: 100%; border: 1px solid var(--du-line); background: var(--du-bg); color: var(--du-ink);
    border-radius: 6px; padding: 11px 12px; outline: none;
  }
  textarea { min-height: 82px; resize: vertical; line-height: 1.6; }
  input:focus, textarea:focus, select:focus { border-color: var(--du-ink); }
  .actions { display: flex; gap: 8px; margin-top: 2px; }
  button { border: 0; border-radius: 6px; padding: 11px 16px; cursor: pointer; font-weight: 700; }
  .start { flex: 1; background: var(--du-ink); color: white; }
  .stop { background: #eee; color: var(--du-ink); }
  button:disabled { cursor: default; opacity: .45; }
  details { border-top: 1px solid var(--du-line); margin-top: 18px; padding-top: 14px; }
  summary { cursor: pointer; font-weight: 700; list-style: none; display: flex; justify-content: space-between; }
  summary::-webkit-details-marker { display: none; }
  summary::after { content: "+"; font-size: 18px; line-height: 1; }
  details[open] > summary::after { content: "−"; }
  .summary-meta { color: var(--du-muted); font-size: 12px; font-weight: 500; margin-left: auto; margin-right: 12px; }
  .progress { height: 4px; background: #eee; margin: 14px 0; overflow: hidden; }
  .progress span { display: block; height: 100%; width: 0; background: var(--du-accent); transition: width .2s; }
  .branches { display: grid; gap: 8px; }
  .branch { border: 1px solid var(--du-line); border-radius: 6px; padding: 0 11px; margin: 0; }
  .branch summary { padding: 11px 0; font-size: 13px; }
  .branch pre, .result {
    margin: 0; padding: 12px 0 16px; border-top: 1px solid var(--du-line);
    white-space: pre-wrap; overflow-wrap: anywhere; font: 13px/1.75 inherit; color: #363632;
  }
  .status { color: var(--du-muted); font-size: 12px; font-weight: 500; }
  .status.running { color: #2068c9; }
  .status.complete { color: #218341; }
  .status.error { color: #b3261e; }
  .notice { min-height: 18px; margin-top: 10px; color: var(--du-muted); font-size: 12px; }
  .local { margin-top: 10px; }
  .local summary { color: var(--du-muted); font-size: 12px; font-weight: 600; }
  .local-grid { display: grid; gap: 10px; margin-top: 12px; }
  @media (max-width: 560px) {
    .shell { border-left: 0; border-right: 0; padding: 18px 16px; }
    .row { grid-template-columns: 1fr; }
  }
`;

const template = document.createElement("template");
template.innerHTML = `
  <style>${styles}</style>
  <section class="shell">
    <h2>论点宇宙</h2>
    <p class="intro">并行采样 AI 对同一辩题的独立思路，再蒸馏为认知分布。高频代表常见或更容易被关注的方向，不等于低级；低频代表较少出现的方向，也不自动等于更高级。系统负责把 AI 想到的尽量摊开，深化与超越留给人。</p>
    <form class="form">
      <label>辩题<textarea name="motion" required placeholder="输入完整辩题"></textarea></label>
      <div class="row">
        <label>持方
          <select name="stance"><option>正方</option><option>反方</option><option>中立</option></select>
        </label>
        <label>赛制<input name="format" value="标准传辩" /></label>
      </div>
      <div class="row">
        <label>采样分支<input name="branches" type="number" inputmode="numeric" min="1" max="12" value="4" /></label>
        <label>并发数<input name="parallel" type="number" inputmode="numeric" min="1" max="8" value="2" /></label>
      </div>
      <details class="local">
        <summary>本地接口设置</summary>
        <div class="local-grid">
          <label>模型<input name="model" placeholder="由服务端决定" /></label>
          <label>API 地址<input name="apiUrl" placeholder="由服务端决定" /></label>
          <label>API Key<input name="apiKey" type="password" autocomplete="off" placeholder="部署时请留空，由服务端保存" /></label>
        </div>
      </details>
      <div class="actions">
        <button class="start" type="submit">开始生成</button>
        <button class="stop" type="button" disabled>停止采样</button>
      </div>
    </form>
    <div class="notice" role="status"></div>
    <details class="process" hidden>
      <summary>模型实施进程 <span class="summary-meta"></span></summary>
      <div class="progress"><span></span></div>
      <div class="branches"></div>
    </details>
    <details class="aggregate" hidden>
      <summary>认知分布蒸馏 <span class="summary-meta"></span></summary>
      <pre class="result"></pre>
    </details>
  </section>
`;

class DebateUniverse extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).append(template.content.cloneNode(true));
    this.controllers = new Set();
    this.running = false;
    this.result = "";
  }

  connectedCallback() {
    this.form = this.shadowRoot.querySelector("form");
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.start();
    });
    this.shadowRoot.querySelector(".stop").addEventListener("click", () => this.stop());
  }

  get endpoint() {
    if (this.hasAttribute("endpoint")) return this.getAttribute("endpoint");
    return location.protocol === "file:"
      ? "http://127.0.0.1:8000/api/generate"
      : "/api/generate";
  }

  async start() {
    if (this.running) return;
    const data = Object.fromEntries(new FormData(this.form));
    const total = Math.max(1, Math.min(12, Number(data.branches) || 4));
    const parallel = Math.max(1, Math.min(8, total, Number(data.parallel) || 2));
    if (!data.motion.trim()) {
      this.setNotice("请先填写辩题");
      this.form.elements.motion.focus();
      return;
    }

    this.running = true;
    this.result = "";
    this.controllers.clear();
    this.toggleControls(true);
    this.prepareProgress(total);
    this.setNotice(`正在并行采样，最多同时运行 ${parallel} 个分支`);

    const outputs = new Array(total).fill("");
    let next = 0;
    let completed = 0;
    const worker = async () => {
      while (this.running && next < total) {
        const index = next++;
        this.setBranch(index, "running", "生成中");
        try {
          outputs[index] = await this.request({ ...data, kind: "branch" }, (token) => {
            outputs[index] += token;
            this.setBranchText(index, outputs[index]);
          });
          this.setBranch(index, "complete", "完成");
        } catch (error) {
          if (error.name === "AbortError") this.setBranch(index, "stopped", "已停止");
          else {
            this.setBranch(index, "error", "失败");
            this.setBranchText(index, error.message);
          }
        } finally {
          completed += 1;
          this.updateProgress(completed, total);
        }
      }
    };

    await Promise.all(Array.from({ length: parallel }, worker));
    if (!this.running) return this.finishStopped();

    const valid = outputs.filter(Boolean);
    if (!valid.length) return this.finishError("没有成功完成的采样分支");
    this.setNotice(`采样完成，正在蒸馏 ${valid.length} 份独立样本`);
    const aggregate = this.shadowRoot.querySelector(".aggregate");
    aggregate.hidden = false;
    aggregate.querySelector(".summary-meta").textContent = "蒸馏中";
    try {
      this.result = await this.request({ ...data, kind: "aggregate", branches: valid }, (token) => {
        this.result += token;
        aggregate.querySelector(".result").textContent = this.result;
      });
      aggregate.querySelector(".summary-meta").textContent = "已完成";
      this.setNotice("认知分布蒸馏完成");
      this.dispatchEvent(new CustomEvent("debate-complete", {
        detail: { markdown: this.result, branches: valid, motion: data.motion, stance: data.stance },
        bubbles: true,
      }));
      this.finish();
    } catch (error) {
      if (error.name === "AbortError") this.finishStopped();
      else this.finishError(error.message);
    }
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    this.controllers.forEach((controller) => controller.abort());
    this.controllers.clear();
    this.setNotice("正在停止…");
  }

  async request(data, onToken) {
    const controller = new AbortController();
    this.controllers.add(controller);
    const payload = {
      kind: data.kind,
      motion: data.motion,
      stance: data.stance,
      debate_format: data.format,
      branches: data.branches || [],
      model: data.model || null,
      api_url: data.apiUrl || null,
      api_key: data.apiKey || null,
    };
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.detail || `接口错误 ${response.status}`);
      }
      if (!response.body) throw new Error("浏览器不支持流式响应");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let output = "";
      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const message = JSON.parse(line);
          if (message.type === "error") throw new Error(message.message || "生成失败");
          if (message.type === "token") {
            output += message.token;
            onToken(message.token);
          }
        }
        if (done) break;
      }
      return output;
    } finally {
      this.controllers.delete(controller);
    }
  }

  prepareProgress(total) {
    const process = this.shadowRoot.querySelector(".process");
    const aggregate = this.shadowRoot.querySelector(".aggregate");
    process.hidden = false;
    process.open = false;
    aggregate.hidden = true;
    aggregate.open = false;
    aggregate.querySelector(".result").textContent = "";
    const branches = process.querySelector(".branches");
    branches.innerHTML = Array.from({ length: total }, (_, index) => `
      <details class="branch" data-index="${index}">
        <summary>模型 ${index + 1}<span class="status">等待中</span></summary>
        <pre></pre>
      </details>
    `).join("");
    this.updateProgress(0, total);
  }

  setBranch(index, className, label) {
    const status = this.shadowRoot.querySelector(`.branch[data-index="${index}"] .status`);
    if (!status) return;
    status.className = `status ${className}`;
    status.textContent = label;
  }

  setBranchText(index, text) {
    const output = this.shadowRoot.querySelector(`.branch[data-index="${index}"] pre`);
    if (output) output.textContent = text;
  }

  updateProgress(done, total) {
    const process = this.shadowRoot.querySelector(".process");
    process.querySelector(".summary-meta").textContent = `${done}/${total}`;
    process.querySelector(".progress span").style.width = `${(done / total) * 100}%`;
  }

  toggleControls(busy) {
    this.form.querySelector(".start").disabled = busy;
    this.form.querySelector(".stop").disabled = !busy;
    [...this.form.elements].forEach((element) => {
      if (!element.matches("button")) element.disabled = busy;
    });
  }

  setNotice(message) { this.shadowRoot.querySelector(".notice").textContent = message; }
  finish() { this.running = false; this.controllers.clear(); this.toggleControls(false); }
  finishStopped() { this.setNotice("采样已停止"); this.finish(); }
  finishError(message) { this.setNotice(`生成失败：${message}`); this.finish(); }
}

if (!customElements.get("debate-universe")) customElements.define("debate-universe", DebateUniverse);
