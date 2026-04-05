const recordModel = require("../models/recordModel");

exports.addRecord = (req, res) => {
  const data = { ...req.body, user_id: req.userId };

  recordModel.addRecord(data, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Record added");
  });
};

exports.getRecords = (req, res) => {
  recordModel.getRecords(req.userId, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};