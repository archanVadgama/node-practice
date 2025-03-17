const express = require('express');
const router = express.Router();
const { readJSON, writeJSON } = require('../services/fileHandling');
const { checkLogin } = require('../middleware/checkLogin')

router.get("/statics", checkLogin, (req, res) => {
  readJSON((users) => {
    const deletedUsers = users.filter(user => user.isDeleted).length;
    res.sendFile('/dashboard.html', { root: 'views' });
    res.json({ totalUsers: users.length, activeUsers: users.length - deletedUsers, deletedUsers });

  }, res);
});

router.get("/all-user", (req, res) => {
  readJSON(users => res.json(users), res);
});

router.get("/find-user/:id", (req, res) => {
  readJSON((users) => {
    const user = users.find(user => user.id == req.params.id);
    res.json(user || { error: "User not found" });
  }, res);
});

router.post("/add-user", (req, res) => {
  console.log("req.body");
  console.log(req.body);
  readJSON((users) => {
    const newUser = { id: users.length + 1, ...req.body, isDeleted: false };
    writeJSON([...users, newUser], res, "New User Added");
  }, res);
});

router.put("/edit-user/:id", (req, res) => {
  readJSON((users) => {
    const user = users.find(user => user.id == req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    Object.assign(user, req.body); 
    writeJSON(users, res, "User Updated");
  }, res);
});

router.delete("/delete-user/:id", (req, res) => {
  readJSON((users) => {
    const user = users.find(user => user.id == req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isDeleted = !user.isDeleted ?  true : false
    writeJSON(users, res, !user.isDeleted ? "User Deleted" : "User Restored");
  }, res);
});

module.exports = router;