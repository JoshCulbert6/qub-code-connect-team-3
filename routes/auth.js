var express = require('express');
var router = express.Router();

router.get("/login", (req, res) => {
  res.render('login');
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render('login', { error: "Enter email and password" });
  }

  const users = [
    { id: 1, email: 'admin@test.com', password: '123', role: 'admin' },
    { id: 2, email: 'emp@test.com', password: '123', role: 'employee' }
  ];

  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    return res.render('login', { error: "Invalid email or password" });
  }

  req.session.user = user;
console.log("LOGIN USER:", req.session.user);
  if (user.role === 'admin') return res.redirect('/');
  if (user.role === 'employee') return res.redirect('/employees');

  return res.render('login', { error: 'User role is not configured' });
});

module.exports = router;