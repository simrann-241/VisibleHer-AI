import React from 'react';
import { Heart, Sparkles, Sun, Moon, Languages } from 'lucide-react';

const Navbar = ({ onStart, onHome, theme, toggleTheme, lang, toggleLang }) => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo" onClick={onHome}>
          <div className="logo-icon-box">
            <Heart size={20} color="white" fill="white" />
          </div>
          <span className="logo-text">VisibleHer <span className="gradient-text">AI</span></span>
        </div>
        
        <div className="navbar-tools">
          <button onClick={toggleLang} className="tool-btn lang-btn" title="Switch Language">
            {lang === 'en' ? 'हिन्दी' : 'EN'}
          </button>
          
          <button onClick={toggleTheme} className="tool-btn" title="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button className="primary-btn hide-mobile" onClick={onStart}>
            <span className="btn-label">{lang === 'en' ? 'Start Analysis' : 'शुरू करें'}</span> <Sparkles size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
