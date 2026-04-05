const db = require("../config/db");

exports.createUser = (data, callback) => {
  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [data.name, data.email, data.password],
    callback
  );
};

exports.findUserByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email=?", [email], callback);
};