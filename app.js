const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json());

// MySQL Connection
const db = require("./config/db");

// Test Route
app.get("/", (req, res) => {
  res.send("API is running");
});


// GET All Employees
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching data");
    } else {
      res.json(result);
    }
  });
});


// POST - Add Employee
app.post("/employees", (req, res) => {
  const { name, department, salary } = req.body;

  const sql = "INSERT INTO employees (name, department, salary) VALUES (?, ?, ?)";
  db.query(sql, [name, department, salary], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error inserting data");
    } else {
      res.send("Employee added successfully");
    }
  });
});


// PUT - Update Employee
app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const { name, department, salary } = req.body;

  const sql = "UPDATE employees SET name=?, department=?, salary=? WHERE id=?";
  db.query(sql, [name, department, salary, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating data");
    } else {
      res.send("Employee updated successfully");
    }
  });
});


// DELETE Employee
app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM employees WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting data");
    } else {
      res.send("Employee deleted successfully");
    }
  });
});


// Server Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});