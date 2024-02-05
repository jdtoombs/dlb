import express from "express";
import openaiController from "../controllers/openai.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/transcribe", upload.single("audio"), (req, res) => {
  openaiController.transcribe(req, res);
});

export default router;
