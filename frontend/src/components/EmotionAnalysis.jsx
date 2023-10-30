// Inside your component
import { useEffect, useState } from 'react';

const EmotionRecognition = () => {
  const [inputText, setInputText] = useState('');
  const [emotionResult, setEmotionResult] = useState('');

  useEffect(() => {
    fetch('http://localhost:3005/api/v1/emotion', {
      method: 'POST',
      body: JSON.stringify({ text: inputText }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the emotion recognition result
        setEmotionResult(data.result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [inputText]);

  return (
    <div>
      {/* Emotion Recognition UI */}
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text for emotion recognition..."
      />
      <div>
        <strong>Emotion Result:</strong> {emotionResult}
      </div>
    </div>
  );
};

export default EmotionRecognition;
