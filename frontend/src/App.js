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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import AnalyzeComponent from './components/Analize';
import EmotionRecognition from './components/EmotionAnalysis';
import SummarizeComponent from './components/SummarizePDF';

function App() {
  const { isOpen: isOpenSummarize, onOpen: onOpenSummarize, onClose: onCloseSummarize } = useDisclosure();
  const { isOpen: isOpenAnalyze, onOpen: onOpenAnalyze, onClose: onCloseAnalyze } = useDisclosure();
  const { isOpen: isOpenEmotion, onOpen: onOpenEmotion, onClose: onCloseEmotion } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
          <ColorModeSwitcher justifySelf="flex-end" />
        <Grid minH="100vh" >
          <HStack  display='flex' alignItems={'center'} justifyContent={'center'} width='100%' marginTop='50px'>
            <Button colorScheme='red' onClick={onOpenAnalyze}>Text Generation</Button>
            <Button colorScheme='teal' onClick={onOpenSummarize}>Summarize PDF Document</Button>
            <Button colorScheme='whatsapp' onClick={onOpenEmotion}>Sentiment Analysis and Emotion Recognition</Button>

            <Modal isOpen={isOpenSummarize} onClose={onCloseSummarize}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Summarize PDF Document</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <SummarizeComponent />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onCloseSummarize}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Modal isOpen={isOpenAnalyze} onClose={onCloseAnalyze}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Text Generation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <AnalyzeComponent />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onCloseAnalyze}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Modal isOpen={isOpenEmotion} onClose={onCloseEmotion}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Sentiment Analysis and Emotion Recognition</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <EmotionRecognition />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onCloseEmotion}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </HStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
