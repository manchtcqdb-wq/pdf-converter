import React, { useState } from 'react'
import { convertApi } from '../services/api'

export default function ConversionTab() {
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversionType, setConversionType] = useState('pdf-to-image')

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files)
  }

  const handleConvert = async () => {
    if (!selectedFiles) {
      setMessage('Please select a file')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const file = selectedFiles[0]
      let response

      switch (conversionType) {
        case 'pdf-to-image':
          response = await convertApi.pdfToImage(file)
          break
        case 'pdf-to-word':
          response = await convertApi.pdfToWord(file)
          break
        case 'pdf-to-excel':
          response = await convertApi.pdfToExcel(file)
          break
        case 'image-to-pdf':
          response = await convertApi.imageToPdf(file)
          break
        case 'word-to-pdf':
          response = await convertApi.wordToPdf(file)
          break
        default:
          throw new Error('Invalid conversion type')
      }

      // Download the file
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `converted-file-${Date.now()}`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)

      setMessage('Conversion successful!')
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="tools-grid">
      <div className="tool-card">
        <h3>📄 PDF Conversion</h3>
        <p>Convert PDFs to images, Word documents, or Excel spreadsheets</p>

        <select
          value={conversionType}
          onChange={(e) => setConversionType(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}
        >
          <option value="pdf-to-image">PDF to Image</option>
          <option value="pdf-to-word">PDF to Word</option>
          <option value="pdf-to-excel">PDF to Excel</option>
          <option value="image-to-pdf">Image to PDF</option>
          <option value="word-to-pdf">Word to PDF</option>
        </select>

        <label htmlFor="file-input" className="upload-area">
          <div className="upload-icon">📁</div>
          <div className="upload-text">Click to upload</div>
          <div className="upload-subtext">or drag and drop your file here</div>
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx"
          />
        </label>

        {selectedFiles && (
          <div>
            <strong>Selected: {selectedFiles[0].name}</strong>
          </div>
        )}

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <button onClick={handleConvert} disabled={!selectedFiles || loading}>
          {loading ? <span className="spinner"></span> : 'Convert'}
        </button>
      </div>
    </div>
  )
}
