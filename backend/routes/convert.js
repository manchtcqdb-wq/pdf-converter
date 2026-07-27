const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const convertController = require('../controllers/convertController');

// PDF to Image
router.post('/pdf-to-image', upload.single('file'), convertController.pdfToImage);

// PDF to Word
router.post('/pdf-to-word', upload.single('file'), convertController.pdfToWord);

// PDF to Excel
router.post('/pdf-to-excel', upload.single('file'), convertController.pdfToExcel);

// Image to PDF
router.post('/image-to-pdf', upload.single('file'), convertController.imageToPdf);

// Word to PDF
router.post('/word-to-pdf', upload.single('file'), convertController.wordToPdf);

module.exports = router;
