import { useState } from 'react';
import { chatAssistant } from "../../api/aiApi";

const ChatAssistant = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleChat = async () => {
    try {
      const res = await chatAssistant(question);
      setResponse(res.data.response);
    } catch (err) {
      alert(err.response?.data?.message || 'Error getting response');
    }
  };

  return (
    <div>
      <h2>Job Portal Chat Assistant</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about job portal..."
        size="50"
      /><br /><br />
      <button onClick={handleChat}>Ask</button>

      {response && (
        <div>
          <h3>Assistant Response:</h3>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
