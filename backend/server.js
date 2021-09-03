import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const app = express();

// Accept json data in req body
app.use(express.json());

dotenv.config();

connectDB();

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound); // Handle non-matching URL
app.use(errorHandler); // Handle error from everywhere (e.g. database)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
