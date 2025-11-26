# 🎮 Fantastik Satranç - Standalone Kullanım

## ✅ Web Build Hazır!

Web versiyonu başarıyla oluşturuldu ve `dist` klasöründe hazır!

## 🚀 Kullanım Seçenekleri

### Seçenek 1: Yerel Olarak Çalıştır (Önerilen)

1. **Basit HTTP Sunucusu ile:**
```bash
npm run preview
```
Tarayıcıda: http://localhost:4173

2. **Python ile (Python yüklüyse):**
```bash
cd dist
python -m http.server 8000
```
Tarayıcıda: http://localhost:8000

3. **Node.js http-server ile:**
```bash
npx http-server dist -p 8080
```
Tarayıcıda: http://localhost:8080

### Seçenek 2: Web Hosting'e Yükle

`dist` klasörünü şu servislere yükleyebilirsin:

#### Netlify (Ücretsiz)
```bash
# Netlify CLI yükle
npm install -g netlify-cli

# Deploy et
netlify deploy --prod --dir=dist
```

#### Vercel (Ücretsiz)
```bash
# Vercel CLI yükle
npm install -g vercel

# Deploy et
cd dist
vercel --prod
```

#### GitHub Pages (Ücretsiz)
1. GitHub'da repo oluştur
2. `dist` klasörünü push et
3. Settings > Pages > Source: main branch

### Seçenek 3: Portable HTML Paketi

`dist` klasörünü ZIP'le ve paylaş:
1. `dist` klasörünü sağ tık > Sıkıştır
2. `Fantastik-Satranç.zip` olarak kaydet
3. Paylaş!

Kullanıcılar:
1. ZIP'i aç
2. `index.html` dosyasını tarayıcıda aç
3. Oyna!

## 📦 Electron EXE Sorunu

Electron builder'da symbolic link hatası var. Bu Windows yetki sorunudur.

### Çözüm 1: Yönetici Olarak Çalıştır
1. PowerShell'i yönetici olarak aç
2. Proje klasörüne git
3. `npm run dist` çalıştır

### Çözüm 2: Developer Mode Aç
1. Windows Settings > Update & Security > For Developers
2. "Developer Mode" aç
3. `npm run dist` tekrar dene

### Çözüm 3: Web Versiyonu Kullan (Önerilen)
Web versiyonu zaten hazır ve mükemmel çalışıyor!
- Kurulum gerektirmez
- Hızlı yüklenir
- Tüm tarayıcılarda çalışır

## 🎯 Önerilen Yöntem

**En Kolay:** Web versiyonunu kullan!

```bash
npm run preview
```

Veya `dist` klasörünü bir hosting servisine yükle.

## 📁 Dist Klasörü İçeriği

```
dist/
├── index.html          # Ana sayfa
├── assets/
│   ├── index-*.css    # Stiller
│   └── index-*.js     # JavaScript
└── (diğer dosyalar)
```

Bu klasörü:
- ✅ Doğrudan tarayıcıda açabilirsin
- ✅ Web sunucusunda host edebilirsin
- ✅ ZIP'leyip paylaşabilirsin
- ✅ Netlify/Vercel'e yükleyebilirsin

## 🌐 Online Demo Oluştur

### Netlify ile (2 Dakika)
1. https://app.netlify.com/drop adresine git
2. `dist` klasörünü sürükle-bırak
3. Link al ve paylaş!

### Vercel ile (2 Dakika)
1. https://vercel.com/new adresine git
2. `dist` klasörünü yükle
3. Link al ve paylaş!

## ✅ Sonuç

Web versiyonu tamamen hazır ve kullanılabilir!

**Hemen oynamak için:**
```bash
npm run preview
```

**Paylaşmak için:**
- `dist` klasörünü ZIP'le
- Veya Netlify/Vercel'e yükle

🎮 İyi oyunlar! ⚔️🧝👹
