async function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const res = await fetch('/api/login', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username:user,password:pass})});
  if (res.ok) { showScreen('home'); loadProfile(); } else alert('Đăng nhập thất bại');
}

async function loadProfile() {
  const p = await (await fetch('/api/profile')).json();
  document.getElementById('user-name').innerText = p.username;
  document.getElementById('points').innerText = p.points;
  document.getElementById('streak').innerText = p.streak;
  document.getElementById('streak-stat').innerText = p.streak;
}

async function doAttendance() {
  const r = await (await fetch('/api/attendance',{method:'POST'})).json();
  document.getElementById('points').innerText = r.points;
  document.getElementById('streak').innerText = r.streak;
  document.getElementById('streak-stat').innerText = r.streak;
}

function showScreen(id) {
  ['home','behaviors','stats','settings'].forEach(s=> document.getElementById(s).classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  if (id==='behaviors') loadBehaviors();
}

async function loadBehaviors() {
  const bs = await (await fetch('/api/behaviors')).json();
  const container = document.getElementById('beh-list');
  container.innerHTML = '';
  bs.forEach((b,i)=> {
    const div = document.createElement('div');
    div.innerHTML = `<label><input type="checkbox" value="${i}"> ${b}</label>`;
    container.appendChild(div);
  });
}

async function saveBehaviors() {
  await fetch('/api/saveBehaviors',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({})});
  alert('Đã lưu hành vi');
}