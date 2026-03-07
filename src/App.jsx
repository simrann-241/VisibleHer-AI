import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [view, setView] = useState('landing')
  const [theme, setTheme] = useState('dark')
  const [lang, setLang] = useState('en') // 'en' or 'hi'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en')
  }

  return (
    <div className="app">
      <Navbar 
        onStart={() => setView('dashboard')} 
        onHome={() => setView('landing')}
        theme={theme} 
        toggleTheme={toggleTheme} 
        lang={lang}
        toggleLang={toggleLang}
      />
      
      <main style={{ paddingTop: '90px' }}>
        {view === 'landing' ? (
          <Landing onStart={() => setView('dashboard')} lang={lang} />
        ) : (
          <Dashboard onBack={() => setView('landing')} lang={lang} />
        )}
      </main>

      <footer style={styles.footer}>
        <div className="container">
          <p style={styles.footerText}>
            {lang === 'en' 
              ? "© 2026 VisibleHer AI. Engineering professional identity for every woman." 
              : "© 2026 विज़िबलहर एआई। हर महिला के लिए व्यावसायिक पहचान बनाना।"}
            <br />
            {lang === 'en' 
              ? "Built for She Innovates 2026 • Reclaiming Invisible Labor." 
              : "शी इनोवेट्स 2026 के लिए निर्मित • अदृश्य श्रम को पहचान देना।"}
          </p>
        </div>
      </footer>
    </div>
  )
}

const styles = {
  footer: {
    padding: '60px 0',
    borderTop: '1px solid var(--glass-border)',
    marginTop: 'auto',
    background: 'var(--bg-secondary)',
  },
  footerText: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '14px',
    lineHeight: '1.8',
  }
}

export default App
