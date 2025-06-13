// backend/server.js
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recipieRoutes = require('./routes/recipieRoutes');
const adminRoute = require('./routes/AdminRoute');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: "Too many requests. Please wait a minute and try again.",
  standardHeaders: true,
  legacyHeaders: false,
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/contact', recipieRoutes);
app.use('/api/recipies', recipieRoutes);
app.use('/api/recipes', recipieRoutes);
app.use('/api/admin', adminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
