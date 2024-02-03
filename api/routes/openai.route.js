import express from "express";
import openaiController from "../controllers/openai.controller.js";

const router = express.Router();

router.post("/transcribe", (req, res) => {
  openaiController.transcribe(req, res);
});

export default router;
