import { GoogleGenAI } from "@google/genai";
import axios from "axios";

const ai = new GoogleGenAI({
    vertexai: true,
    project: 'vertexai-500218',
    location: 'us-central1',
});

export async function generateVideo(prompt: string, imageUrls: string[], outputPath: string) {
    const imageBuffers = await Promise.all(imageUrls.map(async imageUrl => {
        const base64Image = await axios.get(imageUrl, {
            responseType: 'arraybuffer'
        })
            .then(response => Buffer.from(response.data, 'binary').toString('base64'))

        return {
            image: { imageBytes: base64Image, mimeType: "image/png" },
            referenceType: "asset"
        }
    }))

    let operation = await ai.models.generateVideos({
        model: "veo-3.1-fast-generate-001",
        prompt: prompt,
        durationSeconds:8,
        config: {
            referenceImages: imageBuffers
        }
    });

    while (!operation.done) {
        console.log("Waiting for video generation to complete");
        await new Promise((resolve) => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({
            operation: operation
        });
    }

    if (operation.response?.generatedVideos?.[0]) {
        await ai.files.download({
            file: operation.response.generatedVideos[0],
            downloadPath: outputPath,
        });
    }

}