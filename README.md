# 🔐 Base64 Tool

A fast, beautiful Base64 encoder and decoder — runs on Node.js locally and deployed globally on Cloudflare Workers.

## 🌐 Live Demo

**[https://base64-tool.rizo2sirxycaa.workers.dev](https://base64-tool.rizo2sirxycaa.workers.dev)**

No setup required — just open the link and start encoding/decoding.

---

## ✨ Features

- **Encode** & **Decode** Base64 instantly
- **URL-safe Base64** encoding/decoding (RFC 4648)
- **File upload** — read files directly into the editor
- **Download results** — export encoded/decoded output
- **Real-time conversion** — auto-convert as you type (when enabled)
- **Conversion history** — view & reuse last 10 conversions
- **Character counter** — shows byte size of input & output
- **Dark/Light theme** toggle with persistent preference
- One-click **Copy** to clipboard  
- **Swap** input/output instantly
- **Clear** both fields at once
- Keyboard shortcut: `Ctrl + Enter` to convert
- Beautiful dark UI with animated gradient background
- Fully responsive on mobile and desktop

---

## 🚀 API

The app exposes two JSON endpoints you can call directly.

### Encode

```http
POST https://base64-tool.rizo2sirxycaa.workers.dev/api/encode
Content-Type: application/json

{ "text": "Hello World!", "urlSafe": false }
```

**Response:**
```json
{ "result": "SGVsbG8gV29ybGQh" }
```

**Parameters:**
- `text` (string, required): Text to encode
- `urlSafe` (boolean, optional): Use URL-safe Base64 encoding (RFC 4648). Replaces `+` with `-`, `/` with `_`, and removes padding. Default: `false`

### Decode

```http
POST https://base64-tool.rizo2sirxycaa.workers.dev/api/decode
Content-Type: application/json

{ "text": "SGVsbG8gV29ybGQh", "urlSafe": false }
```

**Response:**
```json
{ "result": "Hello World!" }
```

**Parameters:**
- `text` (string, required): Base64 string to decode
- `urlSafe` (boolean, optional): Decode URL-safe Base64 (RFC 4648). Default: `false`

#### cURL examples

```bash
# Encode (standard Base64)
curl -X POST https://base64-tool.rizo2sirxycaa.workers.dev/api/encode \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello World!"}'

# Encode (URL-safe)
curl -X POST https://base64-tool.rizo2sirxycaa.workers.dev/api/encode \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello World!","urlSafe":true}'

# Decode
curl -X POST https://base64-tool.rizo2sirxycaa.workers.dev/api/decode \
  -H "Content-Type: application/json" \
  -d '{"text":"SGVsbG8gV29ybGQh"}'
```

---

## 🛠 Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18+

### Setup

```bash
git clone https://github.com/aliaspin/base64-tool.git
cd base64-tool
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deploy to Cloudflare Workers

```bash
# Install Wrangler (already in devDependencies)
npm install

# Deploy (requires a Cloudflare API token)
CLOUDFLARE_API_TOKEN="your-token" npx wrangler deploy
```

Create your API token at [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) using the **"Edit Cloudflare Workers"** template.

---

## 🗂 Project Structure

```
base64-tool/
├── server.js          # Express server (local dev)
├── worker.js          # Cloudflare Worker (production)
├── wrangler.toml      # Cloudflare deployment config
├── public/
│   ├── index.html     # UI markup
│   ├── style.css      # Dark theme styles
│   └── app.js         # Frontend logic
└── package.json
```

---

## 📄 License

ISC
