# PDF Converter Tool

A full-stack web application for PDF conversion, manipulation, and document management.

## Features

### PDF Conversion
- 📄 PDF to Image (PNG, JPG)
- 📝 PDF to Word (DOCX)
- 📊 PDF to Excel (XLSX)
- 🖼️ Image to PDF
- 📋 Word to PDF

### PDF Manipulation
- 🔗 Merge PDFs
- ✂️ Split PDFs
- 📉 Compress PDFs
- 🔄 Rotate Pages
- 📑 Reorder Pages

### Document Management
- 📖 Extract Text from PDF
- 🖼️ Extract Images from PDF
- 🔍 OCR (Optical Character Recognition)
- 📊 PDF Metadata Extraction

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- pdf-lib (PDF manipulation)
- pdfparse (PDF text extraction)
- sharp (Image processing)
- libreoffice (Document conversion)
- tesseract.js (OCR)

## Project Structure

```
pdf-converter/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js Express server
│   ├── routes/              # API routes
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   ├── uploads/             # Temporary file storage
│   ├── server.js            # Main server file
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`

## API Endpoints

### PDF Conversion
- `POST /api/convert/pdf-to-image` - Convert PDF to Images
- `POST /api/convert/pdf-to-word` - Convert PDF to Word
- `POST /api/convert/pdf-to-excel` - Convert PDF to Excel
- `POST /api/convert/image-to-pdf` - Convert Image to PDF
- `POST /api/convert/word-to-pdf` - Convert Word to PDF

### PDF Manipulation
- `POST /api/manipulate/merge` - Merge multiple PDFs
- `POST /api/manipulate/split` - Split PDF by page range
- `POST /api/manipulate/compress` - Compress PDF
- `POST /api/manipulate/rotate` - Rotate PDF pages
- `POST /api/manipulate/reorder` - Reorder PDF pages

### Document Management
- `POST /api/extract/text` - Extract text from PDF
- `POST /api/extract/images` - Extract images from PDF
- `POST /api/extract/ocr` - OCR on PDF/Image
- `POST /api/extract/metadata` - Get PDF metadata

## Usage

1. Start the backend server
2. Start the frontend development server
3. Open browser and navigate to `http://localhost:5173`
4. Upload files and select desired conversion/manipulation

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License

## Support

For issues or questions, please open an issue on GitHub.
