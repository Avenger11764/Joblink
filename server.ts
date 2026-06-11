import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

let aiClient: any = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse json
  app.use(express.json({ limit: '10mb' }));

  // API Route: Healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Route: Improve Cover Letter using Gemini 3.5 Flash
  app.post("/api/improve-cover-letter", async (req, res) => {
    try {
      const { 
        fullName, 
        aboutMe, 
        skills, 
        coverLetterText, 
        experiences, 
        education 
      } = req.body;

      let client;
      try {
        client = getGeminiClient();
      } catch (err: any) {
        console.error("Gemini init error:", err.message);
        return res.status(500).json({ 
          error: "Gemini API client not initialized. Please ensure your GEMINI_API_KEY is configured in the Secrets panel." 
        });
      }

      // Structure system prompt to behave as an expert recruiter & writer
      const prompt = `You are an expert career consultant, professional resume writer, and recruiter. Your goal is to write or significantly refine a highly persuasive, flawless, and modern response to a job application.
      
Candidate Name: ${fullName || 'Alex Sterling'}
About the Candidate: ${aboutMe || 'An experienced designer and developer focused on modern platforms.'}
Key Skills: ${(skills && skills.length > 0) ? skills.join(", ") : 'Figma, Design Systems, React, Web Design'}
Work History: ${JSON.stringify(experiences || [])}
Education: ${JSON.stringify(education || [])}

Current Cover Letter draft:
"${coverLetterText || ''}"

TASK:
1. If the current cover letter draft is empty or very short, write a brilliant, standard 3-to-4 paragraph cover letter from scratch that connects the candidate's professional highlights (from Work History, Education, and Skills) into a cohesive professional narrative. Make it elegant and compelling.
2. If a cover letter draft is present, maintain the core details but polish the language, improve the phrasing and flow, repair any grammatical slip-ups, structure the key value propositions, and elevate the overall tone to be authoritative, friendly, and polished.
3. Keep the cover letter professional, standard length (~250-400 words), with placeholders for [Company Name] or [Hiring Manager] where appropriate.
4. Output ONLY the polished cover letter text. Do not add intro greetings, post-completion commentary, or conversational wrap-ups. Simply output the pure cover letter text itself.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });

      const improvedText = response.text || "Failed to generate text from model.";
      res.json({ improvedText });
    } catch (error: any) {
      console.error("Improve cover letter error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred while refining your cover letter with Gemini." });
    }
  });

  // Enable Hot Reloading/Bundling in Dev, static file hosting in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server", err);
});
