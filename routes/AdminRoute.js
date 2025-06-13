// backend/routes/AdminRoute.js
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const verifyToken = require('../middleware/verifyToken');

router.post('/login', AdminController.login);

// ✅ Protect this route using token
router.get('/dashboard', verifyToken, AdminController.testAdmin);

module.exports = router;
