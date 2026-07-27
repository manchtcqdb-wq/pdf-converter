import React, { useState } from 'react'
import { manipulateApi } from '../services/api'

export default function ManipulationTab() {
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [manipulationType, setManipulationType] = useState('merge')
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(5)
  const [angle, setAngle] = useState(90)

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files)
  }

  const handleManipulate = async () => {
    if (!selectedFiles) {
      setMessage('Please select file(s)')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      let response

      switch (manipulationType) {
        case 'merge':
          if (selectedFiles.length < 2) {
            throw new Error('Please select at least 2 files for merging')
          }
          response = await manipulateApi.mergePdfs(Array.from(selectedFiles))
          break
        case 'split':
          response = await manipulateApi.splitPdf(selectedFiles[0], startPage, endPage)
          break
        case 'compress':
          response = await manipulateApi.compressPdf(selectedFiles[0])
          break
        case 'rotate':
          response = await manipulateApi.rotatePdf(selectedFiles[0], 'all', angle)
          break
        default:
          throw new Error('Invalid manipulation type')
      }

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `result-${Date.now()}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)

      setMessage('Operation successful!')
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="tools-grid">
      <div className="tool-card">
        <h3>🔧 PDF Manipulation</h3>
        <p>Merge, split, compress, rotate, and reorder PDF pages</p>

        <select
          value={manipulationType}
          onChange={(e) => setManipulationType(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}
        >
          <option value="merge">Merge PDFs</option>
          <option value="split">Split PDF</option>
          <option value="compress">Compress PDF</option>
          <option value="rotate">Rotate Pages</option>
        </select>

        {manipulationType === 'split' && (
          <div style={{ marginBottom: '15px' }}>
            <div style={{ marginBottom: '10px' }}>
              <label>Start Page: {startPage}</label>
              <input
                type="range"
                min="1"
                max="100"
                value={startPage}
                onChange={(e) => setStartPage(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label>End Page: {endPage}</label>
              <input
                type="range"
                min="1"
                max="100"
                value={endPage}
                onChange={(e) => setEndPage(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        )}

        {manipulationType === 'rotate' && (
          <div style={{ marginBottom: '15px' }}>
            <label>Rotation Angle: {angle}°</label>
            <select
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            >
              <option value="90">90°</option>
              <option value="180">180°</option>
              <option value="270">270°</option>
            </select>
          </div>
        )}

        <label htmlFor="manipulate-input" className="upload-area">
          <div className="upload-icon">📁</div>
          <div className="upload-text">Click to upload</div>
          <div className="upload-subtext">
            {manipulationType === 'merge' ? 'Select multiple PDF files' : 'Select a PDF file'}
          </div>
          <input
            id="manipulate-input"
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            multiple={manipulationType === 'merge'}
          />
        </label>

        {selectedFiles && (
          <div style={{ marginBottom: '15px' }}>
            <strong>Selected: {selectedFiles.length} file(s)</strong>
          </div>
        )}

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <button onClick={handleManipulate} disabled={!selectedFiles || loading}>
          {loading ? <span className="spinner"></span> : 'Process'}
        </button>
      </div>
    </div>
  )
}
