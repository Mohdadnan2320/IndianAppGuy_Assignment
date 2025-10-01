# AI-Powered Chat-based PPT Generator & Editor

A MERN-stack application that allows users to chat with an AI (Gemini Reasoning Model) to **generate, edit, and download PowerPoint presentations** dynamically.

## 🚀 Features

- **Chat-based UI** similar to [MagicSlides AI-Slide](https://www.magicslides.app/dashboard/ai-slide)
- **AI Integration** with Google’s **Gemini-2.5-Flash** for slide content generation
- **Dynamic PPT Editing** – Users can update slides by giving new prompts
- **PPT Preview & Download** using `pptxgenjs` library
- **Slide JSON Updates** – AI returns structured JSON for slides that is used for PPT updates
- Download presentations in **PPTX** format
- (Optional) **Streaming Support** for progress feedback
- (Optional) **Chat History** to revisit previous prompts and edits

---

## 🛠️ Tech Stack

| Layer          | Technology                 |
|----------------|----------------------------|
| Frontend       | React.js                   |
| Backend        | Node.js, Express.js        |
| AI Model       | Gemini-2.5-Flash           |
| PPT Generation | pptxgenjs                  |
| Database       | (Optional: MongoDB for history) |

---

## ⚙️ Project Structure

```
ai-ppt-app/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── chat.js        # /chat/generate – AI responses
│   │   └── ppt.js         # /ppt/download – PPT generation
│   └── controllers/
│       └── pptController.js
│
├── frontend/
│   ├── src/
│   │   ├── components/ChatUI.jsx
│   │   ├── components/PPTPreview.jsx
│   │   └── api.js
│   └── App.js
│
├── README.md
└── package.json
```

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-ppt-app.git
cd ai-ppt-app
```

### 2. Install dependencies
#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Set up environment variables
Create a `.env` file inside `backend/`:

```
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the application
#### Start backend
```bash
cd backend
npm run dev
```

#### Start frontend
```bash
cd ../frontend
npm start
```

---

## 🧠 API Endpoints

### 1. Generate Slide Content
**POST** `/chat/generate`
```json
{
  "prompt": "Create a presentation about Climate Change"
}
```
**Response**
```json
{
  "slides": [
    { "title": "Introduction", "bullets": ["Definition", "History"] },
    { "title": "Impacts", "bullets": ["Rising sea levels", "Extreme weather"] }
  ]
}
```

### 2. Download PPT
**POST** `/ppt/download`
```json
{
  "slides": [
    { "title": "Intro", "bullets": ["Point 1", "Point 2"] }
  ]
}
```
👉 Returns a downloadable `.pptx` file.

---

## ✏️ Editing Slides

- The frontend stores AI responses in a JSON structure.
- Users can provide **new prompts** to update existing slides.
- The updated JSON is passed again to `/ppt/download` to regenerate the PPT.

Example of dynamic edit:
```json
{
  "action": "update_slide",
  "slideIndex": 1,
  "newContent": {
    "title": "Updated Title",
    "bullets": ["New point 1", "New point 2"]
  }
}
```

---

## 📂 PPT Generation Logic

- The backend uses `pptxgenjs`:
```javascript
const pptx = new pptxgen();
slides.forEach(slide => {
  const s = pptx.addSlide();
  s.addText(slide.title, { x:1, y:0.5, fontSize:24, bold:true });
  slide.bullets.forEach((bullet, i) => {
    s.addText(`• ${bullet}`, { x:1, y:1 + (i*0.5), fontSize:18 });
  });
});
pptx.writeFile("Generated_Presentation.pptx");
```

---

## 🔗 Deployment

You can deploy:
- **Frontend:** Vercel / Netlify
- **Backend:** Render / Railway / Heroku
- Add the deployed URLs in this README.

---

## 📘 Usage Instructions

1. Open the application in your browser.
2. Type a prompt in the chat (e.g., “Create a presentation about AI Ethics”).
3. View the generated slides preview.
4. Edit slides by entering new prompts (e.g., “Add a slide about Challenges in AI Ethics”).
5. Click **Download PPT** to get the updated presentation.

---

## 📝 Deliverables

1. **README.md** (this file) – includes setup, usage, assumptions.
2. **Deployed Link** – live working demo.
3. **Public GitHub Repository** – full source code.

---

## ⚡ Assumptions

- The AI model returns structured JSON for slides.
- The PPT preview uses JSON data rendered in the frontend.
- For chat history, MongoDB or localStorage can be used (optional).

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m "Add new feature"`) 
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 🙌 Acknowledgments

- [Gemini Reasoning Model](https://ai.google.dev/gemini-api)
- [pptxgenjs](https://gitbrent.github.io/PptxGenJS/)
- [MagicSlides AI-Slide](https://www.magicslides.app/dashboard/ai-slide) – UI inspiration
