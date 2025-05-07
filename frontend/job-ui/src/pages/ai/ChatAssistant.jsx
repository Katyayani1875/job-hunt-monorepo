import { useState } from 'react';
import api from "../../utils/axios";
// axios instance with token handling

const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/ai/chat', { question: input });
      const assistantMessage = { role: 'assistant', content: response.data.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please login again or try later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-[#0c1a2b] rounded-xl shadow-md">
      <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">AI Chat Assistant</h1>

      <div className="space-y-3 max-h-[400px] overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`p-3 rounded-md ${msg.role === 'user' ? 'bg-blue-100 dark:bg-blue-900 text-right' : 'bg-gray-200 dark:bg-gray-700'}`}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
