const db = require('../config/db');

exports.getDashboard = (req, res) => {
    const userId = req.user.id;

    const incomeQuery = "SELECT SUM(amount) AS income FROM records WHERE user_id=? AND type='income'";
    const expenseQuery = "SELECT SUM(amount) AS expense FROM records WHERE user_id=? AND type='expense'";

    db.query(incomeQuery, [userId], (err, incomeResult) => {
        db.query(expenseQuery, [userId], (err, expenseResult) => {

            const income = incomeResult[0].income || 0;
            const expense = expenseResult[0].expense || 0;

            res.json({
                total_income: income,
                total_expense: expense,
                balance: income - expense
            });
        });
    });
};