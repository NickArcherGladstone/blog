// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// Homepage topic filter bar
const topicBar = document.getElementById('topic-bar');

if (topicBar) {
  topicBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.topic-tag');
    if (!btn) return;

    const tags = topicBar.querySelectorAll('.topic-tag');
    tags.forEach((tag) => tag.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-category');
    const posts = document.querySelectorAll('.recent-posts .post-item');

    posts.forEach((post) => {
      if (!category) {
        post.style.display = '';
        return;
      }
      const topic = post.querySelector('.post-topic');
      const match = topic && topic.textContent.trim() === category;
      post.style.display = match ? '' : 'none';
    });
  });
}
