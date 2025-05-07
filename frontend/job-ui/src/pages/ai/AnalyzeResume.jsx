import { useState } from 'react';
import axios from 'axios';
import { FileText, Upload, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const AnalyzeResume = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnalysis('');
  };

  const handleAnalyze = async () => {
    if (!file) return toast.error('Please upload a resume first.');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      setLoading(true);
      const response = await axios.post('/api/ai/analyze-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnalysis(response.data.analysis || 'No feedback received.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to analyze resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
        <FileText className="w-6 h-6 text-purple-600" />
        AI Resume Analyzer
      </h1>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="p-2 border rounded-lg w-full sm:w-auto dark:bg-gray-800 dark:text-white"
          />
          <Button onClick={handleAnalyze} className="mt-4 sm:mt-0" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Analyze Resume
              </span>
            )}
          </Button>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">AI Feedback:</h2>
          <div className="min-h-[200px] p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100 whitespace-pre-wrap">
            {loading
              ? 'Analyzing resume...'
              : analysis || 'Upload your resume to see AI-generated feedback here.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeResume;
