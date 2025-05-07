import express from 'express';
import {
  analyzeResume,
  recommendJobs,
  generateCoverLetter,
  smartJobPost,
  chatAssistant
} from '../controllers/aiController.js';
import { verifyCandidate, verifyEmployer, verifyUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Resume Analyzer
router.post('/analyze-resume', verifyCandidate, analyzeResume);

// Job Recommendation
router.post('/recommend-jobs', verifyCandidate, recommendJobs);

// Cover Letter Generator
router.post('/generate-cover-letter', verifyCandidate, generateCoverLetter);

// Smart Job Posting
router.post('/smart-job-post', verifyEmployer, smartJobPost);

// Chat Assistant
router.post('/chat', verifyUser, chatAssistant);

export default router;
