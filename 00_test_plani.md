# Test Planı

Staj Günü 27: Son günlerde geliştirilen modüllerin (sipariş oluşturma,
yetkilendirme) farklı senaryolarla test edilmesi.

## Neden Test Ediyoruz?

Bir modülün normal (mutlu yol / happy path) senaryoda çalışması tek
başına yeterli değildir. Kullanıcıların farklı şekillerde işlem
yapabileceği (eksik veri, hatalı veri, yetkisiz erişim gibi) durumlar da
test edilmelidir.

## 1) Sipariş Oluşturma - Test Senaryoları

| # | Senaryo                                   | Beklenen Sonuç                          |
|---|---------------------------------------------|--------------------------------------------|
| 1 | Geçerli bilgilerle sipariş oluşturma         | Sipariş başarıyla oluşturulur (201)         |
| 2 | urunId alanı eksik                           | 400 Bad Request, açıklayıcı hata mesajı     |
| 3 | adet alanı eksik                             | 400 Bad Request, açıklayıcı hata mesajı     |
| 4 | adet negatif değer                           | 400 Bad Request (reddedilir)                |
| 5 | adet ondalıklı değer                         | 400 Bad Request (reddedilir)                |
| 6 | İstenen adet, mevcut stoktan fazla            | 409 Conflict, "yeterli stok yok" mesajı     |
| 7 | Var olmayan bir ürün ID'si ile sipariş        | 404 Not Found                               |

## 2) Yetkilendirme - Test Senaryoları

| # | Senaryo                                             | Beklenen Sonuç       |
|---|--------------------------------------------------------|------------------------|
| 1 | Admin, ürün silme işlemi yapmaya çalışıyor               | İzin verilir           |
| 2 | Satış Personeli, ürün silme işlemi yapmaya çalışıyor     | Reddedilir (403)       |
| 3 | Bayi, kendi siparişini oluşturmaya çalışıyor             | İzin verilir           |
| 4 | Bayi, tüm bayilerin raporlarını görmeye çalışıyor         | Reddedilir (403)       |
| 5 | Token olmadan korumalı bir endpoint'e erişim              | Reddedilir (401)       |
| 6 | Geçersiz/süresi dolmuş token ile erişim                    | Reddedilir (403)       |

## Test Sürecinde İzlenen Yöntem

1. Senaryo çalıştırılır, sonuç gözlemlenir.
2. Beklenenden farklı bir sonuç alınırsa, önce **sorunun tekrar
   oluşup oluşmadığı** kontrol edilir (reproduce).
3. Sorun doğrulanırsa ilgili kod bölümü incelenir, gerekli düzenleme
   yapılır.
4. Düzenleme sonrası **aynı test senaryosu tekrar çalıştırılır** ve
   ayrıca ilgili diğer senaryoların da etkilenmediği kontrol edilir.

## Bugün Tamamlanamayan / Sonraki Güne Bırakılan Konular

- [ ] Yeniden sipariş (reorder) özelliğinin tüm uç durumlarının
      (edge case) test edilmesi.
- [ ] Eşzamanlı (concurrent) sipariş oluşturma durumunda stok
      kontrolünün doğru çalışıp çalışmadığının test edilmesi.
