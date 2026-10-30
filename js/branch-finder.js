// 와와학원 지점 찾기: 시 → 구 → 동 드롭다운
document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("branch-finder");
  if (!box || typeof BRANCHES === "undefined") return;

  const siSel = document.getElementById("bf-si");
  const guSel = document.getElementById("bf-gu");
  const dongSel = document.getElementById("bf-dong");
  const result = document.getElementById("bf-result");
  const ko = (a, b) => a.localeCompare(b, "ko");
  const uniq = (arr) => [...new Set(arr)].sort(ko);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function fill(sel, label, items) {
    sel.innerHTML = `<option value="">${label}</option>` +
      items.map((v) => `<option value="${esc(v)}">${esc(v)}</option>`).join("");
    sel.disabled = items.length === 0;
  }

  function show(list) {
    if (!list.length) { result.innerHTML = ""; return; }
    result.innerHTML = list.map((b) => `
      <a class="bf-card" href="branch/${esc(b.file)}.html">
        <span class="bf-name">와와학원 ${esc(b.name)} 공부방</span>
        <span class="bf-addr">${esc(b.address || "")}</span>
        <span class="bf-go">지점 안내 보기 →</span>
      </a>`).join("");
  }

  if (!BRANCHES.length) {
    fill(siSel, "시/도 선택", []);
    fill(guSel, "구/군 선택", []);
    fill(dongSel, "동 선택", []);
    result.innerHTML = `<p class="bf-empty">지점 안내 페이지를 준비하고 있습니다. 가까운 지점은 상담 신청을 남겨주시면 안내해 드려요.</p>`;
    return;
  }

  fill(siSel, "시/도 선택", uniq(BRANCHES.map((b) => b.si)));
  fill(guSel, "구/군 선택", []);
  fill(dongSel, "동 선택", []);

  // ----- 검색창: 시/구/동/지점명/주소 어디에든 들어 있으면 표시 -----
  const qInput = document.getElementById("bf-q");
  const norm = (s) => String(s || "").replace(/\s+/g, "").toLowerCase();
  // "부산" → "부산광역시", "서울" → "서울특별시"처럼 줄임말도 찾도록 시/도 약칭을 함께 넣어 둠
  const SI_ALIAS = { "충청북도": "충북", "충청남도": "충남", "전라북도": "전북", "전북특별자치도": "전북",
    "전라남도": "전남", "경상북도": "경북", "경상남도": "경남" };
  const siShort = (si) => si.replace(/(특별자치시|특별자치도|특별시|광역시|도)$/, "") + " " + (SI_ALIAS[si] || "");
  const haystack = BRANCHES.map((b) =>
    norm([b.si, siShort(b.si), b.gu, b.dong, b.name, b.name.replace(/점$/, ""), b.address].join(" ")));

  function search(q) {
    const words = q.trim().split(/\s+/).map(norm).map((w) => w.replace(/점$/, "")).filter(Boolean);
    if (!words.length) { show([]); return; }
    const hits = BRANCHES.filter((b, i) => words.every((w) => haystack[i].includes(w)))
      .sort((a, b) => ko(a.si + a.gu + a.name, b.si + b.gu + b.name));
    if (!hits.length) {
      result.innerHTML = `<p class="bf-empty">'${esc(q.trim())}' 지역에서 찾은 지점이 없습니다. 다른 동네 이름으로 검색하거나, 상담 신청을 남겨주시면 가까운 지점을 안내해 드려요.</p>`;
      return;
    }
    show(hits);
    result.insertAdjacentHTML("afterbegin", `<p class="bf-count">검색 결과 ${hits.length}곳</p>`);
  }

  if (qInput) {
    qInput.addEventListener("input", () => {
      siSel.value = ""; fill(guSel, "구/군 선택", []); fill(dongSel, "동 선택", []);
      search(qInput.value);
    });
  }
  const clearQuery = () => { if (qInput) qInput.value = ""; };
  [siSel, guSel, dongSel].forEach((s) => s.addEventListener("change", clearQuery));

  siSel.addEventListener("change", () => {
    const si = siSel.value;
    fill(guSel, "구/군 선택", si ? uniq(BRANCHES.filter((b) => b.si === si).map((b) => b.gu)) : []);
    fill(dongSel, "동 선택", []);
    show([]);
  });
  guSel.addEventListener("change", () => {
    const si = siSel.value, gu = guSel.value;
    fill(dongSel, "동 선택", gu ? uniq(BRANCHES.filter((b) => b.si === si && b.gu === gu).map((b) => b.dong)) : []);
    show([]);
  });
  dongSel.addEventListener("change", () => {
    const si = siSel.value, gu = guSel.value, dong = dongSel.value;
    show(dong ? BRANCHES.filter((b) => b.si === si && b.gu === gu && b.dong === dong).sort((a, b) => ko(a.name, b.name)) : []);
  });
});
