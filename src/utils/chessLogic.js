// Satranç tahtasını başlangıç pozisyonunda oluştur
export function initializeBoard() {
  // Boş bir tahta oluştur
  const board = []
  
  // Siyah taşlar (üst sıra)
  board[0] = [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' }
  ]
  
  // Siyah piyonlar
  board[1] = []
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', color: 'black' }
  }
  
  // Boş kareler
  for (let i = 2; i < 6; i++) {
    board[i] = []
    for (let j = 0; j < 8; j++) {
      board[i][j] = null
    }
  }
  
  // Beyaz piyonlar
  board[6] = []
  for (let i = 0; i < 8; i++) {
    board[6][i] = { type: 'pawn', color: 'white' }
  }
  
  // Beyaz taşlar (alt sıra)
  board[7] = [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' }
  ]
  
  return board
}

// Şah kontrolü yapan fonksiyon
// Verilen renkteki şah tehdit altında mı diye bakar
function isKingInCheck(board, color) {
  // Önce şahı bul
  let kingRow = -1
  let kingCol = -1
  let found = false
  
  // Tahtayı tara ve şahı bul
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c]
      if (piece != null) {
        if (piece.type === 'king' && piece.color === color) {
          kingRow = r
          kingCol = c
          found = true
          break
        }
      }
    }
    if (found === true) {
      break
    }
  }
  
  // Şah bulunamadıysa false döndür
  if (found === false) {
    return false
  }
  
  // Rakip rengi belirle
  let opponentColor = 'white'
  if (color === 'white') {
    opponentColor = 'black'
  }
  
  // Rakip taşları kontrol et
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c]
      if (piece != null && piece.color === opponentColor) {
        // Bu taşın yapabileceği hamleleri al
        const moves = getPossibleMoves(board, r, c)
        // Şahın pozisyonuna gidebiliyor mu?
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].row === kingRow && moves[i].col === kingCol) {
            return true // Şah tehdit altında!
          }
        }
      }
    }
  }
  
  return false // Şah güvende
}

// Bir taşın yapabileceği tüm hamleleri hesapla
// (Şah kontrolü yapmadan, sadece taş kurallarına göre)
function getPossibleMoves(board, row, col) {
  const piece = board[row][col]
  
  // Boş kare ise hamle yok
  if (piece == null) {
    return []
  }
  
  // Hamleleri tutacak dizi
  const moves = []
  
  // Tek bir kareye hamle ekle
  const addMove = (r, c) => {
    // Tahta sınırları içinde mi?
    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
      const target = board[r][c]
      // Boş kare veya rakip taş ise ekle
      if (target == null || target.color !== piece.color) {
        moves.push({ row: r, col: c })
      }
    }
  }
  
  // Çizgi boyunca hamle ekle (kale, fil, vezir için)
  const addLineMoves = (directions) => {
    // Her yön için
    for (let d = 0; d < directions.length; d++) {
      const dir = directions[d]
      const dr = dir[0]
      const dc = dir[1]
      
      let r = row + dr
      let c = col + dc
      
      // Tahta sınırına veya başka taşa çarpana kadar git
      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const target = board[r][c]
        
        if (target == null) {
          // Boş kare, ekle ve devam et
          moves.push({ row: r, col: c })
        } else {
          // Taş var
          if (target.color !== piece.color) {
            // Rakip taş, ekle ama dur
            moves.push({ row: r, col: c })
          }
          break // Taşa çarptık, bu yönde dur
        }
        
        r = r + dr
        c = c + dc
      }
    }
  }
  
  // Taş tipine göre hamleleri hesapla
  if (piece.type === 'pawn') {
    // Piyon hareketi
    let direction = 1 // Siyah için aşağı
    if (piece.color === 'white') {
      direction = -1 // Beyaz için yukarı
    }
    
    let startRow = 1 // Siyah başlangıç
    if (piece.color === 'white') {
      startRow = 6 // Beyaz başlangıç
    }
    
    // Bir kare ileri
    const newRow = row + direction
    if (newRow >= 0 && newRow < 8) {
      const frontPiece = board[newRow][col]
      if (frontPiece == null) {
        moves.push({ row: newRow, col: col })
        
        // İlk hamlede iki kare ileri
        if (row === startRow) {
          const twoStepsRow = row + (direction * 2)
          const twoStepsPiece = board[twoStepsRow][col]
          if (twoStepsPiece == null) {
            moves.push({ row: twoStepsRow, col: col })
          }
        }
      }
    }
    
    // Çapraz yeme (sağ)
    const rightCol = col + 1
    if (newRow >= 0 && newRow < 8 && rightCol >= 0 && rightCol < 8) {
      const rightPiece = board[newRow][rightCol]
      if (rightPiece != null && rightPiece.color !== piece.color) {
        moves.push({ row: newRow, col: rightCol })
      }
    }
    
    // Çapraz yeme (sol)
    const leftCol = col - 1
    if (newRow >= 0 && newRow < 8 && leftCol >= 0 && leftCol < 8) {
      const leftPiece = board[newRow][leftCol]
      if (leftPiece != null && leftPiece.color !== piece.color) {
        moves.push({ row: newRow, col: leftCol })
      }
    }
  }
  
  else if (piece.type === 'rook') {
    // Kale hareketi - düz çizgiler
    const directions = [
      [0, 1],   // Sağa
      [0, -1],  // Sola
      [1, 0],   // Aşağı
      [-1, 0]   // Yukarı
    ]
    addLineMoves(directions)
  }
  
  else if (piece.type === 'knight') {
    // At hareketi - L şeklinde
    const knightMoves = [
      [2, 1], [2, -1],   // 2 aşağı, 1 sağ/sol
      [-2, 1], [-2, -1], // 2 yukarı, 1 sağ/sol
      [1, 2], [1, -2],   // 1 aşağı, 2 sağ/sol
      [-1, 2], [-1, -2]  // 1 yukarı, 2 sağ/sol
    ]
    
    for (let i = 0; i < knightMoves.length; i++) {
      const move = knightMoves[i]
      addMove(row + move[0], col + move[1])
    }
  }
  
  else if (piece.type === 'bishop') {
    // Fil hareketi - çapraz
    const directions = [
      [1, 1],    // Sağ aşağı
      [1, -1],   // Sol aşağı
      [-1, 1],   // Sağ yukarı
      [-1, -1]   // Sol yukarı
    ]
    addLineMoves(directions)
  }
  
  else if (piece.type === 'queen') {
    // Vezir hareketi - her yöne
    const directions = [
      [0, 1], [0, -1], [1, 0], [-1, 0],     // Düz
      [1, 1], [1, -1], [-1, 1], [-1, -1]    // Çapraz
    ]
    addLineMoves(directions)
  }
  
  else if (piece.type === 'king') {
    // Şah hareketi - her yöne 1 kare
    const kingMoves = [
      [0, 1], [0, -1],   // Sağ, sol
      [1, 0], [-1, 0],   // Aşağı, yukarı
      [1, 1], [1, -1],   // Çapraz aşağı
      [-1, 1], [-1, -1]  // Çapraz yukarı
    ]
    
    for (let i = 0; i < kingMoves.length; i++) {
      const move = kingMoves[i]
      addMove(row + move[0], col + move[1])
    }
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
