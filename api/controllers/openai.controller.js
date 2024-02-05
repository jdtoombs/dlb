import openaiService from "../services/openai/openai.service.js";

const controller = {};

controller.transcribe = async (req, res) => {
  const filePath = req.file.path;
  const { transcript } = await openaiService.transcribeAudio(filePath);
  res.json({ transcript });
};

export default controller;
