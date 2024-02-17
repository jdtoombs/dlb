import "dotenv/config";
import OpenAI from "openai";
import fs from "fs";
import { fileTypeFromStream } from "file-type";

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
const openaiService = {};

/**
 * Sleep for a given number of milliseconds
 * @function sleep
 * param {number} ms - The number of milliseconds to sleep
 * @returns {Promise} - A promise that resolves after the given number of milliseconds
 */
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Transcribe an audio file using OpenAI's API
 * @function transcribeAudio
 * @async
 * @param {string} audio - The path to the audio file
 * @param {number} retries - The number of times to retry the transcription
 * @param {number} delay - The initial delay between retries, in milliseconds
 * @returns {string} - The transcribed text
 */
openaiService.transcribeAudio = async (audio, retries = 3, delay = 1000) => {
  const stream = fs.createReadStream(audio);
  const type = await fileTypeFromStream(stream);
  console.log(type);
  stream.on("error", (err) => {
    console.log("Error reading audio file:", err);
  });
  stream.on("readable", () => {
    console.log("readable");
  });
  console.log("Transcribing audio...", audio);
  while (retries > 0) {
    try {
      // timing out here
      const transcription = await openai.audio.transcriptions.create({
        file: stream,
        model: "whisper-1",
      });
      return transcription.text;
    } catch (err) {
      retries -= 1;
      if (retries > 0) {
        console.log(`Retrying... ${retries} attempts left`);
        await sleep(delay);
        delay *= 2;
      } else {
        console.log(err);
      }
    }
  }
};

export default openaiService;
