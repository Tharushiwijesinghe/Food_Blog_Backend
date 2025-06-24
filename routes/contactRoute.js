const express = require('express');
const router = express.Router();
const authenticateAdmin = require('../middleware/verifyToken');
const {
  editRecipeContact,
  deleteRecipeContact
} = require('../controllers/contactController');

// 🛡️ Protected admin routes
router.put('/edit/:title', authenticateAdmin, editRecipeContact);
router.delete('/delete/:title', authenticateAdmin, deleteRecipeContact);

module.exports = router;
