const fs = require('fs');

const FILE_PATH = "logs/users.json";

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


module.exports = { readJSON, writeJSON };