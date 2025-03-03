import React, { useState } from 'react';
import { Groq } from 'groq-sdk';

const RightBar = () => {
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getGratitudeSuggestion = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(''); // Clear previous suggestion

    try {
      const groq = new Groq({
        apiKey: process.env.REACT_APP_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            "role": "system",
            "content": "You are a thoughtful and reflective assistant that helps users cultivate gratitude and self-awareness. Respond with insightful and meaningful questions that encourage deep thinking and appreciation for life. Keep the tone warm, encouraging, and thought-provoking."
          },
          {
            "role": "user",
            "content": "I want to reflect on gratitude. Can you give me 1 thought-provoking question to help me think about what I am grateful for? Please only output the question. NOTHING MORE PLEASE"
          }
        ],
        "model": "llama-3.1-8b-instant",
        "temperature": 1,
        "max_completion_tokens": 1024,
        "top_p": 1,
        "stream": true,
        "stop": null
      });

      let fullResponse = '';
      for await (const chunk of chatCompletion) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullResponse += content;
      }
      setSuggestion(fullResponse.trim());
    } catch (error) {
      console.error('Error fetching suggestion:', error);
      setError('Failed to fetch suggestion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = isLoading
    ? 'Generating...'
    : error
    ? 'Try Again'
    : suggestion
    ? 'Get Another Prompt'
    : 'Get Prompt';

  return (
    <div className="w-72 bg-gray-100 shadow-md h-screen sticky top-0 overflow-y-auto right-0 p-6">
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Today's Gratitude Prompt
          </h2>
          <p className="text-gray-600 mb-4">
            Discover a thought-provoking question to inspire your gratitude reflection.
          </p>
          <button
            onClick={getGratitudeSuggestion}
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-lg transition-colors ${
              isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {buttonText}
          </button>
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              <p>{error}</p>
            </div>
          )}
          {suggestion && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-800 text-lg">{suggestion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;