# Deployment Checklist for Render

## Prerequisites
- Backend deployed on Render
- Frontend deployed on Vercel
- GitHub repository connected to both services

## Backend Deployment Steps on Render

### 1. Create New Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository (manchtcqdb-wq/pdf-converter)
4. Configure the service:
   - **Name**: pdf-converter-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: 18

### 2. Environment Variables
Add these in Render Dashboard → Environment:
```
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-frontend-url.vercel.app
```

### 3. Important Settings
- **Plan**: Free or Paid (Free tier has 0.5 GB RAM)
- **Auto-deploy**: Enable from main branch
- **Health Check**: Set to `/api/health`

### 4. Deploy
Click "Create Web Service" - Render will automatically deploy

## Frontend Configuration (Already on Vercel)

### Update API Endpoint
In `frontend/src/services/api.js`, update the base URL:
```javascript
const API_BASE_URL = 'https://your-render-backend-url.onrender.com/api'
```

Replace `your-render-backend-url` with your actual Render service URL (e.g., `https://pdf-converter-backend.onrender.com`)

## Testing After Deployment

### 1. Test Backend Health Check
```bash
curl https://your-render-url.onrender.com/api/health
```

### 2. Test Frontend
- Open your Vercel frontend URL
- Try uploading an image and converting to PDF
- Check browser console for errors

### 3. Troubleshooting
If file conversion fails:
1. Check Render logs: Dashboard → Logs
2. Check browser network tab (F12 → Network)
3. Verify CORS is properly configured
4. Ensure backend URL is correct in frontend

## Common Issues & Solutions

### Issue: CORS Error
**Solution**: Update CORS_ORIGIN in Render environment variables with your Vercel URL

### Issue: File Upload Fails
**Solution**: Check Render logs for file size limits. Default multer limit is 100MB.

### Issue: PDF Not Converting
**Solution**: Image to PDF works. Other conversions need cloud APIs like:
- CloudConvert
- Zamzar
- Adobe PDF Services

### Issue: Service crashes after 15 minutes (Free tier)
**Solution**: Upgrade to paid plan or use background job queue for long processing

## Security Checklist
- [ ] Remove sensitive data from code
- [ ] Set proper NODE_ENV=production
- [ ] Enable HTTPS (automatic on Render)
- [ ] Validate file uploads (size, type)
- [ ] Add rate limiting for production
- [ ] Regular backup of important files

## Next Steps for Full Functionality

1. **Implement Real PDF Conversions**:
   - Use CloudConvert API for PDF conversions
   - Use LibreOffice for Word/Excel conversion
   - Use Tesseract.js for OCR

2. **Add Payment Gateway** (if needed):
   - Stripe for payments
   - Quota system for free users

3. **Improve Error Handling**:
   - Better error messages
   - Logging system
   - Email notifications

4. **Add Caching**:
   - Redis for temporary file storage
   - Cache converted files

## Useful Resources
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [React Best Practices](https://react.dev/)
