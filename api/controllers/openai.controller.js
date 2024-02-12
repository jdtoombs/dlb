import openaiService from "../services/openai/openai.service.js";

const controller = {};

/**
 * Asynchronously transcribes an audio file uploaded by the user.
 * @function transcribe
 * @async
 * @param {object} req - The request object from Express.js, expected to contain a file in `req.file`.
 * @param {object} res - The response object from Express.js, used to send back the transcribed text.
 * @returns {Promise<void>} Sends a JSON response with the transcription. Does not return a value.
 */
controller.transcribe = async (req, res) => {
  const filePath = req.file.path;
  const transcript = openaiService.transcribeAudio(filePath);
  console.log(transcript);
  res.json({ transcript });
};

export default controller;
