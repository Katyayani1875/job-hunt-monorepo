import uploadResume from '../middleware/fileUpload.js'; // Correct import for the upload middleware
import Resume from '../models/resume.js'; // Assuming you have a Resume model
import fs from 'fs';

// Function to handle file upload for resume
export const handleResumeUpload = (req, res) => {
  uploadResume(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const resume = new Resume({
        user: req.user.id, // Assuming user is authenticated and user ID is in the request
        filePath: req.file.path,
        fileName: req.file.filename,
        fileType: req.file.mimetype,
      });

      await resume.save();
      res.status(200).json({ message: 'Resume uploaded successfully', resume });
    } catch (error) {
      res.status(500).json({ message: 'Error saving resume to the database' });
    }
  });
};

// Function to delete a resume
export const deleteResume = async (req, res) => {
  const { userId } = req.params; // Get the userId from params

  try {
    const resume = await Resume.findOne({ user: userId }); // Find the resume by userId

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Delete the resume file from the file system
    const filePath = resume.filePath;
    fs.unlinkSync(filePath); // Delete the file

    // Delete the resume from the database
    await resume.remove();
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resume' });
  }
};

// Function to get resume details
export const getResumeDetails = async (req, res) => {
  const { userId } = req.params; // Get userId from params

  try {
    const resume = await Resume.findOne({ user: userId }); // Find the resume by userId

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({ resume });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resume details' });
  }
};
