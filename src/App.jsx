import { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTranslate = () => {
    // You can add your translation logic here
    // For example, you can use a translation API like Google Translate or any other service

    // For demonstration purposes, let's assume a simple translation function for now
    let data = {"inputs": inputText, "parameters": {"tgt_lang": "fr_XX", "src_lang": "en_XX"}, "options": {"wait_for_model": true}};
    query(data).then((result) => {setTranslatedText(result[0].translation_text);});
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
    <div className="app">
       <h1>Voice Translator App</h1>
      <textarea
        placeholder="Enter text to translate"
        value={inputText}
        onChange={handleInputChange}
      />
      <button onClick={handleTranslate} disabled={isTranslating}>
        {isTranslating ? 'Translating...' : 'Translate'}
      </button>
      {translatedText && (
        <div className="translated-text">
          <h2>Translated Text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  )
}

export default App
