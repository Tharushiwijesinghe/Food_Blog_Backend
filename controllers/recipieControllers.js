const express = require('express');
const router = express.Router();
const authenticateAdmin = require('../middleware/verifyToken');
const {
  getAllRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipieControllers');

// Public Route
exports.getAllRecipes = (req, res) => {
  // your controller logic here
  res.send("All recipes");
};

// Admin-only Routes
router.post('/add', authenticateAdmin, createRecipe);
router.put('/update/:id', authenticateAdmin, updateRecipe);
router.delete('/delete/:id', authenticateAdmin, deleteRecipe);

module.exports = router;
