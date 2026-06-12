// CDP検証用ヘルパー(検証後に削除する): node _cdp.mjs "<JS式>"
const expr = process.argv[2];
const list = await (await fetch('http://localhost:9222/json')).json();
const page = list.find(t => t.title.includes('趣味帳'));
if (!page) { console.error('趣味帳ページが見つからない'); process.exit(1); }
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
const send = (method, params) => new Promise(res => {
  const id = Math.floor(Math.random() * 1e9);
  const h = ev => {
    const m = JSON.parse(ev.data);
    if (m.id === id) { ws.removeEventListener('message', h); res(m.result); }
  };
  ws.addEventListener('message', h);
  ws.send(JSON.stringify({ id, method, params }));
});
const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
console.log(JSON.stringify(r?.result?.value ?? r, null, 1));
ws.close();
