import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";

import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js';
import connectDB from "./mongodb/connect.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', function(req, res) {
    res.send("Hello, world!");
})

app.listen(process.env.PORT, () => {
    connectDB(process.env.MONGODB_URL);
    console.log(`Server is running on port ${process.env.PORT}`);
})