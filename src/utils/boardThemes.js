// Satranç tahtası temaları
export const BOARD_THEMES = {
  classic: {
    name: '🏛️ Klasik',
    description: 'Geleneksel satranç renkleri',
    lightSquare: '#e8dcc4',
    darkSquare: '#6b4423',
    border: '#8b6914',
    ground: '#1a1a2e',
    whitePiece: '#e8e8e8',
    blackPiece: '#2c2c2c',
    whitePieceGlow: '#4169e1',
    blackPieceGlow: '#8b0000'
  },
  ocean: {
    name: '🌊 Okyanus',
    description: 'Derin mavi tonları',
    lightSquare: '#a8d8ea',
    darkSquare: '#0a4d68',
    border: '#088395',
    ground: '#05445e',
    whitePiece: '#00ffff',
    blackPiece: '#000080',
    whitePieceGlow: '#00d4ff',
    blackPieceGlow: '#0000ff'
  },
  forest: {
    name: '🌲 Orman',
    description: 'Doğal yeşil tonları',
    lightSquare: '#c8e6c9',
    darkSquare: '#2e7d32',
    border: '#558b2f',
    ground: '#1b5e20',
    whitePiece: '#f1f8e9',
    blackPiece: '#1b5e20',
    whitePieceGlow: '#76ff03',
    blackPieceGlow: '#2e7d32'
  },
  royal: {
    name: '👑 Kraliyet',
    description: 'Lüks mor ve altın',
    lightSquare: '#e1bee7',
    darkSquare: '#6a1b9a',
    border: '#ffd700',
    ground: '#4a148c',
    whitePiece: '#ffd700',
    blackPiece: '#4a148c',
    whitePieceGlow: '#ffeb3b',
    blackPieceGlow: '#9c27b0'
  },
  fire: {
    name: '🔥 Ateş',
    description: 'Sıcak kırmızı tonları',
    lightSquare: '#ffccbc',
    darkSquare: '#bf360c',
    border: '#ff6f00',
    ground: '#3e2723',
    whitePiece: '#ffff00',
    blackPiece: '#ff0000',
    whitePieceGlow: '#ff9800',
    blackPieceGlow: '#ff0000'
  },
  ice: {
    name: '❄️ Buz',
    description: 'Soğuk beyaz ve mavi',
    lightSquare: '#e3f2fd',
    darkSquare: '#1565c0',
    border: '#42a5f5',
    ground: '#0d47a1',
    whitePiece: '#ffffff',
    blackPiece: '#0d47a1',
    whitePieceGlow: '#80d8ff',
    blackPieceGlow: '#1976d2'
  },
  sunset: {
    name: '🌅 Gün Batımı',
    description: 'Turuncu ve pembe tonları',
    lightSquare: '#ffe0b2',
    darkSquare: '#e65100',
    border: '#ff6f00',
    ground: '#bf360c',
    whitePiece: '#fff9c4',
    blackPiece: '#e65100',
    whitePieceGlow: '#ffc107',
    blackPieceGlow: '#ff6f00'
  },
  midnight: {
    name: '🌙 Gece Yarısı',
    description: 'Koyu gri ve siyah',
    lightSquare: '#757575',
    darkSquare: '#212121',
    border: '#424242',
    ground: '#000000',
    whitePiece: '#bdbdbd',
    blackPiece: '#212121',
    whitePieceGlow: '#9e9e9e',
    blackPieceGlow: '#424242'
  }
}

export const getTheme = (themeName) => {
  return BOARD_THEMES[themeName] || BOARD_THEMES.classic
}
