// Shooting stars background
const starsBg = document.getElementById('starsBg');
if (starsBg) {
  // Static twinkling stars
  for (let i = 0; i < 60; i++) {
    const t = document.createElement('div');
    t.className = 'twinkle';
    t.style.top = `${Math.random() * 100}%`;
    t.style.left = `${Math.random() * 100}%`;
    t.style.animationDuration = `${2 + Math.random() * 4}s`;
    t.style.animationDelay = `${Math.random() * 5}s`;
    starsBg.appendChild(t);
  }

  // Shooting stars, spawned periodically
  function spawnShootingStar() {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.top = `${Math.random() * 50}%`;
    s.style.left = `${50 + Math.random() * 50}%`;
    s.style.animationDuration = `${2.5 + Math.random() * 2}s`;
    starsBg.appendChild(s);
    setTimeout(() => s.remove(), 5000);
  }
  setInterval(spawnShootingStar, 1800);
  spawnShootingStar();
}

for(let i=0; i<15; i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left:${Math.random()*100}vw;
      width:${2+Math.random()*4}px;
      height:${2+Math.random()*4}px;
      background:${Math.random()>0.5?'#7c4dff':'#f0c040'};
      animation-duration:${8+Math.random()*12}s;
      animation-delay:${Math.random()*10}s;
    `;
    document.body.appendChild(p);
}

// Smooth scroll highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#'+e.target.id ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ── Custom cursor (glowing dot + trailing ring, follows the mouse)
const cur = document.getElementById('cur');
const trail = document.getElementById('cur-trail');
if (cur && trail && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });
  (function loop() {
    tx += (mx - tx) * 0.13;
    ty += (my - ty) * 0.13;
    trail.style.left = tx + 'px'; trail.style.top = ty + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('hover'); trail.style.opacity = '0'; });
    el.addEventListener('mouseleave', () => { cur.classList.remove('hover'); trail.style.opacity = '1'; });
  });
}

// Scroll reveal: fade + rise elements marked with class "r" into view
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.r').forEach(el => revealObserver.observe(el));

// Hero content reveals immediately (staggered) since it's above the fold
setTimeout(() => {
  document.querySelectorAll('.hero .r').forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), i * 120);
  });
}, 80);