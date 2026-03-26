# 🔐 Base64 Tool

A fast, beautiful Base64 encoder and decoder — runs on Node.js locally and deployed globally on Cloudflare Workers.

## 🌐 Live Demo

**[https://base64-tool.rizo2sirxycaa.workers.dev](https://base64-tool.rizo2sirxycaa.workers.dev)**

No setup required — just open the link and start encoding/decoding.

---

## ✨ Features

- **Encode** plain text → Base64
- **Decode** Base64 → plain text
- One-click **Copy** output to clipboard
- **Swap** input and output instantly
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

{ "text": "Hello World!" }
```

**Response:**
```json
{ "result": "SGVsbG8gV29ybGQh" }
```

### Decode

```http
POST https://base64-tool.rizo2sirxycaa.workers.dev/api/decode
Content-Type: application/json

{ "text": "SGVsbG8gV29ybGQh" }
```

**Response:**
```json
{ "result": "Hello World!" }
```

#### cURL examples

```bash
# Encode
curl -X POST https://base64-tool.rizo2sirxycaa.workers.dev/api/encode \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello World!"}'

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
git clone https://github.com/aliaspin/awesomenode.git
cd awesomenode
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
awesomenode/
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
