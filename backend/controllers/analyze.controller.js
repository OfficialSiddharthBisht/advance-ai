const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const app = express();
app.use(bodyParser.json());

exports.analyzeController = catchAsyncErrors( async (req, res) => {
  try {
    const data = req.body;
    const keyword = data.keyword;

    // Create a list of messages to maintain conversation history
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: keyword },
    ];
    // console.log(process.env.OPEN_API_KEY);
    // Generate text with context
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: messages.map((message) => message.role + ': ' + message.content).join('.\n'),
    }, {
      headers: {
        'Authorization':`Bearer ${process.env.OPEN_API_KEY}`, 
      },
    });

    const generated_text = response.data.choices[0].text;
    res.json({ text: generated_text });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

