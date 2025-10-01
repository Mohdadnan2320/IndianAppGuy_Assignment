const express = require('express');
const { downloadPpt } = require('../controllers/pptController');

const router = express.Router();

router.post('/download', downloadPpt);

module.exports = router;