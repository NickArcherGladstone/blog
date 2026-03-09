// Search results page
(function () {
  const input = document.getElementById('search-input');
  const resultsEl = document.getElementById('search-results');
  const emptyEl = document.getElementById('search-empty');
  const promptEl = document.getElementById('search-prompt');

  if (!input || !resultsEl) return;

  let index = [];
  let loaded = false;

  function loadIndex() {
    if (loaded) return Promise.resolve();
    loaded = true;
    return fetch('/search-index.json')
      .then((r) => r.json())
      .then((data) => {
        index = data;
      })
      .catch(() => {
        loaded = false;
      });
  }

  function search(query) {
    if (query.length < 2) {
      resultsEl.innerHTML = '';
      if (emptyEl) emptyEl.hidden = true;
      if (promptEl) promptEl.hidden = !query.length;
      return;
    }

    if (promptEl) promptEl.hidden = true;

    const terms = query.split(/\s+/);
    const scored = index
      .map((post) => {
        const haystack = (post.title + ' ' + post.excerpt + ' ' + post.category).toLowerCase();
        let score = 0;
        for (const term of terms) {
          if (haystack.includes(term)) score++;
        }
        const titleLower = post.title.toLowerCase();
        for (const term of terms) {
          if (titleLower.includes(term)) score += 2;
        }
        return { post, score };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length === 0) {
      resultsEl.innerHTML = '';
      if (emptyEl) emptyEl.hidden = false;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;

    resultsEl.innerHTML = scored
      .map(
        ({ post }) => `
        <article class="post-item">
          <span class="post-topic">${escapeHtml(post.category)}</span>
          <h3 class="post-title">
            <a href="${post.url}">${highlight(post.title, terms)}</a>
          </h3>
          <p class="post-excerpt">${highlight(post.excerpt, terms)}</p>
          <div class="post-meta">
            <time class="post-date">${formatDate(post.date)}</time>
          </div>
        </article>
      `,
      )
      .join('');
  }

  function highlight(text, terms) {
    let result = escapeHtml(text);
    for (const term of terms) {
      const regex = new RegExp('(' + escapeRegex(term) + ')', 'gi');
      result = result.replace(regex, '<mark>$1</mark>');
    }
    return result;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // Read query from URL on page load
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q') || '';
  input.value = initialQuery;

  loadIndex().then(() => {
    if (initialQuery) {
      search(initialQuery.trim().toLowerCase());
    }
  });

  // Live search as user types
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    search(query);
  });
})();
