const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "NMS@123nms#456",
  database: "finance_db"
});

db.connect((err) => {
  if (err) {
    console.log("DB Error", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;