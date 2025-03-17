const express = require('express');
const {setUser, getUser } = require('../services/auth');
const cookieParser = require("cookie-parser");
const { checkLogin } = require('../middleware/checkLogin')
const { readJSON, writeJSON } = require('../services/fileHandling');
const userApi = require('./userApi');

const app = express();

// middleware
app.use(express.urlencoded({ extended: true })); // to get data from the html form 
app.use(express.json()); // to get data from the postman json body 
app.use(cookieParser());

app.use('/api', userApi); // Use the userApi routes with the /api prefix

app.get("/signup", (req, res) => {
  res.sendFile('/signup.html', { root: 'views' });
});

app.get("/", (req, res) => {
  res.sendFile('/index.html', { root: 'views' });
});

app.post("/", (req, res) => {
  const { username, password } = req.body;

  if(!username && !password) return res.redirect('/')
    
    readJSON((users) => {
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        res.cookie('userToken',setUser({"user_id": btoa(user.id)}))
        res.redirect('/dashboard')
      } else {
        // res.status(401).json({ error: "Invalid username or password" });
        res.redirect('/')
      }
    }, res);
});

app.get("/dashboard", checkLogin, (req, res) => {
  res.sendFile('/dashboard.html', { root: 'views' });
});

app.get("/all-user", checkLogin, (req, res) => {
  res.sendFile('/allUsers.html', { root: 'views' });
});

app.get("/add-user", checkLogin, (req, res) => {
  res.sendFile('/addUser.html', { root: 'views' });
});

app.listen(8000, () => console.log('Server running on http://localhost:8000'));
