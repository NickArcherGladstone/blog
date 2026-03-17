// Inline search panel with fuzzy matching and category filtering
(function () {
  let panel = null;
  let panelInner = null;
  let input = null;
  let resultsEl = null;
  let emptyEl = null;
  let hintEl = null;
  let footerEl = null;
  let categoriesEl = null;
  let index = [];
  let loaded = false;
  let activeCategory = '';
  let highlightIndex = -1;
  let isOpen = false;

  function getBasePath() {
    return window.location.pathname.indexOf('/posts/') !== -1 ? '../' : '';
  }

  function getSearchPageUrl() {
    const q = input ? input.value.trim() : '';
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (activeCategory) params.set('cat', activeCategory);
    const base = getBasePath();
    return base + 'search.html' + (params.toString() ? '?' + params.toString() : '');
  }

  function buildPanel() {
    if (panel) return;

    panel = document.createElement('div');
    panel.className = 'search-panel';
    panel.setAttribute('aria-label', 'Search');

    panelInner = document.createElement('div');
    panelInner.className = 'search-panel-inner';
    panelInner.innerHTML =
      '<div class="search-panel-header">' +
      '<div class="search-input-wrap">' +
      '<svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '<input type="text" id="search-panel-input" placeholder="Search articles..." autocomplete="off" />' +
      '</div>' +
      '</div>' +
      '<div class="search-panel-categories">' +
      '<button type="button" class="pill active" data-category="">All</button>' +
      '<button type="button" class="pill" data-category="Politics">Politics</button>' +
      '<button type="button" class="pill" data-category="Markets">Markets</button>' +
      '<button type="button" class="pill" data-category="News">News</button>' +
      '<button type="button" class="pill" data-category="Sports">Sports</button>' +
      '<button type="button" class="pill" data-category="Food">Food</button>' +
      '<button type="button" class="pill" data-category="Podcast">Podcast</button>' +
      '</div>' +
      '<div class="search-panel-results"></div>' +
      '<p class="search-panel-empty empty-state" hidden>No results found.</p>' +
      '<p class="search-panel-hint empty-state">Start typing to search all articles.</p>' +
      '<div class="search-panel-footer" hidden>' +
      '<a class="search-panel-see-all" href="/search.html">' +
      'See all results' +
      '<svg class="icon" viewBox="0 0 24 24" width="14" height="14"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
      '</a>' +
      '<span class="search-panel-hint-keys">' +
      '<kbd>\u2191</kbd><kbd>\u2193</kbd> to navigate ' +
      '<kbd>\u21B5</kbd> to select' +
      '</span>' +
      '</div>';

    panel.appendChild(panelInner);

    // Insert after header, before main
    const header = document.querySelector('.site-header');
    if (header && header.nextSibling) {
      header.parentNode.insertBefore(panel, header.nextSibling);
    } else {
      document.body.appendChild(panel);
    }

    input = panel.querySelector('#search-panel-input');
    resultsEl = panel.querySelector('.search-panel-results');
    emptyEl = panel.querySelector('.search-panel-empty');
    hintEl = panel.querySelector('.search-panel-hint');
    footerEl = panel.querySelector('.search-panel-footer');
    categoriesEl = panel.querySelector('.search-panel-categories');

    // Category pills
    categoriesEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.pill');
      if (!btn) return;

      const pills = categoriesEl.querySelectorAll('.pill');
      for (let i = 0; i < pills.length; i++) {
        pills[i].classList.remove('active');
      }
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      highlightIndex = -1;
      runSearch();
    });

    // Live search — reset highlight on new input
    input.addEventListener('input', function () {
      highlightIndex = -1;
      runSearch();
    });

    // Keyboard navigation
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closePanel();
        return;
      }

      const items = resultsEl.querySelectorAll('.search-result-item');

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (items.length === 0) return;
        highlightIndex = Math.min(highlightIndex + 1, items.length - 1);
        updateHighlight(items);
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (items.length === 0) return;
        highlightIndex = Math.max(highlightIndex - 1, -1);
        updateHighlight(items);
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < items.length) {
          window.location.href = items[highlightIndex].getAttribute('href');
        } else {
          window.location.href = getSearchPageUrl();
        }
      }
    });
  }

  function updateHighlight(items) {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.toggle('highlighted', i === highlightIndex);
    }
    if (highlightIndex >= 0 && items[highlightIndex]) {
      items[highlightIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  function loadIndex() {
    if (loaded) return Promise.resolve();
    loaded = true;
    const base = getBasePath();
    return fetch(base + 'search-index.json')
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

  function openPanel() {
    if (isOpen) {
      input.focus();
      return;
    }
    buildPanel();
    loadIndex().then(function () {
      isOpen = true;
      input.value = '';
      activeCategory = '';
      highlightIndex = -1;
      resultsEl.innerHTML = '';
      if (emptyEl) emptyEl.hidden = true;
      if (hintEl) hintEl.hidden = false;
      if (footerEl) footerEl.hidden = true;

      // Reset pills
      const pills = categoriesEl.querySelectorAll('.pill');
      for (let i = 0; i < pills.length; i++) {
        pills[i].classList.remove('active');
      }
      if (pills[0]) pills[0].classList.add('active');

      panel.classList.add('open');
      const topicBar = document.querySelector('.topic-bar');
      if (topicBar) topicBar.style.display = 'none';
      input.focus();
    });
  }

  function closePanel() {
    if (!panel || !isOpen) return;
    isOpen = false;
    panel.classList.remove('open');
    const topicBar = document.querySelector('.topic-bar');
    if (topicBar) topicBar.style.display = '';
  }

  function runSearch() {
    const query = input.value.trim().toLowerCase();
    const filtered = index.filter(function (post) {
      if (!activeCategory) return true;
      return post.category === activeCategory;
    });

    if (query.length < 2) {
      if (activeCategory) {
        if (filtered.length === 0) {
          resultsEl.innerHTML = '';
          emptyEl.hidden = false;
          hintEl.hidden = true;
          footerEl.hidden = true;

          return;
        }
        emptyEl.hidden = true;
        hintEl.hidden = true;
        const sorted = filtered.slice().sort(function (a, b) {
          return b.date.localeCompare(a.date);
        });
        resultsEl.innerHTML = sorted
          .map(function (post) {
            return renderPost(post, []);
          })
          .join('');
        updateFooter();

        return;
      }
      resultsEl.innerHTML = '';
      emptyEl.hidden = true;
      hintEl.hidden = false;
      footerEl.hidden = true;

      return;
    }

    hintEl.hidden = true;

    const terms = query.split(/\s+/);
    const scored = filtered
      .map(function (post) {
        const titleLower = post.title.toLowerCase();
        const haystack = (post.title + ' ' + post.excerpt + ' ' + post.category).toLowerCase();
        let score = 0;

        for (let i = 0; i < terms.length; i++) {
          const term = terms[i];
          if (haystack.indexOf(term) !== -1) {
            score += 2;
          } else {
            const fuzzy = fuzzyMatch(term, haystack);
            if (fuzzy > 0) score += fuzzy;
          }
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
      emptyEl.hidden = false;
      footerEl.hidden = true;

      return;
    }

    emptyEl.hidden = true;
    resultsEl.innerHTML = scored
      .map(function (s) {
        return renderPost(s.post, terms);
      })
      .join('');
    updateFooter();
  }

  function updateFooter() {
    const link = footerEl.querySelector('.search-panel-see-all');
    link.href = getSearchPageUrl();
    footerEl.hidden = false;
  }

  // Levenshtein distance for fuzzy matching
  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
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

  function fuzzyMatch(term, text) {
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      const word = words[i].replace(/[^a-z0-9]/g, '');
      if (word.length === 0) continue;
      if (word.indexOf(term) !== -1) return 2;
      const maxDist = term.length <= 3 ? 0 : term.length <= 5 ? 1 : 2;
      if (Math.abs(word.length - term.length) <= maxDist) {
        if (levenshtein(term, word) <= maxDist) return 1;
      }
    }
    return 0;
  }

  function renderPost(post, terms) {
    const title = terms.length ? highlight(post.title, terms) : escapeHtml(post.title);
    const excerpt = terms.length ? highlight(post.excerpt, terms) : escapeHtml(post.excerpt);

    return (
      '<a href="' +
      post.url +
      '" class="search-result-item">' +
      '<span class="post-topic">' +
      escapeHtml(post.category) +
      '</span>' +
      '<h3 class="search-result-title">' +
      title +
      '</h3>' +
      '<p class="search-result-excerpt">' +
      excerpt +
      '</p>' +
      '<time class="search-result-date">' +
      formatDate(post.date) +
      '</time>' +
      '</a>'
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

  // Bind search toggle clicks (works with both <a> and <button>)
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.search-toggle');
    if (!btn) return;
    e.preventDefault();
    if (isOpen) {
      closePanel();
    } else {
      openPanel();
    }
  });

  // Close panel when clicking outside it
  document.addEventListener('click', function (e) {
    if (!isOpen || !panel) return;
    if (panel.contains(e.target)) return;
    if (e.target.closest('.search-toggle')) return;
    closePanel();
  });

  // Keyboard shortcut: Ctrl/Cmd+K to toggle, Escape to close
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (isOpen) {
        closePanel();
      } else {
        openPanel();
      }
    }
    if (e.key === 'Escape' && isOpen) {
      closePanel();
    }
  });

  // === Inline search page (search.html) ===
  const pageInput = document.getElementById('search-input');
  const pageResults = document.getElementById('search-results');
  const pageEmpty = document.getElementById('search-empty');
  const pagePrompt = document.getElementById('search-prompt');
  const pageCategories = document.getElementById('search-categories');
  const pageDateSelect = document.getElementById('search-date-range');

  if (pageInput && pageResults) {
    let pageCategory = '';
    let pageDateRange = '';

    function pageSearch() {
      const query = pageInput.value.trim().toLowerCase();
      const filtered = index.filter(function (post) {
        if (pageCategory && post.category !== pageCategory) return false;
        if (pageDateRange) {
          const days = parseInt(pageDateRange, 10);
          const postDate = new Date(post.date + 'T00:00:00');
          const cutoff = new Date();
          cutoff.setDate(cutoff.getDate() - days);
          if (postDate < cutoff) return false;
        }
        return true;
      });

      if (query.length < 2) {
        if (pageCategory || pageDateRange) {
          if (filtered.length === 0) {
            pageResults.innerHTML = '';
            if (pageEmpty) pageEmpty.hidden = false;
            if (pagePrompt) pagePrompt.hidden = true;
            return;
          }
          if (pageEmpty) pageEmpty.hidden = true;
          if (pagePrompt) pagePrompt.hidden = true;
          const sorted = filtered.slice().sort(function (a, b) {
            return b.date.localeCompare(a.date);
          });
          pageResults.innerHTML = sorted
            .map(function (post) {
              return renderPagePost(post, []);
            })
            .join('');
          return;
        }
        pageResults.innerHTML = '';
        if (pageEmpty) pageEmpty.hidden = true;
        if (pagePrompt) pagePrompt.hidden = !query.length;
        return;
      }

      if (pagePrompt) pagePrompt.hidden = true;

      const terms = query.split(/\s+/);
      const scored = filtered
        .map(function (post) {
          const titleLower = post.title.toLowerCase();
          const haystack = (post.title + ' ' + post.excerpt + ' ' + post.category).toLowerCase();
          let score = 0;
          for (let i = 0; i < terms.length; i++) {
            const term = terms[i];
            if (haystack.indexOf(term) !== -1) {
              score += 2;
            } else {
              const fuzzy = fuzzyMatch(term, haystack);
              if (fuzzy > 0) score += fuzzy;
            }
            if (titleLower.indexOf(term) !== -1) score += 3;
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
        pageResults.innerHTML = '';
        if (pageEmpty) pageEmpty.hidden = false;
        return;
      }

      if (pageEmpty) pageEmpty.hidden = true;
      pageResults.innerHTML = scored
        .map(function (s) {
          return renderPagePost(s.post, terms);
        })
        .join('');
    }

    function renderPagePost(post, terms) {
      const title = terms.length ? highlight(post.title, terms) : escapeHtml(post.title);
      const excerpt = terms.length ? highlight(post.excerpt, terms) : escapeHtml(post.excerpt);
      return (
        '<article class="post-item">' +
        '<span class="post-topic">' +
        escapeHtml(post.category) +
        '</span>' +
        '<h3 class="post-title"><a href="' +
        post.url +
        '">' +
        title +
        '</a></h3>' +
        '<p class="post-excerpt">' +
        excerpt +
        '</p>' +
        '<div class="post-meta"><time class="post-date">' +
        formatDate(post.date) +
        '</time></div>' +
        '</article>'
      );
    }

    function updatePageUrl() {
      const params = new URLSearchParams();
      const q = pageInput.value.trim();
      if (q) params.set('q', q);
      if (pageCategory) params.set('cat', pageCategory);
      if (pageDateRange) params.set('range', pageDateRange);
      const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.history.replaceState(null, '', newUrl);
    }

    function runPageSearch() {
      pageSearch();
      updatePageUrl();
    }

    pageInput.addEventListener('input', runPageSearch);

    if (pageCategories) {
      pageCategories.addEventListener('click', function (e) {
        const btn = e.target.closest('.pill');
        if (!btn) return;
        const pills = pageCategories.querySelectorAll('.pill');
        for (let i = 0; i < pills.length; i++) pills[i].classList.remove('active');
        btn.classList.add('active');
        pageCategory = btn.getAttribute('data-category');
        runPageSearch();
      });
    }

    if (pageDateSelect) {
      pageDateSelect.addEventListener('change', function () {
        pageDateRange = pageDateSelect.value;
        runPageSearch();
      });
    }

    // Read URL params on load
    const urlParams = new URLSearchParams(window.location.search);
    const initQ = urlParams.get('q') || '';
    const initCat = urlParams.get('cat') || '';
    const initRange = urlParams.get('range') || '';

    pageInput.value = initQ;
    pageCategory = initCat;
    pageDateRange = initRange;

    if (initCat && pageCategories) {
      const pills = pageCategories.querySelectorAll('.pill');
      for (let i = 0; i < pills.length; i++) {
        pills[i].classList.remove('active');
        if (pills[i].getAttribute('data-category') === initCat) pills[i].classList.add('active');
      }
    }

    if (initRange && pageDateSelect) pageDateSelect.value = initRange;

    loadIndex().then(function () {
      pageSearch();
    });
  }
})();
