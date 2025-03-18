const express = require("express");
const { setToken } = require("../services/auth");
const cookieParser = require("cookie-parser");
const { checkLogin } = require("../middleware/checkLogin");
const { readJSON, writeJSON } = require("../services/fileHandling");
const userApi = require("./userApi");

const app = express();

// middleware
app.use(express.urlencoded({ extended: true })); // to get data from the html form
app.use(express.json()); // to get data from the postman json body
app.use(cookieParser());


app.get("/", (req, res) => {
  res.sendFile("/index.html", { root: "views" });
});

app.post("/", (req, res) => {
  const { username, password } = req.body;

  if (!username && !password) return res.redirect("/");

  readJSON((users) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      res.cookie("userToken", setToken({ user_id: btoa(user.id) }));
      res.redirect("/dashboard");
    } else {
      res.redirect("/");
    }
  }, res);
});

app.get("/signup", (req, res) => {
  res.sendFile("/signup.html", { root: "views" });
});

app.post("/signup", (req, res) => {
  readJSON((users) => {
    const newUser = { id: users.length + 1, ...req.body, isAdmin: false, isDeleted: false };
    writeJSON([...users, newUser], res, "New User Added");
  }, res);
  res.send(`
    <html>
      <body>
        <h2>Sign Up Successfully.</h2> <h4>Redirecting to login page in <span id="countdown">3</span> seconds...</h4>
        <script>
          let countdown = 4;
          const countdownElement = document.getElementById('countdown');
          const interval = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;
            if (countdown === 0) {
              clearInterval(interval);
              window.location.href = '/';
            }
          }, 1000);
        </script>
      </body>
    </html>
  `);
});

app.use(checkLogin)
app.use("/api", userApi); // userApi routes with the /api prefix

app.get("/dashboard", checkLogin, (req, res) => {
  res.sendFile("/dashboard.html", { root: "views" });
});

app.get("/all-user", checkLogin, (req, res) => {
  res.sendFile("/allUsers.html", { root: "views" });
});

app.get("/add-user", checkLogin, (req, res) => {
  res.sendFile("/addUser.html", { root: "views" });
});

app.get("/edit-user/:id", checkLogin, (req, res) => {
  res.sendFile("/editUser.html", { root: "views" });
});

app.get("/logout", (req, res) => {
  res.clearCookie("userToken");
  res.send(`
      <html>
        <body>
          <h2>Logged Out Successfully.</h2> <h4>Redirecting to login page in <span id="countdown">3</span> seconds...</h4>
          <script>
            let countdown = 4;
            const countdownElement = document.getElementById('countdown');
            const interval = setInterval(() => {
              countdown--;
              countdownElement.textContent = countdown;
              if (countdown === 0) {
                clearInterval(interval);
                window.location.href = '/';
              }
            }, 1000);
          </script>
        </body>
      </html>
    `);
});

app.listen(8000, () => console.log("Server running on http://localhost:8000"));
