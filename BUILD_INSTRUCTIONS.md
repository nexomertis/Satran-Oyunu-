# 🏗️ Build Talimatları

## 📦 EXE Dosyası Oluşturma

### Adım 1: Bağımlılıkları Yükle
```bash
npm install
```

### Adım 2: Web Build Oluştur
```bash
npm run build
```
Bu komut `dist` klasöründe web versiyonunu oluşturur.

### Adım 3: Electron Bağımlılıklarını Yükle
```bash
npm install electron electron-builder concurrently wait-on --save-dev
```

### Adım 4: EXE Dosyası Oluştur
```bash
npm run dist
```

Bu komut:
- Önce web build yapar
- Sonra Electron ile paketler
- `release` klasöründe EXE dosyası oluşturur

## 📁 Çıktı Dosyaları

Build tamamlandığında `release` klasöründe şunları bulacaksınız:

- **Fantastik Satranç Setup.exe** - Kurulum dosyası (NSIS installer)
- **Fantastik Satranç.exe** - Portable versiyon (kurulum gerektirmez)

## 🚀 Hızlı Kullanım

### Web Versiyonu
1. `npm install`
2. `npm run dev`
3. Tarayıcıda `http://localhost:5173` aç

### Masaüstü Versiyonu (Development)
1. `npm install`
2. `npm run electron-dev`

### Production EXE
1. `npm install`
2. `npm run dist`
3. `release` klasöründeki EXE'yi çalıştır

## 📊 Build Boyutları

- Web Build: ~1 MB (gzipped)
- Electron EXE: ~150-200 MB (Chromium dahil)
- Portable EXE: ~150-200 MB

## 🔧 Sorun Giderme

### "electron not found" hatası
```bash
npm install electron --save-dev
```

### "electron-builder not found" hatası
```bash
npm install electron-builder --save-dev
```

### Build başarısız olursa
1. `node_modules` klasörünü sil
2. `npm install` tekrar çalıştır
3. `npm run dist` tekrar dene

### Port 5173 kullanımda hatası
Başka bir terminal penceresi açık olabilir. Tüm terminalleri kapat ve tekrar dene.

## 🎯 Önerilen Build Sırası

1. **İlk Kurulum**:
   ```bash
   npm install
   ```

2. **Test Et**:
   ```bash
   npm run dev
   ```

3. **Electron Test**:
   ```bash
   npm run electron-dev
   ```

4. **Final Build**:
   ```bash
   npm run dist
   ```

## 📦 Dağıtım

### Portable Versiyon
- `release/Fantastik Satranç.exe` dosyasını paylaş
- Kurulum gerektirmez
- Doğrudan çalıştırılabilir

### Installer Versiyon
- `release/Fantastik Satranç Setup.exe` dosyasını paylaş
- Kullanıcı kurulum yapabilir
- Başlat menüsüne ve masaüstüne kısayol ekler

## 🌐 Web Hosting

`dist` klasörünü herhangi bir static hosting servisine yükleyebilirsin:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

Örnek (Netlify):
```bash
npm run build
netlify deploy --prod --dir=dist
```

## ✅ Başarılı Build Kontrolü

Build başarılı olduysa:
- ✅ `dist` klasörü oluştu
- ✅ `release` klasörü oluştu
- ✅ EXE dosyaları mevcut
- ✅ EXE çalıştırılabiliyor

## 🎮 Oyunu Paylaş

1. `release` klasöründeki EXE dosyasını al
2. ZIP'le (opsiyonel)
3. Arkadaşlarınla paylaş!

Oyun kurulum gerektirmez ve doğrudan çalışır! 🎉
