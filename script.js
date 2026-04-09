'use strict';

const pad = n => String(n).padStart(2, '0');

const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

const boxH     = document.getElementById('box-h');
const boxM     = document.getElementById('box-m');
const dateLine = document.getElementById('date-line');

function tick() {
  const now  = new Date();
  const h    = now.getHours() % 12 || 12;
  const m    = now.getMinutes();

  boxH.textContent = pad(h);
  boxM.textContent = pad(m);

  // Date: DD/MM/YYYY - DAY
  const dd   = pad(now.getDate());
  const mm   = pad(now.getMonth() + 1);
  const yyyy = now.getFullYear();
  const day  = DAYS[now.getDay()];
  dateLine.textContent = `${dd}/${mm}/${yyyy}  —  ${day}`;
}

tick();
setInterval(tick, 1000);

// Keep screen on
if ('wakeLock' in navigator) {
  const lock = () => navigator.wakeLock.request('screen').catch(() => {});
  lock();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') lock();
  });
}


if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
