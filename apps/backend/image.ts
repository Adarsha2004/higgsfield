import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import fs from 'fs';

const ai = new GoogleGenAI({
    vertexai: true,
    project: 'vertexai-500218',
    location: 'global',
});


export async function createImage(userprompt: string, imageUrl: string, outputFilePath: string) {
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

    let response;
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            response = await ai.models.generateContent({
                model: "gemini-2.5-flash-image",
                contents: prompt,
                config: {
                    responseModalities: ["TEXT", "IMAGE"],
                },
            });
            break;
        } catch (err: any) {
            if (err?.status === 429 && attempt < 2) {
                const waitSec = 30 * (attempt + 1);
                console.log(`Rate limited, retrying in ${waitSec}s... (attempt ${attempt + 1}/3)`);
                await new Promise(r => setTimeout(r, waitSec * 1000));
            } else {
                throw err;
            }
        }
    }

    if (!response) throw new Error("Failed after retries");

    fs.mkdirSync(outputFilePath.substring(0, outputFilePath.lastIndexOf('/')), { recursive: true });

    const parts = response.candidates?.[0]?.content?.parts!;

    for (const part of parts) {
        if (part.text) {
            console.log(part.text);
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            fs.writeFileSync(outputFilePath, buffer);
        }
    }
}