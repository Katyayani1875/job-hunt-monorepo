import multer from 'multer';
import path from 'path';

// Define storage settings for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/'); // Store resumes in 'uploads/resumes' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique file name
  }
});

// File filter to only allow PDF and DOCX files
const fileFilter = (req, file, cb) => {
  const fileTypes = /pdf|docx/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF and DOCX files are allowed'), false);
  }
};

// Initialize multer with storage and file filter options
const uploadResume = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter
}).single('resume'); // Single file upload with field name 'resume'

export default uploadResume;
