import { useState } from 'react'
import { ChakraProvider, Select, Container, Text, Box, Flex, Spacer, Input, Square, Button, SimpleGrid, Card, Stack } from '@chakra-ui/react'
import './App.css'
import { LanguageSelect } from './components/LanguageSelect';
import { translate } from 'johnny-five/lib/board.pins';

function App() {
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTranslate = async () => {
    try {
      // Wrap inputText in an array
      const data = {
        inputs: [inputText],
        parameters: { tgt_lang: targetLanguage, src_lang: sourceLanguage },
        options: { wait_for_model: true },
      };
  
      const result = await query(data);
      setTranslatedText(result[0].translation_text);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };
  async function query(data) {
    console.log(data);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/mbart-large-50-many-to-many-mmt",
      {
        headers: { Authorization: "Bearer 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" }, // API key, rate limited so sharing is ok
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }
  return (
    <ChakraProvider>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" padding={4}>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
          <Card padding={4}>
            <Stack spacing={4}>
              <LanguageSelect text="Select Language to Translate" setLanguage={setSourceLanguage}></LanguageSelect>
              <Input placeholder='Enter text...' />
            </Stack>
          </Card>
          <Button colorScheme='blue' onClick={handleTranslate} disabled={isTranslating}>{isTranslating ? 'Translating...' : 'Translate'}</Button>
          <Card padding={4}>
            <Stack spacing={4}>
              <LanguageSelect text="Select Language to Translate to" setLanguage={setTargetLanguage}></LanguageSelect>
              <Box border="1px" borderColor="gray.200" borderRadius="md" p={2}>
                <Text>{translatedText === '' ? "no text to translate" : translatedText}</Text>
              </Box>
            </Stack>
          </Card>
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  )
}


// <ChakraProvider>
//   <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
//     <Card>
//       <LanguageSelect text="Select Language to Translate"></LanguageSelect>
//       <Input placeholder='Enter text...' />
//     </Card>
//     <Button colorScheme='blue' onClick={handleTranslate} disabled={isTranslating}>{isTranslating ? 'Translating...' : 'Translate'}</Button>
//     <Card>
//       <LanguageSelect text="Select Language to Translate to"></LanguageSelect>
//       <Text>{"/* Display translated text here */"}</Text>
//     </Card>
//   </SimpleGrid>
// </ChakraProvider>




// <ChakraProvider>
// <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
//   <Card>
//   <Text as='b'>Enter text to translate</Text>
//   <LanguageSelect text="Select language to translate"></LanguageSelect>
//   <Input placeholder='Type text to translate' />
//   </Card>
//   <Button colorScheme='blue' onClick={handleTranslate} disabled={isTranslating}>{isTranslating ? 'Translating...' : 'Translate'}</Button>
//   <Card>
//     <Text as='b'>Translated Text</Text>
//     <LanguageSelect text="Select language to translate to"></LanguageSelect>
//     <Text>{"/* Display translated text here */"}</Text>
//   </Card>
// </SimpleGrid>
// </ChakraProvider>







// {/* <div className="app">
// <h1>Voice Translator App</h1>
// <textarea
//   placeholder="Enter text to translate"
//   value={inputText}
//   onChange={handleInputChange}
// />
// <button onClick={handleTranslate} disabled={isTranslating}>
//   {isTranslating ? 'Translating...' : 'Translate'}
// </button>
// {translatedText && (
//   <div className="translated-text">
//     <h2>Translated Text:</h2>
//     <p>{translatedText}</p>
//   </div>
// )}
// </div> */}

// , English (en_XX), Galician (glES),
// Slovene

export default App
