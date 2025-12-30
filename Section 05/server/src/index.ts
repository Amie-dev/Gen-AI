import express from "express";
import cors from "cors";
import { loadEnv } from "./env";
import { askStructured } from "./ask-core";

const app = express();
loadEnv();
const port = 4001;

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
}));

app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const { query } = req.body ?? {};

    if (!query || !String(query).trim()) {
      return res.status(400).json({ error: "Query is required" });
    }

    const out = await askStructured(query);
    console.log(out)
    return res.status(200).json(out);

  } catch (error) {
    console.error("Error in /ask:", error);

    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Ok Bro");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
