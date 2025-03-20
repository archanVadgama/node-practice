const express = require("express");
const router = express.Router();
const { readJSON, writeJSON } = require("../services/fileHandling");
const { addOrSignupSchema, editUserSchema } = require("../services/validationSchema");
const { checkSchema, validationResult } = require("express-validator");

router.get("/statics", (req, res) => {
  readJSON((users) => {
    const deletedUsers = users.filter((user) => user.isDeleted).length;
    res.sendFile("/dashboard.html", { root: "views" });
    res.json({
      totalUsers: users.length,
      activeUsers: users.length - deletedUsers,
      deletedUsers,
    });
  }, res);
});

router.get("/all-user", (req, res) => {
  readJSON((users) => res.json(users), res);
});

router.get("/find-user/:id", (req, res) => {
  readJSON((users) => {
    const user = users.find((user) => user.id == req.params.id);
    res.json(user || { error: "User not found" });
  }, res);
});

router.post("/add-user", checkSchema(addOrSignupSchema), (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json(result.formatWith((msg) => msg.msg).mapped());
  }
  readJSON((users) => {
    const newUser = {
      id: users.length + 1,
      ...req.body,
      isAdmin: false,
      isDeleted: false,
    };
    writeJSON([...users, newUser], res, "New User Added");
  }, res);
});

router.put("/edit-user/:id", checkSchema(editUserSchema), (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json(result.formatWith((msg) => msg.msg).mapped());
  }
  readJSON((users) => {
    const user = users.find((user) => user.id == req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    Object.assign(user, req.body);
    writeJSON(users, res, "User Updated");
  }, res);
});

router.delete("/delete-user/:id", (req, res) => {
  readJSON((users) => {
    const user = users.find((user) => user.id == req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isDeleted = !user.isDeleted ? true : false;
    writeJSON(users, res, !user.isDeleted ? "User Deleted" : "User Restored");
  }, res);
});

router.delete("/hard-delete-user/:id", (req, res) => {
  readJSON((users) => {
    const userIndex = users.findIndex((user) => user.id == req.params.id);
    if (userIndex === -1)
      return res.status(404).json({ error: "User not found" });

    users.splice(userIndex, 1); // Remove the user from the array
    writeJSON(users, res, "User Permanently Deleted");
  }, res);
});

module.exports = router;
