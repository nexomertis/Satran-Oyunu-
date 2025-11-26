# 🎮 Fantastik Satranç - Kullanım Kılavuzu

## 📦 Oyunu Çalıştırma

### Seçenek 1: Web Tarayıcıda (Önerilen - Hızlı)
1. Komut satırını aç
2. Proje klasörüne git
3. Şu komutları çalıştır:
```bash
npm install
npm run dev
```
4. Tarayıcıda `http://localhost:5173` adresini aç

### Seçenek 2: Masaüstü Uygulaması (EXE)
1. `BUILD_INSTRUCTIONS.md` dosyasındaki talimatları takip et
2. `npm run dist` komutu ile EXE oluştur
3. `release` klasöründeki EXE'yi çalıştır

## 🎯 Oyun Modları

### 🤖 AI Modları
- **3D AI**: Detaylı 3D modeller ile yapay zekaya karşı
- **2D AI**: Klasik satranç taşları ile yapay zekaya karşı

### 👥 İki Kişilik Modlar
- **3D İki Kişilik**: Detaylı 3D modeller ile arkadaşınla
- **2D İki Kişilik**: Klasik satranç taşları ile arkadaşınla

## 🕹️ Kontroller

### 🖱️ Fare Kontrolleri
- **Sol Tık**: Taş seç / Hamle yap
- **Sürükle**: Kamerayı döndür
- **Tekerlek**: Yakınlaş / Uzaklaş

### 🎮 Oyun Kontrolleri
1. **Taş Seçimi**: Kendi rengindeki bir taşa tıkla
2. **Hamle**: Yeşil noktalarla gösterilen geçerli karelere tıkla
3. **İptal**: Aynı taşa tekrar tıkla veya başka taşa tıkla

## 📜 Arayüz Elemanları

### Üst Panel
- **Oyun Başlığı**: Fantastik Satranç
- **Mod Göstergesi**: 3D veya 2D
- **Oyuncu Panelleri**: 
  - Elfler (Beyaz) - Sol
  - Orklar (Siyah) - Sağ
- **Yenilen Taşlar**: Her oyuncunun kaybettiği taşlar

### Alt Panel
- **🔄 Yeni Oyun**: Oyunu sıfırla
- **🏠 Ana Menü**: Mod seçim ekranına dön

### Sağ Panel (Hamle Geçmişi)
- **Hamle Sayısı**: Toplam hamle sayısı
- **Hamle Listesi**: Tüm hamleler kronolojik sırada
- **Yenilen Taşlar**: × işareti ile gösterilir

## ♟️ Satranç Kuralları

### Temel Kurallar
- Elfler (Beyaz) her zaman ilk başlar
- Sırayla hamle yapılır
- Kendi şahını tehlikeye atamazsın
- Geçerli hamleler yeşil noktalarla gösterilir

### Taş Hareketleri

#### ♙ Piyon
- İlk hamlede 1 veya 2 kare ileri
- Sonraki hamlelerde 1 kare ileri
- Çapraz yeme

#### ♖ Kale
- Yatay ve dikey sınırsız hareket

#### ♘ At
- L şeklinde hareket (2+1 kare)
- Diğer taşların üzerinden atlayabilir

#### ♗ Fil
- Çapraz sınırsız hareket

#### ♕ Vezir
- Yatay, dikey ve çapraz sınırsız hareket
- En güçlü taş

#### ♔ Şah
- Her yöne 1 kare hareket
- Korunmalı (şah mat olursan kaybedersin)

### Oyun Sonu

#### 🏆 Şah Mat
- Şah tehdit altında
- Kaçış yok
- Tehdit eden taraf kazanır

#### 🤝 Pat (Beraberlik)
- Şah tehdit altında değil
- Ama hiç geçerli hamle yok
- Oyun berabere biter

## 🎨 Görsel Özellikler

### 3D Mod
- Detaylı taş modelleri
- Dinamik ışıklandırma
- Gölge efektleri
- Seçili taş animasyonu

### 2D Mod
- Unicode satranç sembolleri
- Klasik görünüm
- Daha hızlı performans

## 💡 İpuçları

### Yeni Başlayanlar İçin
1. **Merkezi Kontrol Et**: Merkez kareleri (e4, d4, e5, d5) önemli
2. **Taşlarını Geliştir**: Atları ve filleri erken çıkar
3. **Şahını Koru**: Rok yaparak şahını güvenli yere al
4. **Piyonları Koru**: Piyonlar önemli, gereksiz kaybetme

### İleri Seviye
1. **Açılış Bilgisi**: Standart açılışları öğren
2. **Taktikler**: Çatal, iğneleme, keşif gibi taktikleri kullan
3. **Pozisyon**: Taş değerinden çok pozisyon önemli
4. **Son Oyun**: Az taşla mat etmeyi öğren

## 🤖 AI Hakkında

### AI Özellikleri
- Minimax algoritması
- 3 hamle ileriye bakma
- Pozisyon değerlendirmesi
- Orta seviye zorluk

### AI'ya Karşı Stratejiler
1. **Sabırlı Ol**: AI hata yapmaz, sabırla oyna
2. **Tuzak Kur**: Karmaşık pozisyonlar oluştur
3. **Uzun Vadeli Plan**: Kısa vadeli kazançlara aldanma
4. **Merkezi Kontrol**: Merkezi kontrol et

## 🔧 Sorun Giderme

### Oyun Açılmıyor
- `npm install` komutunu çalıştırdın mı?
- `npm run dev` komutu çalışıyor mu?
- Port 5173 başka bir uygulama tarafından kullanılıyor olabilir

### Performans Sorunları
- 2D modu dene (daha hızlı)
- Tarayıcı sekmelerini kapat
- Grafik kartı sürücülerini güncelle

### Hamle Yapamıyorum
- Sıra sende mi kontrol et
- Geçerli bir hamle mi? (Yeşil nokta var mı?)
- Şahını tehlikeye atıyor olabilirsin

### AI Hamle Yapmıyor
- Birkaç saniye bekle (AI düşünüyor)
- Sayfayı yenile
- Konsolu kontrol et (F12)

## 📞 Destek

Sorun yaşıyorsan:
1. `README.md` dosyasını oku
2. `BUILD_INSTRUCTIONS.md` dosyasını kontrol et
3. Konsol hatalarını kontrol et (F12)

## 🎉 İyi Oyunlar!

Elfler ve Orklar arasındaki epik savaşta başarılar! ⚔️

**Unutma**: Satranç sabır ve strateji oyunudur. Acele etme, düşün ve planla! 🧠♟️
