import express, { json } from 'express';
import 'dotenv/config';
import ConnectDB from './config/database.js';
import cors from 'cors'
// import cookieParser from 'cookie-parser';
import authRoutes from './router/auth.route.js'


// Create Express app
const app = express();
app.use(express.json())
app.use(cors());
// app.use(cookieParser())


app.get('/', (req,res)=>{
    res.send('Server is Live')
})
// Middelware Setup
app.use('/api/v1/auth', authRoutes)


//Mongodb connection
await ConnectDB();
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server is Running on Port: ${PORT}`));