import "dotenv/config";
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
const openaiService = {};

/**
 * Transcribe an audio file using OpenAI's API
 * @function transcribeAudio
 * @async
 * @param {string} audio - The path to the audio file
 * @returns {string} - The transcribed text
 */
openaiService.transcribeAudio = async (audio) => {
  console.log("Transcribing audio...", audio);
  try {
    // timing out here
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audio),
      model: "whisper-1",
    });
    return transcription.text;
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      console.log("API Error", err);
      console.log(err.status);
      console.log(err.name);
      console.log(err.headers);
    } else {
      throw err;
    }
  }
};

export default openaiService;
