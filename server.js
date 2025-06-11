// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const axios =  require('axios');
// const OpenAI = require("openai");
// require('dotenv').config();


// const recipieRoutes = require('./routes/recipieRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api/recipies',recipieRoutes);

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB connected');
//   app.listen(5000, () => console.log('Server running on http://localhost:5000'));
// }).catch(err => console.error('MongoDB connection error:', err));



// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });



// // POST /ask endpoint
// app.post('/ask', async (req, res) => {
//   const { question } = req.body;

//   try {
//     const completion = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
//       messages: [{ role: 'user', content: question }],
//     });

//     res.json({ answer: completion.data.choices[0].message.content });
//   } catch (error) {
//     console.error('Error:', error.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to get AI response' });
//   }
// });

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const {GoogleGenerativeAI} = require('@google/generative-ai');
const recipieRoutes = require('./routes/recipieRoutes');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const apiLimiter = rateLimit({
  windowMs : 60*1000,
  max: 15,
  message: "Too many requests. Please wait a minute and try again.",
  standardHeaders: true,
  legacyHeaders:false,
});

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

const genAI =new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

app.post('/api/chat',apiLimiter, async (req, res) => {
  const { message } = req.body;
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 150,
        topP: 0.8,
        topK: 40,
      },
     });  
     const result = await model.generateContent(
  `You are a Sri Lankan food assistant. Only answer questions related to Sri Lankan cuisine, food culture, and recipes. If the question is not about Sri Lankan food, politely reply that you only provide information related to Sri Lankan cuisine.

Respond in clear and friendly English, using short paragraphs and no more than 150 words.

Your answers should focus on:
- Traditional Sri Lankan dishes (e.g., hoppers, kottu, sambol, rice & curry)
- Regional food specialties (e.g., Jaffna cuisine, Southern seafood dishes)
- Authentic ingredients and spices (e.g., pandan leaves, curry leaves, goraka)
- Cooking techniques (e.g., tempering spices, clay pot cooking)
- Festive and cultural foods (e.g., Sinhala and Tamil New Year sweets, wedding dishes)
- Vegetarian and vegan options in Sri Lankan cooking
- Health aspects of traditional ingredients (e.g., turmeric, coconut)

Avoid:
- Giving medical, political, or financial advice
- Answering non-food-related questions
- Using complex culinary terms without simple explanations

Now answer this question: ${message}`
    );

    const response = result.response;
    const text = response.text();
    res.json({ reply: text + "\n\n-**LankanTast**" });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: "AI failed to respond." });
  }
});

app.use('/api/contact',recipieRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });