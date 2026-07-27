import React, { useState } from 'react'
import { extractApi } from '../services/api'

export default function ExtractionTab() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [extractionType, setExtractionType] = useState('text')
  const [extractedContent, setExtractedContent] = useState('')
  const [language, setLanguage] = useState('eng')

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleExtract = async () => {
    if (!selectedFile) {
      setMessage('Please select a file')
      return
    }

    setLoading(true)
    setMessage('')
    setExtractedContent('')

    try {
      let response

      switch (extractionType) {
        case 'text':
          response = await extractApi.extractText(selectedFile)
          setExtractedContent(response.data.text || JSON.stringify(response.data, null, 2))
          break
        case 'images':
          response = await extractApi.extractImages(selectedFile)
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `images-${Date.now()}.zip`)
          document.body.appendChild(link)
          link.click()
          link.parentNode.removeChild(link)
          setExtractedContent('Images extracted and downloaded')
          break
        case 'ocr':
          response = await extractApi.performOcr(selectedFile, language)
          setExtractedContent(response.data.text || JSON.stringify(response.data, null, 2))
          break
        case 'metadata':
          response = await extractApi.extractMetadata(selectedFile)
          setExtractedContent(JSON.stringify(response.data, null, 2))
          break
        default:
          throw new Error('Invalid extraction type')
      }

      setMessage('Extraction successful!')
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="tools-grid">
      <div className="tool-card">
        <h3>📖 Document Management</h3>
        <p>Extract text, images, perform OCR, and get metadata from documents</p>

        <select
          value={extractionType}
          onChange={(e) => setExtractionType(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}
        >
          <option value="text">Extract Text</option>
          <option value="images">Extract Images</option>
          <option value="ocr">OCR (Optical Character Recognition)</option>
          <option value="metadata">Extract Metadata</option>
        </select>

        {extractionType === 'ocr' && (
          <div style={{ marginBottom: '15px' }}>
            <label>Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            >
              <option value="eng">English</option>
              <option value="fra">French</option>
              <option value="deu">German</option>
              <option value="spa">Spanish</option>
              <option value="por">Portuguese</option>
              <option value="chi_sim">Chinese Simplified</option>
              <option value="chi_tra">Chinese Traditional</option>
            </select>
          </div>
        )}

        <label htmlFor="extract-input" className="upload-area">
          <div className="upload-icon">📁</div>
          <div className="upload-text">Click to upload</div>
          <div className="upload-subtext">Select a PDF or image file</div>
          <input
            id="extract-input"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </label>

        {selectedFile && (
          <div style={{ marginBottom: '15px' }}>
            <strong>Selected: {selectedFile.name}</strong>
          </div>
        )}

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <button onClick={handleExtract} disabled={!selectedFile || loading}>
          {loading ? <span className="spinner"></span> : 'Extract'}
        </button>

        {extractedContent && (
          <div style={{
            marginTop: '15px',
            padding: '15px',
            background: '#f8f9ff',
            borderRadius: '8px',
            maxHeight: '300px',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '0.9rem'
          }}>
            {extractedContent}
          </div>
        )}
      </div>
    </div>
  )
}
