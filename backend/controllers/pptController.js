const PptxGenJS = require("pptxgenjs");

exports.downloadPpt = async (req, res) => {
  try {
    const { slideData } = req.body;
    if (!slideData || !slideData.slides || !Array.isArray(slideData.slides)) {
      return res.status(400).json({ error: "Invalid slide data" });
    }

    const pptx = new PptxGenJS();

    slideData.slides.forEach((s) => {
      const slide = pptx.addSlide();

      slide.background = { color: "1F2937" };

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

      if (s.notes) slide.addNotes(s.notes);
    });

    const pptBuffer = await pptx.write("nodebuffer");
    
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=presentation.pptx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    );

    res.send(pptBuffer);
  } catch (err) {
    console.error("PPT generation error:", err);
    res.status(500).json({ error: "PPT download failed" });
  }
};
