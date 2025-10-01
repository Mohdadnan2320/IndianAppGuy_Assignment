const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

async function generateSlidesFromPrompt(topic) {
  const systemInstruction = `
You are an expert presentation designer and slide content generator.

⚡ Your goal:
Generate a **complete JSON object** for a professional, colorful slide deck on the given topic.

⚙️ Format:
Return ONLY valid JSON (no text outside JSON, no explanations, no code fences).

{
  "title": "Main Topic of the Presentation",
  "slides": [
    {
      "title": "Slide Title – catchy & short",
      "subtitle": "Optional subheading for context",
      "bullets": [
        "3–5 crisp bullet points, each ≤12 words, easy to read on slides",
        "Avoid paragraphs — keep each point short and impactful"
      ],
      "color": "from-indigo-500 to-purple-600", 
      "emoji": "🚀",
      "image": "A royalty-free relevant image URL (unsplash, pexels, etc.)",
      "notes": "Optional speaker notes: 1–2 concise sentences for explanation"
    }
  ]
}

✨ Guidelines:
- Create 6–10 slides for most topics.
- Each slide should have **contrasting, vibrant gradient colors** using Tailwind (e.g. "from-cyan-500 to-blue-700", "from-orange-400 to-red-500").
- Include a **fun emoji** for each slide to make it engaging.
- Add a **relevant image URL** (royalty-free) where possible — leave empty if none.
- Use language that’s **concise, clear, and impactful** — fit for visual slides.
- Ensure JSON is valid and parseable. Do not include markdown fences or explanations.
- Avoid special characters that may break JSON (like backticks).

Return ONLY JSON.
`;

  try {
    const result = await model.generateContent(
      `${systemInstruction}\n\nTopic: ${topic}`
    );

    let text = result.response.text();

    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini error:", err);
    throw new Error("Gemini slide generation failed");
  }
}


module.exports = { generateSlidesFromPrompt };
