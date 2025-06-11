const {configuration, OpenAIApi} = require('openai');
const Message = require('../models/recipieModels');

const configuration = new configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

