import express  from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/DbConfig.js';
import 'dotenv/config';
import productRouter from './routes/productRoute.js';
import cloudinaryConnection from './config/cloudinaryConfig.js';
import orderRouter from './routes/orderRoute.js';
import adminRoute from './routes/adminRoute.js';

const app = express();
const PORT = process.env.PORT || 5000;
 

const allowedOrigins = ['http://localhost:5173'];


// Middleware
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));


// Routes
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter)
app.use('/api/admin', adminRoute)


app.get('/', (req, res) => {
    res.send('Api is running coockie jewelery');
})


app.listen(PORT, () => {
    console.log(`Coocke Jewelery Server is running on port ${PORT}`);
    connectDB();
    cloudinaryConnection()
})