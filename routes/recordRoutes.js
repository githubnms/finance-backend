const express = require('express');
const router = express.Router();
const { addRecord, getRecords, deleteRecord } = require('../controllers/recordController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.post('/add', verifyToken, authorizeRoles('admin'), addRecord);
router.get('/records', verifyToken, getRecords);
router.delete('/delete/:id', verifyToken, authorizeRoles('admin'), deleteRecord);

module.exports = router;