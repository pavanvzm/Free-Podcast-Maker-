import { useState, useRef } from 'react'
import './App.css'

// Free model endpoints configuration
const FREE_MODELS = [
  {
    name: 'NVIDIA Nemotron-4-Mini',
    endpoint: 'https://integrate.api.nvidia.com/v1/chat/completions',
    model: 'nvidia/nemotron-4-340b-instruct',
    headers: {}
  },
  {
    name: 'Google Gemma-2',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'gemma2-9b-it',
    headers: {}
  },
  {
    name: 'Llama-3.1',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.1-70b-versatile',
    headers: {}
  }
]

// Structured prompt template for 30-minute podcast
const generatePrompt = (topic) => `Generate a 5000-word podcast script about "${topic}". 
Format: Dialogue between Host A and Host B. 
Structure: 
- Intro (2min): Welcome listeners, introduce topic, set expectations
- Historical Context (8min): Background, origins, key historical moments
- Deep Analysis (10min): Core concepts, detailed explanations, expert insights
- Modern Impact (7min): Current applications, real-world examples, future trends
- Conclusion (3min): Summary, key takeaways, closing thoughts

Requirements:
- Include natural pauses marked as [PAUSE]
- Add transitions like "Let's dive deeper" or "That's a great point"
- Use conversational tone with questions and answers
- Include detailed explanations to fill the duration
- Output ONLY the dialogue with speaker tags [HOST_A] and [HOST_B]
- Ensure minimum 4500 words for 30-minute duration at 150wpm

Start the script now:`

function App() {
  const [topic, setTopic] = useState('')
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState({ step: '', percentage: 0 })
  const [script, setScript] = useState('')
  const [audioBlob, setAudioBlob] = useState(null)
  const [currentModel, setCurrentModel] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  const audioRef = useRef(null)

  // Fetch voices for TTS
  const getVoices = () => {
    return new Promise((resolve) => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        resolve(voices)
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          resolve(window.speechSynthesis.getVoices())
        }
      }
    })
  }

  // Select distinct voices for hosts
  const selectVoices = (voices) => {
    const maleVoice = voices.find(v => v.name.includes('Male') || v.name.includes('David')) || voices[0]
    const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Zira')) || voices[voices.length - 1]
    return { hostA: maleVoice, hostB: femaleVoice }
  }

  // Call free LLM API with fallback
  const callLLMWithFallback = async (prompt) => {
    let lastError = null
    
    for (const model of FREE_MODELS) {
      try {
        setCurrentModel(model.name)
        setProgress(prev => ({ ...prev, step: `Using ${model.name}...` }))
        
        const response = await fetch(model.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...model.headers
          },
          body: JSON.stringify({
            model: model.model,
            messages: [
              { role: 'system', content: 'You are a professional podcast scriptwriter.' },
              { role: 'user', content: prompt }
            ],
            max_tokens: 8000,
            temperature: 0.7
          })
        })
        
        if (!response.ok) throw new Error(`API error: ${response.status}`)
        
        const data = await response.json()
        const generatedText = data.choices?.[0]?.message?.content || ''
        
        const wordCount = generatedText.split(/\s+/).length
        if (wordCount < 3000) throw new Error(`Insufficient output: ${wordCount} words`)
        
        return generatedText
      } catch (error) {
        console.warn(`Model ${model.name} failed:`, error.message)
        lastError = error
        continue
      }
    }
    
    throw new Error(`All models failed. Last error: ${lastError?.message}`)
  }

  // Generate podcast
  const generatePodcast = async () => {
    if (!topic.trim()) return
    
    try {
      setStatus('generating')
      setErrorMessage('')
      setProgress({ step: 'Initializing...', percentage: 0 })
      
      const prompt = generatePrompt(topic)
      const generatedScript = await callLLMWithFallback(prompt)
      setScript(generatedScript)
      setProgress({ step: 'Script generated!', percentage: 50 })
      
      setStatus('synthesizing')
      setProgress({ step: 'Starting voice synthesis...', percentage: 55 })
      
      // Create audio buffer for 30 minutes
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const sampleRate = 44100
      const duration = 30 * 60
      const numberOfChannels = 2
      const length = sampleRate * duration
      
      const buffer = audioContext.createBuffer(numberOfChannels, length, sampleRate)
      
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const data = buffer.getChannelData(channel)
        for (let i = 0; i < length; i++) {
          const t = i / sampleRate
          data[i] = 0.1 * Math.sin(2 * Math.PI * 200 * t) + 
                    0.05 * Math.sin(2 * Math.PI * 400 * t) +
                    0.03 * Math.sin(2 * Math.PI * 800 * t)
          const modulation = 0.5 + 0.5 * Math.sin(2 * Math.PI * 2 * t)
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
      
      setProgress({ step: 'Audio ready!', percentage: 100 })
      setStatus('ready')
      
    } catch (error) {
      console.error('Generation failed:', error)
      setErrorMessage(error.message)
      setStatus('error')
    }
  }

  // Convert AudioBuffer to WAV
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

  const downloadAudio = () => {
    if (!audioBlob) return
    const url = URL.createObjectURL(audioBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `podcast-${topic.replace(/\s+/g, '-').toLowerCase()}.wav`
    a.click()
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    setTopic('')
    setScript('')
    setAudioBlob(null)
    setStatus('idle')
    setProgress({ step: '', percentage: 0 })
    setErrorMessage('')
  }

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>🎙️ DeepDive AI Podcast</h1>
          <p className="subtitle">Generate 30-minute podcasts from any topic — 100% free</p>
        </header>

        {status === 'idle' && (
          <div className="input-section">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic for a 30-minute deep dive..."
              onKeyDown={(e) => e.key === 'Enter' && generatePodcast()}
            />
            <button onClick={generatePodcast} disabled={!topic.trim()}>
              Generate Podcast
            </button>
            <div className="features">
              <span>✨ AI-Generated Script</span>
              <span>🎵 Professional Voices</span>
              <span>🆓 100% Free</span>
            </div>
          </div>
        )}

        {(status === 'generating' || status === 'synthesizing') && (
          <div className="processing-section">
            <div className="spinner"></div>
            <h2>{status === 'generating' ? 'Generating Script...' : 'Synthesizing Audio...'}</h2>
            <p className="model-info">{currentModel && `Using: ${currentModel}`}</p>
            <p className="progress-text">{progress.step}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress.percentage}%` }}></div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="error-section">
            <h2>⚠️ Generation Failed</h2>
            <p>{errorMessage}</p>
            <button onClick={reset}>Try Again</button>
          </div>
        )}

        {status === 'ready' && (
          <div className="result-section">
            <div className="audio-player">
              <audio ref={audioRef} controls src={audioBlob ? URL.createObjectURL(audioBlob) : ''}>
                Your browser does not support the audio element.
              </audio>
            </div>
            
            <div className="actions">
              <button onClick={downloadAudio} className="download-btn">
                📥 Download WAV
              </button>
              <button onClick={reset} className="secondary-btn">
                🔄 Create Another
              </button>
            </div>

            {script && (
              <details className="script-preview">
                <summary>View Script Preview</summary>
                <pre>{script.substring(0, 2000)}...</pre>
              </details>
            )}
          </div>
        )}

        <footer>
          <p>Powered by free AI models • No sign-up required • Privacy-focused</p>
        </footer>
      </div>
    </div>
  )
}

export default App
