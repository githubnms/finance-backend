const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/dashboardController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.get('/', verifyToken, authorizeRoles('admin','analyst'), getDashboard);

module.exports = router;