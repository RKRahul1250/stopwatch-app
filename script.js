let h = 0, m = 0, s = 0, t, l = 1;
const d = (id, val) => document.getElementById(id).textContent = String(val).padStart(2, '0');
const hands = [...document.querySelectorAll('.hand')];
const lapList = document.getElementById('lap-list');

const update = () => {
  d('hours', h);
  d('minutes', m);
  d('seconds', s);

  const secDeg = (s / 60) * 360;
  const minDeg = (m / 60) * 360 + (s / 60) * 6;
  const hourDeg = (h / 12) * 360 + (m / 60) * 30;

  hands[2].style.transform = `rotate(${secDeg}deg)`;
  hands[1].style.transform = `rotate(${minDeg}deg)`;
  hands[0].style.transform = `rotate(${hourDeg}deg)`;
};

const start = () => t = setInterval(() => {
  s++;
  if (s === 60) { s = 0; m++; }
  if (m === 60) { m = 0; h++; }
  update();
}, 1000);

const play = async (sound) => { try { await sound.play(); } catch (e) { console.error(`Error playing sound: ${sound.id}`, e); } };

const lap = () => {
  const lapTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${l++}: ${lapTime}`;
  lapList.appendChild(lapItem);
  play(lapSound);
};

document.getElementById('start').addEventListener('click', () => { clearInterval(t); start(); play(clickSound); });
document.getElementById('stop').addEventListener('click', () => { clearInterval(t); play(clickSound); });
document.getElementById('reset').addEventListener('click', () => { clearInterval(t); h = m = s = 0; l = 1; lapList.innerHTML = ''; update(); play(clickSound); });
document.getElementById('lap').addEventListener('click', () => { if (t) lap(); });

update();