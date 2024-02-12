import "dotenv/config";
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
const openaiService = {};

openaiService.transcribeAudio = async (audio) => {
  console.log("Transcribing audio...", audio);
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audio),
      model: "whisper-1",
    });
    return transcription.text;
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      console.log(err.status); // 400
      console.log(err.name); // BadRequestError
      console.log(err.headers); // {server: 'nginx', ...}
    } else {
      throw err;
    }
  }
};

export default openaiService;
