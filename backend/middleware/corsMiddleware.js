// src/middleware/corsMiddleware.js
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // load FRONTEND_URL from .env

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

const corsMiddleware = cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

export default corsMiddleware;
