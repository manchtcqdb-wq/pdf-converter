import React, { useState } from 'react'
import ConversionTab from './components/ConversionTab'
import ManipulationTab from './components/ManipulationTab'
import ExtractionTab from './components/ExtractionTab'

function App() {
  const [activeTab, setActiveTab] = useState('conversion')

  return (
    <div className="container">
      <div className="header">
        <h1>📄 PDF Converter Tool</h1>
        <p>Your all-in-one solution for PDF conversion, manipulation, and document management</p>
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'conversion' ? 'active' : ''}`}
          onClick={() => setActiveTab('conversion')}
        >
          📝 Convert
        </button>
        <button
          className={`tab-button ${activeTab === 'manipulation' ? 'active' : ''}`}
          onClick={() => setActiveTab('manipulation')}
        >
          🔧 Manipulate
        </button>
        <button
          className={`tab-button ${activeTab === 'extraction' ? 'active' : ''}`}
          onClick={() => setActiveTab('extraction')}
        >
          📖 Extract
        </button>
      </div>

      {activeTab === 'conversion' && <ConversionTab />}
      {activeTab === 'manipulation' && <ManipulationTab />}
      {activeTab === 'extraction' && <ExtractionTab />}

      <div className="footer">
        <p>© 2024 PDF Converter Tool. All rights reserved.</p>
        <p>Made with ❤️ using React & Node.js</p>
      </div>
    </div>
  )
}

export default App
