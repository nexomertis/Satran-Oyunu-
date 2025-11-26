    import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function ChessPiece({ type, color, position, isSelected, theme }) {
  const meshRef = useRef()
  
  // Seçili taş animasyonu
  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1
    } else if (meshRef.current) {
      meshRef.current.position.y = position[1]
    }
  })
  
  const pieceColor = color === 'white' ? (theme?.whitePiece || '#e8e8e8') : (theme?.blackPiece || '#2d2d2d')
  const emissiveColor = color === 'white' ? (theme?.whitePieceGlow || '#4169e1') : (theme?.blackPieceGlow || '#8b0000')
  
  const material = {
    color: pieceColor,
    emissive: emissiveColor,
    emissiveIntensity: 0.2,
    metalness: 0.7,
    roughness: 0.3
  }
  
  const renderPiece = () => {
    switch (type) {
      case 'pawn':
        return (
          <group>
            {/* Taban */}
            <mesh position={[0, -0.2, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.22, 0.08, 16]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Gövde */}
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.12, 0.18, 0.4, 16]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Boyun */}
            <mesh position={[0, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.12, 0.15, 16]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Baş */}
            <mesh position={[0, 0.38, 0]} castShadow>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial {...material} />
            </mesh>
          </group>
        )
      
      case 'rook':
        return (
          <group>
            {/* Taban */}
            <mesh position={[0, -0.2, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.28, 0.1, 8]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Alt gövde */}
            <mesh position={[0, -0.05, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.24, 0.15, 8]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Orta gövde */}
            <mesh position={[0, 0.15, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.22, 0.3, 8]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Üst kısım */}
            <mesh position={[0, 0.38, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.2, 0.15, 8]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Kale burçları */}
            {[0, 1, 2, 3].map((i) => (
              <mesh 
                key={i}
                position={[
                  Math.cos((i * Math.PI) / 2) * 0.18,
                  0.52,
                  Math.sin((i * Math.PI) / 2) * 0.18
                ]}
                castShadow
              >
                <boxGeometry args={[0.1, 0.2, 0.1]} />
                <meshStandardMaterial {...material} />
              </mesh>
            ))}
            {/* Kale duvarları */}
            {[0, 1, 2, 3].map((i) => (
              <mesh 
                key={`wall-${i}`}
                position={[
                  Math.cos((i * Math.PI) / 2 + Math.PI / 4) * 0.13,
                  0.48,
                  Math.sin((i * Math.PI) / 2 + Math.PI / 4) * 0.13
                ]}
                castShadow
              >
                <boxGeometry args={[0.15, 0.08, 0.05]} />
                <meshStandardMaterial {...material} />
              </mesh>
            ))}
          </group>
        )
      
      case 'knight':
        return (
          <group>
            {/* Taban */}
            <mesh position={[0, -0.2, 0]} castShadow>
              <cylinderGeometry args={[0.24, 0.26, 0.1, 16]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Alt gövde */}
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.22, 0.3, 16]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* At boynu */}
            <mesh position={[0, 0.25, 0.05]} rotation={[0.4, 0, 0]} castShadow>
              <cylinderGeometry args={[0.12, 0.15, 0.35, 12]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* At başı */}
            <mesh position={[0, 0.48, 0.18]} rotation={[0.2, 0, 0]} castShadow>
              <boxGeometry args={[0.18, 0.25, 0.22]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* At burnu */}
            <mesh position={[0, 0.42, 0.32]} rotation={[0.5, 0, 0]} castShadow>
              <boxGeometry args={[0.14, 0.12, 0.15]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* At kulakları */}
            <mesh position={[-0.08, 0.62, 0.15]} rotation={[0, 0, -0.3]} castShadow>
              <coneGeometry args={[0.04, 0.12, 8]} />
              <meshStandardMaterial {...material} />
            </mesh>
            <mesh position={[0.08, 0.62, 0.15]} rotation={[0, 0, 0.3]} castShadow>
              <coneGeometry args={[0.04, 0.12, 8]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Yelesi */}
            {[0, 1, 2].map((i) => (
              <mesh 
                key={i}
                position={[0, 0.55 - i * 0.08, 0.08 + i * 0.05]} 
                rotation={[-0.3, 0, 0]}
                castShadow
              >
                <boxGeometry args={[0.12, 0.05, 0.08]} />
                <meshStandardMaterial {...material} />
              </mesh>
            ))}
          </group>
        )
      
      case 'bishop':
        return (
          <group>
            {/* Taban */}
            <mesh position={[0, -0.2, 0]} castShadow>
              <cylinderGeometry args={[0.23, 0.25, 0.1, 16]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Alt gövde */}
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.22, 0.35, 16]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Orta küre */}
            <mesh position={[0, 0.22, 0]} castShadow>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Üst gövde */}
            <mesh position={[0, 0.45, 0]} castShadow>
              <cylinderGeometry args={[0.12, 0.16, 0.3, 16]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Sivri uç */}
            <mesh position={[0, 0.68, 0]} castShadow>
              <coneGeometry args={[0.12, 0.25, 16]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Tepe küre */}
            <mesh position={[0, 0.82, 0]} castShadow>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial {...material} />
            </mesh>
            {/* Çapraz kesik (fil simgesi) */}
            <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
              <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
              <meshStandardMaterial {...material} />
            </mesh>
          </group>
        )
      
      case 'queen':
        return (
          <group>
            {/* Taban */}
            <mesh position={[0, -0.2, 0]} castShadow>
              <cylinderGeometry args={[0.26, 0.28, 0.1, 16]} />
              <meshStandardMaterial {...material} metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Alt gövde */}
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.24, 0.35, 16]} />
              <meshStandardMaterial {...material} metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Orta küre */}
            <mesh position={[0, 0.22, 0]} castShadow>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial {...material} metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Üst gövde */}
            <mesh position={[0, 0.48, 0]} castShadow>
              <cylinderGeometry args={[0.16, 0.2, 0.3, 16]} />
              <meshStandardMaterial {...material} metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Taç tabanı */}
            <mesh position={[0, 0.68, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.16, 0.1, 16]} />
              <meshStandardMaterial {...material} metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Taç dişleri (8 adet) */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <mesh 
                key={i}
                position={[
                  Math.cos((i * Math.PI) / 4) * 0.22,
                  0.82,
                  Math.sin((i * Math.PI) / 4) * 0.22
                ]}
                castShadow
              >
                <coneGeometry args={[0.04, i % 2 === 0 ? 0.18 : 0.14, 8]} />
                <meshStandardMaterial {...material} metalness={0.9} roughness={0.1} />
              </mesh>
            ))}
            {/* Merkez taç */}
            <mesh position={[0, 0.95, 0]} castShadow>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial 
                color="#ffd700"
                emissive="#ffd700"
                emissiveIntensity={0.5}
                metalness={1}
                roughness={0.1}
              />
            </mesh>
          </group>
        )
      
      case 'king':
        return (
          <group>
            {/* Taban */}
            <mesh position={[0, -0.2, 0]} castShadow>
              <cylinderGeometry args={[0.28, 0.3, 0.12, 16]} />
              <meshStandardMaterial {...material} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Alt gövde */}
            <mesh position={[0, 0.05, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.26, 0.4, 16]} />
              <meshStandardMaterial {...material} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Orta küre */}
            <mesh position={[0, 0.3, 0]} castShadow>
              <sphereGeometry args={[0.24, 16, 16]} />
              <meshStandardMaterial {...material} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Üst gövde */}
            <mesh position={[0, 0.58, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.22, 0.35, 16]} />
              <meshStandardMaterial {...material} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Taç tabanı */}
            <mesh position={[0, 0.8, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.18, 0.12, 16]} />
              <meshStandardMaterial {...material} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Taç dişleri (4 ana) */}
            {[0, 1, 2, 3].map((i) => (
              <mesh 
                key={i}
                position={[
                  Math.cos((i * Math.PI) / 2) * 0.2,
                  0.95,
                  Math.sin((i * Math.PI) / 2) * 0.2
                ]}
                castShadow
              >
                <boxGeometry args={[0.08, 0.22, 0.08]} />
                <meshStandardMaterial {...material} metalness={0.9} roughness={0.1} />
              </mesh>
            ))}
            {/* Taç dişleri (4 ara) */}
            {[0, 1, 2, 3].map((i) => (
              <mesh 
                key={`mid-${i}`}
                position={[
                  Math.cos((i * Math.PI) / 2 + Math.PI / 4) * 0.2,
                  0.9,
                  Math.sin((i * Math.PI) / 2 + Math.PI / 4) * 0.2
                ]}
                castShadow
              >
                <boxGeometry args={[0.06, 0.14, 0.06]} />
                <meshStandardMaterial {...material} metalness={0.9} roughness={0.1} />
              </mesh>
            ))}
            {/* Haç - Dikey */}
            <mesh position={[0, 1.08, 0]} castShadow>
              <boxGeometry args={[0.06, 0.35, 0.06]} />
              <meshStandardMaterial 
                color="#ffd700"
                emissive="#ffd700"
                emissiveIntensity={0.6}
                metalness={1}
                roughness={0.05}
              />
            </mesh>
            {/* Haç - Yatay */}
            <mesh position={[0, 1.15, 0]} castShadow>
              <boxGeometry args={[0.25, 0.06, 0.06]} />
              <meshStandardMaterial 
                color="#ffd700"
                emissive="#ffd700"
                emissiveIntensity={0.6}
                metalness={1}
                roughness={0.05}
              />
            </mesh>
            {/* Haç üst küre */}
            <mesh position={[0, 1.28, 0]} castShadow>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial 
                color="#ffd700"
                emissive="#ffd700"
                emissiveIntensity={0.6}
                metalness={1}
                roughness={0.05}
              />
            </mesh>
          </group>
        )
      
      default:
        return null
    }
  }
  
  return (
    <group ref={meshRef} position={position}>
      {renderPiece()}
      {isSelected && (
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
          <meshStandardMaterial 
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  )
}

export default ChessPiece
