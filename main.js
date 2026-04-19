// HIT-1.0 Spec Site — Main JS (animations, nav, scroll effects)
(function() {
  // ── Intersection Observer fade-in ────────────────────────────────────────────
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.fade-in').forEach(function(el) {
    observer.observe(el);
  });

  // ── Phase hover ──────────────────────────────────────────────────────────────
  document.querySelectorAll('.phase').forEach(function(phase) {
    phase.addEventListener('mouseenter', function() {
      document.querySelectorAll('.phase').forEach(function(p) { p.classList.remove('active'); });
      phase.classList.add('active');
    });
  });

  // ── Smooth active nav link tracking ─────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(function(s) {
      if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
    });
    navLinks.forEach(function(link) {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--text-primary)' : '';
    });
    // Nav blur on scroll
    const nav = document.getElementById('main-nav');
    if (nav) nav.style.background = window.scrollY > 50
      ? 'rgba(6,10,18,0.98)' : 'rgba(6,10,18,0.85)';
  });

  // ── Tree node tooltips ───────────────────────────────────────────────────────
  document.querySelectorAll('.tree-node').forEach(function(node) {
    node.style.cursor = 'pointer';
    node.addEventListener('mouseenter', function() {
      const label = node.getAttribute('data-label');
      const role  = node.getAttribute('data-role');
      if (label && role) {
        const tip = document.createElement('div');
        tip.id = 'hit-tooltip';
        tip.style.cssText = 'position:fixed;background:#0D1426;border:1px solid rgba(124,58,237,0.4);border-radius:8px;padding:8px 14px;font-family:JetBrains Mono,monospace;font-size:12px;color:#F1F5F9;z-index:9999;pointer-events:none;box-shadow:0 8px 32px rgba(0,0,0,0.4);';
        tip.innerHTML = '<span style="color:#A78BFA">' + label + '</span><br><span style="color:#64748B">role: </span><span style="color:#06B6D4">' + role + '</span>';
        document.body.appendChild(tip);
        node.addEventListener('mousemove', function(e) {
          if (tip) { tip.style.left = (e.clientX + 14) + 'px'; tip.style.top = (e.clientY - 10) + 'px'; }
        });
      }
    });
    node.addEventListener('mouseleave', function() {
      const tip = document.getElementById('hit-tooltip');
      if (tip) tip.remove();
    });
  });

})();
