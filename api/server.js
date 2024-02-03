import express from "express";
import cors from "cors";
import openaiRoute from "./routes/openai.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/openai", openaiRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
