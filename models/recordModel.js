const db = require("../config/db");

exports.addRecord = (data, callback) => {
  db.query(
    "INSERT INTO records (user_id, type, amount, category) VALUES (?, ?, ?, ?)",
    [data.user_id, data.type, data.amount, data.category],
    callback
  );
};

exports.getRecords = (user_id, callback) => {
  db.query("SELECT * FROM records WHERE user_id=?", [user_id], callback);
};