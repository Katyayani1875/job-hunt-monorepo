import { useState } from 'react';
import { analyzeResume } from '../../api/aiApi';

const AnalyzeResume = () => {
  const [resumeText, setResumeText] = useState('');
  const [result, setResult] = useState('');

  const handleAnalyze = async () => {
    try {
      const response = await analyzeResume(resumeText);
      setResult(response.data.analysis);
    } catch (err) {
      alert(err.response?.data?.message || 'Error analyzing resume');
    }
  };

  return (
    <div>
      <h2>Analyze Resume</h2>
      <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} rows={5} cols={50} />
      <br />
      <button onClick={handleAnalyze}>Analyze</button>

      {result && (
        <div>
          <h3>Result:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default AnalyzeResume;
