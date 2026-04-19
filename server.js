const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function encodeBase64(text, urlSafe = false) {
  let encoded = Buffer.from(text, 'utf-8').toString('base64');
  if (urlSafe) {
    encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }
  return encoded;
}

function decodeBase64(text, urlSafe = false) {
  try {
    if (urlSafe) {
      text = text.replace(/-/g, '+').replace(/_/g, '/');
      while (text.length % 4) text += '=';
    }
    return Buffer.from(text, 'base64').toString('utf-8');
  } catch {
    throw new Error('Invalid Base64 string');
  }
}

app.post('/api/encode', (req, res) => {
  const { text, urlSafe } = req.body;
  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    const encoded = encodeBase64(text, urlSafe);
    res.json({ result: encoded });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/decode', (req, res) => {
  const { text, urlSafe } = req.body;
  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    const decoded = decodeBase64(text, urlSafe);
    res.json({ result: decoded });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
