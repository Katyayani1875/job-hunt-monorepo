// src/middleware/corsMiddleware.js
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5174'// add this explicitly based on your current frontend
];

const corsMiddleware = cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

export default corsMiddleware;
