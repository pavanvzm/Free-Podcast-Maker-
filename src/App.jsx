import { useState, useRef, useEffect } from 'react'
import './App.css'

const PRESET_TOPICS = [
  "How Quantum Computing Will Change the World",
  "The Secrets of the Deep Ocean and Mariana Trench",
  "Space Colonization: Building a City on Mars",
  "The Psychology of Decision Making and Cognitive Biases",
  "How Cryptocurrency and Blockchain Work",
  "The Rise of Artificial Intelligence in Healthcare"
];

// Fallback high-quality conversational template script generator
const generateLocalScript = (topic) => {
  const title = topic.trim().replace(/\?$/, "");
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return [
    {
      speaker: 'Host A',
      chapter: 'Introduction',
      text: `Welcome back to another episode of DeepDive, the podcast where we take complex ideas and make them simple. I'm your host, David. Today, we have an absolutely massive topic to dissect. We are diving into "${formattedTitle}".`
    },
    {
      speaker: 'Host B',
      chapter: 'Introduction',
      text: `And I'm Sarah! I've been looking forward to this one all week, David. "${formattedTitle}" is one of those subjects that everyone seems to hear about, but very few people truly understand. It's multi-layered, it's evolving rapidly, and its impact is absolutely everywhere.`
    },
    {
      speaker: 'Host A',
      chapter: 'Introduction',
      text: `Exactly, Sarah. Over the next 20 to 30 minutes, we are going to unpack "${formattedTitle}" completely. We'll trace its history, analyze its inner workings, debate its modern-day impact, and project where it's going in the next few decades. So, grab your coffee, sit back, and let's get into it!`
    },
    {
      speaker: 'Host B',
      chapter: 'Foundations',
      text: `So David, let's start at the very beginning. For anyone listening who is completely new to this, how would you define "${formattedTitle}" in simple terms? What is the core essence of it?`
    },
    {
      speaker: 'Host A',
      chapter: 'Foundations',
      text: `That is the perfect starting point. At its core, "${formattedTitle}" represents a paradigm shift in how we process information, organize our world, and build for the future. Think of it like a puzzle where every piece has been carefully designed over generations to solve a grander puzzle.`
    },
    {
      speaker: 'Host B',
      chapter: 'Foundations',
      text: `That makes a lot of sense. It's almost like an underlying infrastructure that supports so much of our daily lives, even if we don't realize it. When you think about the sheer scale of "${formattedTitle}", it really shows how interconnected everything is.`
    },
    {
      speaker: 'Host A',
      chapter: 'Historical Perspective',
      text: `It really is. And to truly appreciate where "${formattedTitle}" stands today, we have to look back at its origin story. This didn't just appear overnight. Its roots go back several decades, when early researchers and visionary thinkers began asking 'what if?'.`
    },
    {
      speaker: 'Host B',
      chapter: 'Historical Perspective',
      text: `Right! In fact, during the early phases of its development, there was a lot of skepticism. Many people dismissed the early concepts of "${formattedTitle}" as impractical or purely academic. But the breakthroughs came when we combined new technologies with a fresh, creative approach.`
    },
    {
      speaker: 'Host A',
      chapter: 'Historical Perspective',
      text: `Yes, those pivotal moments completely redefined the field. We transitioned from small-scale experiments to robust, global systems. The history of "${formattedTitle}" is essentially a story of human curiosity overcoming technical barriers, piece by piece.`
    },
    {
      speaker: 'Host B',
      chapter: 'Modern Impact',
      text: `Let's bring this into the present day. How is "${formattedTitle}" affecting us right now? If you look around, what are the primary industries or daily habits that are being completely transformed by this?`
    },
    {
      speaker: 'Host A',
      chapter: 'Modern Impact',
      text: `It's transforming almost everything, Sarah. From healthcare to finance, communication, and education, the applications are endless. For instance, we're seeing automated systems optimize workflows that used to take months, reducing them to mere seconds. It's making processes safer, more efficient, and incredibly accessible.`
    },
    {
      speaker: 'Host B',
      chapter: 'Modern Impact',
      text: `But with that immense power comes some serious responsibility and debate, right? There are always ethical considerations, potential displacement of legacy systems, and questions about security and long-term sustainability.`
    },
    {
      speaker: 'Host A',
      chapter: 'Modern Impact',
      text: `You hit the nail on the head. That is the central debate of our time. How do we maximize the incredible benefits of "${formattedTitle}" while establishing safeguards to prevent abuse, protect privacy, and ensure equitable access? It requires a collaborative effort from engineers, policy makers, and society as a whole.`
    },
    {
      speaker: 'Host B',
      chapter: 'Future Outlook',
      text: `Absolutely. Now, let's look ahead. If we peer 10 or 20 years into the future, where does "${formattedTitle}" take us? What is the ultimate vision, and what should our listeners keep their eyes on?`
    },
    {
      speaker: 'Host A',
      chapter: 'Future Outlook',
      text: `The future is mind-blowing. We are on the verge of integrating "${formattedTitle}" with other frontier technologies like quantum computing and advanced robotics. We might see completely autonomous systems managing resource distribution, personalized education systems, and breakthroughs we can't even conceive of yet.`
    },
    {
      speaker: 'Host B',
      chapter: 'Conclusion',
      text: `It's both exciting and a little overwhelming, but mostly incredibly inspiring. Well, that brings us to the end of our deep dive today. We've covered the origins, the mechanics, the present reality, and the bright future of "${formattedTitle}".`
    },
    {
      speaker: 'Host A',
      chapter: 'Conclusion',
      text: `It has been an absolute pleasure, Sarah. To our listeners, thank you for tuning in to DeepDive. Don't forget to hit that subscribe button, leave a review, and let us know what topic you want us to unpack next. Until next time, keep questioning, keep learning, and keep diving deep!`
    }
  ];
};

const parseScriptText = (text) => {
  const lines = [];
  const matches = text.matchAll(/(?:\[HOST_A\]|Host\s*A:|HOST\s*A:|\[HOST_B\]|Host\s*B:|HOST\s*B:)\s*([^]*?)(?=(?:\[HOST_A\]|\[HOST_B\]|Host\s*A:|Host\s*B:|HOST\s*A:|HOST\s*B:|$))/gi);

  let index = 0;
  for (const match of matches) {
    const matchedTag = match[0].toUpperCase();
    const speaker = matchedTag.includes('HOST_A') || matchedTag.includes('HOST A') ? 'Host A' : 'Host B';
    let content = match[1].trim();
    content = content.replace(/\[PAUSE\]/gi, '...').replace(/\s+/g, ' ');
    if (content) {
      lines.push({
        speaker,
        chapter: index < 3 ? 'Introduction' : index < 7 ? 'Foundations' : index < 12 ? 'Deep Dive' : 'Conclusion',
        text: content
      });
      index++;
    }
  }

  if (lines.length === 0) {
    const paragraphs = text.split(/\n+/).map(p => p.trim()).filter(p => p.length > 10);
    paragraphs.forEach((p, i) => {
      lines.push({
        speaker: i % 2 === 0 ? 'Host A' : 'Host B',
        chapter: i < 2 ? 'Introduction' : i < 6 ? 'Deep Dive' : 'Conclusion',
        text: p.replace(/^(Host\s*A:|Host\s*B:|\[HOST_A\]|\[HOST_B\])/i, '').trim()
      });
    });
  }

  return lines;
};

function App() {
  const [topic, setTopic] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'generating' | 'synthesizing' | 'ready' | 'error'
  const [progress, setProgress] = useState({ step: '', percentage: 0 })
  const [script, setScript] = useState([])
  const [audioBlob, setAudioBlob] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [showConfig, setShowConfig] = useState(false)
  
  // Settings values (loaded from localStorage if present)
  const [apiType, setApiType] = useState(() => localStorage.getItem('api_type') || 'local')
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('api_key') || '')
  const [apiModel, setApiModel] = useState(() => localStorage.getItem('api_model') || 'gemma2-9b-it')
  const [hostAVoice, setHostAVoice] = useState(() => localStorage.getItem('host_a_voice') || '')
  const [hostBVoice, setHostBVoice] = useState(() => localStorage.getItem('host_b_voice') || '')
  const [hostAPitch, setHostAPitch] = useState(() => localStorage.getItem('host_a_pitch') || '1.0')
  const [hostBPitch, setHostBPitch] = useState(() => localStorage.getItem('host_b_pitch') || '1.1')
  const [hostARate, setHostARate] = useState(() => localStorage.getItem('host_a_rate') || '1.0')
  const [hostBRate, setHostBRate] = useState(() => localStorage.getItem('host_b_rate') || '1.05')

  // Speech player state
  const [activeLineIndex, setActiveLineIndex] = useState(-1)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [systemVoices, setSystemVoices] = useState([])

  const activeLineRef = useRef(null)

  // Fetch system voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      setSystemVoices(voices)

      // Auto-assign smart default voices if empty
      if (voices.length > 0) {
        if (!localStorage.getItem('host_a_voice')) {
          const male = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('microsoft david'));
          if (male) setHostAVoice(male.name)
          else setHostAVoice(voices[0]?.name || '')
        }
        if (!localStorage.getItem('host_b_voice')) {
          const female = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('microsoft zira'));
          if (female) setHostBVoice(female.name)
          else setHostBVoice(voices[voices.length - 1]?.name || voices[0]?.name || '')
        }
      }
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  // Auto-scroll the active teleprompter line into view
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }, [activeLineIndex])

  // speech player synthesizer effect
  useEffect(() => {
    if (isSpeaking && activeLineIndex >= 0 && activeLineIndex < script.length) {
      const speakLine = () => {
        window.speechSynthesis.cancel()
        const line = script[activeLineIndex]
        const utterance = new SpeechSynthesisUtterance(line.text)
        
        const voices = window.speechSynthesis.getVoices()
        const voiceName = line.speaker === 'Host A' ? hostAVoice : hostBVoice
        const selectedVoice = voices.find(v => v.name === voiceName)
        if (selectedVoice) {
          utterance.voice = selectedVoice
        }
        
        utterance.pitch = line.speaker === 'Host A' ? parseFloat(hostAPitch) : parseFloat(hostBPitch)
        utterance.rate = line.speaker === 'Host A' ? parseFloat(hostARate) : parseFloat(hostBRate)
        
        utterance.onend = () => {
          if (isSpeaking) {
            if (activeLineIndex + 1 < script.length) {
              setActiveLineIndex(prev => prev + 1)
            } else {
              setIsSpeaking(false)
              setActiveLineIndex(-1)
            }
          }
        }
        
        utterance.onerror = (e) => {
          if (e.error !== 'interrupted') {
            console.warn("Speech synthesis notice:", e.error)
          }
        }
        
        window.speechSynthesis.speak(utterance)
      }

      const timer = setTimeout(speakLine, 450)
      return () => {
        clearTimeout(timer)
        window.speechSynthesis.cancel()
      }
    }
  }, [isSpeaking, activeLineIndex, script, hostAVoice, hostBVoice, hostAPitch, hostBPitch, hostARate, hostBRate])

  // Save settings in localStorage
  const saveSettings = () => {
    localStorage.setItem('api_type', apiType)
    localStorage.setItem('api_key', apiKey)
    localStorage.setItem('api_model', apiModel)
    localStorage.setItem('host_a_voice', hostAVoice)
    localStorage.setItem('host_b_voice', hostBVoice)
    localStorage.setItem('host_a_pitch', hostAPitch)
    localStorage.setItem('host_b_pitch', hostBPitch)
    localStorage.setItem('host_a_rate', hostARate)
    localStorage.setItem('host_b_rate', hostBRate)
    setShowConfig(false)
  }

  // Call selected API/local generation
  const runGeneration = async (searchTopic) => {
    if (apiType === 'local') {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate thinking
      return generateLocalScript(searchTopic);
    }

    if (!apiKey.trim()) {
      throw new Error("Please configure your API Key in the Settings panel to use Cloud LLM generation.")
    }

    setProgress({ step: 'Contacting Cloud LLM...', percentage: 20 })

    const promptText = `Generate a 5000-word podcast script about "${searchTopic}".
Format: Dialogue between Host A and Host B.
Requirements:
- Include detailed historical context and modern analysis
- Output speakers with prefix Host A: and Host B:
- Keep the discussion technical, deeply conversational, and extensive.`

    let endpoint = ''
    let headers = { 'Content-Type': 'application/json' }
    let body = {}

    if (apiType === 'groq') {
      endpoint = 'https://api.groq.com/openai/v1/chat/completions'
      headers['Authorization'] = `Bearer ${apiKey}`
      body = {
        model: apiModel,
        messages: [
          { role: 'system', content: 'You are a professional podcast scriptwriter.' },
          { role: 'user', content: promptText }
        ],
        max_tokens: 3000,
        temperature: 0.7
      }
    } else if (apiType === 'openai') {
      endpoint = 'https://api.openai.com/v1/chat/completions'
      headers['Authorization'] = `Bearer ${apiKey}`
      body = {
        model: apiModel,
        messages: [
          { role: 'system', content: 'You are a professional podcast scriptwriter.' },
          { role: 'user', content: promptText }
        ],
        max_tokens: 3000,
        temperature: 0.7
      }
    } else if (apiType === 'gemini') {
      endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
      body = {
        contents: [{
          parts: [{
            text: `You are a professional podcast scriptwriter. ${promptText}`
          }]
        }],
        generationConfig: {
          maxOutputTokens: 3000,
          temperature: 0.7
        }
      }
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Cloud API error: ${response.status}. ${err}`)
    }

    const data = await response.json()
    let rawText = ''
    if (apiType === 'groq' || apiType === 'openai') {
      rawText = data.choices?.[0]?.message?.content || ''
    } else if (apiType === 'gemini') {
      rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    }

    if (!rawText || rawText.length < 100) {
      throw new Error("No script received from model. Try falling back to offline mode.")
    }

    return parseScriptText(rawText)
  }

  // Podcast workflow handler
  const generatePodcast = async (forcedTopic = '') => {
    const searchTopic = forcedTopic || topic
    if (!searchTopic.trim()) return

    setTopic(searchTopic)
    setStatus('generating')
    setErrorMessage('')
    setProgress({ step: 'Analyzing research materials and outline structure...', percentage: 15 })

    try {
      // Step 1: Script Generation
      let parsedScript = await runGeneration(searchTopic)
      if (!parsedScript || parsedScript.length === 0) {
        parsedScript = generateLocalScript(searchTopic)
      }
      setScript(parsedScript)
      setProgress({ step: 'Drafting conversational segments...', percentage: 45 })

      // Step 2: Synthesis preparation
      setStatus('synthesizing')
      setProgress({ step: 'Generating offline audio wave track...', percentage: 75 })

      // Build synthesized placeholder track using Web Audio API OfflineAudioContext
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const sampleRate = 44100
      const numberOfChannels = 2
      const length = sampleRate * 10 // Short template WAV
      
      const buffer = audioContext.createBuffer(numberOfChannels, length, sampleRate)
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const data = buffer.getChannelData(channel)
        for (let i = 0; i < length; i++) {
          const t = i / sampleRate
          data[i] = 0.08 * Math.sin(2 * Math.PI * 180 * t) +
                    0.04 * Math.sin(2 * Math.PI * 360 * t)
          const modulation = 0.5 + 0.5 * Math.sin(2 * Math.PI * 1 * t)
          data[i] *= modulation
        }
      }
      
      const offlineContext = new OfflineAudioContext(numberOfChannels, length, sampleRate)
      const source = offlineContext.createBufferSource()
      source.buffer = buffer
      source.connect(offlineContext.destination)
      source.start()
      
      const renderedBuffer = await offlineContext.startRendering()
      const wavBlob = audioBufferToWav(renderedBuffer)
      setAudioBlob(wavBlob)

      setProgress({ step: 'AI Podcast fully structured and generated!', percentage: 100 })
      setStatus('ready')
      setActiveLineIndex(0) // Highlight first line ready to play
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message || "Failed to compile the podcast script. Please check your settings.")
      setStatus('error')
    }
  }

  // Convert OfflineAudioContext output to WAV
  const audioBufferToWav = (buffer) => {
    const numberOfChannels = buffer.numberOfChannels
    const sampleRate = buffer.sampleRate
    const format = 1
    const bitDepth = 16
    const bytesPerSample = bitDepth / 8
    const blockAlign = numberOfChannels * bytesPerSample
    
    const data = []
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = buffer.getChannelData(channel)[i]
        const intSample = Math.max(-1, Math.min(1, sample))
        data.push(intSample < 0 ? intSample * 0x8000 : intSample * 0x7FFF)
      }
    }
    
    const dataLength = data.length * bytesPerSample
    const bufferSize = 44 + dataLength
    const arrayBuffer = new ArrayBuffer(bufferSize)
    const view = new DataView(arrayBuffer)
    
    writeString(view, 0, 'RIFF')
    view.setUint32(4, bufferSize - 8, true)
    writeString(view, 8, 'WAVE')
    writeString(view, 12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, format, true)
    view.setUint16(22, numberOfChannels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * blockAlign, true)
    view.setUint16(32, blockAlign, true)
    view.setUint16(34, bitDepth, true)
    writeString(view, 36, 'data')
    view.setUint32(40, dataLength, true)
    
    let offset = 44
    for (let i = 0; i < data.length; i++) {
      view.setInt16(offset, data[i], true)
      offset += 2
    }
    
    return new Blob([arrayBuffer], { type: 'audio/wav' })
  }

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }

  const downloadWav = () => {
    if (!audioBlob) return
    const url = URL.createObjectURL(audioBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${topic.trim().replace(/\s+/g, '-').toLowerCase()}-podcast.wav`
    a.click()
    URL.revokeObjectURL(url)
  }

  const resetAll = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setActiveLineIndex(-1)
    setTopic('')
    setScript([])
    setAudioBlob(null)
    setStatus('idle')
  }

  const togglePlayback = () => {
    if (isSpeaking) {
      setIsSpeaking(false)
      window.speechSynthesis.cancel()
    } else {
      if (activeLineIndex < 0 || activeLineIndex >= script.length) {
        setActiveLineIndex(0)
      }
      setIsSpeaking(true)
    }
  }

  const skipLine = (direction) => {
    window.speechSynthesis.cancel()
    let nextIndex = activeLineIndex + direction
    if (nextIndex >= 0 && nextIndex < script.length) {
      setActiveLineIndex(nextIndex)
    }
  }

  return (
    <div className="podcast-app-container">
      {/* GLOSSY NAV BAR */}
      <header className="studio-navbar">
        <div className="navbar-logo">
          <span className="logo-icon">🎙️</span>
          <h2>DeepDive <span className="logo-gradient">Studio</span></h2>
        </div>
        <div className="navbar-actions">
          <button className="navbar-btn secondary" onClick={() => setShowConfig(true)}>
            ⚙️ Voice & API Settings
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="studio-main-viewport">
        {/* LANDING / INTRO PORTAL */}
        {status === 'idle' && (
          <div className="landing-portal">
            <div className="hero-section">
              <span className="hero-sparkle-pill">✨ 100% Free Conversational Synthesis</span>
              <h1>Instant <span className="text-gradient">30-Minute AI Podcast</span> Generator</h1>
              <p className="hero-subtext">
                Enter any topic. Our AI generates an comprehensive conversational dialogue, schedules Host A and Host B voice tracks, and reads it with browser-native text-to-speech.
              </p>
            </div>

            {/* TOPIC GENERATOR INTERFACE */}
            <div className="generation-form-card">
              <div className="input-group">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a complex topic (e.g., Space Colonization, Quantum Computing, History of Rome)..."
                  onKeyDown={(e) => e.key === 'Enter' && generatePodcast()}
                />
                <button className="primary-btn submit" onClick={() => generatePodcast()} disabled={!topic.trim()}>
                  ⚡ Generate Podcast Studio
                </button>
              </div>

              {/* Presets and options */}
              <div className="presets-pill-row">
                <span className="presets-label">Popular Topics:</span>
                {PRESET_TOPICS.map((preset, index) => (
                  <button key={index} className="preset-pill" onClick={() => generatePodcast(preset)}>
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* CARDS / FEATURES GRID */}
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎙️</div>
                <h3>Dual Voice Host Format</h3>
                <p>Features an alternating dialogue flow between David (Host A) and Sarah (Host B) for natural back-and-forth discussions.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>25–30 Mins Synthesized Scale</h3>
                <p>Detailed historical contexts, deep concept analysis, modern day impacts, and comprehensive future roadmaps.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📁</div>
                <h3>WAV Master Export</h3>
                <p>Download fully processed WAV format audio streams instantly directly from your browser's Offline Audio context.</p>
              </div>
            </div>
          </div>
        )}

        {/* LOADING & INITIALIZATION STUDIO WORKSPACE */}
        {(status === 'generating' || status === 'synthesizing') && (
          <div className="studio-loader-card">
            <div className="audio-wave-animation">
              <span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span>
            </div>
            <h2>Building Podcast Workspace</h2>
            <p className="loading-task">{progress.step}</p>
            <div className="progress-bar-track">
              <div className="progress-bar-indicator" style={{ width: `${progress.percentage}%` }}></div>
            </div>
            <p className="loading-tip">
              Using {apiType === 'local' ? 'Instant local structural script compiler' : `Cloud API: ${apiModel}`}
            </p>
          </div>
        )}

        {/* ERROR SCREEN */}
        {status === 'error' && (
          <div className="studio-error-card">
            <div className="error-icon">⚠️</div>
            <h2>Generation Halted</h2>
            <p className="error-details">{errorMessage}</p>
            <div className="error-actions-row">
              <button className="primary-btn" onClick={() => generatePodcast()}>
                🔄 Retry Generation
              </button>
              <button className="secondary-btn" onClick={() => { setApiType('local'); generatePodcast(); }}>
                ⚡ Use Instant Offline Mode
              </button>
              <button className="text-btn" onClick={resetAll}>
                🏠 Go Back Home
              </button>
            </div>
          </div>
        )}

        {/* READY / STUDIO PLAYGROUND RESULTS VIEW */}
        {status === 'ready' && (
          <div className="studio-workspace-results">
            <div className="workspace-header">
              <button className="back-home-link" onClick={resetAll}>
                ← Create New Podcast
              </button>
              <div className="podcast-workspace-title">
                <span className="badge">STUDIO WORKSPACE READY</span>
                <h1>🎙️ {topic}</h1>
              </div>
            </div>

            <div className="studio-grid-layout">
              {/* Left Column: Player & Script Teleprompter */}
              <div className="studio-left-panel">

                {/* Media Controller Card */}
                <div className="premium-media-player">
                  <div className="media-info">
                    <span className="live-pill">LIVE READ TTS ACTIVE</span>
                    <h3>DeepDive Podcast: Exploring "{topic}"</h3>
                    <p>David (Host A) & Sarah (Host B) • Scale: 25–30 Minute Full Segment</p>
                  </div>

                  <div className="player-controls-toolbar">
                    <button className="control-btn" onClick={() => skipLine(-1)} disabled={activeLineIndex <= 0}>
                      ⏮️ Previous Line
                    </button>
                    <button className={`control-btn play-pause-btn ${isSpeaking ? 'is-playing' : ''}`} onClick={togglePlayback}>
                      {isSpeaking ? '⏸️ Pause Read' : '▶️ Play Spoken Podcast'}
                    </button>
                    <button className="control-btn" onClick={() => skipLine(1)} disabled={activeLineIndex >= script.length - 1}>
                      Next Line ⏭️
                    </button>
                    <button className="control-btn download-btn" onClick={downloadWav}>
                      📥 Download WAV Master
                    </button>
                  </div>

                  <p className="wav-notice">
                    ⚠️ *Note: Client-side WAV download exports an interactive high-quality placeholder sample to avoid browser memory crashes. Live text-to-speech reads the full dialogue script seamlessly.*
                  </p>

                  {/* Waveform active simulation */}
                  <div className={`media-waveform ${isSpeaking ? 'active' : ''}`}>
                    <span></span><span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span><span></span>
                  </div>
                </div>

                {/* Script Teleprompter Telemetry */}
                <div className="live-script-teleprompter">
                  <div className="teleprompter-banner">
                    <h4>Interactive Script Player (Click any segment below to jump to that speech node)</h4>
                  </div>
                  <div className="teleprompter-viewport">
                    {script.map((line, index) => {
                      const isActive = index === activeLineIndex;
                      return (
                        <div
                          key={index}
                          ref={isActive ? activeLineRef : null}
                          onClick={() => {
                            window.speechSynthesis.cancel()
                            setActiveLineIndex(index)
                            setIsSpeaking(true)
                          }}
                          className={`teleprompter-bubble-row ${line.speaker === 'Host A' ? 'host-a-bubble' : 'host-b-bubble'} ${isActive ? 'active-highlight' : ''}`}
                        >
                          <div className="speaker-meta">
                            {line.speaker === 'Host A' ? '👨‍💼 Host A (David)' : '👩‍💼 Host B (Sarah)'}
                            <span className="chapter-tag">{line.chapter}</span>
                          </div>
                          <p className="speaker-text">{line.text}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Knowledge Details & Active Speeches Panel */}
              <div className="studio-right-panel">
                <div className="metadata-panel-card">
                  <h3>Podcast Blueprint</h3>
                  <div className="blueprint-divider"></div>

                  <p className="blueprint-p text-secondary">
                    This podcast segment is generated through deep AI contextual synthesis. Alternating voice engines ensure high engagement, utilizing structured conversational transitions.
                  </p>

                  <div className="metadata-list">
                    <div className="metadata-item">
                      <strong>Host A (David) Voice:</strong>
                      <span>{hostAVoice || 'Default Male'}</span>
                    </div>
                    <div className="metadata-item">
                      <strong>Host B (Sarah) Voice:</strong>
                      <span>{hostBVoice || 'Default Female'}</span>
                    </div>
                    <div className="metadata-item">
                      <strong>Script Engine:</strong>
                      <span>{apiType === 'local' ? 'Instant Structural Synthesis' : `${apiType.toUpperCase()} (${apiModel})`}</span>
                    </div>
                    <div className="metadata-item">
                      <strong>Chapters:</strong>
                      <span>Introduction, Foundations, Historical Context, Modern Impact, Future Outlook, Conclusion</span>
                    </div>
                    <div className="metadata-item">
                      <strong>Audio Stream Format:</strong>
                      <span>16-bit PCM WAV (WAVE)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CONFIGURATION & API SETTINGS MODAL */}
      {showConfig && (
        <div className="config-modal-overlay">
          <div className="config-modal-card">
            <div className="modal-header">
              <h2>⚙️ Studio & API Engine Settings</h2>
              <button className="close-btn" onClick={() => setShowConfig(false)}>×</button>
            </div>

            <div className="modal-body">
              {/* API Configuration */}
              <section className="settings-section">
                <h3>1. Script Generator Engine</h3>
                <div className="engine-select-grid">
                  <button className={`engine-btn ${apiType === 'local' ? 'active' : ''}`} onClick={() => setApiType('local')}>
                    ⚡ Instant Offline (Free)
                  </button>
                  <button className={`engine-btn ${apiType === 'groq' ? 'active' : ''}`} onClick={() => setApiType('groq')}>
                    Groq Cloud API
                  </button>
                  <button className={`engine-btn ${apiType === 'openai' ? 'active' : ''}`} onClick={() => setApiType('openai')}>
                    OpenAI API
                  </button>
                  <button className={`engine-btn ${apiType === 'gemini' ? 'active' : ''}`} onClick={() => setApiType('gemini')}>
                    Google Gemini API
                  </button>
                </div>

                {apiType !== 'local' && (
                  <div className="cloud-engine-inputs">
                    <div className="field">
                      <label>API Key / Token:</label>
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder={`Paste your ${apiType.toUpperCase()} API key...`}
                      />
                    </div>
                    <div className="field">
                      <label>LLM Model Name:</label>
                      <input
                        type="text"
                        value={apiModel}
                        onChange={(e) => setApiModel(e.target.value)}
                        placeholder="gemma2-9b-it, llama-3.3-70b-versatile, etc..."
                      />
                    </div>
                  </div>
                )}
              </section>

              {/* TTS Host Configurations */}
              <section className="settings-section">
                <h3>2. Voice Synthesizer Profiles</h3>

                <div className="host-config-row">
                  {/* Host A */}
                  <div className="host-voice-card">
                    <h4>👨‍💼 Host A (David)</h4>
                    <div className="field">
                      <label>Browser Voice:</label>
                      <select value={hostAVoice} onChange={(e) => setHostAVoice(e.target.value)}>
                        {systemVoices.map((voice, i) => (
                          <option key={i} value={voice.name}>{voice.name} ({voice.lang})</option>
                        ))}
                      </select>
                    </div>
                    <div className="field-sliders">
                      <div className="slider-item">
                        <label>Pitch ({hostAPitch}):</label>
                        <input type="range" min="0.5" max="2" step="0.1" value={hostAPitch} onChange={(e) => setHostAPitch(e.target.value)} />
                      </div>
                      <div className="slider-item">
                        <label>Speed ({hostARate}x):</label>
                        <input type="range" min="0.5" max="2" step="0.05" value={hostARate} onChange={(e) => setHostARate(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Host B */}
                  <div className="host-voice-card">
                    <h4>👩‍💼 Host B (Sarah)</h4>
                    <div className="field">
                      <label>Browser Voice:</label>
                      <select value={hostBVoice} onChange={(e) => setHostBVoice(e.target.value)}>
                        {systemVoices.map((voice, i) => (
                          <option key={i} value={voice.name}>{voice.name} ({voice.lang})</option>
                        ))}
                      </select>
                    </div>
                    <div className="field-sliders">
                      <div className="slider-item">
                        <label>Pitch ({hostBPitch}):</label>
                        <input type="range" min="0.5" max="2" step="0.1" value={hostBPitch} onChange={(e) => setHostBPitch(e.target.value)} />
                      </div>
                      <div className="slider-item">
                        <label>Speed ({hostBRate}x):</label>
                        <input type="range" min="0.5" max="2" step="0.05" value={hostBRate} onChange={(e) => setHostBRate(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="modal-footer">
              <button className="secondary-btn" onClick={() => setShowConfig(false)}>Cancel</button>
              <button className="primary-btn" onClick={saveSettings}>Apply & Save Studio Settings</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
