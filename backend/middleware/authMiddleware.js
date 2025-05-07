import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Helper function to extract and validate user
const getUserFromToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return await User.findById(decoded.id).select('-password');
};

// Middleware to verify Employer
export const verifyEmployer = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) 
    return res.status(401).json({ message: 'Authorization header is missing or malformed. Expected Bearer token.' });

  try {
    const token = authHeader.split(' ')[1];
    req.user = await getUserFromToken(token);

    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Access denied, you are not an employer.' });
    }

    next();
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// Middleware to verify Candidate
export const verifyCandidate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) 
    return res.status(401).json({ message: 'Authorization header is missing or malformed. Expected Bearer token.' });

  try {
    const token = authHeader.split(' ')[1];
    req.user = await getUserFromToken(token);

    if (req.user.role !== 'candidate') {
      return res.status(403).json({ message: 'Access denied, you are not a candidate.' });
    }

    next();
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

//// Middleware to verify any logged-in User (Candidate or Employer)
export const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header is missing or malformed. Expected Bearer token.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    req.user = await getUserFromToken(token);
    
    if (!req.user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    next();
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// ✅ Middleware to verify Admin
export const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) 
    return res.status(401).json({ message: 'Authorization header is missing or malformed. Expected Bearer token.' });

  try {
    const token = authHeader.split(' ')[1];
    req.user = await getUserFromToken(token);

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, Admins only.' });
    }

    next();
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};
