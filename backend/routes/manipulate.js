const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const manipulateController = require('../controllers/manipulateController');

// Merge PDFs
router.post('/merge', upload.array('files', 10), manipulateController.mergePdfs);

// Split PDF
router.post('/split', upload.single('file'), manipulateController.splitPdf);

// Compress PDF
router.post('/compress', upload.single('file'), manipulateController.compressPdf);

// Rotate pages
router.post('/rotate', upload.single('file'), manipulateController.rotatePdf);

// Reorder pages
router.post('/reorder', upload.single('file'), manipulateController.reorderPdf);

module.exports = router;
