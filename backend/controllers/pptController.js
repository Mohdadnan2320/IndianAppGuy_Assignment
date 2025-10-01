const PptxGenJS = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

exports.downloadPpt = async (req, res) => {
  try {
    const { slideData } = req.body;
    if (!slideData || !slideData.slides || !Array.isArray(slideData.slides)) {
      return res.status(400).json({ error: "Invalid slide data" });
    }

    const pptx = new PptxGenJS();

    slideData.slides.forEach((s, index) => {
      const slide = pptx.addSlide();

      if (s.color) {
        slide.background = { color: "1F2937" };
      } else {
        slide.background = { color: "1F2937" };
      }

      if (s.title) {
        slide.addText(`${s.emoji || ""} ${s.title}`, {
          x: 0.5,
          y: 0.3,
          fontSize: 28,
          bold: true,
          color: "FFFFFF",
          align: "left",
        });
      }

      if (s.subtitle) {
        slide.addText(s.subtitle, {
          x: 0.5,
          y: 0.8,
          fontSize: 20,
          color: "EEEEEE",
          italic: true,
          align: "left",
        });
      }

      if (Array.isArray(s.bullets) && s.bullets.length > 0) {
        slide.addText(s.bullets.join("\n"), {
          x: 0.5,
          y: 1.5,
          fontSize: 16,
          color: "FFFFFF",
          bullet: true,
          margin: 0.05,
          align: "left",
        });
      }

      if (s.image) {
        slide.addImage({
          path: s.image,
          x: 6,
          y: 1,
          w: 3,
          h: 3,
        });
      }

      if (s.notes) {
        slide.addNotes(s.notes);
      }
    });

    const slidesDir = path.join(__dirname, "../slides");
    if (!fs.existsSync(slidesDir)) fs.mkdirSync(slidesDir);

    const fileName = `slides-${Date.now()}.pptx`;
    const filePath = path.join(slidesDir, fileName);

    await pptx.writeFile({ fileName: filePath });

    res.download(filePath, fileName, (err) => {
      if (err) console.error("Download error:", err);
      fs.unlink(filePath, () => {});
    });
  } catch (err) {
    console.error("PPT generation error:", err);
    res.status(500).json({ error: "PPT download failed" });
  }
};
