import { useState } from 'react';
import { recommendJobs } from '../../api/aiApi';

const RecommendJobs = () => {
  const [skills, setSkills] = useState('');
  const [result, setResult] = useState('');

  const handleRecommend = async () => {
    try {
      const response = await recommendJobs(skills);
      setResult(response.data.recommendations);
    } catch (err) {
      alert(err.response?.data?.message || 'Error recommending jobs');
    }
  };

  return (
    <div>
      <h2>Job Recommendations</h2>
      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="Enter your skills (comma separated)"
        size="50"
      />
      <br />
      <button onClick={handleRecommend}>Get Recommendations</button>

      {result && (
        <div>
          <h3>Recommended Jobs:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default RecommendJobs;
