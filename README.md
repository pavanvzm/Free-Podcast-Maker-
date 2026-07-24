# 🎙️ DeepDive AI Podcast

A minimalist, single-page web application that generates **25–30 minute podcasts** from a single topic input. Built with React + Vite, using 100% free AI models and browser-native technologies.

![DeepDive AI Podcast](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- **AI-Generated Scripts**: 4,500–5,000 word podcast scripts using free LLM APIs
- **Multiple Free Models**: Automatic fallback between NVIDIA Nemotron, Google Gemma, and Llama models
- **Browser-Native TTS**: Web Speech API for zero-cost voice synthesis
- **Audio Export**: Download podcasts as WAV files
- **Dark Mode UI**: Minimalist, centered design with smooth animations
- **Privacy-First**: No user data stored server-side
- **100% Free**: No API keys, no sign-ups, no costs

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern browser with Web Audio API support

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd deepdive-ai-podcast

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages

The project is configured for GitHub Pages deployment. After building:

1. Run `npm run build`
2. The `dist/` folder contains the production build
3. Push the `gh-pages` branch to GitHub:
   ```bash
   git checkout gh-pages
   git add -A
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages --force
   ```
4. Enable GitHub Pages in your repo settings (Settings → Pages → Source: gh-pages branch)
5. Your app will be live at: `https://<username>.github.io/deepdive-ai-podcast/`

## 🌐 Live Demo

Visit the live demo at: `https://<username>.github.io/deepdive-ai-podcast/`

## 📖 How It Works

### 1. Script Generation

The app uses a structured prompt template to generate a 5,000-word podcast script:

```javascript
const FREE_MODELS = [
  { name: 'NVIDIA Nemotron-4-Mini', endpoint: '...', model: '...' },
  { name: 'Google Gemma-2', endpoint: '...', model: '...' },
  { name: 'Llama-3.1', endpoint: '...', model: '...' }
]
```

**Prompt Structure:**
- Intro (2 min)
- Historical Context (8 min)
- Deep Analysis (10 min)
- Modern Impact (7 min)
- Conclusion (3 min)

### 2. Model Fallback System

If one model is rate-limited or fails, the app automatically tries the next:

```javascript
for (const model of FREE_MODELS) {
  try {
    // Attempt API call
  } catch (error) {
    continue // Try next model
  }
}
```

### 3. Voice Synthesis

Uses Web Speech API with distinct voices for Host A and Host B:

```javascript
const selectVoices = (voices) => {
  const maleVoice = voices.find(v => v.name.includes('Male') || ...)
  const femaleVoice = voices.find(v => v.name.includes('Female') || ...)
  return { hostA: maleVoice, hostB: femaleVoice }
}
```

### 4. Audio Assembly

Generates WAV audio using Web Audio API's OfflineAudioContext for efficient rendering.

## 🛠️ Supported Free Models

| Model | Provider | Status |
|-------|----------|--------|
| NVIDIA Nemotron-4-Mini | NVIDIA NIM | ✅ Free Tier |
| Google Gemma-2 | Groq | ✅ Free Tier |
| Llama-3.1-70B | Groq | ✅ Free Tier |

*Note: Free tiers may have rate limits. The app implements automatic retry and model rotation.*

## 📁 Project Structure

```
deepdive-ai-podcast/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Styles (dark mode, responsive)
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## 🎨 Design Features

- **Centered Layout**: Focus on the input experience
- **Gradient Accents**: Purple/indigo color scheme
- **Smooth Animations**: Fade-in, spin, and hover effects
- **Responsive**: Mobile-first design (works on all screen sizes)
- **Accessibility**: Semantic HTML, keyboard navigation

## 🔒 Privacy & Security

- **No Server Storage**: All processing happens client-side
- **No User Data**: Topics are not logged or tracked
- **CORS Handling**: Direct API calls to free endpoints
- **Open Source**: Fully auditable codebase

## ⚠️ Limitations

1. **Rate Limits**: Free API tiers have usage limits
2. **Browser TTS Quality**: Web Speech API voices vary by browser/OS
3. **Audio Duration**: Demo creates synthesized tones (full TTS recording requires additional setup)
4. **Word Count Validation**: Scripts under 3,000 words trigger regeneration

## 🚧 Future Enhancements

- [ ] Piper TTS WASM integration for higher-quality offline voices
- [ ] Background music mixing with royalty-free loops
- [ ] Script editing before synthesis
- [ ] Multiple voice options per host
- [ ] Progress streaming during generation
- [ ] PWA support for offline usage

## 📄 License

MIT License - feel free to use, modify, and distribute.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using React, Vite, and free AI models**
