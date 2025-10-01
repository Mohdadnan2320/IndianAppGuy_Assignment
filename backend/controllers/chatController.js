const {generateSlidesFromPrompt} = require('../services/llmService');

exports.handleChatPrompt = async (req, res) => {
    try {
        const { prompt } = req.body;
        const slideJson = await generateSlidesFromPrompt(prompt);
        res.json(slideJson);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Slide generation failed' });
    }
}
