import { callGemini } from '../service/aiService.js'; // Correct import

export const analyzeResume = async (req, res) => {
  try {
    const resumeText = req.body.text || ''; // or from uploaded file
    const prompt = `Analyze this resume and extract skills, education, and experience:\n\n${resumeText}`;
    const result = await callGemini(prompt); // Changed to callGemini
    res.status(200).json({ analysis: result });
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing resume', error });
  }
};

export const recommendJobs = async (req, res) => {
  try {
    const skills = req.body.skills || ''; // or from resume analysis
    const prompt = `Suggest suitable jobs for a person with the following skills: ${skills}`;
    const result = await callGemini(prompt); // Changed to callGemini
    res.status(200).json({ recommendations: result });
  } catch (error) {
    res.status(500).json({ message: 'Error recommending jobs', error });
  }
};

export const generateCoverLetter = async (req, res) => {
  try {
    const { jobTitle, companyName, resumeHighlights } = req.body;
    const prompt = `Write a professional cover letter for the job: ${jobTitle} at ${companyName} using this background: ${resumeHighlights}`;
    const result = await callGemini(prompt); // Changed to callGemini
    res.status(200).json({ coverLetter: result });
  } catch (error) {
    res.status(500).json({ message: 'Error generating cover letter', error });
  }
};

export const smartJobPost = async (req, res) => {
  try {
    const { shortDescription } = req.body;
    const prompt = `Write a detailed job post based on: ${shortDescription}`;
    const result = await callGemini(prompt); // Changed to callGemini
    res.status(200).json({ jobPost: result });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job post', error });
  }
};

// ✅ Added chatAssistant function
export const chatAssistant = async (req, res) => {
  try {
    const { question } = req.body;
    const prompt = `Answer the following user question in the context of a job portal: ${question}`;
    const result = await callGemini(prompt); // Changed to callGemini
    res.status(200).json({ response: result });
  } catch (error) {
    res.status(500).json({ message: 'Error processing chat', error });
  }
};
