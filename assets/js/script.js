async function readJson(path, fallback) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) return fallback;
    return await response.json();
  } catch (_) {
    return fallback;
  }
}

function articleCard(article, prefix = "") {
  const type = article.type || "Article";
  const articleNo = article.article_no ? `Article ${article.article_no}` : "";
  const section = article.section || article.category || "";
  const title = article.title_cn || article.titleZh || article.titleEn || "未命名文章";
  const subtitle = article.title_en || article.titleEn || "";
  const authors = formatAuthors(article.authors) || article.authorsZh || article.authorsEn || "";
  const href = article.url || article.href || "#";
  const abstract = article.abstract_cn || article.abstract || "";
  const published = article.published || article.date || "";
  const doi = article.doi || "";
  const pdf = article.pdf || "";
  return `
    <article class="card">
      <div class="type">${[articleNo, type, section].filter(Boolean).join(" · ")}</div>
      <h3>${title}</h3>
      ${subtitle ? `<p>${subtitle}</p>` : ""}
      ${authors ? `<p class="meta">${authors}</p>` : ""}
      ${abstract ? `<p class="article-summary">${trimText(abstract, 130)}</p>` : ""}
      <p class="meta">${[published ? `Published: ${published}` : "", doi ? `DOI: ${doi}` : "", pdf ? `PDF: ${pdf}` : ""].filter(Boolean).join(" · ")}</p>
      <a class="btn" href="${prefix}${href}">阅读全文</a>
    </article>
  `;
}

function formatAuthors(authors) {
  if (!Array.isArray(authors)) return "";
  return authors.map((author) => author.name_cn || author.name_en || "").filter(Boolean).join("，");
}

function trimText(text, max) {
  if (!text || text.length <= max) return text || "";
  return `${text.slice(0, max)}……`;
}

function noticeCard(item) {
  return `
    <article class="card notice-card">
      <div class="type">${item.date || "公告"}</div>
      <h3>${item.title || "未命名公告"}</h3>
      <p>${item.body || ""}</p>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  const articleTargets = document.querySelectorAll("[data-article-list]");
  if (articleTargets.length) {
    const articles = await readJson(articleTargets[0].dataset.source || "data/articles.json", []);
    articleTargets.forEach((target) => {
      const prefix = target.dataset.prefix || "";
      const category = target.dataset.category || "all";
      const filtered = category === "all" ? articles : articles.filter((item) => {
        const section = item.section || item.category || "";
        return item.category === category || section.toLowerCase().includes(category.toLowerCase());
      });
      target.innerHTML = filtered.length ? filtered.map((item) => articleCard(item, prefix)).join("") : '<div class="data-list-empty">暂无文章。</div>';
    });
  }

  const noticeTargets = document.querySelectorAll("[data-announcements]");
  if (noticeTargets.length) {
    const notices = await readJson(noticeTargets[0].dataset.source || "data/announcements.json", []);
    noticeTargets.forEach((target) => {
      target.innerHTML = notices.length ? `<div class="notice-list">${notices.map(noticeCard).join("")}</div>` : '<div class="data-list-empty">暂无公告。</div>';
    });
  }
});
