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

function formatAffiliations(affiliations) {
  if (!Array.isArray(affiliations)) return "";
  return affiliations.map((item) => item.name_cn || item.name_en || "").filter(Boolean).join("；");
}

function formatKeywords(keywords) {
  if (Array.isArray(keywords)) return keywords.join("；");
  return keywords || "";
}

function trimText(text, max) {
  if (!text || text.length <= max) return text || "";
  return `${text.slice(0, max)}……`;
}

function currentArticle(articles) {
  const path = window.location.pathname.replace(/^\/+/, "");
  return articles.find((article) => {
    const url = (article.url || article.href || "").replace(/^\/+/, "");
    return url && (path.endsWith(url) || path.endsWith(url.replace(/^articles\//, "")));
  });
}

function renderArticleMeta(article) {
  const authors = formatAuthors(article.authors) || article.authorsZh || article.authorsEn || "";
  const affiliations = formatAffiliations(article.affiliations);
  const keywordsCn = formatKeywords(article.keywords_cn);
  const keywordsEn = formatKeywords(article.keywords_en);
  return `
    <section class="journal-meta">
      <h3>Article Metadata</h3>
      <div class="journal-meta-grid">
        <div><strong>Article ID</strong><span>${article.article_id || ""}</span></div>
        <div><strong>Article No.</strong><span>${article.article_no || ""}</span></div>
        <div><strong>Type</strong><span>${article.type || ""}</span></div>
        <div><strong>Section</strong><span>${article.section || ""}</span></div>
        <div><strong>Authors</strong><span>${authors}</span></div>
        <div><strong>Affiliations</strong><span>${affiliations}</span></div>
        <div><strong>Received</strong><span>${article.received || "N/A"}</span></div>
        <div><strong>Accepted</strong><span>${article.accepted || "N/A"}</span></div>
        <div><strong>Published</strong><span>${article.published || ""}</span></div>
        <div><strong>DOI</strong><span>${article.doi || "Pending"}</span></div>
        <div><strong>PDF</strong><span>${article.pdf || "Coming Soon"}</span></div>
        <div><strong>License</strong><span>${article.license || ""}</span></div>
      </div>
      ${keywordsCn ? `<p><strong>关键词：</strong>${keywordsCn}</p>` : ""}
      ${keywordsEn ? `<p><strong>Keywords:</strong> ${keywordsEn}</p>` : ""}
      <div class="citation-box">
        <strong>引用格式 / Citation</strong>
        ${article.citation_cn ? `<p>${article.citation_cn}</p>` : ""}
        ${article.citation_en ? `<p>${article.citation_en}</p>` : ""}
      </div>
    </section>
  `;
}

function renderArticleNav(articles, article, prefix = "../") {
  const index = articles.findIndex((item) => item.article_id === article.article_id);
  const previous = index > 0 ? articles[index - 1] : null;
  const next = index >= 0 && index < articles.length - 1 ? articles[index + 1] : null;
  const link = (item, label) => item ? `<a class="btn btn-light" href="${prefix}${item.url || item.href}">${label}：${item.title_cn || item.title_en}</a>` : "";
  return `
    <nav class="article-nav">
      ${link(previous, "上一篇")}
      <a class="btn" href="${prefix}issues.html">返回本期目录</a>
      ${link(next, "下一篇")}
    </nav>
  `;
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

  const metaTargets = document.querySelectorAll("[data-article-meta]");
  const navTargets = document.querySelectorAll("[data-article-nav]");
  if (metaTargets.length || navTargets.length) {
    const source = (metaTargets[0] && metaTargets[0].dataset.source) || (navTargets[0] && navTargets[0].dataset.source) || "../data/articles.json";
    const articles = await readJson(source, []);
    const article = currentArticle(articles);
    if (article) {
      metaTargets.forEach((target) => { target.innerHTML = renderArticleMeta(article); });
      navTargets.forEach((target) => { target.innerHTML = renderArticleNav(articles, article, target.dataset.prefix || "../"); });
    }
  }
});
