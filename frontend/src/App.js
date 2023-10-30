import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  HStack,
  grid,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import SummarizeComponent from './components/SummarizePDF';
import AnalyzeComponent from './components/Analize';
import EmotionRecognition from './components/EmotionAnalysis';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <HStack spacing={4} >
            <SummarizeComponent />
            <AnalyzeComponent />
            <EmotionRecognition />
            </HStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
