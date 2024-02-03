import openaiService from "../services/openai/openai.service.js";

const controller = {};

controller.transcribe = async (req, res) => {
  const { audio } = req.body;
  const { transcript } = await openaiService.transcribeAudio(audio);
  res.json({ transcript });
};

export default controller;
