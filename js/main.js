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
    fetch("https://wawa-consultation-form.onrender.com/blog-feed?limit=10")
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
