const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const extractController = require('../controllers/extractController');

// Extract text
router.post('/text', upload.single('file'), extractController.extractText);

// Extract images
router.post('/images', upload.single('file'), extractController.extractImages);

// OCR
router.post('/ocr', upload.single('file'), extractController.performOcr);

// Extract metadata
router.post('/metadata', upload.single('file'), extractController.extractMetadata);

module.exports = router;
