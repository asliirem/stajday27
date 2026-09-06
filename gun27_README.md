# Staj Günü 27 - Modül Test Süreçleri

Bu klasör, staj kapsamında son günlerde geliştirilen sipariş oluşturma
ve yetkilendirme modüllerinin normal ve hatalı senaryolarla test
edilmesine yönelik çalışmayı içerir.

## İçerik

- **00_test_plani.md** — Sipariş oluşturma ve yetkilendirme için
  test edilecek normal/hatalı senaryoların listesi ve test sürecinde
  izlenen yöntem.
- **01_siparis_test_senaryolari.js** — Zorunlu alan, tip/değer, ürün
  varlığı ve stok kontrolü senaryolarını çalıştıran test suite. Test
  sırasında bulunan bir hatanın düzeltmesini de içerir (yorum satırında
  açıklanmıştır).
- **02_yetki_test_senaryolari_gun27.js** — Farklı rollerin (Admin,
  Bayi, Satış Personeli) izinli/izinsiz işlem denemelerini ve
  token durumu (yok/geçersiz) senaryolarını çalıştıran test suite.
- **03_test_sonuclari_raporu.md** — Test sırasında karşılaşılan problem
  (ondalıklı adet değerinin yanlışlıkla kabul edilmesi), kök neden,
  yapılan düzeltme ve yeniden test sonuçlarını içeren rapor.

## Konu Özeti

- Bir modülün normal senaryoda çalışması yeterli değildir; eksik/hatalı
  veri ve yetkisiz erişim gibi durumlar da test edilmelidir.
- Beklenmeyen bir sonuçla karşılaşıldığında önce **sorunun tekrar
  oluşup oluşmadığı** doğrulanmalı, ardından kök neden bulunmalı ve
  düzeltme sonrası **aynı ve ilişkili diğer senaryolar** yeniden test
  edilmelidir.
- Test etmek, geliştirmenin sonunda yapılan tek seferlik bir adım değil,
  süreç boyunca tekrarlanan bir kontrol mekanizmasıdır.

## Nasıl Çalıştırılır

```bash
node 01_siparis_test_senaryolari.js
node 02_yetki_test_senaryolari_gun27.js
```

Her iki script de test senaryolarını sırayla çalıştırır ve her biri için
beklenen/gelen sonucu karşılaştırarak BAŞARILI/BAŞARISIZ şeklinde
konsola yazdırır.
