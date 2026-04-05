const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/recordController");

router.post("/", auth, controller.addRecord);
router.get("/", auth, controller.getRecords);

module.exports = router;