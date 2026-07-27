# 📄 PDF Converter Tool

A full-stack web application for converting, manipulating, and extracting content from PDF and image files.

## 🌟 Features

### 📝 Conversion
- Image to PDF conversion ✅ (Working)
- PDF to Image (requires additional setup)
- PDF to Word document (requires additional setup)
- PDF to Excel spreadsheet (requires additional setup)
- Word to PDF conversion (requires additional setup)

### 🔧 Manipulation
- **Merge PDFs**: Combine multiple PDF files into one
- **Split PDF**: Extract specific pages from a PDF
- **Compress PDF**: Reduce file size
- **Rotate Pages**: Rotate PDF pages by 90°, 180°, or 270°
- **Reorder Pages**: Rearrange PDF pages in any order

### 📖 Document Management
- Extract text from PDFs
- Extract images from PDFs
- OCR (Optical Character Recognition) - supports 7 languages
- Extract metadata from documents

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload handling
- **PDFKit** - PDF generation
- **Sharp** - Image processing
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Git

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/manchtcqdb-wq/pdf-converter.git
cd pdf-converter/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Update .env file**
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

5. **Start the server**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd ../frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

4. **Update API endpoint** (if backend is on different URL)
Edit `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url/api'
```

## 🚀 Deployment

### Deploy Backend on Render
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Deploy

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

### Deploy Frontend on Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

## 📁 Project Structure

```
pdf-converter/
├── backend/
│   ├── controllers/
│   │   ├── convertController.js
│   │   ├── manipulateController.js
│   │   └── extractController.js
│   ├── routes/
│   │   ├── convert.js
│   │   ├── manipulate.js
│   │   └── extract.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConversionTab.jsx
│   │   │   ├── ManipulationTab.jsx
│   │   │   └── ExtractionTab.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
├── DEPLOYMENT_GUIDE.md
└── README.md
```

## 🔌 API Endpoints

### Conversion Routes
- `POST /api/convert/pdf-to-image` - Convert PDF to images
- `POST /api/convert/pdf-to-word` - Convert PDF to Word
- `POST /api/convert/pdf-to-excel` - Convert PDF to Excel
- `POST /api/convert/image-to-pdf` - Convert image to PDF ✅
- `POST /api/convert/word-to-pdf` - Convert Word to PDF

### Manipulation Routes
- `POST /api/manipulate/merge` - Merge multiple PDFs
- `POST /api/manipulate/split` - Split PDF pages
- `POST /api/manipulate/compress` - Compress PDF
- `POST /api/manipulate/rotate` - Rotate PDF pages
- `POST /api/manipulate/reorder` - Reorder PDF pages

### Extraction Routes
- `POST /api/extract/text` - Extract text from PDF
- `POST /api/extract/images` - Extract images from PDF
- `POST /api/extract/ocr` - Perform OCR on document
- `POST /api/extract/metadata` - Extract PDF metadata

### Health Check
- `GET /api/health` - Server health status

## 💡 Usage Examples

### Convert Image to PDF
```javascript
const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('http://localhost:5000/api/convert/image-to-pdf', {
  method: 'POST',
  body: formData
});

const pdfBlob = await response.blob();
```

### Merge Multiple PDFs
```javascript
const formData = new FormData();
pdfFiles.forEach(file => {
  formData.append('files', file);
});

const response = await fetch('http://localhost:5000/api/manipulate/merge', {
  method: 'POST',
  body: formData
});
```

## ⚙️ Configuration

### File Upload Limits
Edit `backend/server.js` to change file size limits:
```javascript
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
```

### CORS Configuration
Edit `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
```

## 🐛 Troubleshooting

### Issue: "No file uploaded" error
- Ensure file is being sent with form-data
- Check multer configuration in routes

### Issue: CORS errors
- Update `CORS_ORIGIN` in environment variables
- Ensure frontend URL is whitelisted

### Issue: Large files timeout
- Increase timeout in backend: `app.use(express.json({ limit: '100mb' }))`
- Increase timeout in Axios: `timeout: 300000`

### Issue: Conversions not working
- Some conversions require external libraries
- See "Advanced Setup" section below

## 🚀 Advanced Setup

### Enable Full PDF Conversion Support

#### PDF to Image
```bash
npm install pdf2pic
```
Requires ImageMagick system dependency

#### PDF to Word
```bash
npm install mammoth pdf-parse
```

#### OCR Support
```bash
npm install tesseract.js
```

#### LibreOffice Conversion
```bash
npm install libreoffice-convert
```
Requires LibreOffice system package

### Using Cloud APIs (Recommended for Production)

For production, use cloud conversion APIs:

**CloudConvert API Integration**
```javascript
const convertWithCloudConvert = async (file, outputFormat) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('output_format', outputFormat);

  const response = await axios.post(
    'https://api.cloudconvert.com/v2/convert',
    formData,
    {
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDCONVERT_API_KEY}`,
        ...formData.getHeaders()
      }
    }
  );
  return response.data;
};
```

**Zamzar API Integration**
```javascript
const convertWithZamzar = async (file, targetFormat) => {
  const formData = new FormData();
  formData.append('source_file', file);
  formData.append('target_format', targetFormat);

  const response = await axios.post(
    'https://api.zamzar.com/v1/jobs',
    formData,
    {
      auth: {
        username: process.env.ZAMZAR_API_KEY,
        password: ''
      }
    }
  );
  return response.data;
};
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub or contact the maintainer.

## 🎯 Roadmap

- [ ] Watermark support
- [ ] Batch processing
- [ ] Advanced OCR with language selection
- [ ] File encryption/password protection
- [ ] Cloud storage integration (AWS S3, Google Drive)
- [ ] User authentication system
- [ ] Payment integration for premium features
- [ ] API rate limiting
- [ ] File processing queue system

## ✨ Future Enhancements

1. **Database Integration**
   - User accounts and file history
   - Save conversion presets
   - Track usage statistics

2. **Performance Improvements**
   - WebWorkers for heavy processing
   - Streaming large files
   - Caching converted files

3. **UI Enhancements**
   - Drag & drop multiple files
   - Progress bars for conversions
   - Real-time preview
   - Dark mode

4. **Security**
   - File encryption
   - Automatic file deletion
   - HTTPS enforcement
   - Rate limiting

## 🔐 Security Considerations

- Upload files are stored temporarily in `backend/uploads/`
- Files are automatically cleaned up after conversion
- Validate file types and sizes on both frontend and backend
- Use environment variables for sensitive data
- Enable HTTPS in production

---

**Made with ❤️ using React & Node.js**

Last Updated: July 2026
