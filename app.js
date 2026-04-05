const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "mysecretkey";

// ================= DB =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "NMS@123nms#456",
  database: "finance_db"
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("MySQL Connected");
});

// ================= AUTH =================
const auth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ================= ROLE =================
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [name, email, hashed, role || "viewer"],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User Registered" });
    }
  );
});

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = result[0];

    if (user.status === "inactive")
      return res.status(403).json({ message: "User inactive" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  });
});

// ================= ADD RECORD =================
app.post("/add", auth, checkRole(["admin"]), (req, res) => {
  const { type, amount, category, note } = req.body;

  if (!type || !amount)
    return res.status(400).json({ message: "Missing fields" });

  db.query(
    "INSERT INTO records (user_id,type,amount,category,note) VALUES (?,?,?,?,?)",
    [req.user.id, type, amount, category, note],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Record Added" });
    }
  );
});

// ================= GET RECORDS =================
app.get("/records", auth, checkRole(["admin", "analyst"]), (req, res) => {
  db.query(
    "SELECT * FROM records WHERE user_id=?",
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ================= UPDATE RECORD =================
app.put("/update/:id", auth, checkRole(["admin"]), (req, res) => {
  const { type, amount, category } = req.body;

  db.query(
    "UPDATE records SET type=?, amount=?, category=? WHERE id=? AND user_id=?",
    [type, amount, category, req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
});

// ================= DELETE RECORD =================
app.delete("/delete/:id", auth, checkRole(["admin"]), (req, res) => {
  db.query(
    "DELETE FROM records WHERE id=? AND user_id=?",
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted" });
    }
  );
});

// ================= DASHBOARD =================
app.get("/dashboard", auth, (req, res) => {
  db.query(
    `SELECT 
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS total_expense,
      (SUM(CASE WHEN type='income' THEN amount ELSE 0 END) -
       SUM(CASE WHEN type='expense' THEN amount ELSE 0 END)) AS balance
     FROM records WHERE user_id=?`,
    [req.user.id],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Error fetching dashboard" });

      res.json(result[0]);
    }
  );
});

// ================= CATEGORY SUMMARY =================
app.get("/category-summary", auth, (req, res) => {
  db.query(
    "SELECT category, SUM(amount) as total FROM records WHERE user_id=? GROUP BY category",
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ================= SERVER =================
app.listen(5000, () => {
  console.log("Server running on port 5000 ");
});