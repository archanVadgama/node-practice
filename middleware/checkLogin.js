const { getToken } = require("../services/auth");
const fs = require("fs");
const FILE_PATH = "logs/users.json";

const readJSON = (callback, res) => {
  fs.readFile(FILE_PATH, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    callback(JSON.parse(data));
  });
};

function checkLogin(req, res, next) {
  if (!req.cookies?.userToken) {
    res.send(`
        <html>
          <body>
            <h2>Not Logged In.</h2> <h4>Redirecting to login page in <span id="countdown">3</span> seconds...</h4>
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
  } else {
    let token = getToken(req.cookies.userToken);

    if (!token.status) {
      res.end(`<h1>${token.msg}</h1>`);
    }
    let decodeUserId = parseInt(atob(token.msg.user_id));

    readJSON((users) => {
      const user = users.find((user) => user.id == decodeUserId);
      if (!user) return res.redirect("/");

      next();
    }, res);
  }
}

module.exports = { checkLogin };
