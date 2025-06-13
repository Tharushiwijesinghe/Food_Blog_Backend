// // backend/controllers/AdminController.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ adminEmail: email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, message: 'Login successful' });
};

exports.testAdmin = (req, res) => {
  res.json({ message: "You accessed a protected admin route ✅" });
};
