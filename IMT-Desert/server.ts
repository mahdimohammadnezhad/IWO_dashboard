import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini
  app.post("/api/ai/tips", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("GEMINI_API_KEY is not configured.");

      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      const { comparisonData, weatherForecast } = req.body;

      const prompt = `Based on the following irrigation comparison results and weather forecast, provide an "Irrigation Management Tip". Include suggestion for the optimal irrigation schedule based on the weather forecast and crop needs. Keep the tip practical, clear, and professional.

Comparison Data:
${JSON.stringify(comparisonData, null, 2)}

Weather Forecast Context (if provided):
${weatherForecast || "Not provided, assume general dry/warm weather."}

Your output should directly be the tips and recommendations using markdown formatting without wrapping in a JSON object.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: "You are an expert irrigation management specialist and agronomist.",
        }
      });

      res.json({ tip: response.text });
    } catch (err: any) {
      console.error("[AI Generation Error]:", err);
      res.status(500).json({ error: err.message || "Failed to generate AI tip" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(
      express.static(distPath, {
        setHeaders: (res, filePath) => {
          const ext = path.extname(filePath).toLowerCase();
          if (ext === ".js" || ext === ".mjs") {
            res.setHeader("Content-Type", "text/javascript; charset=utf-8");
          } else if (ext === ".wasm") {
            res.setHeader("Content-Type", "application/wasm");
          } else if (ext === ".css") {
            res.setHeader("Content-Type", "text/css; charset=utf-8");
          }
        },
      }),
    );
    // Missing build assets should return 404, not index.html.
    app.get(/^\/assets\/.+/, (req, res) => {
      res.status(404).end();
    });
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
