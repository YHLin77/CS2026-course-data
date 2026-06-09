

const URL =
  "https://raw.githubusercontent.com/YHLin77/CS2026-course-data/main/%E6%9A%97%E9%BB%91%E8%A5%B2%E7%94%A2google%20map.csv";

const raw = (await d3.csv(URL)).map(d => ({
  ...d,
  name: (d.name ?? "").trim()
}));

const names = Array.from(new Set(raw.map(d => d.name).filter(Boolean)));

let sel = null;

const container = document.createElement("div");
container.style.cssText = "font-family:sans-serif;padding:8px;";

const title = document.createElement("div");
title.textContent = "Google Map 評論摘要";
title.style.cssText =
  "font-size:18px;font-weight:600;margin-bottom:12px;";

const btnRow = document.createElement("div");
btnRow.style.cssText =
  "display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;";

const btns = {};

for (const n of names) {
  const b = document.createElement("button");
  b.textContent = n;

  b.style.cssText =
    "padding:4px 10px;font-size:12px;border-radius:4px;" +
    "cursor:pointer;border:1.5px solid #333;background:white;color:#333;";

  b.onclick = () => {
    sel = n;

    for (const [k, el] of Object.entries(btns)) {
      const active = k === sel;
      el.style.background = active ? "#333" : "white";
      el.style.color = active ? "white" : "#333";
    }

    draw();
  };

  btns[n] = b;
  btnRow.appendChild(b);
}

const content = document.createElement("div");

function draw() {
  content.innerHTML = "";

  if (!sel) {
    const hint = document.createElement("div");
    hint.textContent = "請選擇一個地點";
    hint.style.cssText = "color:#666;margin-top:10px;";
    content.appendChild(hint);
    return;
  }

  const row = raw.find(d => d.name === sel);

  const box = document.createElement("div");
  box.textContent = row?.summary ?? "⚠️ 找不到 summary";

  box.style.cssText =
    "max-height:240px;" +
    "overflow-y:auto;" +
    "white-space:pre-wrap;" +
    "line-height:1.6;" +
    "margin-top:10px;" +
    "padding:10px;" +
    "border-left:4px solid #333;" +
    "border:1px solid #ddd;" +
    "border-radius:6px;";

  content.appendChild(box);
}

draw();

container.append(title, btnRow, content);

return container;
