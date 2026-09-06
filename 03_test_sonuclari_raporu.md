# Test Sonuçları Raporu

Staj Günü 27: Sipariş oluşturma ve yetkilendirme modüllerinin test
sonuçları.

## Karşılaşılan Problem

Sipariş testleri sırasında, "adet ondalıklı değer" senaryosu (`adet: 1.5`)
ilk çalıştırmada **beklenmedik şekilde kabul edildi** (400 yerine 201
döndü). İşlem birkaç kez tekrarlanarak sorunun her seferinde aynı şekilde
oluştuğu doğrulandı (reproduce edildi).

## İnceleme

İlgili doğrulama kodu incelendiğinde, adet kontrolünün `Number.isInteger()`
yerine yalnızca `typeof adet === "number"` şeklinde yapıldığı görüldü.
Bu kontrol, `1.5` gibi ondalıklı bir sayının da "number" tipinde olması
nedeniyle geçerli kabul edilmesine neden oluyordu.

## Yapılan Düzeltme

Kontrol, `Number.isInteger(adet)` ifadesini de içerecek şekilde
güncellendi (bkz. `01_siparis_test_senaryolari.js` içindeki güncel
`siparisOlustur` fonksiyonu).

## Yeniden Test

Düzeltme sonrası aynı senaryo ("adet ondalıklı değer") tekrar çalıştırıldı
ve artık doğru şekilde **400 Bad Request** döndüğü doğrulandı. Ayrıca
düzeltmenin diğer senaryoları (geçerli sipariş, negatif adet, eksik alan
vb.) etkilemediği kontrol edildi — tüm testler beklenen sonuçları verdi.

## Test Çalıştırma Özeti

| Test Grubu           | Toplam Senaryo | Başarılı |
|------------------------|:----------------:|:----------:|
| Sipariş Oluşturma      | 7                | 7          |
| Yetkilendirme          | 6                | 6          |

## Sonraki Güne Bırakılan Konular

- [ ] Yeniden sipariş (reorder) özelliğinin uç durumlarının test edilmesi.
- [ ] Eşzamanlı (concurrent) sipariş oluşturma durumunda stok kontrolünün
      test edilmesi.

## Öğrenilen Ders

Bir hata bulunduğunda hemen kod değiştirmek yerine önce sorunun tekrar
oluşup oluşmadığının doğrulanması, ardından düzeltme yapılıp **aynı ve
ilişkili diğer senaryoların yeniden test edilmesi** gerektiği bir kez
daha görüldü. Test etmek, geliştirmenin son adımı değil, süreç boyunca
tekrarlanan bir adımdır.
