import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import fs from 'fs';

const ai = new GoogleGenAI({
    vertexai: true,
    project: 'vertexai-500218',
    location: 'global',
});


export async function createImage(userprompt: string, imageUrl: string) {
    const base64Image = await axios.get(imageUrl, {
        responseType: 'arraybuffer'
    })
        .then(response => Buffer.from(response.data, 'binary').toString('base64'));

    const prompt = [
            { text: userprompt },
            {
                inlineData: {
                    mimeType: "image/png",
                    data: base64Image,
                },
            },
        ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: prompt,
        config: {
            responseModalities: ["TEXT", "IMAGE"],
        },
    });

    const parts = response.candidates?.[0]?.content?.parts!;

    for (const part of parts) {
        if (part.text) {
            console.log(part.text);
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            fs.writeFileSync('./assets/random.png', buffer)
        }
    }
}