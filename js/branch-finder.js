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
        <span class="bf-name">와와학원 ${esc(b.name)}</span>
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
