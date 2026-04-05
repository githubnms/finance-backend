const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// DB CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "NMS@123nms#456", // your mysql password
  database: "finance_db"
});

db.connect(err => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// JWT SECRET
const SECRET = "mysecretkey";


// ================= AUTH MIDDLEWARE =================
const auth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


// ================= REGISTER =================
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [name, email, hashed],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User Registered" });
    }
  );
});


// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0)
        return res.status(400).json({ message: "User not found" });

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ message: "Wrong password" });

      const token = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: "1h"
      });

      res.json({ token });
    }
  );
});


// ================= ADD RECORD =================
app.post("/add", auth, (req, res) => {
  const { type, amount, category } = req.body;

  db.query(
    "INSERT INTO records (user_id,type,amount,category) VALUES (?,?,?,?)",
    [req.user.id, type, amount, category],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Record Added" });
    }
  );
});


// ================= DASHBOARD =================
app.get("/dashboard", auth, (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT 
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS total_expense
     FROM records WHERE user_id=?`,
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching dashboard" });
      }

      res.json(result[0]);
    }
  );
});


// ================= START SERVER =================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});