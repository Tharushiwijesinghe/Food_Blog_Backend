const Recipe = require('../models/recipieModels');

// ✏️ Edit recipe (admin only)
const editRecipeContact = async (req, res) => {
  try {
    const { newTitle, content, image } = req.body;
    const recipe = await Recipe.findOneAndUpdate(
      { title: req.params.title },
      { title: newTitle, content, image },
      { new: true }
    );
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe updated successfully', recipe });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🗑️ Delete recipe (admin only)
const deleteRecipeContact = async (req, res) => {
  try {
    const deleted = await Recipe.deleteOne({ title: req.params.title });
    if (deleted.deletedCount === 0)
      return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  editRecipeContact,
  deleteRecipeContact
};
