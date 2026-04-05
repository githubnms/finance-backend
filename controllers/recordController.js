const db = require('../config/db');

exports.addRecord = (req, res) => {
    const { amount, type, category, date } = req.body;

    db.query(
        "INSERT INTO records (amount, type, category, date, user_id) VALUES (?, ?, ?, ?, ?)",
        [amount, type, category, date, req.user.id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Record added" });
        }
    );
};

exports.getRecords = (req, res) => {
    const { type, category } = req.query;

    let query = "SELECT * FROM records WHERE user_id = ?";
    let values = [req.user.id];

    if (type) {
        query += " AND type = ?";
        values.push(type);
    }

    if (category) {
        query += " AND category = ?";
        values.push(category);
    }

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.deleteRecord = (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM records WHERE id = ?",
        [id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Deleted successfully" });
        }
    );
};