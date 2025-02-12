import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: "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",
});

router.route("/").post(async (req, res) => {
    
    try {
        const { prompt } = req.body;

        const aiRes = await openai.images.generate({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const image = aiRes.data[0].b64_json;

        res.status(200).json({
            photo: image
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("error: ",error)
    }
});

export default router;
