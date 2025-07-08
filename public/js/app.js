async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/api/login', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({username, password})
  });
  if (res.ok) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    init();
  } else {
    alert('Đăng nhập thất bại');
  }
}

async function init() {
  const profile = await (await fetch('/api/profile')).json();
  document.getElementById('user').innerText = profile.username;
  document.getElementById('points').innerText = profile.points;
  document.getElementById('rank').innerText = profile.rank;
  const topics = await (await fetch('/api/topics')).json();
  const ul = document.getElementById('topics');
  ul.innerHTML = '';
  topics.forEach(t => {
    const li = document.createElement('li');
    li.innerText = t.title;
    li.onclick = () => loadQuestions(t.id);
    ul.appendChild(li);
  });
}

async function markAttendance() {
  const res = await fetch('/api/attendance', {method: 'POST'});
  const data = await res.json();
  document.getElementById('points').innerText = data.points;
  document.getElementById('rank').innerText = data.rank;
}

async function loadQuestions(topicId) {
  const qs = await (await fetch(`/api/questions?topicId=${topicId}`)).json();
  const div = document.getElementById('questions');
  div.innerHTML = '';
  qs.forEach(q => {
    const p = document.createElement('p');
    p.innerText = q.text;
    div.appendChild(p);
    for (let opt in q.options) {
      const btn = document.createElement('button');
      btn.innerText = `${opt.toUpperCase()}: ${q.options[opt]}`;
      div.appendChild(btn);
    }
  });
}

function logout() {
  location.reload();
}