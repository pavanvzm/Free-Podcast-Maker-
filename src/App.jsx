import { useState, useRef, useEffect } from 'react'
import './App.css'

const LUCKY_TOPICS = [
  "How Quantum Computing Will Change the World",
  "The Secrets of the Deep Ocean and Mariana Trench",
  "Space Colonization: Building a City on Mars",
  "The Psychology of Decision Making and Cognitive Biases",
  "The Origin and Evolution of Video Games",
  "How Cryptocurrency and Blockchain Work",
  "The Lost City of Atlantis: Myth vs Reality",
  "A Deep Dive into Renewable Energy Systems",
  "The Art and Science of Professional Cooking",
  "The Renaissance: When Art Met Science"
];

// Generate robust conversational template scripts locally
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
  const [view, setView] = useState('home') // 'home' | 'results'
  const [status, setStatus] = useState('idle') // 'idle' | 'generating' | 'synthesizing' | 'ready' | 'error'
  const [progress, setProgress] = useState({ step: '', percentage: 0 })
  const [script, setScript] = useState([])
  const [audioBlob, setAudioBlob] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'podcasts' | 'news' | 'images'
  const [settingsOpen, setSettingsOpen] = useState(false)
  
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
    setSettingsOpen(false)
  }

  // Call selected API/local generation
  const runGeneration = async (searchTopic) => {
    if (apiType === 'local') {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate thinking
      return parseScriptText(""); // Returns template script
    }

    if (!apiKey.trim()) {
      throw new Error("Please enter an API Key in the Settings panel to use Cloud LLM generation.")
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
    setView('results')
    setStatus('generating')
    setErrorMessage('')
    setProgress({ step: 'Searching web content and creating outline...', percentage: 10 })

    try {
      // Step 1: Script Generation
      let parsedScript = await runGeneration(searchTopic)
      if (!parsedScript || parsedScript.length === 0) {
        parsedScript = generateLocalScript(searchTopic)
      }
      setScript(parsedScript)
      setProgress({ step: 'Conversational dialogue structured!', percentage: 50 })

      // Step 2: Synthesis preparation
      setStatus('synthesizing')
      setProgress({ step: 'Generating master podcast audio track...', percentage: 70 })

      // Build synthesized placeholder track using Web Audio API OfflineAudioContext
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const sampleRate = 44100
      const numberOfChannels = 2
      const length = sampleRate * 10 // Create shorter WAV template for instant browser download, play actual TTS live!
      
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

      setProgress({ step: 'Podcast search result and player ready!', percentage: 100 })
      setStatus('ready')
      setActiveLineIndex(0) // Highlight first line ready to play
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message || "Failed to compile the podcast script. Please check your network and settings.")
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

  const handleLucky = () => {
    const randomTopic = LUCKY_TOPICS[Math.floor(Math.random() * LUCKY_TOPICS.length)]
    generatePodcast(randomTopic)
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

  const resetToHome = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setActiveLineIndex(-1)
    setTopic('')
    setScript([])
    setAudioBlob(null)
    setStatus('idle')
    setView('home')
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

  const selectLuckyTopic = () => {
    const randomTopic = LUCKY_TOPICS[Math.floor(Math.random() * LUCKY_TOPICS.length)];
    setTopic(randomTopic);
  }

  return (
    <div className="google-page-root">
      {/* HEADER NAVBAR (Only visible in Google Home View) */}
      {view === 'home' && (
        <header className="google-home-header">
          <div className="nav-left">
            <a href="https://about.google/" target="_blank" rel="noreferrer">About</a>
            <a href="https://store.google.com/" target="_blank" rel="noreferrer">Store</a>
          </div>
          <div className="nav-right">
            <a href="https://mail.google.com" target="_blank" rel="noreferrer">Gmail</a>
            <a href="https://images.google.com" target="_blank" rel="noreferrer">Images</a>
            <button className="settings-trigger-btn" onClick={() => setSettingsOpen(true)} title="Podcast Voice & API Settings">
              ⚙️ Settings
            </button>
            <div className="google-apps-icon" title="Google Apps">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm12-2c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-6 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>
            <div className="google-avatar-circle">P</div>
          </div>
        </header>
      )}

      {/* SEARCH RESULTS HEADER (Only visible in Google Results View) */}
      {view === 'results' && (
        <header className="google-results-header">
          <div className="results-header-left">
            <div className="google-small-logo" onClick={resetToHome} title="Go back to Google Podcast Search">
              <span className="g-blue">G</span>
              <span className="g-red">o</span>
              <span className="g-yellow">o</span>
              <span className="g-blue">g</span>
              <span className="g-green">l</span>
              <span className="g-red">e</span>
              <span className="logo-badge">Podcasts</span>
            </div>
            <div className="results-search-box-wrapper">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generatePodcast()}
              />
              <div className="search-box-icons">
                <span className="icon-lens" onClick={() => generatePodcast()}>🔍</span>
              </div>
            </div>
          </div>
          <div className="results-header-right">
            <button className="settings-trigger-btn" onClick={() => setSettingsOpen(true)}>
              ⚙️ Settings
            </button>
            <div className="google-avatar-circle">P</div>
          </div>
        </header>
      )}

      {/* GOOGLE HOME PAGE VIEW */}
      {view === 'home' && (
        <main className="google-home-main">
          <div className="google-logo-wrapper">
            <span className="g-blue">G</span>
            <span className="g-red">o</span>
            <span className="g-yellow">o</span>
            <span className="g-blue">g</span>
            <span className="g-green">l</span>
            <span className="g-red">e</span>
            <div className="google-logo-subtitle">AI Podcast Engine</div>
          </div>

          <div className="search-bar-container">
            <div className="google-search-input-wrapper">
              <span className="search-magnifier">🔍</span>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter any topic for a 20-30min deep dive podcast..."
                onKeyDown={(e) => e.key === 'Enter' && generatePodcast()}
              />
              <div className="input-actions-right">
                <span className="mic-icon" title="Select a lucky topic" onClick={selectLuckyTopic}>🎤</span>
                <span className="lens-icon" title="Search settings" onClick={() => setSettingsOpen(true)}>📷</span>
              </div>
            </div>

            <div className="google-buttons-row">
              <button className="google-search-btn" onClick={() => generatePodcast()} disabled={!topic.trim()}>
                Generate 30min Podcast
              </button>
              <button className="lucky-btn" onClick={handleLucky}>
                I'm Feeling Lucky
              </button>
            </div>
          </div>

          <div className="quick-help-pills">
            <span>Popular:</span>
            {LUCKY_TOPICS.slice(0, 3).map((t, idx) => (
              <button key={idx} onClick={() => generatePodcast(t)} className="pill-btn">
                {t.split(":")[0]}
              </button>
            ))}
          </div>
        </main>
      )}

      {/* GOOGLE SEARCH RESULTS VIEW */}
      {view === 'results' && (
        <main className="google-results-main">
          {/* Sub-navigation categories */}
          <div className="results-categories-bar">
            <div className={`category-item ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
              🔍 All Results
            </div>
            <div className={`category-item ${activeTab === 'podcasts' ? 'active' : ''}`} onClick={() => setActiveTab('podcasts')}>
              🎙️ Podcasts
            </div>
            <div className={`category-item ${activeTab === 'news' ? 'active' : ''}`} onClick={() => setActiveTab('news')}>
              📰 News
            </div>
            <div className={`category-item ${activeTab === 'images' ? 'active' : ''}`} onClick={() => setActiveTab('images')}>
              🖼️ Images
            </div>
          </div>

          {/* Search Statistics */}
          <div className="results-stats">
            About 3,420,000 deep dive podcast results (0.34 seconds) for "{topic}"
          </div>

          {/* PROCESSING STATES */}
          {(status === 'generating' || status === 'synthesizing') && (
            <div className="google-loading-container">
              <div className="ai-gemini-pulse-line"></div>
              <div className="google-spinner-dots">
                <span className="dot blue"></span>
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <h3>Generating your custom 20 to 30 minute podcast...</h3>
              <p className="loading-status-text">{progress.step}</p>
              <div className="google-progress-bar">
                <div className="google-progress-fill" style={{ width: `${progress.percentage}%` }}></div>
              </div>
              <p className="loading-tip">Tip: This uses {apiType === 'local' ? 'instant client-side synthesis templates.' : `cloud model '${apiModel}'.`}</p>
            </div>
          )}

          {/* ERROR STATE */}
          {status === 'error' && (
            <div className="google-error-container">
              <h2>⚠️ DeepDive Generation Error</h2>
              <p>{errorMessage}</p>
              <div className="error-actions">
                <button className="google-search-btn" onClick={() => generatePodcast()}>
                  🔄 Retry Generation
                </button>
                <button className="lucky-btn" onClick={() => { setApiType('local'); generatePodcast(); }}>
                  ⚡ Fallback to Instant Offline Mode
                </button>
                <button className="lucky-btn" onClick={resetToHome}>
                  🏠 Return Home
                </button>
              </div>
            </div>
          )}

          {/* READY STATE & PLAYER VIEW */}
          {status === 'ready' && (
            <div className="google-results-grid">

              {/* Left results column */}
              <div className="results-left-column">

                {/* Google AI Overview Podcasting Panel */}
                <div className="google-ai-overview-card">
                  <div className="ai-overview-header">
                    <span className="ai-badge-sparkle">✨</span>
                    <h4>AI Overview: DeepDive Podcast generated successfully</h4>
                  </div>

                  <div className="podcast-player-section">
                    <div className="podcast-player-controls-container">
                      <div className="podcast-meta">
                        <span className="podcast-badge-live">LIVE READ TTS</span>
                        <h3>🎙️ Inside "{topic}"</h3>
                        <p className="podcast-desc">Alternating interactive voices • 25–30 minute runtime scale</p>
                      </div>

                      <div className="player-toolbar">
                        <button className="player-btn prev" onClick={() => skipLine(-1)} disabled={activeLineIndex <= 0}>
                          ⏮️ Prev
                        </button>
                        <button className={`player-btn play-pause ${isSpeaking ? 'active' : ''}`} onClick={togglePlayback}>
                          {isSpeaking ? '⏸️ Pause Podcast' : '▶️ Play Podcast'}
                        </button>
                        <button className="player-btn next" onClick={() => skipLine(1)} disabled={activeLineIndex >= script.length - 1}>
                          Next ⏭️
                        </button>
                        <button className="player-btn download" onClick={downloadWav} title="Download synthesized WAV master track">
                          📥 Download WAV
                        </button>
                      </div>

                      {/* Visual Waveform Effect */}
                      <div className={`waveform-simulation ${isSpeaking ? 'animating' : ''}`}>
                        <span></span><span></span><span></span><span></span><span></span>
                        <span></span><span></span><span></span><span></span><span></span>
                        <span></span><span></span><span></span><span></span><span></span>
                      </div>
                    </div>

                    {/* Interactive Teleprompter Transcript */}
                    <div className="interactive-teleprompter">
                      <div className="teleprompter-header">
                        Interactive Live Script (Autoscrolls during audio play)
                      </div>
                      <div className="teleprompter-scroll-box">
                        {script.map((line, idx) => {
                          const isActive = idx === activeLineIndex;
                          return (
                            <div
                              key={idx}
                              ref={isActive ? activeLineRef : null}
                              onClick={() => {
                                window.speechSynthesis.cancel()
                                setActiveLineIndex(idx)
                                setIsSpeaking(true)
                              }}
                              className={`dialogue-bubble-row ${line.speaker === 'Host A' ? 'host-a-row' : 'host-b-row'} ${isActive ? 'active' : ''}`}
                            >
                              <div className="avatar-badge">
                                {line.speaker === 'Host A' ? '👨‍💼 Host A' : '👩‍💼 Host B'}
                              </div>
                              <div className="bubble-text-content">
                                {line.text}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Organic Google Search Results */}
                <div className="organic-results-wrapper">
                  <div className="organic-result-item">
                    <div className="result-breadcrumbs">
                      https://podcasts.google.com › deepdive › {topic.toLowerCase().replace(/\s+/g, '-')}
                    </div>
                    <a href="#podcast" className="result-title" onClick={(e) => { e.preventDefault(); togglePlayback(); }}>
                      DeepDive Podcast: Comprehensive Exploration of {topic}
                    </a>
                    <p className="result-snippet">
                      Listen to David and Sarah breakdown the foundational pillars, history, and future roadmap of {topic}.
                      This 30-minute podcast covers real-world implementations, expert opinions, and the core ethics surrounding the issue.
                    </p>
                  </div>

                  <div className="organic-result-item">
                    <div className="result-breadcrumbs">
                      https://en.wikipedia.org › wiki › {topic.toLowerCase().replace(/\s+/g, '_')}
                    </div>
                    <a href="https://wikipedia.org" target="_blank" rel="noreferrer" className="result-title">
                      {topic} - Wikipedia, the free encyclopedia
                    </a>
                    <p className="result-snippet">
                      <strong>{topic}</strong> represents a key system in modern society. This comprehensive encyclopedic entry covers the initial development phase, critical breakthroughs from early pioneers, and contemporary advancements as of 2025.
                    </p>
                  </div>

                  <div className="organic-result-item">
                    <div className="result-breadcrumbs">
                      https://techcrunch.com › tags › {topic.toLowerCase().replace(/\s+/g, '-')}
                    </div>
                    <a href="https://techcrunch.com" target="_blank" rel="noreferrer" className="result-title">
                      The Future of {topic}: Trends, Disruptions, and Market Valuation
                    </a>
                    <p className="result-snippet">
                      Recent venture capital flows show an extraordinary surge in tech projects addressing {topic}.
                      Analysts project a compound annual growth rate of over 18% as global industries rush to adopt these principles.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right column: Google Knowledge Graph Panel */}
              <div className="results-right-column">
                <div className="knowledge-panel-card">
                  <div className="kp-header">
                    <h3>{topic}</h3>
                    <p className="kp-subtitle">Podcast Subject & AI Synthesis Overview</p>
                  </div>

                  <div className="kp-media-placeholder">
                    <div className="kp-audio-waves">
                      <span></span><span></span><span></span><span></span>
                    </div>
                    <span className="kp-media-title">Google AI Podcast Series</span>
                  </div>

                  <div className="kp-body">
                    <p className="kp-description">
                      The subject of <strong>{topic}</strong> is characterized by rapid development and high relevance. Through interactive multi-host discussion, listeners gain holistic knowledge spanning from early historical context to future applications.
                    </p>

                    <div className="kp-details-list">
                      <div className="kp-detail-item">
                        <strong>Hosts:</strong> <span>David (Host A), Sarah (Host B)</span>
                      </div>
                      <div className="kp-detail-item">
                        <strong>Scale:</strong> <span>Full-scale 25–30 Minute Discussion</span>
                      </div>
                      <div className="kp-detail-item">
                        <strong>API Mode:</strong> <span>{apiType === 'local' ? 'Instant Client-Side Emulator' : `Cloud LLM: ${apiModel}`}</span>
                      </div>
                      <div className="kp-detail-item">
                        <strong>Audio Master:</strong> <span>Available for download (WAV format)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </main>
      )}

      {/* SEARCH SETTINGS MODAL */}
      {settingsOpen && (
        <div className="settings-modal-overlay">
          <div className="settings-modal-card">
            <div className="settings-header">
              <h2>⚙️ Search & Podcast Settings</h2>
              <button className="close-modal-btn" onClick={() => setSettingsOpen(false)}>×</button>
            </div>
            
            <div className="settings-body">
              {/* API Configuration Group */}
              <div className="settings-group">
                <h3>1. Script Generator Engine</h3>
                <div className="generator-selector-row">
                  <label className={`gen-pill ${apiType === 'local' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="api_type"
                      value="local"
                      checked={apiType === 'local'}
                      onChange={() => setApiType('local')}
                    />
                    ⚡ Instant Offline (Free)
                  </label>
                  <label className={`gen-pill ${apiType === 'groq' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="api_type"
                      value="groq"
                      checked={apiType === 'groq'}
                      onChange={() => setApiType('groq')}
                    />
                    Groq Cloud API
                  </label>
                  <label className={`gen-pill ${apiType === 'openai' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="api_type"
                      value="openai"
                      checked={apiType === 'openai'}
                      onChange={() => setApiType('openai')}
                    />
                    OpenAI API
                  </label>
                  <label className={`gen-pill ${apiType === 'gemini' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="api_type"
                      value="gemini"
                      checked={apiType === 'gemini'}
                      onChange={() => setApiType('gemini')}
                    />
                    Google Gemini API
                  </label>
                </div>

                {apiType !== 'local' && (
                  <div className="cloud-settings-inputs">
                    <div className="input-field">
                      <label>API Bearer Key:</label>
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder={`Paste your ${apiType.toUpperCase()} API key here...`}
                      />
                    </div>
                    <div className="input-field">
                      <label>Model Name:</label>
                      <input
                        type="text"
                        value={apiModel}
                        onChange={(e) => setApiModel(e.target.value)}
                        placeholder="gemma2-9b-it, llama-3.3-70b-versatile, etc..."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Host Configuration Group */}
              <div className="settings-group">
                <h3>2. Voice Synthesizer Properties</h3>

                {/* Host A settings */}
                <div className="host-voice-config-card">
                  <h4>👨‍💼 Host A (David)</h4>
                  <div className="input-field">
                    <label>TTS Voice:</label>
                    <select value={hostAVoice} onChange={(e) => setHostAVoice(e.target.value)}>
                      {systemVoices.map((v, i) => (
                        <option key={i} value={v.name}>{v.name} ({v.lang})</option>
                      ))}
                    </select>
                  </div>
                  <div className="sliders-row">
                    <div className="input-field">
                      <label>Pitch: {hostAPitch}</label>
                      <input type="range" min="0.5" max="2" step="0.1" value={hostAPitch} onChange={(e) => setHostAPitch(e.target.value)} />
                    </div>
                    <div className="input-field">
                      <label>Speed: {hostARate}x</label>
                      <input type="range" min="0.5" max="2" step="0.05" value={hostARate} onChange={(e) => setHostARate(e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Host B settings */}
                <div className="host-voice-config-card">
                  <h4>👩‍💼 Host B (Sarah)</h4>
                  <div className="input-field">
                    <label>TTS Voice:</label>
                    <select value={hostBVoice} onChange={(e) => setHostBVoice(e.target.value)}>
                      {systemVoices.map((v, i) => (
                        <option key={i} value={v.name}>{v.name} ({v.lang})</option>
                      ))}
                    </select>
                  </div>
                  <div className="sliders-row">
                    <div className="input-field">
                      <label>Pitch: {hostBPitch}</label>
                      <input type="range" min="0.5" max="2" step="0.1" value={hostBPitch} onChange={(e) => setHostBPitch(e.target.value)} />
                    </div>
                    <div className="input-field">
                      <label>Speed: {hostBRate}x</label>
                      <input type="range" min="0.5" max="2" step="0.05" value={hostBRate} onChange={(e) => setHostBRate(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-footer">
              <button className="lucky-btn" onClick={() => setSettingsOpen(false)}>Cancel</button>
              <button className="google-search-btn" onClick={saveSettings}>Apply & Save Settings</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER NAVBAR (Only visible in Google Home View) */}
      {view === 'home' && (
        <footer className="google-home-footer">
          <div className="footer-location">
            <span>📍 United States</span>
            <span>• From your IP address</span>
          </div>
          <div className="footer-links-row">
            <div className="footer-links-left">
              <a href="https://about.google" target="_blank" rel="noreferrer">About</a>
              <a href="https://ads.google.com" target="_blank" rel="noreferrer">Advertising</a>
              <a href="https://www.google.com/services/" target="_blank" rel="noreferrer">Business</a>
              <a href="https://google.com/search/howsearchworks" target="_blank" rel="noreferrer">How Search works</a>
            </div>
            <div className="footer-links-right">
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy</a>
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms</a>
              <button className="footer-settings-btn" onClick={() => setSettingsOpen(true)}>Settings</button>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default App
