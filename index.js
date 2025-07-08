const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage
let users = {};
let topics = []; // unused
let behaviors = [
  "Mang chai nước cá nhân",
  "Tắt điện khi ra khỏi phòng",
  "Phân loại rác đúng cách",
  "Không dùng ống hút nhựa",
  "Đi học bằng xe đạp/đôi bồ"
];

app.use(bodyParser.json());
app.use(session({ secret: 'songxanh', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!users[username]) users[username] = { password, points: 0, streak: 0, lastDate: null };
  if (users[username].password !== password) return res.status(401).json({ error: "Sai mật khẩu" });
  req.session.user = username;
  res.json({ success: true });
});

app.get('/api/profile', (req, res) => {
  const u = req.session.user;
  if (!u) return res.status(401).json({ error: "Chưa đăng nhập" });
  const { points, streak } = users[u];
  res.json({ username: u, points, streak });
});

app.post('/api/attendance', (req, res) => {
  const u = req.session.user;
  if (!u) return res.status(401).json({ error: "Chưa đăng nhập" });
  users[u].points += 1;
  // simple streak
  users[u].streak += 1;
  res.json({ points: users[u].points, streak: users[u].streak });
});

app.get('/api/behaviors', (req, res) => {
  res.json(behaviors);
});

app.post('/api/saveBehaviors', (req, res) => {
  // dummy
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server chạy http://localhost:${PORT}`));