const db = require("../config/db");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total Income
    const [income] = await db.query(
      "SELECT IFNULL(SUM(amount), 0) AS total_income FROM records WHERE user_id = ? AND type = 'income'",
      [userId]
    );

    // Total Expense
    const [expense] = await db.query(
      "SELECT IFNULL(SUM(amount), 0) AS total_expense FROM records WHERE user_id = ? AND type = 'expense'",
      [userId]
    );

    res.json({
      total_income: income[0].total_income,
      total_expense: expense[0].total_expense,
      balance: income[0].total_income - expense[0].total_expense
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching dashboard" });
  }
};