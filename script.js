const target = new Date('2026-11-30T23:59:59-07:00').getTime();
const fields = { days: document.querySelector('#days'), hours: document.querySelector('#hours'), minutes: document.querySelector('#minutes'), seconds: document.querySelector('#seconds') };

function tick() {
  const remaining = Math.max(0, target - Date.now());
  const seconds = Math.floor(remaining / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  fields.days.textContent = String(days).padStart(2, '0');
  fields.hours.textContent = String(hours).padStart(2, '0');
  fields.minutes.textContent = String(minutes).padStart(2, '0');
  fields.seconds.textContent = String(secs).padStart(2, '0');
}
tick();
setInterval(tick, 1000);

const soundtrackToggle = document.querySelector('#soundtrackToggle');
const youtubePlayer = document.querySelector('#youtubePlayer');
let soundtrackPlaying = false;

function sendYouTubeCommand(command) {
  youtubePlayer.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: command, args: [] }), '*');
}

soundtrackToggle.addEventListener('click', () => {
  soundtrackPlaying = !soundtrackPlaying;
  sendYouTubeCommand(soundtrackPlaying ? 'playVideo' : 'pauseVideo');
  soundtrackToggle.classList.toggle('is-playing', soundtrackPlaying);
  soundtrackToggle.setAttribute('aria-pressed', String(soundtrackPlaying));
  soundtrackToggle.querySelector('.sound-label').textContent = soundtrackPlaying ? 'Pausar soundtrack' : 'Activar soundtrack';
});

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.14 });
document.querySelectorAll('.section-shell, .final-cta').forEach((element) => reveal.observe(element));
