const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  userModel.createUser({ name, email, password: hash }, (err) => {
    if (err) return res.status(500).send(err);
    res.send("User Registered");
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, (err, result) => {
    if (err || result.length === 0)
      return res.status(404).send("User not found");

    const user = result[0];

    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).send("Wrong password");

    const token = jwt.sign({ id: user.id }, "secretkey", {
      expiresIn: "1h"
    });

    res.json({ token });
  });
};