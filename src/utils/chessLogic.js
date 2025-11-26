export function initializeBoard() {
  return [
    [
      { type: 'rook', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'bishop', color: 'black' },
      { type: 'queen', color: 'black' },
      { type: 'king', color: 'black' },
      { type: 'bishop', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'rook', color: 'black' }
    ],
    Array(8).fill(null).map(() => ({ type: 'pawn', color: 'black' })),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null).map(() => ({ type: 'pawn', color: 'white' })),
    [
      { type: 'rook', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'queen', color: 'white' },
      { type: 'king', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'rook', color: 'white' }
    ]
  ]
}

// Şah kontrolü - belirli bir rengin şahı tehdit altında mı?
function isKingInCheck(board, color) {
  // Şahın pozisyonunu bul
  let kingPos = null
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c]
      if (piece && piece.type === 'king' && piece.color === color) {
        kingPos = { row: r, col: c }
        break
      }
    }
    if (kingPos) break
  }
  
  if (!kingPos) return false
  
  // Rakip taşların şahı tehdit edip etmediğini kontrol et
  const opponentColor = color === 'white' ? 'black' : 'white'
  
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c]
      if (piece && piece.color === opponentColor) {
        const moves = getPossibleMoves(board, r, c)
        if (moves.some(m => m.row === kingPos.row && m.col === kingPos.col)) {
          return true
        }
      }
    }
  }
  
  return false
}

// Hamleden sonra şah kontrolü yapmadan olası hamleleri al
function getPossibleMoves(board, row, col) {
  const piece = board[row][col]
  if (!piece) return []
  
  const moves = []
  
  const addMove = (r, c) => {
    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
      const target = board[r][c]
      if (!target || target.color !== piece.color) {
        moves.push({ row: r, col: c })
      }
    }
  }
  
  const addLineMoves = (directions) => {
    directions.forEach(([dr, dc]) => {
      let r = row + dr
      let c = col + dc
      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const target = board[r][c]
        if (!target) {
          moves.push({ row: r, col: c })
        } else {
          if (target.color !== piece.color) {
            moves.push({ row: r, col: c })
          }
          break
        }
        r += dr
        c += dc
      }
    })
  }
  
  switch (piece.type) {
    case 'pawn':
      const direction = piece.color === 'white' ? -1 : 1
      const startRow = piece.color === 'white' ? 6 : 1
      
      // İleri hareket
      if (row + direction >= 0 && row + direction < 8) {
        if (!board[row + direction]?.[col]) {
          moves.push({ row: row + direction, col })
          // İlk hamle 2 kare
          if (row === startRow && !board[row + 2 * direction]?.[col]) {
            moves.push({ row: row + 2 * direction, col })
          }
        }
      }
      
      // Çapraz yeme
      [-1, 1].forEach(dc => {
        if (row + direction >= 0 && row + direction < 8 && col + dc >= 0 && col + dc < 8) {
          const target = board[row + direction]?.[col + dc]
          if (target && target.color !== piece.color) {
            moves.push({ row: row + direction, col: col + dc })
          }
        }
      })
      break
      
    case 'rook':
      addLineMoves([[0,1], [0,-1], [1,0], [-1,0]])
      break
      
    case 'knight':
      [[2,1], [2,-1], [-2,1], [-2,-1], [1,2], [1,-2], [-1,2], [-1,-2]].forEach(([dr, dc]) => {
        addMove(row + dr, col + dc)
      })
      break
      
    case 'bishop':
      addLineMoves([[1,1], [1,-1], [-1,1], [-1,-1]])
      break
      
    case 'queen':
      addLineMoves([[0,1], [0,-1], [1,0], [-1,0], [1,1], [1,-1], [-1,1], [-1,-1]])
      break
      
    case 'king':
      [[0,1], [0,-1], [1,0], [-1,0], [1,1], [1,-1], [-1,1], [-1,-1]].forEach(([dr, dc]) => {
        addMove(row + dr, col + dc)
      })
      break
  }
  
  return moves
}

// Geçerli hamleleri hesapla (şah kontrolü ile)
export function getValidMoves(board, row, col) {
  const piece = board[row][col]
  if (!piece) return []
  
  const possibleMoves = getPossibleMoves(board, row, col)
  const validMoves = []
  
  // Her hamleyi simüle et ve şah kontrolü yap
  for (const move of possibleMoves) {
    const testBoard = board.map(r => [...r])
    testBoard[move.row][move.col] = testBoard[row][col]
    testBoard[row][col] = null
    
    // Bu hamleden sonra kendi şahımız tehdit altında mı?
    if (!isKingInCheck(testBoard, piece.color)) {
      validMoves.push(move)
    }
  }
  
  return validMoves
}

// Şah mat kontrolü
export function isCheckmate(board, color) {
  // Şah altında mı?
  if (!isKingInCheck(board, color)) {
    return false
  }
  
  // Hiç geçerli hamle var mı?
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c]
      if (piece && piece.color === color) {
        const moves = getValidMoves(board, r, c)
        if (moves.length > 0) {
          return false // En az bir geçerli hamle var
        }
      }
    }
  }
  
  return true // Hiç geçerli hamle yok = şah mat
}

// Pat (beraberlik) kontrolü
export function isStalemate(board, color) {
  // Şah altında değil ama hiç hamle yapamıyor
  if (isKingInCheck(board, color)) {
    return false
  }
  
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c]
      if (piece && piece.color === color) {
        const moves = getValidMoves(board, r, c)
        if (moves.length > 0) {
          return false
        }
      }
    }
  }
  
  return true
}

// Taş değerleri
const PIECE_VALUES = {
  pawn: 100,
  knight: 320,
  bishop: 330,
  rook: 500,
  queen: 900,
  king: 20000
}

// Pozisyon değerleri - merkez daha değerli
const POSITION_VALUES = {
  pawn: [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
  ],
  knight: [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
  ],
  bishop: [
    [-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5, 10, 10,  5,  0,-10],
    [-10,  5,  5, 10, 10,  5,  5,-10],
    [-10,  0, 10, 10, 10, 10,  0,-10],
    [-10, 10, 10, 10, 10, 10, 10,-10],
    [-10,  5,  0,  0,  0,  0,  5,-10],
    [-20,-10,-10,-10,-10,-10,-10,-20]
  ],
  rook: [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [5, 10, 10, 10, 10, 10, 10,  5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [0,  0,  0,  5,  5,  0,  0,  0]
  ],
  queen: [
    [-20,-10,-10, -5, -5,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5,  5,  5,  5,  0,-10],
    [-5,  0,  5,  5,  5,  5,  0, -5],
    [0,  0,  5,  5,  5,  5,  0, -5],
    [-10,  5,  5,  5,  5,  5,  0,-10],
    [-10,  0,  5,  0,  0,  0,  0,-10],
    [-20,-10,-10, -5, -5,-10,-10,-20]
  ],
  king: [
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-20,-30,-30,-40,-40,-30,-30,-20],
    [-10,-20,-20,-20,-20,-20,-20,-10],
    [20, 20,  0,  0,  0,  0, 20, 20],
    [20, 30, 10,  0,  0, 10, 30, 20]
  ]
}

// Pozisyon değerlendirmesi
function evaluateBoard(board) {
  let score = 0
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]
      if (piece) {
        const pieceValue = PIECE_VALUES[piece.type]
        const posValue = POSITION_VALUES[piece.type] ? 
          POSITION_VALUES[piece.type][piece.color === 'white' ? row : 7 - row][col] : 0
        
        const totalValue = pieceValue + posValue
        score += piece.color === 'black' ? totalValue : -totalValue
      }
    }
  }
  
  // Şah mat durumları
  if (isCheckmate(board, 'white')) {
    return 100000 // Siyah kazandı
  }
  if (isCheckmate(board, 'black')) {
    return -100000 // Beyaz kazandı
  }
  
  // Pat durumu
  if (isStalemate(board, 'white') || isStalemate(board, 'black')) {
    return 0 // Beraberlik
  }
  
  return score
}

// Tüm geçerli hamleleri al
function getAllMoves(board, color) {
  const moves = []
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]
      if (piece && piece.color === color) {
        const validMoves = getValidMoves(board, row, col)
        validMoves.forEach(move => {
          moves.push({
            from: { row, col },
            to: move
          })
        })
      }
    }
  }
  
  return moves
}

// Hamle simülasyonu
function simulateMove(board, from, to) {
  const newBoard = board.map(row => [...row])
  newBoard[to.row][to.col] = newBoard[from.row][from.col]
  newBoard[from.row][from.col] = null
  return newBoard
}

// Minimax algoritması - ULTIMATE modda daha agresif
function minimax(board, depth, isMaximizing, alpha, beta, isUltimate = false) {
  if (depth === 0) {
    let score = evaluateBoard(board)
    // ULTIMATE modda saldırı bonusu
    if (isUltimate && isMaximizing) {
      score += 50 // Agresif oynamayı teşvik et
    }
    return score
  }
  
  const color = isMaximizing ? 'black' : 'white'
  const moves = getAllMoves(board, color)
  
  if (moves.length === 0) {
    return evaluateBoard(board)
  }
  
  if (isMaximizing) {
    let maxScore = -Infinity
    for (const move of moves) {
      const newBoard = simulateMove(board, move.from, move.to)
      const score = minimax(newBoard, depth - 1, false, alpha, beta, isUltimate)
      maxScore = Math.max(maxScore, score)
      alpha = Math.max(alpha, score)
      if (beta <= alpha) break
    }
    return maxScore
  } else {
    let minScore = Infinity
    for (const move of moves) {
      const newBoard = simulateMove(board, move.from, move.to)
      const score = minimax(newBoard, depth - 1, true, alpha, beta, isUltimate)
      minScore = Math.min(minScore, score)
      beta = Math.min(beta, score)
      if (beta <= alpha) break
    }
    return minScore
  }
}

// Açılış kitabı - AGRESIF SATRANÇ AÇILIŞ (Souls seviyesi zor!)
const OPENING_BOOK = {
  // İlk hamle seçenekleri (siyah) - Agresif merkez kontrolü
  'first': [
    { from: { row: 1, col: 4 }, to: { row: 3, col: 4 } }, // e5 - Klasik agresif
    { from: { row: 1, col: 3 }, to: { row: 3, col: 3 } }, // d5 - Merkez kontrolü
    { from: { row: 1, col: 4 }, to: { row: 3, col: 4 } }, // e5 - Klasik agresif
    { from: { row: 1, col: 3 }, to: { row: 3, col: 3 } }, // d5 - Merkez kontrolü
  ],
  // İkinci hamle seçenekleri - Agresif gelişim
  'second': [
    { from: { row: 1, col: 1 }, to: { row: 2, col: 3 } }, // Nf6 - Saldırı
    { from: { row: 1, col: 6 }, to: { row: 2, col: 4 } }, // Nc6 - Saldırı
    { from: { row: 1, col: 1 }, to: { row: 2, col: 3 } }, // Nf6 - Saldırı
    { from: { row: 1, col: 2 }, to: { row: 2, col: 4 } }, // Bc6 - Agresif
  ],
  // Üçüncü hamle - Hücum başlat
  'third': [
    { from: { row: 1, col: 5 }, to: { row: 2, col: 4 } }, // Bf6 - Hücum
    { from: { row: 1, col: 4 }, to: { row: 2, col: 4 } }, // Qe6 - Hücum
  ]
}

// Hamleleri sıralama - en iyi hamleleri önce değerlendir (alpha-beta budama için)
function sortMovesByValue(board, moves) {
  return moves.sort((a, b) => {
    const boardA = simulateMove(board, a.from, a.to)
    const boardB = simulateMove(board, b.from, b.to)
    
    const scoreA = evaluateBoard(boardA)
    const scoreB = evaluateBoard(boardB)
    
    return scoreB - scoreA // Yüksek skorlar önce
  })
}

// Hamle sayısını hesapla
function getMoveCount(board) {
  let count = 0
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c]) count++
    }
  }
  return 32 - count // Başlangıçta 32 taş, her hamle bir taş hareket ettirir
}

// AI hamle seçimi
export function getAIMove(board, difficulty = 3, isUltimate = false) {
  const moves = getAllMoves(board, 'black')
  
  if (moves.length === 0) return null
  
  const moveCount = getMoveCount(board)
  
  // Açılış kitabından hamle seç (ilk 6 hamle - agresif açılış)
  if (moveCount <= 6 && difficulty >= 4) {
    let openingMoves = OPENING_BOOK.first
    if (moveCount === 2) openingMoves = OPENING_BOOK.second
    if (moveCount === 4) openingMoves = OPENING_BOOK.third
    
    const validOpeningMoves = moves.filter(move => 
      openingMoves.some(om => 
        om.from.row === move.from.row && 
        om.from.col === move.from.col &&
        om.to.row === move.to.row &&
        om.to.col === move.to.col
      )
    )
    
    if (validOpeningMoves.length > 0) {
      // Açılış kitabından rastgele seç (her oyunda farklı)
      return validOpeningMoves[Math.floor(Math.random() * validOpeningMoves.length)]
    }
  }
  
  // Hardcore/Ultimate modda hamleleri sırala (daha iyi budama)
  const sortedMoves = difficulty >= 4 ? sortMovesByValue(board, moves) : moves
  
  let bestMove = null
  let bestScore = -Infinity
  
  // Her hamleyi değerlendir
  for (const move of sortedMoves) {
    const newBoard = simulateMove(board, move.from, move.to)
    const score = minimax(newBoard, difficulty, false, -Infinity, Infinity, isUltimate)
    
    // Hardcore/Ultimate modda rastgelelik yok (mükemmel oyun)
    const randomBonus = difficulty >= 4 ? 0 : Math.random() * 2
    const finalScore = score + randomBonus
    
    if (finalScore > bestScore) {
      bestScore = finalScore
      bestMove = move
    }
  }
  
  return bestMove
}
