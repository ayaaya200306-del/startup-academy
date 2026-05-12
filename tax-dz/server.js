import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Routes
import taxLawsRouter from './routes/taxLaws.js';
import complaintsRouter from './routes/complaints.js';
import aiAssistantRouter from './routes/aiAssistant.js';
import calculatorRouter from './routes/calculator.js';
import subscriptionRouter from './routes/subscription.js';

app.use('/api/tax-laws', taxLawsRouter);
app.use('/api/complaints', complaintsRouter);
app.use('/api/ai-assistant', aiAssistantRouter);
app.use('/api/calculator', calculatorRouter);
app.use('/api/subscription', subscriptionRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Tax DZ API is running', timestamp: new Date() });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🔵 Tax DZ Server running on http://localhost:${PORT}`);
});
