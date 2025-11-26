import { useRef } from 'react'
import ChessPiece from './ChessPiece'
import { getValidMoves } from '../utils/chessLogic'

function ChessBoard({ board, selectedPiece, onSquareClick, theme }) {
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
          
          return (
            <group key={`${rowIndex}-${colIndex}`}>
              {/* Kare */}
              <mesh
                position={[x, 0, z]}
                onClick={() => onSquareClick(rowIndex, colIndex)}
                receiveShadow
              >
                <boxGeometry args={[0.95, 0.1, 0.95]} />
                <meshStandardMaterial 
                  color={isSelected ? '#ffd700' : (isLight ? theme.lightSquare : theme.darkSquare)}
                  emissive={isSelected ? '#ffd700' : '#000000'}
                  emissiveIntensity={isSelected ? 0.3 : 0}
                  metalness={0.3}
                  roughness={0.7}
                />
              </mesh>
              
              {/* Taş */}
              {piece && (
                <ChessPiece
                  type={piece.type}
                  color={piece.color}
                  position={[x, 0.5, z]}
                  isSelected={isSelected}
                  theme={theme}
                />
              )}
              
              {/* Geçerli hamle göstergeleri */}
              {isSelected && getValidMoves(board, rowIndex, colIndex).map((move, i) => (
                <mesh
                  key={`hint-${i}`}
                  position={[move.col - 3.5, 0.11, move.row - 3.5]}
                >
                  <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
                  <meshStandardMaterial 
                    color="#00ff00"
                    emissive="#00ff00"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.6}
                  />
                </mesh>
              ))}
            </group>
          )
        })
      )}
      
      {/* Tahta kenarları - fantastik çerçeve */}
      <mesh position={[0, 0.05, -4.5]}>
        <boxGeometry args={[9, 0.3, 0.5]} />
        <meshStandardMaterial color={theme.border} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.05, 4.5]}>
        <boxGeometry args={[9, 0.3, 0.5]} />
        <meshStandardMaterial color={theme.border} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-4.5, 0.05, 0]}>
        <boxGeometry args={[0.5, 0.3, 9]} />
        <meshStandardMaterial color={theme.border} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[4.5, 0.05, 0]}>
        <boxGeometry args={[0.5, 0.3, 9]} />
        <meshStandardMaterial color={theme.border} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default ChessBoard
