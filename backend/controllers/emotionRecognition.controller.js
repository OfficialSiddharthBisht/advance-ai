const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const axios = require("axios");


exports.emotionRecognition = catchAsyncErrors( (req, res) => {
  try {
    const text = req.body.text;

    // Use the OpenAI GPT-3.5 Turbo model to analyze sentiment and recognize emotions
    const messages = [
      { role: 'system', content: 'You are an emotion recognition assistant.' },
      { role: 'user', content: `Provide a single-word response after analyzing this text: ${text}` }
    ];

    axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: messages.map(message => message.role + ': ' + message.content).join('\n'),
      max_tokens: 50
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPEN_API_KEY}`
      }
    })
    .then(response => {
      const result = response.data.choices[0].text;
      res.json({ result });
    })
    .catch(error => {
      console.error('Error in /analyze route:', error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    });
  } catch (error) {
    console.error('Error in /analyze route:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
})