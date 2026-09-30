document.addEventListener("DOMContentLoaded", () => {
  // mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.textContent = nav.classList.contains("open") ? "✕" : "☰";
    });
  }

  // scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // consult form (front-end only demo)
  const form = document.querySelector("form.consult");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      if (status) {
        status.style.display = "block";
        status.textContent = "상담 신청이 접수되었습니다. 담당 선생님이 곧 연락드릴게요.";
      }
      form.reset();
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }

  // 최근 블로그 포스팅 불러오기
  const blogFeedEl = document.getElementById("blog-feed");
  if (blogFeedEl) {
    fetch("https://wawa-consultation-form.onrender.com/blog-feed?limit=20")
      .then((res) => {
        if (!res.ok) throw new Error("요청 실패");
        return res.json();
      })
      .then((posts) => {
        if (!Array.isArray(posts) || posts.length === 0) {
          blogFeedEl.innerHTML = '<p class="blog-feed-empty">아직 표시할 글이 없습니다.</p>';
          return;
        }
        blogFeedEl.innerHTML = posts
          .map((post) => {
            const date = post.pubDate ? new Date(post.pubDate) : null;
            const dateStr = date && !isNaN(date)
              ? `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`
              : "";
            return `
              <a class="blog-card" href="${escapeHtml(post.link)}" target="_blank" rel="noopener noreferrer">
                <span class="blog-source">${escapeHtml(post.blogId)}</span>
                <h3>${escapeHtml(post.title)}</h3>
                <div class="blog-date">${dateStr}</div>
              </a>`;
          })
          .join("");
      })
      .catch(() => {
        blogFeedEl.innerHTML = '<p class="blog-feed-empty">블로그 글을 불러오지 못했습니다.</p>';
      });
  }

  // 메인 "학습 가이드": 블로그 RSS에서 최신 글 6개를 불러와 교체 (실패하면 HTML에 적힌 목록 그대로 유지)
  const guideEl = document.getElementById("guide-feed");
  if (guideEl && "DOMParser" in window) {
    fetch("https://blog.toktokstudy.com/rss.xml")
      .then((res) => {
        if (!res.ok) throw new Error("요청 실패");
        return res.text();
      })
      .then((xmlText) => {
        const doc = new DOMParser().parseFromString(xmlText, "application/xml");
        const items = Array.from(doc.querySelectorAll("item")).slice(0, 6);
        if (items.length < 3) return;
        const pick = (item, tag) => {
          const el = item.querySelector(tag);
          return el ? el.textContent.trim() : "";
        };
        guideEl.innerHTML = items
          .map((item) => {
            const title = pick(item, "title").replace(/^"(.*)"$/, "$1");
            const link = pick(item, "link");
            const d = new Date(pick(item, "pubDate"));
            const dateStr = !isNaN(d)
              ? `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`
              : "";
            let desc = pick(item, "description");
            if (desc === title) desc = "";
            if (desc.length > 80) desc = desc.slice(0, 80).trim() + "…";
            if (!/^https:\/\/blog\.toktokstudy\.com\//.test(link)) return "";
            return `
        <a class="guide-card" href="${escapeHtml(link)}">
          <div class="guide-date">${dateStr}</div>
          <h3>${escapeHtml(title)}</h3>
          ${desc ? `<p>${escapeHtml(desc)}</p>` : ""}
        </a>`;
          })
          .join("");
      })
      .catch(() => {});
  }

  // 방문자 카운터
  const vcTotal = document.getElementById("vc-total");
  const vcToday = document.getElementById("vc-today");
  if (vcTotal && vcToday) {
    fetch("https://wawa-consultation-form.onrender.com/visit", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        vcTotal.textContent = (data.total || 0).toLocaleString();
        vcToday.textContent = (data.today || 0).toLocaleString();
      })
      .catch(() => {
        vcTotal.textContent = "-";
        vcToday.textContent = "-";
      });
  }
});
