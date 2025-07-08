const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage
let users = {};
let topics = [
  { id: 1, title: "Phương tiện xanh", content: "Văn nghị luận về phương tiện xanh..." },
  { id: 2, title: "Thể thao bền vững", content: "Văn nghị luận về thể thao..." },
  { id: 3, title: "Chế độ ăn chay", content: "Văn nghị luận về ăn chay..." },
  { id: 4, title: "Tái chế rác thải", content: "Văn nghị luận về tái chế..." },
  { id: 5, title: "Tiết kiệm năng lượng", content: "Văn nghị luận về tiết kiệm năng lượng..." },
  { id: 6, title: "Trồng cây xanh", content: "Văn nghị luận về trồng cây..." },
  { id: 7, title: "Sử dụng túi vải", content: "Văn nghị luận về túi vải..." },
  { id: 8, title: "Du lịch sinh thái", content: "Văn nghị luận về du lịch sinh thái..." },
  { id: 9, title: "Tiêu dùng bền vững", content: "Văn nghị luận về tiêu dùng bền vững..." },
  { id: 10, title: "Giảm khí thải", content: "Văn nghị luận về giảm khí thải..." }
];
let questions = {};
topics.forEach(t => {
  questions[t.id] = [];
  for (let i = 1; i <= 5; i++) {
    questions[t.id].push({
      id: i,
      text: `Câu hỏi ${i} về ${t.title}`,
      options: {
        a: "Đáp án A",
        b: "Đáp án B",
        c: "Đáp án C",
        d: "Đáp án D"
      },
      answer: "a"
    });
  }
});

app.use(bodyParser.json());
app.use(session({ secret: 'songxanh', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/intel.html'));
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!users[username]) {
    users[username] = { password, points: 0 };
  }
  if (users[username].password !== password) {
    return res.status(401).json({ error: "Sai mật khẩu" });
  }
  req.session.user = username;
  res.json({ success: true });
});

app.get('/api/profile', (req, res) => {
  const user = req.session.user;
  if (!user) return res.status(401).json({ error: "Chưa đăng nhập" });
  const { points } = users[user];
  const rank = Math.floor(points / 10);
  res.json({ username: user, points, rank });
});

app.post('/api/attendance', (req, res) => {
  const user = req.session.user;
  if (!user) return res.status(401).json({ error: "Chưa đăng nhập" });
  users[user].points += 1;
  const rank = Math.floor(users[user].points / 10);
  res.json({ points: users[user].points, rank });
});

app.get('/api/topics', (req, res) => {
  res.json(topics);
});

app.get('/api/questions', (req, res) => {
  const topicId = parseInt(req.query.topicId);
  res.json(questions[topicId] || []);
});

app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));