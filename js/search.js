// Search with fuzzy matching, category filtering, and date range
(function () {
  const input = document.getElementById('search-input');
  const resultsEl = document.getElementById('search-results');
  const emptyEl = document.getElementById('search-empty');
  const promptEl = document.getElementById('search-prompt');
  const categoriesEl = document.getElementById('search-categories');
  const dateSelect = document.getElementById('search-date-range');

  if (!input || !resultsEl) return;

  let index = [];
  let loaded = false;
  let activeCategory = '';
  let activeDateRange = '';

  function loadIndex() {
    if (loaded) return Promise.resolve();
    loaded = true;
    return fetch('/search-index.json')
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        index = data;
      })
      .catch(function () {
        loaded = false;
      });
  }

  // Levenshtein distance for fuzzy matching
  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        }
      }
    }
    return matrix[b.length][a.length];
  }

  // Check if a term fuzzy-matches any word in the text
  function fuzzyMatch(term, text) {
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      const word = words[i].replace(/[^a-z0-9]/g, '');
      if (word.length === 0) continue;

      // Exact substring match
      if (word.indexOf(term) !== -1) return 2;

      // Fuzzy match — allow distance based on term length
      const maxDist = term.length <= 3 ? 0 : term.length <= 5 ? 1 : 2;
      if (Math.abs(word.length - term.length) <= maxDist) {
        if (levenshtein(term, word) <= maxDist) return 1;
      }
    }
    return 0;
  }

  function filterByDate(post) {
    if (!activeDateRange) return true;
    const days = parseInt(activeDateRange, 10);
    const postDate = new Date(post.date + 'T00:00:00');
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return postDate >= cutoff;
  }

  function filterByCategory(post) {
    if (!activeCategory) return true;
    return post.category === activeCategory;
  }

  function search(query) {
    const filtered = index.filter(function (post) {
      return filterByCategory(post) && filterByDate(post);
    });

    // No text query — show all filtered posts sorted by date
    if (query.length < 2) {
      if (activeCategory || activeDateRange) {
        if (filtered.length === 0) {
          resultsEl.innerHTML = '';
          if (emptyEl) emptyEl.hidden = false;
          if (promptEl) promptEl.hidden = true;
          return;
        }
        if (emptyEl) emptyEl.hidden = true;
        if (promptEl) promptEl.hidden = true;
        const sorted = filtered.slice().sort(function (a, b) {
          return b.date.localeCompare(a.date);
        });
        resultsEl.innerHTML = sorted
          .map(function (post) {
            return renderPost(post, []);
          })
          .join('');
        return;
      }

      resultsEl.innerHTML = '';
      if (emptyEl) emptyEl.hidden = true;
      if (promptEl) promptEl.hidden = !query.length;
      return;
    }

    if (promptEl) promptEl.hidden = true;

    const terms = query.split(/\s+/);
    const scored = filtered
      .map(function (post) {
        const titleLower = post.title.toLowerCase();
        const haystack = (post.title + ' ' + post.excerpt + ' ' + post.category).toLowerCase();
        let score = 0;

        for (let i = 0; i < terms.length; i++) {
          const term = terms[i];

          // Exact substring in full text
          if (haystack.indexOf(term) !== -1) {
            score += 2;
          } else {
            // Fuzzy match against individual words
            const fuzzy = fuzzyMatch(term, haystack);
            if (fuzzy > 0) score += fuzzy;
          }

          // Title bonus for exact match
          if (titleLower.indexOf(term) !== -1) {
            score += 3;
          }
        }

        return { post: post, score: score };
      })
      .filter(function (s) {
        return s.score > 0;
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });

    if (scored.length === 0) {
      resultsEl.innerHTML = '';
      if (emptyEl) emptyEl.hidden = false;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;

    resultsEl.innerHTML = scored
      .map(function (s) {
        return renderPost(s.post, terms);
      })
      .join('');
  }

  function renderPost(post, terms) {
    const title = terms.length ? highlight(post.title, terms) : escapeHtml(post.title);
    const excerpt = terms.length ? highlight(post.excerpt, terms) : escapeHtml(post.excerpt);

    return (
      '<article class="post-item">' +
      '<span class="post-topic">' +
      escapeHtml(post.category) +
      '</span>' +
      '<h3 class="post-title">' +
      '<a href="' +
      post.url +
      '">' +
      title +
      '</a>' +
      '</h3>' +
      '<p class="post-excerpt">' +
      excerpt +
      '</p>' +
      '<div class="post-meta">' +
      '<time class="post-date">' +
      formatDate(post.date) +
      '</time>' +
      '</div>' +
      '</article>'
    );
  }

  function highlight(text, terms) {
    let result = escapeHtml(text);
    for (let i = 0; i < terms.length; i++) {
      const regex = new RegExp('(' + escapeRegex(terms[i]) + ')', 'gi');
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

  function updateUrl() {
    const params = new URLSearchParams();
    const q = input.value.trim();
    if (q) params.set('q', q);
    if (activeCategory) params.set('cat', activeCategory);
    if (activeDateRange) params.set('range', activeDateRange);
    const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState(null, '', newUrl);
  }

  function runSearch() {
    const query = input.value.trim().toLowerCase();
    search(query);
    updateUrl();
  }

  // Category pill clicks
  if (categoriesEl) {
    categoriesEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.search-filter-pill');
      if (!btn) return;

      const pills = categoriesEl.querySelectorAll('.search-filter-pill');
      for (let i = 0; i < pills.length; i++) {
        pills[i].classList.remove('active');
      }
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      runSearch();
    });
  }

  // Date range select
  if (dateSelect) {
    dateSelect.addEventListener('change', function () {
      activeDateRange = dateSelect.value;
      runSearch();
    });
  }

  // Live search as user types
  input.addEventListener('input', function () {
    runSearch();
  });

  // Read params from URL on page load
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q') || '';
  const initialCat = params.get('cat') || '';
  const initialRange = params.get('range') || '';

  input.value = initialQuery;
  activeCategory = initialCat;
  activeDateRange = initialRange;

  // Set active pill from URL
  if (initialCat && categoriesEl) {
    const pills = categoriesEl.querySelectorAll('.search-filter-pill');
    for (let i = 0; i < pills.length; i++) {
      pills[i].classList.remove('active');
      if (pills[i].getAttribute('data-category') === initialCat) {
        pills[i].classList.add('active');
      }
    }
  }

  // Set date select from URL
  if (initialRange && dateSelect) {
    dateSelect.value = initialRange;
  }

  loadIndex().then(function () {
    runSearch();
  });
})();
