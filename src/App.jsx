import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import ChessBoard from './components/ChessBoard'
import ChessBoard2D from './components/ChessBoard2D'
import GameUI from './components/GameUI'
import ModeSelector from './components/ModeSelector'
import { initializeBoard, getValidMoves, getAIMove, isCheckmate, isStalemate } from './utils/chessLogic'
import { getTheme } from './utils/boardThemes'

function App() {
  // Oyun modu state'i
  const [gameMode, setGameMode] = useState(null)
  
  // Satranç tahtası
  const [board, setBoard] = useState(initializeBoard())
  
  // Seçili taş
  const [selectedPiece, setSelectedPiece] = useState(null)
  
  // Kimin sırası
  const [currentTurn, setCurrentTurn] = useState('white')
  
  // Yenilen taşlar
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] })
  
  // Kazanan
  const [winner, setWinner] = useState(null)
  
  // AI düşünüyor mu
  const [isAIThinking, setIsAIThinking] = useState(false)
  
  // Hamle geçmişi
  const [moveHistory, setMoveHistory] = useState([])
  
  // Tahta teması
  const [boardTheme, setBoardTheme] = useState('classic')
  
  // Zaman modu
  const [timeMode, setTimeMode] = useState(null)
  const [whiteTime, setWhiteTime] = useState(null)
  const [blackTime, setBlackTime] = useState(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  // Timer
  useEffect(() => {
    if (!isTimerRunning || !timeMode || winner || whiteTime === null || blackTime === null) return

    const interval = setInterval(() => {
      if (currentTurn === 'white') {
        setWhiteTime(prev => {
          if (prev <= 1) {
            setWinner('👹 Orklar Kazandı! (Zaman Bitti)')
            setIsTimerRunning(false)
            return 0
          }
          return prev - 1
        })
      } else {
        setBlackTime(prev => {
          if (prev <= 1) {
            setWinner('🧝 Elfler Kazandı! (Zaman Bitti)')
            setIsTimerRunning(false)
            return 0
          }
          return prev - 1
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimerRunning, currentTurn, timeMode, winner, whiteTime, blackTime])

  // AI hamlesi
  useEffect(() => {
    const isAIMode = gameMode === 'ai' || gameMode === 'ai-2d' || gameMode === 'ai-hardcore' || gameMode === 'ai-ultimate' || gameMode === 'ai-hardcore-2d' || gameMode === 'ai-ultimate-2d'
    if (isAIMode && currentTurn === 'black' && !winner && !isAIThinking) {
      setIsAIThinking(true)
      
      // Zorluk seviyesine göre düşünme süresi ve derinliği
      let difficulty = 2
      let thinkingTime = 600
      
      if (gameMode === 'ai-hardcore' || gameMode === 'ai-hardcore-2d') {
        difficulty = 5 // Maksimum derin analiz - SOULS SEVIYESI ZOR!
        thinkingTime = 1500 // Uzman düşünüyor (Souls oyunları gibi zor)
      } else if (gameMode === 'ai-ultimate' || gameMode === 'ai-ultimate-2d') {
        difficulty = 6 // ULTIMATE - TANRI SEVİYESİ!
        thinkingTime = 2500 // Çok derin düşünme (Satranç Tanrısı)
      }
      
      // AI düşünüyor efekti için gecikme
      setTimeout(() => {
        const isUltimate = gameMode === 'ai-ultimate' || gameMode === 'ai-ultimate-2d'
        const aiMove = getAIMove(board, difficulty, isUltimate)
        
        if (aiMove) {
          makeMove(aiMove.from.row, aiMove.from.col, aiMove.to.row, aiMove.to.col)
        }
        
        setIsAIThinking(false)
      }, thinkingTime)
    }
  }, [gameMode, currentTurn, winner, board, isAIThinking])

  const makeMove = (fromRow, fromCol, toRow, toCol) => {
    const piece = board[fromRow][fromCol]
    const targetPiece = board[toRow][toCol]
    
    const newBoard = board.map(r => [...r])
    
    // Hamle kaydı oluştur
    const moveNotation = {
      piece: piece,
      from: { row: fromRow, col: fromCol },
      to: { row: toRow, col: toCol },
      captured: targetPiece,
      moveNumber: Math.floor(moveHistory.length / 2) + 1,
      player: piece.color
    }
    
    // Yenilen taşı kaydet - rakibin kısmında göster
    if (targetPiece) {
      const capturingPlayerColor = piece.color // Taşı yiyen oyuncu
      setCapturedPieces(prev => ({
        ...prev,
        [capturingPlayerColor]: [...prev[capturingPlayerColor], targetPiece]
      }))
    }
    
    newBoard[toRow][toCol] = piece
    newBoard[fromRow][fromCol] = null
    
    setBoard(newBoard)
    setSelectedPiece(null)
    setMoveHistory(prev => [...prev, moveNotation])
    
    const nextTurn = piece.color === 'white' ? 'black' : 'white'
    setCurrentTurn(nextTurn)
    
    // AI hamle yaptıysa zamanı geçir (otomatik olarak butona basıyor)
    if (piece.color === 'black' && timeMode) {
      setTimeout(() => {
        setIsTimerRunning(true)
      }, 100)
    }
    
    // Oyun sonu kontrolü
    setTimeout(() => {
      if (isCheckmate(newBoard, nextTurn)) {
        setWinner(piece.color === 'white' ? '🎉 Elfler Kazandı! (Şah Mat)' : '🎉 Orklar Kazandı! (Şah Mat)')
      } else if (isStalemate(newBoard, nextTurn)) {
        setWinner('🤝 Beraberlik! (Pat)')
      }
    }, 100)
  }

  const handleSquareClick = (row, col) => {
    if (winner) return
    
    // AI düşünürken taş taşıyamaz ama kamera hareket ettirilebilir
    if (isAIThinking) return
    
    // AI modunda sadece beyaz oynayabilir
    const isAIMode = gameMode === 'ai' || gameMode === 'ai-2d' || gameMode === 'ai-hardcore'
    if (isAIMode && currentTurn === 'black') return

    if (selectedPiece) {
      const piece = board[selectedPiece.row][selectedPiece.col]
      if (piece && piece.color === currentTurn) {
        const targetPiece = board[row][col]
        
        // Aynı kareye tıklanırsa seçimi kaldır
        if (row === selectedPiece.row && col === selectedPiece.col) {
          setSelectedPiece(null)
          return
        }
        
        // Kendi taşına tıklanırsa onu seç
        if (targetPiece && targetPiece.color === currentTurn) {
          setSelectedPiece({ row, col })
          return
        }
        
        // Geçerli hamle mi kontrol et
        const validMoves = getValidMoves(board, selectedPiece.row, selectedPiece.col)
        const isValid = validMoves.some(m => m.row === row && m.col === col)
        
        if (isValid) {
          makeMove(selectedPiece.row, selectedPiece.col, row, col)
        } else {
          setSelectedPiece(null)
        }
      }
    } else {
      const piece = board[row][col]
      if (piece && piece.color === currentTurn) {
        setSelectedPiece({ row, col })
      }
    }
  }

  const handleRestart = () => {
    setBoard(initializeBoard())
    setSelectedPiece(null)
    setCurrentTurn('white')
    setCapturedPieces({ white: [], black: [] })
    setWinner(null)
    setIsAIThinking(false)
    setMoveHistory([])
    setIsTimerRunning(false)
  }
  
  // Süre butonuna basıldığında - rakibinin zamanı başlasın
  const handleTimeButtonPress = () => {
    if (!timeMode) return
    // Oyuncu süresi geçti, rakibinin zamanı başlasın
    setCurrentTurn(currentTurn === 'white' ? 'black' : 'white')
    setIsTimerRunning(true)
  }
  
  // Oyun başladığında süre hazırla (ama başlatma)
  const startGameWithTime = (mode, time) => {
    setGameMode(mode)
    setTimeMode(time)
    const timeInSeconds = {
      '1m': 60,
      '3m': 180,
      '5m': 300,
      '10m': 600
    }[time]
    setWhiteTime(timeInSeconds)
    setBlackTime(timeInSeconds)
    setIsTimerRunning(false) // Başlatma, sadece hazırla
    handleRestart()
  }

  const handleModeSelect = (mode, time, theme = 'classic') => {
    setBoardTheme(theme)
    // Gerçek Satranç Oyuncuları modunda seçilen süresi başlat
    if ((mode === 'ai-ultimate' || mode === 'ai-ultimate-2d') && time) {
      startGameWithTime(mode, time)
    } else {
      setGameMode(mode)
      handleRestart()
    }
  }

  const handleBackToMenu = () => {
    setGameMode(null)
    handleRestart()
  }

  // Mod seçimi ekranı
  if (!gameMode) {
    return <ModeSelector onSelectMode={handleModeSelect} />
  }

  return (
    <>
      <Canvas shadows style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'auto' }}>
        <PerspectiveCamera makeDefault position={[0, 8, 8]} fov={50} />
        <OrbitControls 
          enablePan={false}
          minDistance={6}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2.2}
        />
        
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1} 
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4169e1" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffd700" />
        
        <Environment preset="night" />
        
        {(gameMode === 'ai-2d' || gameMode === 'pvp-2d' || gameMode === 'ai-hardcore-2d' || gameMode === 'ai-ultimate-2d') ? (
          <ChessBoard2D 
            board={board}
            selectedPiece={selectedPiece}
            onSquareClick={handleSquareClick}
            theme={getTheme(boardTheme)}
          />
        ) : (
          <ChessBoard 
            board={board}
            selectedPiece={selectedPiece}
            onSquareClick={handleSquareClick}
            theme={getTheme(boardTheme)}
          />
        )}
      </Canvas>
      
      <GameUI 
        currentTurn={currentTurn}
        capturedPieces={capturedPieces}
        winner={winner}
        onRestart={handleRestart}
        onBackToMenu={handleBackToMenu}
        isAIThinking={isAIThinking}
        gameMode={gameMode}
        moveHistory={moveHistory}
        whiteTime={whiteTime}
        blackTime={blackTime}
        onTimeButtonPress={handleTimeButtonPress}
      />
    </>
  )
}

export default App
