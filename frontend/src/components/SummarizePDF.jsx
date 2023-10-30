// SummarizeComponent.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

function SummarizeComponent() {
  const [summary, setSummary] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    // Handle the uploaded file (PDF in this case)
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSummarize = async () => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('document', uploadedFile);

      try {
        const response = await fetch('http://localhost:3005/api/v1/summarize', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setSummary(data.summary);
        } else {
          // Handle the error here
          console.error('Error summarizing documents');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <VStack spacing={4}>
      <Heading as="h2" size="lg">Document Summarization</Heading>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text>Drop the PDF file here</Text>
        ) : (
          <Text>Drag & drop a PDF file or click to select one</Text>
        )}
      </div>
      {uploadedFile && (
        <Box>
          <Text>Uploaded file: {uploadedFile.name}</Text>
        </Box>
      )}
      <Button onClick={handleSummarize} colorScheme="teal" disabled={!uploadedFile}>
        Summarize
      </Button>
      {summary && (
        <Box p={4} borderWidth="1px" borderRadius="md" borderColor="teal.500">
          <strong>Summary:</strong> {summary}
        </Box>
      )}
    </VStack>
  );
}

const dropzoneStyle = {
  border: '2px dashed #d2d2d2',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default SummarizeComponent;
