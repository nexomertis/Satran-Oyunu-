const PIECE_ICONS = {
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙'
  },
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  }
}

const PIECE_NAMES = {
  king: 'Şah',
  queen: 'Vezir',
  rook: 'Kale',
  bishop: 'Fil',
  knight: 'At',
  pawn: 'Piyon'
}

function GameUI({ currentTurn, capturedPieces, winner, onRestart, onBackToMenu, isAIThinking, gameMode, moveHistory, whiteTime, blackTime, onTimeButtonPress }) {
  const is2DMode = gameMode === 'ai-2d' || gameMode === 'pvp-2d'
  const isAIMode = gameMode === 'ai' || gameMode === 'ai-2d'
  
  const getPlayerName = (color) => {
    if (isAIMode) {
      const isUltimate = gameMode === 'ai-ultimate' || gameMode === 'ai-ultimate-2d'
      const isHardcore = gameMode === 'ai-hardcore' || gameMode === 'ai-hardcore-2d'
      return color === 'white' ? (
        <span>🧝 <span className="elves-text">Elfler</span> (Sen)</span>
      ) : (
        <span>👹 <span className="orcs-text">Orklar</span> {isUltimate ? '(SATRANÇ TANRISI 👿)' : isHardcore ? '(Uzman)' : '(AI)'} {isAIThinking ? '🤔' : ''}</span>
      )
    }
    return color === 'white' ? (
      <span>🧝 <span className="elves-text">Elfler</span> (Oyuncu 1)</span>
    ) : (
      <span>👹 <span className="orcs-text">Orklar</span> (Oyuncu 2)</span>
    )
  }
  
  const getModeLabel = () => {
    if (is2DMode) return '📜 Klasik 2D Mod'
    return '🎮 3D Mod'
  }

  return (
    <div className="game-ui">
      <div className="header">
        <h1 className="title">⚔️ Fantastik Satranç ⚔️</h1>
        <div className="mode-label">{getModeLabel()}</div>
        <div className="game-info">
          <div className="player-section">
            {gameMode && gameMode.includes('ultimate') && whiteTime !== null && blackTime !== null && (
              <div className={`timer timer-left ${currentTurn === 'white' ? 'active' : ''}`}>
                🧝 {Math.floor(whiteTime / 60)}:{String(whiteTime % 60).padStart(2, '0')}
              </div>
            )}
            <div className={`player-panel ${currentTurn === 'white' ? 'active' : ''}`}>
              <div className="player-name">{getPlayerName('white')}</div>
              <div className="captured">
                {capturedPieces.white.map((piece, i) => (
                  <span key={i}>{PIECE_ICONS.black[piece.type]}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="player-section">
            {gameMode && gameMode.includes('ultimate') && whiteTime !== null && blackTime !== null && (
              <div className={`timer timer-right ${currentTurn === 'black' ? 'active' : ''}`}>
                👹 {Math.floor(blackTime / 60)}:{String(blackTime % 60).padStart(2, '0')}
              </div>
            )}
            <div className={`player-panel ${currentTurn === 'black' ? 'active' : ''}`}>
              <div className="player-name">{getPlayerName('black')}</div>
              <div className="captured">
                {capturedPieces.black.map((piece, i) => (
                  <span key={i}>{PIECE_ICONS.white[piece.type]}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {winner && (
        <div className="message">
          🎉 {winner} Kazandı! 🎉
        </div>
      )}
      
      {isAIThinking && !winner && (
        <div className="instructions">
          {gameMode === 'ai-ultimate' || gameMode === 'ai-ultimate-2d' ? '👿 SATRANÇ TANRISI - Seni yok etmeyi hesaplıyor... (Ölüm garantili)' : gameMode === 'ai-hardcore' || gameMode === 'ai-hardcore-2d' ? '💀 SOULS SEVİYESİ ZOR - Uzman Orklar seni yok etmeyi planlıyor...' : '🧠 Orklar düşünüyor...'}
        </div>
      )}
      
      {!winner && !isAIThinking && (
        <div className="instructions">
          🖱️ Fare ile kamerayı döndür | 🎯 Taşa tıkla ve hamle yap
        </div>
      )}
      
      <div className="controls">
        <button className="btn" onClick={onRestart}>
          🔄 Yeni Oyun
        </button>
        <button className="btn btn-secondary" onClick={onBackToMenu}>
          🏠 Ana Menü
        </button>
      </div>
      
      {gameMode && gameMode.includes('ultimate') && (
        <button className="time-button" onClick={onTimeButtonPress}>
          ⏱️ Süre Geç
        </button>
      )}
      
      {/* Yapımcı Bilgisi - Sol Alt Köşe */}
      <div className="developer-credit-corner">
        Geliştirici: Mert Yılmaz
      </div>
      
      {/* Hamle Geçmişi */}
      <div className="move-history-panel">
        <div className="move-history-header">
          📜 Hamle Geçmişi
          <span className="move-count">Hamle: {Math.floor(moveHistory.length / 2) + (moveHistory.length % 2)}</span>
        </div>
        <div className="move-history-content">
          {moveHistory.length === 0 ? (
            <div className="no-moves">Henüz hamle yapılmadı</div>
          ) : (
            <div className="moves-list">
              {moveHistory.reduce((acc, move, index) => {
                if (index % 2 === 0) {
                  acc.push([move])
                } else {
                  acc[acc.length - 1].push(move)
                }
                return acc
              }, []).map((movePair, pairIndex) => (
                <div key={pairIndex} className="move-pair">
                  <span className="move-number">{pairIndex + 1}.</span>
                  <div className="move-item white-move">
                    <span className="piece-icon">{PIECE_ICONS.white[movePair[0].piece.type]}</span>
                    <span className="move-notation">
                      {String.fromCharCode(97 + movePair[0].from.col)}{8 - movePair[0].from.row} → {String.fromCharCode(97 + movePair[0].to.col)}{8 - movePair[0].to.row}
                    </span>
                    {movePair[0].captured && (
                      <span className="captured-indicator">
                        ×{PIECE_ICONS.black[movePair[0].captured.type]}
                      </span>
                    )}
                  </div>
                  {movePair[1] && (
                    <div className="move-item black-move">
                      <span className="piece-icon">{PIECE_ICONS.black[movePair[1].piece.type]}</span>
                      <span className="move-notation">
                        {String.fromCharCode(97 + movePair[1].from.col)}{8 - movePair[1].from.row} → {String.fromCharCode(97 + movePair[1].to.col)}{8 - movePair[1].to.row}
                      </span>
                      {movePair[1].captured && (
                        <span className="captured-indicator">
                          ×{PIECE_ICONS.white[movePair[1].captured.type]}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameUI
