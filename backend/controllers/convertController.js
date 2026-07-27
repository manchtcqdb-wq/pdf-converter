const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const sharp = require('sharp');

// PDF to Image
exports.pdfToImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Note: Full PDF to Image conversion requires pdf2image or similar library
    // This is a placeholder that returns an error with installation instructions
    return res.status(501).json({
      error: 'PDF to Image conversion requires additional setup',
      message: 'Please install: npm install pdf2pic',
      note: 'This feature requires system dependencies. Consider using cloud APIs like CloudConvert or Zamzar'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PDF to Word
exports.pdfToWord = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    return res.status(501).json({
      error: 'PDF to Word conversion requires additional setup',
      message: 'Please install: npm install mammoth pdf-parse',
      note: 'Consider using: LibreOffice, Pandoc, or cloud APIs'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PDF to Excel
exports.pdfToExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    return res.status(501).json({
      error: 'PDF to Excel conversion requires additional setup',
      message: 'Please install: npm install pdf-parse xlsx',
      note: 'Extracting tables from PDF is complex. Consider using cloud APIs'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Image to PDF - This one we can actually implement!
exports.imageToPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const inputPath = req.file.path;
    const outputFileName = `converted-${Date.now()}.pdf`;
    const outputPath = path.join(__dirname, '../uploads', outputFileName);

    // Create a new PDF document
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);

    // Get image dimensions to fit in PDF
    const imageBuffer = fs.readFileSync(inputPath);
    const metadata = await sharp(imageBuffer).metadata();

    // Add image to PDF
    doc.image(inputPath, {
      fit: [600, 800],
      align: 'center',
      valign: 'center'
    });

    doc.end();

    stream.on('finish', () => {
      // Send the PDF file
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="converted-image.pdf"`);
      
      const pdfStream = fs.createReadStream(outputPath);
      pdfStream.pipe(res);

      // Clean up uploaded image after sending
      pdfStream.on('end', () => {
        fs.unlinkSync(inputPath);
      });
    });

    stream.on('error', (err) => {
      res.status(500).json({ error: 'Failed to create PDF: ' + err.message });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Word to PDF
exports.wordToPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    return res.status(501).json({
      error: 'Word to PDF conversion requires additional setup',
      message: 'Options: 1) npm install libreoffice 2) Use cloud APIs',
      note: 'Requires LibreOffice backend for proper conversion'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
