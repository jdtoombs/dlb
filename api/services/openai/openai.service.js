import "dotenv/config";
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
const openaiService = {};

openaiService.transcribeAudio = async (audio) => {
  console.log("Transcribing audio...", audio);
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audio),
    model: "whisper-1",
  });
  return transcription.text;
};

export default openaiService;
