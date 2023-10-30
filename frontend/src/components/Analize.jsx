// AnalyzeComponent.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Textarea,
  VStack,
  Heading,
} from '@chakra-ui/react';

function AnalyzeComponent() {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  const handleAnalyze = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/v1/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisResult(data.result);
      } else {
        // Handle the error here
        console.error('Error analyzing text');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <VStack spacing={4}>
      <Heading as="h2" size="lg">Text Analysis</Heading>
      <Textarea
        placeholder="Enter text for analysis"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button onClick={handleAnalyze} colorScheme="teal">
        Analyze
      </Button>
      {analysisResult && (
        <Box p={4} borderWidth="1px" borderRadius="md" borderColor="teal.500">
          <strong>Analysis Result:</strong> {analysisResult}
        </Box>
      )}
    </VStack>
  );
}

export default AnalyzeComponent;
