import 'dotenv/config';
import express from 'express';
import subjectRouter from './routes/subject';
import cors from 'cors';
import securityMiddleware from './middleware/security';

const app = express();
const PORT = Number(process.env.PORT ?? 8000);

if(!process.env.FRONTEND_URL){
	console.warn('FRONTEND_URL is not defined. CORS will not be configured properly.');
}

app.use(express.json());

app.use(securityMiddleware)

app.use(cors({
	origin: process.env.FRONTEND_URL || false,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true,
}));

app.get('/', (_req, res) => {
	res.send('Classroom backend is running.');
});

app.use('/api/subjects', subjectRouter);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
