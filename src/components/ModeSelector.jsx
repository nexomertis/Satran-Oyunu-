import { useState } from 'react'
import { BOARD_THEMES } from '../utils/boardThemes'

function ModeSelector({ onSelectMode }) {
  const [selectedUltimateMode, setSelectedUltimateMode] = useState(null)
  const [selectedMode, setSelectedMode] = useState(null)
  const [selectedTheme, setSelectedTheme] = useState('classic')
  
  const handleUltimateSelect = (mode) => {
    setSelectedUltimateMode(mode)
  }
  
  const handleTimeSelect = (time) => {
    if (selectedUltimateMode) {
      onSelectMode(selectedUltimateMode, time, selectedTheme)
      setSelectedUltimateMode(null)
      setSelectedMode(null)
      setSelectedTheme('classic')
    }
  }
  
  const handleModeSelect = (mode) => {
    setSelectedMode(mode)
  }
  
  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme)
    if (selectedMode) {
      onSelectMode(selectedMode, null, theme)
      setSelectedMode(null)
      setSelectedTheme('classic')
    }
  }
  
  // Tema seçim ekranı
  if (selectedMode) {
    return (
      <div className="mode-selector">
        <div className="mode-container">
          <h1 className="mode-title">🎨 Tahta Teması Seç</h1>
          <p className="mode-subtitle">Favori renklerini seç</p>
          
          <div className="theme-grid">
            {Object.entries(BOARD_THEMES).map(([key, theme]) => (
              <div 
                key={key}
                className="theme-card" 
                onClick={() => handleThemeSelect(key)}
              >
                <div className="theme-preview">
                  <div className="theme-square" style={{ backgroundColor: theme.lightSquare }}></div>
                  <div className="theme-square" style={{ backgroundColor: theme.darkSquare }}></div>
                  <div className="theme-square" style={{ backgroundColor: theme.darkSquare }}></div>
                  <div className="theme-square" style={{ backgroundColor: theme.lightSquare }}></div>
                </div>
                <h3>{theme.name}</h3>
                <p>{theme.description}</p>
              </div>
            ))}
          </div>
          
          <button className="btn btn-secondary" onClick={() => setSelectedMode(null)} style={{marginTop: '20px'}}>
            🔙 Geri Dön
          </button>
        </div>
      </div>
    )
  }
  
  // Turnuva süresi seçim ekranı
  if (selectedUltimateMode) {
    return (
      <div className="mode-selector">
        <div className="mode-container">
          <h1 className="mode-title">⏱️ Turnuva Süresi Seç</h1>
          <p className="mode-subtitle">Gerçek Satranç Oyuncuları Modu</p>
          
          <div className="time-selection">
            <button className="time-button-large" onClick={() => handleTimeSelect('1m')}>
              ⚡ 1 Dakika<br/><small>Blitz</small>
            </button>
            <button className="time-button-large" onClick={() => handleTimeSelect('3m')}>
              ⚡⚡ 3 Dakika<br/><small>Rapid</small>
            </button>
            <button className="time-button-large" onClick={() => handleTimeSelect('5m')}>
              ⚡⚡⚡ 5 Dakika<br/><small>Klasik</small>
            </button>
            <button className="time-button-large" onClick={() => handleTimeSelect('10m')}>
              ⏰ 10 Dakika<br/><small>Uzun</small>
            </button>
          </div>
          
          <button className="btn btn-secondary" onClick={() => setSelectedUltimateMode(null)} style={{marginTop: '20px'}}>
            🔙 Geri Dön
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="mode-selector">
      <div className="mode-container">
        <h1 className="mode-title">⚔️ Fantastik 3D Satranç ⚔️</h1>
        <p className="mode-subtitle">
          <span className="orcs-text">Orklar</span> vs <span className="elves-text">Elfler</span>
        </p>
        
        <div className="mode-grid">
          <div className="mode-section">
            <h3 className="mode-section-title">🎮 3D Modeller</h3>
            <div className="mode-options">
              <div className="mode-card" onClick={() => handleModeSelect('ai')}>
                <div className="mode-icon">🤖</div>
                <h2>Orta Zorluk</h2>
                <p>Akıllı Ork ordusuna karşı savaş</p>
                <div className="mode-features">
                  <span>✨ Minimax AI</span>
                  <span>🎯 Dengeli Oyun</span>
                  <span>🧝 Sen <span className="elves-text">Elfler</span></span>
                </div>
              </div>
              
              <div className="mode-card" onClick={() => handleModeSelect('ai-hardcore')}>
                <div className="mode-icon">💀</div>
                <h2>Hardcore AI</h2>
                <p>Satranç ustasına karşı ölüm kalım savaşı</p>
                <div className="mode-features">
                  <span>🔥 Uzman Seviye</span>
                  <span>⚡ Derin Analiz</span>
                  <span>👹 Neredeyse Yenilmez</span>
                </div>
              </div>
              
              <div className="mode-card" onClick={() => handleUltimateSelect('ai-ultimate')}>
                <div className="mode-icon">👿</div>
                <h2>Gerçek Satranç Oyuncuları</h2>
                <p>Satranç Tanrısı - Yenilmez Mod</p>
                <div className="mode-features">
                  <span>🌪️ Maksimum Analiz</span>
                  <span>⚡⚡⚡ Tanrı Seviyesi</span>
                  <span>💀 Ölüm Garantili</span>
                </div>
              </div>
              
              <div className="mode-card" onClick={() => handleModeSelect('pvp')}>
                <div className="mode-icon">👥</div>
                <h2>İki Kişilik</h2>
                <p>Arkadaşınla epik bir savaş</p>
                <div className="mode-features">
                  <span>🧝 <span className="elves-text">Elfler</span> vs 👹 <span className="orcs-text">Orklar</span></span>
                  <span>🎮 Lokal Multiplayer</span>
                  <span>⚔️ Sıra Tabanlı</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mode-section">
            <h3 className="mode-section-title">📜 Klasik 2D</h3>
            <div className="mode-options">
              <div className="mode-card mode-card-2d" onClick={() => handleModeSelect('ai-2d')}>
                <div className="mode-icon">♟️</div>
                <h2>Orta Zorluk 2D</h2>
                <p>Klasik satranç taşlarıyla</p>
                <div className="mode-features">
                  <span>♔ Unicode Taşlar</span>
                  <span>🤖 AI Rakip</span>
                  <span>📐 2D Görünüm</span>
                </div>
              </div>
              
              <div className="mode-card mode-card-2d" onClick={() => handleModeSelect('ai-hardcore-2d')}>
                <div className="mode-icon">💀</div>
                <h2>Hardcore AI 2D</h2>
                <p>Klasik 2D'de ölüm kalım</p>
                <div className="mode-features">
                  <span>♔ Unicode Taşlar</span>
                  <span>🔥 Uzman Seviye</span>
                  <span>📐 2D Görünüm</span>
                </div>
              </div>
              
              <div className="mode-card mode-card-2d" onClick={() => handleUltimateSelect('ai-ultimate-2d')}>
                <div className="mode-icon">👿</div>
                <h2>Gerçek Satranç Oyuncuları 2D</h2>
                <p>2D'de Satranç Tanrısı</p>
                <div className="mode-features">
                  <span>♔ Unicode Taşlar</span>
                  <span>⚡⚡⚡ Tanrı Seviyesi</span>
                  <span>📐 2D Görünüm</span>
                </div>
              </div>
              
              <div className="mode-card mode-card-2d" onClick={() => handleModeSelect('pvp-2d')}>
                <div className="mode-icon">♟️</div>
                <h2>İki Kişilik 2D</h2>
                <p>Klasik satranç deneyimi</p>
                <div className="mode-features">
                  <span>♔ Unicode Taşlar</span>
                  <span>👥 2 Oyuncu</span>
                  <span>📐 2D Görünüm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mode-footer">
          <p>🎨 3D Grafik | 🌙 Fantastik Atmosfer | ⚡ Gerçek Zamanlı</p>
        </div>
      </div>
      
      {/* Yapımcı Bilgisi - Sağ Alt Köşe */}
      <div className="developer-credit-corner-menu">
        Geliştirici: Mert Yılmaz
      </div>
    </div>
  )
}

export default ModeSelector
