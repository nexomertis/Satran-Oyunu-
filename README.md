# ⚔️ Fantastik Satranç - Orklar vs Elfler

Epik bir 3D satranç oyunu! Elfler ve Orklar arasında fantastik bir savaş.

## 🎮 Özellikler

### 🎯 4 Farklı Oyun Modu
- **3D AI Modu**: Detaylı 3D modeller ile yapay zekaya karşı oyna
- **3D İki Kişilik**: 3D modeller ile arkadaşınla oyna
- **2D AI Modu**: Klasik satranç taşları ile yapay zekaya karşı oyna
- **2D İki Kişilik**: Klasik satranç taşları ile arkadaşınla oyna

### 🎨 Görsel Özellikler
- **3D Modeller**: Detaylı kale, at, fil, vezir, şah ve piyon modelleri
- **2D Klasik**: Unicode satranç sembolleri (♔♕♖♗♘♙)
- **Fantastik Atmosfer**: Gece ortamı, dinamik ışıklandırma
- **Animasyonlar**: Seçili taş animasyonları, gölge efektleri

### 🤖 Akıllı Yapay Zeka
- Minimax algoritması
- Alpha-beta budama optimizasyonu
- Pozisyon değerlendirmesi
- 3 hamle ileriye bakma
- Stratejik oyun

### ♟️ Tam Satranç Kuralları
- Şah kontrolü
- Şah mat tespiti
- Pat (beraberlik) kontrolü
- Geçerli hamle kontrolü
- Tüm taş hareketleri

### 📜 Hamle Geçmişi
- Tüm hamlelerin kaydı
- Hamle notasyonu (e2 → e4)
- Yenilen taşlar gösterimi
- Hamle sayısı

## 🚀 Kurulum ve Çalıştırma

### Web Versiyonu (Tarayıcı)

1. Bağımlılıkları yükle:
```bash
npm install
```

2. Geliştirme sunucusunu başlat:
```bash
npm run dev
```

3. Tarayıcıda aç: `http://localhost:5173`

### Production Build

```bash
npm run build
```

Build dosyaları `dist` klasöründe oluşur.

### Masaüstü Uygulaması (Electron)

1. Electron bağımlılıklarını yükle:
```bash
npm install
```

2. Electron uygulamasını çalıştır:
```bash
npm run electron-dev
```

3. EXE dosyası oluştur:
```bash
npm run dist
```

EXE dosyası `release` klasöründe oluşur.

## 🎯 Nasıl Oynanır

1. **Mod Seç**: Ana menüden 3D veya 2D, AI veya 2 Kişilik seç
2. **Taş Seç**: Kendi rengindeki bir taşa tıkla
3. **Hamle Yap**: Yeşil noktalarla gösterilen geçerli karelere tıkla
4. **Kamera**: Fare ile sürükleyerek kamerayı döndür
5. **Zoom**: Fare tekerleği ile yakınlaş/uzaklaş

## 🏆 Oyun Kuralları

- **Elfler (Beyaz)** her zaman ilk başlar
- **Orklar (Siyah)** AI modunda bilgisayar tarafından oynanır
- Kendi şahını tehlikeye atamazsın
- Şah mat olursan kaybedersin
- Pat durumunda oyun berabere biter

## 🛠️ Teknolojiler

- **React**: UI framework
- **Three.js**: 3D grafik
- **React Three Fiber**: React için Three.js
- **Vite**: Build tool
- **Electron**: Masaüstü uygulaması

## 📦 Dosya Yapısı

```
fantasy-chess/
├── src/
│   ├── components/
│   │   ├── ChessBoard.jsx       # 3D satranç tahtası
│   │   ├── ChessBoard2D.jsx     # 2D satranç tahtası
│   │   ├── ChessPiece.jsx       # 3D taş modelleri
│   │   ├── GameUI.jsx           # Oyun arayüzü
│   │   └── ModeSelector.jsx     # Mod seçim ekranı
│   ├── utils/
│   │   └── chessLogic.js        # Satranç mantığı ve AI
│   ├── App.jsx                  # Ana uygulama
│   ├── main.jsx                 # React giriş noktası
│   └── index.css                # Stiller
├── electron.cjs                 # Electron ana dosyası
├── index.html                   # HTML şablonu
├── package.json                 # Proje yapılandırması
└── vite.config.js              # Vite yapılandırması
```

## 🎨 Taş Modelleri

### 3D Modeller
- **Kale**: Gerçek kale burçları ile
- **At**: Detaylı at başı ve yelesi
- **Fil**: Sivri uç ve çapraz kesik
- **Vezir**: 8 taç dişi ve altın küre
- **Şah**: Altın haç ve taç
- **Piyon**: Klasik piyon formu

### 2D Semboller
- Beyaz: ♔♕♖♗♘♙
- Siyah: ♚♛♜♝♞♟

## 🤝 Katkıda Bulunma

Bu proje açık kaynak değildir, ancak önerilerinizi paylaşabilirsiniz.

## 👨‍💻 Geliştirici

**Mert Yılmaz** tarafından geliştirilmiştir.

## 📝 Lisans

Tüm hakları saklıdır © 2024 Mert Yılmaz

## 🎮 İyi Oyunlar!

Elfler ve Orklar arasındaki epik savaşta başarılar! ⚔️🧝👹
