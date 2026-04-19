// Cloudflare Worker — Base64 Encode / Decode Tool (Enhanced)

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Base64 Encoder / Decoder</title>
  <style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--clr-bg:#0f0f1a;--clr-surface:#1a1a2e;--clr-card:#16213e;--clr-primary:#6c63ff;--clr-primary-light:#8b83ff;--clr-accent:#e94560;--clr-text:#eaeaea;--clr-text-muted:#9a9ab0;--clr-border:#2a2a4a;--radius:14px;--shadow:0 8px 32px rgba(0,0,0,.45)}
html.light-mode{--clr-bg:#f5f5f5;--clr-surface:#fff;--clr-card:#f9f9f9;--clr-text:#222;--clr-text-muted:#666;--clr-border:#e0e0e0;--shadow:0 2px 8px rgba(0,0,0,.1)}
body{font-family:'Segoe UI',system-ui,-apple-system,sans-serif;background:var(--clr-bg);color:var(--clr-text);min-height:100vh;display:flex;justify-content:center;align-items:flex-start;overflow-x:hidden;transition:background .3s,color .3s}
.bg-shapes{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.shape{position:absolute;border-radius:50%;filter:blur(120px);opacity:.35}
.shape-1{width:500px;height:500px;background:var(--clr-primary);top:-120px;left:-100px;animation:float 18s ease-in-out infinite alternate}
.shape-2{width:400px;height:400px;background:var(--clr-accent);bottom:-80px;right:-60px;animation:float 22s ease-in-out infinite alternate-reverse}
.shape-3{width:300px;height:300px;background:#00d2ff;top:50%;left:55%;animation:float 15s ease-in-out infinite alternate}
@keyframes float{0%{transform:translate(0,0) scale(1)}100%{transform:translate(60px,-40px) scale(1.15)}}
.container{position:relative;z-index:1;width:100%;max-width:680px;padding:48px 20px 32px}
header{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px}
header h1{font-size:2.4rem;font-weight:800;background:linear-gradient(135deg,var(--clr-primary-light),var(--clr-accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.header-controls{display:flex;gap:10px}
.theme-btn{background:var(--clr-surface);border:1px solid var(--clr-border);border-radius:8px;width:40px;height:40px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--clr-text-muted);transition:all .2s}
.theme-btn:hover{border-color:var(--clr-primary);color:var(--clr-primary)}
.subtitle{margin-top:6px;color:var(--clr-text-muted);font-size:.95rem;letter-spacing:.5px;margin-bottom:28px}
.toggle-group{display:flex;position:relative;background:var(--clr-surface);border-radius:50px;padding:4px;margin:0 auto 28px;width:240px;border:1px solid var(--clr-border)}
.toggle-btn{flex:1;padding:10px 0;border:none;background:none;color:var(--clr-text-muted);font-size:.95rem;font-weight:600;cursor:pointer;z-index:1;transition:color .3s}
.toggle-btn.active{color:#fff}
.toggle-indicator{position:absolute;top:4px;left:4px;width:calc(50% - 4px);height:calc(100% - 8px);background:var(--clr-primary);border-radius:50px;transition:transform .35s cubic-bezier(.4,0,.2,1);box-shadow:0 2px 12px rgba(108,99,255,.45)}
.toggle-group[data-mode="decode"] .toggle-indicator{transform:translateX(100%)}
.card{background:var(--clr-card);border:1px solid var(--clr-border);border-radius:var(--radius);padding:28px;box-shadow:var(--shadow)}
.card-options{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.option-checkbox{display:flex;align-items:center;gap:6px;cursor:pointer;font-size:.85rem;color:var(--clr-text-muted)}
.option-checkbox input{cursor:pointer}
label{display:block;font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:1.2px;color:var(--clr-text-muted);margin-bottom:8px}
.label-with-count{display:flex;justify-content:space-between;align-items:center}
.char-count{font-size:.75rem;font-weight:400;text-transform:none;letter-spacing:0}
textarea{width:100%;background:var(--clr-surface);border:1px solid var(--clr-border);border-radius:10px;color:var(--clr-text);font-family:'Cascadia Code','Fira Code',monospace;font-size:.9rem;padding:14px 16px;resize:vertical;transition:border-color .25s,box-shadow .25s;line-height:1.55;min-height:120px}
textarea:focus{outline:none;border-color:var(--clr-primary);box-shadow:0 0 0 3px rgba(108,99,255,.25)}
textarea::placeholder{color:var(--clr-text-muted);opacity:.6}
.file-upload{position:relative;margin:16px 0}
.file-input{display:none}
.file-label{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 16px;background:var(--clr-surface);border:2px dashed var(--clr-border);border-radius:10px;cursor:pointer;color:var(--clr-text-muted);font-size:.9rem;transition:border-color .2s,color .2s}
.file-label:hover{border-color:var(--clr-primary);color:var(--clr-primary)}
.file-name{color:var(--clr-text);font-size:.85rem}
.primary-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin:20px 0;padding:14px;background:linear-gradient(135deg,var(--clr-primary),var(--clr-accent));border:none;border-radius:10px;color:#fff;font-size:1.05rem;font-weight:700;cursor:pointer;transition:transform .15s,box-shadow .25s}
.primary-btn:hover{transform:translateY(-2px);box-shadow:0 6px 28px rgba(108,99,255,.5)}
.primary-btn:active{transform:translateY(0)}
.btn-icon{font-size:1.3rem;transition:transform .3s}
.primary-btn:hover .btn-icon{transform:translateX(4px)}
.actions{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
.action-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:var(--clr-surface);border:1px solid var(--clr-border);border-radius:8px;color:var(--clr-text-muted);font-size:.82rem;font-weight:500;cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.action-btn:hover{background:var(--clr-border);color:var(--clr-text);border-color:var(--clr-primary)}
.history-section{margin-top:24px;padding-top:24px;border-top:1px solid var(--clr-border)}
.history-title{font-size:.85rem;font-weight:600;text-transform:uppercase;color:var(--clr-text-muted);margin-bottom:12px}
.history-list{max-height:200px;overflow-y:auto;display:flex;flex-direction:column;gap:8px}
.history-item{display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--clr-surface);border:1px solid var(--clr-border);border-radius:8px;cursor:pointer;font-size:.85rem;transition:border-color .2s}
.history-item:hover{border-color:var(--clr-primary)}
.history-item-text{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--clr-text-muted)}
.history-item-mode{font-size:.75rem;color:var(--clr-primary);font-weight:600}
.toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--clr-primary);color:#fff;padding:10px 28px;border-radius:50px;font-size:.9rem;font-weight:600;box-shadow:0 4px 20px rgba(108,99,255,.5);opacity:0;transition:opacity .3s,transform .3s;pointer-events:none;z-index:100}
.toast.visible{opacity:1;transform:translateX(-50%) translateY(0)}
.hidden{display:block}
footer{text-align:center;margin-top:32px;color:var(--clr-text-muted);font-size:.8rem;opacity:.6}
@media(max-width:480px){.container{padding:28px 12px 24px}header{flex-direction:column;align-items:flex-start;gap:12px}header h1{font-size:1.8rem}.card{padding:18px}.actions{justify-content:center}}
  </style>
</head>
<body>
  <div class="bg-shapes">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
  </div>
  <div class="container">
    <header>
      <div>
        <h1>🔐 Base64 Tool</h1>
        <p class="subtitle">Encode &amp; Decode instantly</p>
      </div>
      <div class="header-controls">
        <button class="theme-btn" id="theme-btn" title="Toggle theme">🌙</button>
      </div>
    </header>
    <div class="toggle-group">
      <button class="toggle-btn active" data-mode="encode">Encode</button>
      <button class="toggle-btn" data-mode="decode">Decode</button>
      <div class="toggle-indicator"></div>
    </div>
    <div class="card">
      <div class="card-options">
        <label class="option-checkbox">
          <input type="checkbox" id="url-safe" />
          URL-safe Base64
        </label>
        <label class="option-checkbox">
          <input type="checkbox" id="auto-convert" />
          Auto-convert
        </label>
      </div>
      <div class="label-with-count">
        <label for="input-text">Input</label>
        <span class="char-count" id="input-count">0 bytes</span>
      </div>
      <textarea id="input-text" placeholder="Paste text here or upload a file…" rows="6"></textarea>
      <div class="file-upload">
        <label for="file-input" class="file-label">
          <span>📁 Choose File</span>
          <span class="file-name" id="file-name"></span>
        </label>
        <input type="file" id="file-input" class="file-input" accept="*" />
      </div>
      <button id="convert-btn" class="primary-btn">
        <span class="btn-text">Encode</span>
        <span class="btn-icon">→</span>
      </button>
      <div class="label-with-count">
        <label for="output-text">Output</label>
        <span class="char-count" id="output-count">0 bytes</span>
      </div>
      <textarea id="output-text" placeholder="Result will appear here…" rows="6" readonly></textarea>
      <div class="actions">
        <button id="copy-btn" class="action-btn" title="Copy output">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          Copy
        </button>
        <button id="download-btn" class="action-btn" title="Download output">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download
        </button>
        <button id="swap-btn" class="action-btn" title="Swap input/output">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
          Swap
        </button>
        <button id="clear-btn" class="action-btn" title="Clear all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
          Clear
        </button>
      </div>
      <div class="history-section">
        <div class="history-title">📜 Recent conversions</div>
        <div class="history-list" id="history-list"></div>
      </div>
    </div>
    <div id="toast" class="toast hidden">Copied!</div>
    <footer><p>Powered by Cloudflare Workers</p></footer>
  </div>
  <script>
(() => {
  const inputEl = document.getElementById('input-text');
  const outputEl = document.getElementById('output-text');
  const convertBtn = document.getElementById('convert-btn');
  const copyBtn = document.getElementById('copy-btn');
  const downloadBtn = document.getElementById('download-btn');
  const swapBtn = document.getElementById('swap-btn');
  const clearBtn = document.getElementById('clear-btn');
  const fileInput = document.getElementById('file-input');
  const fileName = document.getElementById('file-name');
  const toast = document.getElementById('toast');
  const toggleGroup = document.querySelector('.toggle-group');
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const btnText = convertBtn.querySelector('.btn-text');
  const urlSafeCheckbox = document.getElementById('url-safe');
  const autoConvertCheckbox = document.getElementById('auto-convert');
  const themeBtn = document.getElementById('theme-btn');
  const inputCount = document.getElementById('input-count');
  const outputCount = document.getElementById('output-count');
  const historyList = document.getElementById('history-list');
  
  let mode = 'encode';
  let history = JSON.parse(localStorage.getItem('base64-history')) || [];
  let isDarkMode = localStorage.getItem('dark-mode') !== 'false';
  
  // Theme toggle
  themeBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('light-mode');
    localStorage.setItem('dark-mode', isDarkMode);
    themeBtn.textContent = isDarkMode ? '🌙' : '☀️';
  });
  
  if (!isDarkMode) {
    document.documentElement.classList.add('light-mode');
    themeBtn.textContent = '☀️';
  }
  
  // Mode toggle
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode;
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      toggleGroup.setAttribute('data-mode', mode);
      btnText.textContent = mode === 'encode' ? 'Encode' : 'Decode';
      inputEl.placeholder = mode === 'encode' ? 'Paste text here or upload a file…' : 'Paste Base64 string here…';
    });
  });
  
  // Update character count
  inputEl.addEventListener('input', () => {
    const bytes = new TextEncoder().encode(inputEl.value).length;
    inputCount.textContent = bytes + ' bytes';
    if (autoConvertCheckbox.checked && inputEl.value.trim()) {
      convertBtn.click();
    }
  });
  
  outputEl.addEventListener('input', () => {
    const bytes = new TextEncoder().encode(outputEl.value).length;
    outputCount.textContent = bytes + ' bytes';
  });
  
  // File upload
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    fileName.textContent = file.name;
    const reader = new FileReader();
    reader.onload = (event) => {
      inputEl.value = event.target.result;
      inputEl.dispatchEvent(new Event('input'));
    };
    reader.readAsText(file);
  });
  
  // Convert
  convertBtn.addEventListener('click', async () => {
    const text = inputEl.value;
    if (!text.trim()) { outputEl.value = ''; return; }
    
    try {
      const res = await fetch('/api/' + mode, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, urlSafe: urlSafeCheckbox.checked }),
      });
      const data = await res.json();
      outputEl.value = res.ok ? data.result : 'Error: ' + data.error;
      if (res.ok) {
        addToHistory(text.substring(0, 30), mode);
      }
    } catch { outputEl.value = 'Error: Could not reach server'; }
  });
  
  // Copy
  copyBtn.addEventListener('click', () => {
    if (!outputEl.value) return;
    navigator.clipboard.writeText(outputEl.value).then(() => showToast('Copied!'));
  });
  
  // Download
  downloadBtn.addEventListener('click', () => {
    if (!outputEl.value) return;
    const blob = new Blob([outputEl.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.' + (mode === 'encode' ? 'b64' : 'txt');
    a.click();
    URL.revokeObjectURL(url);
  });
  
  // Swap
  swapBtn.addEventListener('click', () => {
    const tmp = inputEl.value;
    inputEl.value = outputEl.value;
    outputEl.value = tmp;
    inputEl.dispatchEvent(new Event('input'));
    outputEl.dispatchEvent(new Event('input'));
  });
  
  // Clear
  clearBtn.addEventListener('click', () => {
    inputEl.value = '';
    outputEl.value = '';
    fileName.textContent = '';
    inputEl.dispatchEvent(new Event('input'));
    outputEl.dispatchEvent(new Event('input'));
    inputEl.focus();
  });
  
  // Keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') convertBtn.click();
  });
  
  // History
  function addToHistory(text, m) {
    history.unshift({ text, mode: m, time: new Date().toLocaleTimeString() });
    if (history.length > 10) history.pop();
    localStorage.setItem('base64-history', JSON.stringify(history));
    renderHistory();
  }
  
  function renderHistory() {
    historyList.innerHTML = history.map((h, i) => \`
      <div class="history-item" onclick="loadHistory(\${i})">
        <span class="history-item-text">\${h.text}</span>
        <span class="history-item-mode">\${h.mode}</span>
      </div>
    \`).join('');
  }
  
  window.loadHistory = (i) => {
    inputEl.value = history[i].text;
    mode = history[i].mode;
    toggleBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('[data-mode="' + mode + '"]').classList.add('active');
    toggleGroup.setAttribute('data-mode', mode);
    btnText.textContent = mode === 'encode' ? 'Encode' : 'Decode';
    inputEl.dispatchEvent(new Event('input'));
  };
  
  renderHistory();
  
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 1800);
  }
})();
  </script>
</body>
</html>`;

function encodeBase64(text, urlSafe = false) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  let encoded = btoa(binary);
  if (urlSafe) {
    encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }
  return encoded;
}

function decodeBase64(text, urlSafe = false) {
  try {
    if (urlSafe) {
      text = text.replace(/-/g, '+').replace(/_/g, '/');
      // Add padding
      while (text.length % 4) text += '=';
    }
    const binary = atob(text);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    throw new Error('Invalid Base64 string');
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // API routes
    if (request.method === 'POST' && url.pathname === '/api/encode') {
      try {
        const { text, urlSafe } = await request.json();
        if (typeof text !== 'string') return jsonResponse({ error: 'Invalid input' }, 400);
        return jsonResponse({ result: encodeBase64(text, urlSafe) });
      } catch (e) {
        return jsonResponse({ error: 'Invalid JSON body' }, 400);
      }
    }

    if (request.method === 'POST' && url.pathname === '/api/decode') {
      try {
        const { text, urlSafe } = await request.json();
        if (typeof text !== 'string') return jsonResponse({ error: 'Invalid input' }, 400);
        return jsonResponse({ result: decodeBase64(text, urlSafe) });
      } catch (e) {
        return jsonResponse({ error: 'Invalid Base64 string' }, 400);
      }
    }

    // Serve HTML for everything else
    return new Response(HTML, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  },
};
