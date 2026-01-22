import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "No Arcane Key detected" });

  try {
    const { prompt, settings } = req.body;
    const ai = new GoogleGenAI({ apiKey });

    const config: any = {
      imageConfig: { aspectRatio: settings.aspectRatio },
    };
    if (settings.model === "gemini-3-pro-image-preview") config.imageConfig.imageSize = settings.imageSize;

    const response = await ai.models.generateContent({
      model: settings.model,
      contents: [{ parts: [{ text: prompt }] }],
      config,
    });

    const part = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);
    if (!part?.inlineData) {
      return res.status(500).json({ error: "No visual imagery was manifested." });
    }

    res.status(200).json({ image: `data:image/png;base64,${part.inlineData.data}` });
  } catch (err: any) {
    console.error("Gemini Ritual Error:", err);
    res.status(500).json({ error: err.message || "Unexpected ritual failure" });
  }
}
