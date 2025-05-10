import { useState } from 'react';
import { generateCoverLetter } from '../../api/aiApi';

const GenerateCoverLetter = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [resumeHighlights, setResumeHighlights] = useState('');
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    try {
      const response = await generateCoverLetter(jobTitle, companyName, resumeHighlights);
      setResult(response.data.coverLetter);
    } catch (err) {
      alert(err.response?.data?.message || 'Error generating cover letter');
    }
  };

  return (
    <div>
      <h2>Cover Letter Generator</h2>
      <input
        type="text"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="Job Title"
        size="50"
      /><br /><br />
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Company Name"
        size="50"
      /><br /><br />
      <textarea
        value={resumeHighlights}
        onChange={(e) => setResumeHighlights(e.target.value)}
        rows={5}
        cols={50}
        placeholder="Briefly describe your experience/achievements"
      /><br />
      <button onClick={handleGenerate}>Generate Cover Letter</button>

      {result && (
        <div>
          <h3>Generated Cover Letter:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default GenerateCoverLetter;
