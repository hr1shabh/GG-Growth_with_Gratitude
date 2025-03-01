import React, { useState } from 'react';
import { Groq } from 'groq-sdk';

const RightBar = () => {
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getGratitudeSuggestion = async () => {
    setIsLoading(true);
    setError(null);

    // Debug log to check if API key exists
    console.log("API Key available:", !!process.env.REACT_APP_GROQ_API_KEY);

    try {
      // Initialize Groq client with API key
      const groq = new Groq({
        apiKey: process.env.REACT_APP_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      });

      // Main request
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
        // Optional: Uncomment to update suggestion incrementally
        // setSuggestion(fullResponse);
      }
      setSuggestion(fullResponse.trim());
    } catch (error) {
      console.error('Error fetching suggestion:', error);

      // Enhanced error handling with detailed messages
      let errorMessage = 'Failed to fetch suggestion. Please try again.';
      
      if (error.response) {
        errorMessage = `API Error ${error.response.status}: ${error.response.data?.error || error.response.statusText || 'Unknown error'}`;
      } else if (error.request) {
        errorMessage = "No response received from API. Please check your network connection.";
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.message && error.message.includes('API key')) {
        errorMessage = "API key error. Please check your API key configuration.";
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-72 bg-white shadow-md h-screen sticky top-0 overflow-y-auto right-0 p-4">
      <div className="space-y-6">
        {/* Gratitude Suggestion Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <span className="text-lg font-semibold text-gray-800 block mb-4">
            Daily Gratitude
          </span>

          <button
            onClick={getGratitudeSuggestion}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {isLoading ? 'Generating...' : 'Get Writing Prompt'}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              <p>{error}</p>
              {!process.env.REACT_APP_GROQ_API_KEY && (
                <p className="mt-1 text-sm">
                  Note: REACT_APP_GROQ_API_KEY is not defined. Make sure you've set it up correctly.
                </p>
              )}
            </div>
          )}

          {suggestion && (
            <div className="mt-4 p-3 bg-white rounded-lg shadow">
              <p className="text-gray-700">{suggestion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;