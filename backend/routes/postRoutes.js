import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import bodyParser from "body-parser";
import PostSchema from "../mongodb/models/Posts.js";

dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET ALL POST
router.get("/", async function (req, res) {
    try {
        const posts = await PostSchema.find({});
        res.status (200).json({ success: true, data: posts })
        } catch (error) {
        res.status (500).json({ success: false, message: error })
        }
});

//CREATE A POST
router.post("/", async function (req, res) {
    try {
        const { name, prompt, photo } = req.body;
        
        //we are uploading image in cloudinary & it will provide us with the url of the image as is stored.
        const photoUrl = await cloudinary.uploader.upload(photo); 
        
        //Here we storing the image url stored in cloudinary in Post database in mongo we use url of the photo by cloudinary to store in our database.
        await PostSchema.create({
            name,
            prompt,
            photo: photoUrl.url
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        })
    }
});

export default router;
