import axios from 'axios'

const API_BASE_URL = 'https://pdf-converter-1-kk6k.onrender.com/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5 minutes timeout for large files
})

export const convertApi = {
  pdfToImage: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/convert/pdf-to-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    })
  },
  
  pdfToWord: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/convert/pdf-to-word', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    })
  },
  
  pdfToExcel: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/convert/pdf-to-excel', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    })
  },
  
  imageToPdf: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/convert/image-to-pdf', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    })
  },
  
  wordToPdf: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/convert/word-to-pdf', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    })
  }
}

export const manipulateApi = {
  mergePdfs: (files) => {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append('files', file)
    })
    return api.post('/manipulate/merge', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    })
  },
  
  splitPdf: (file, startPage, endPage) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('startPage', startPage)
    formData.append('endPage', endPage)
    return api.post('/manipulate/split', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    })
  },
  
  compressPdf: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/manipulate/compress', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    })
  },
  
  rotatePdf: (file, pages, angle) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('pages', pages)
    formData.append('angle', angle)
    return api.post('/manipulate/rotate', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    })
  },
  
  reorderPdf: (file, pageOrder) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('pageOrder', JSON.stringify(pageOrder))
    return api.post('/manipulate/reorder', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    })
  }
}

export const extractApi = {
  extractText: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/extract/text', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  extractImages: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/extract/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    })
  },
  
  performOcr: (file, language = 'eng') => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('language', language)
    return api.post('/extract/ocr', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  extractMetadata: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/extract/metadata', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

export default api
