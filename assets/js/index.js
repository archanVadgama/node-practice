const express = require('express');
const fs = require('fs');
const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const FILE_PATH = "assets/users.json";

const readJSON = (callback, res) => {
  fs.readFile(FILE_PATH, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    callback(JSON.parse(data));
  });
};

const writeJSON = (data, res, message) => {
  fs.writeFile(FILE_PATH, JSON.stringify(data), (err) => {
    if (err) return res.status(500).json({ error: "Server Error" });
    res.json({ message });
  });
};

app.get("/", (req, res) => {
  readJSON((users) => {
    const deletedUsers = users.filter(user => user.isDeleted).length;
    res.json({ totalUsers: users.length, activeUsers: users.length - deletedUsers, deletedUsers });
  }, res);
});

app.get("/all-user", (req, res) => {
  readJSON(users => res.json(users), res);
});

app.get("/find-user/:id", (req, res) => {
  readJSON((users) => {
    const user = users.find(user => user.id == req.params.id);
    res.json(user || { error: "User not found" });
  }, res);
});

app.post("/add-user", (req, res) => {
  readJSON((users) => {
    const newUser = { id: users.length + 1, ...req.body, isDeleted: false };
    writeJSON([...users, newUser], res, "New User Added");
  }, res);
});

app.put("/edit-user/:id", (req, res) => {
  readJSON((users) => {
    const user = users.find(user => user.id == req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    Object.assign(user, req.body); 
    writeJSON(users, res, "User Updated");
  }, res);
});

app.delete("/delete-user/:id", (req, res) => {
  readJSON((users) => {
    const user = users.find(user => user.id == req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isDeleted = true;
    writeJSON(users, res, "User Deleted");
  }, res);
});

app.listen(8000, () => console.log('Server running on http://localhost:8000'));
