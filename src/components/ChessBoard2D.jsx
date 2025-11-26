import { Html } from '@react-three/drei'
import { getValidMoves } from '../utils/chessLogic'

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

function ChessBoard2D({ board, selectedPiece, onSquareClick, theme }) {
  return (
    <group>
      {/* Tahta zemini */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={theme.ground} />
      </mesh>
      
      {/* Satranç kareleri */}
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const x = colIndex - 3.5
          const z = rowIndex - 3.5
          const isLight = (rowIndex + colIndex) % 2 === 0
          const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex
          const isValidMove = selectedPiece && getValidMoves(board, selectedPiece.row, selectedPiece.col)
            .some(m => m.row === rowIndex && m.col === colIndex)
          
          return (
            <group key={`${rowIndex}-${colIndex}`}>
              {/* Kare */}
              <mesh
                position={[x, 0, z]}
                onClick={() => onSquareClick(rowIndex, colIndex)}
                receiveShadow
              >
                <boxGeometry args={[0.95, 0.05, 0.95]} />
                <meshStandardMaterial 
                  color={
                    isSelected ? '#ffd700' : 
                    isValidMove ? '#90EE90' :
                    (isLight ? theme.lightSquare : theme.darkSquare)
                  }
                  emissive={isSelected ? '#ffd700' : isValidMove ? '#00ff00' : '#000000'}
                  emissiveIntensity={isSelected ? 0.3 : isValidMove ? 0.2 : 0}
                  metalness={0.3}
                  roughness={0.7}
                />
              </mesh>
              
              {/* 2D Taş - HTML ile */}
              {piece && (
                <Html
                  position={[x, 0.5, z]}
                  center
                  distanceFactor={8}
                  style={{
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  <div
                    style={{
                      fontSize: '60px',
                      color: piece.color === 'white' ? (theme?.whitePiece || '#e8e8e8') : (theme?.blackPiece || '#2d2d2d'),
                      textShadow: `
                        0 0 10px ${piece.color === 'white' ? (theme?.whitePieceGlow || '#4169e1') : (theme?.blackPieceGlow || '#8b0000')},
                        2px 2px 4px rgba(0,0,0,0.8)
                      `,
                      filter: isSelected ? 'brightness(1.3) drop-shadow(0 0 10px #ffd700)' : 'brightness(1)',
                      transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    {PIECE_ICONS[piece.color][piece.type]}
                  </div>
                </Html>
              )}
              
              {/* Geçerli hamle göstergesi */}
              {isValidMove && !piece && (
                <mesh position={[x, 0.06, z]}>
                  <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
                  <meshStandardMaterial 
                    color="#00ff00"
                    emissive="#00ff00"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.6}
                  />
                </mesh>
              )}
            </group>
          )
        })
      )}
      
      {/* Tahta kenarları - fantastik çerçeve */}
      <mesh position={[0, 0.025, -4.5]}>
        <boxGeometry args={[9, 0.2, 0.5]} />
        <meshStandardMaterial color={theme.border} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.025, 4.5]}>
        <boxGeometry args={[9, 0.2, 0.5]} />
        <meshStandardMaterial color={theme.border} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-4.5, 0.025, 0]}>
        <boxGeometry args={[0.5, 0.2, 9]} />
        <meshStandardMaterial color={theme.border} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[4.5, 0.025, 0]}>
        <boxGeometry args={[0.5, 0.2, 9]} />
        <meshStandardMaterial color={theme.border} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default ChessBoard2D
