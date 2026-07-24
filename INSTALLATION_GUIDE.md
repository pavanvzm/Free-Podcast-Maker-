# Installation and Execution Guide

## DeepDive AI Podcast

This guide provides step-by-step instructions for installing, running, and deploying the DeepDive AI Podcast application.

---

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Quick Start](#quick-start)
3. [Detailed Installation](#detailed-installation)
4. [Running Locally](#running-locally)
5. [Building for Production](#building-for-production)
6. [Deployment Options](#deployment-options)
7. [Troubleshooting](#troubleshooting)
8. [FAQ](#faq)

---

## System Requirements

### Minimum Requirements

- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher (comes with Node.js)
- **Browser**: Chrome 88+, Firefox 85+, Safari 14+, or Edge 88+
- **RAM**: 4GB minimum
- **Storage**: 500MB free space

### Recommended Requirements

- **Node.js**: Version 20 LTS
- **Browser**: Latest version of Chrome or Firefox
- **RAM**: 8GB or more
- **Internet**: Stable connection for API calls

---

## Quick Start

For experienced developers:

```bash
# Clone repository
git clone <repository-url>
cd deepdive-ai-podcast

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Detailed Installation

### Step 1: Install Node.js

#### Windows/macOS

1. Download from [nodejs.org](https://nodejs.org/)
2. Run the installer
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### Linux (Ubuntu/Debian)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Linux (Fedora/RHEL)

```bash
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs
```

### Step 2: Clone the Repository

```bash
git clone <your-repository-url>
cd deepdive-ai-podcast
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install:
- React 18
- Vite 5
- All required dependencies

### Step 4: Verify Installation

Check that all files are present:

```bash
ls -la
# Should show: src/, public/, package.json, index.html, etc.

ls src/
# Should show: App.jsx, App.css, main.jsx, index.css
```

---

## Running Locally

### Development Mode

```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Access the Application

1. Open your browser
2. Navigate to `http://localhost:5173`
3. You should see the DeepDive AI Podcast interface

### Development Features

- **Hot Module Replacement (HMR)**: Changes reflect instantly
- **Source Maps**: Debug original source code
- **Error Overlay**: See errors in the browser

---

## Building for Production

### Create Production Build

```bash
npm run build
```

**Output:**
- Creates `dist/` directory
- Optimized and minified assets
- Ready for deployment

### Preview Production Build

```bash
npm run preview
```

Access at `http://localhost:4173`

### Build Output Structure

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── vite.svg
```

---

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow prompts to complete deployment

**Free Tier**: ✅ Available

### Option 2: Netlify

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

**Free Tier**: ✅ Available

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm i -g gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/deepdive-ai-podcast"
   }
   ```

3. Deploy:
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

**Free Tier**: ✅ Available

### Option 4: Static Hosting

Upload `dist/` folder to any static host:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Blob Storage
- DigitalOcean Spaces

---

## Troubleshooting

### Issue: "npm command not found"

**Solution:**
```bash
# Reinstall Node.js from nodejs.org
# Or use nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
```

### Issue: Port 5173 already in use

**Solution:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Issue: CORS errors with API calls

**Solution:**
- Some free APIs may have CORS restrictions
- Use a CORS proxy or configure API endpoints
- Check browser console for specific error messages

### Issue: Audio not playing

**Solution:**
- Ensure browser supports Web Audio API
- Check browser permissions for audio playback
- Try a different browser (Chrome recommended)

### Issue: Build fails

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Slow performance

**Solution:**
- Close other browser tabs
- Ensure sufficient RAM available
- Use production build for testing

---

## FAQ

### Q: Is this really 100% free?

**A:** Yes! The app uses:
- Free tier AI models (NVIDIA, Groq)
- Browser-native Web Speech API
- No paid services required

### Q: Do I need an API key?

**A:** No! The app is designed to work without API keys using free-tier endpoints.

### Q: How long are the podcasts?

**A:** Target duration is 25-30 minutes (approximately 4,500-5,000 words at 150 wpm).

### Q: Can I customize the voices?

**A:** The app automatically selects distinct browser voices. Custom voice selection is planned for future updates.

### Q: What if the API is rate-limited?

**A:** The app automatically falls back to alternative free models.

### Q: Is my data private?

**A:** Yes! No user data is stored server-side. All processing happens in your browser.

### Q: Can I use this commercially?

**A:** Yes, under the MIT License. However, verify compliance with free API terms of service.

### Q: How do I report bugs?

**A:** Open an issue on the GitHub repository.

---

## Support

For additional help:

1. Check existing GitHub Issues
2. Read the README.md
3. Review browser console for errors
4. Contact maintainers via GitHub

---

**Last Updated**: 2024
**Version**: 1.0.0
