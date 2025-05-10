import { useState } from 'react';
import { smartJobPost } from '../../api/aiApi';

const SmartJobPost = () => {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    try {
      const response = await smartJobPost(description);
      setResult(response.data.jobPost);
    } catch (err) {
      alert(err.response?.data?.message || 'Error generating job post');
    }
  };

  return (
    <div>
      <h2>Smart Job Post Generator</h2>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={50} />
      <br />
      <button onClick={handleGenerate}>Generate Job Post</button>

      {result && (
        <div>
          <h3>Generated Job Post:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default SmartJobPost;
