// =========================================================
// Sipariş Oluşturma - Test Senaryoları
// Staj Günü 27: Normal ve hatalı durumların test edilmesi
// =========================================================

// ---------------------------------------------------------
// Test edilen basit doğrulama + stok kontrol mantığı
// (önceki günlerde geliştirilen mantığın birleştirilmiş hali)
// ---------------------------------------------------------
const urunler = [
  { urunId: 101, urunAdi: "Klavye", stokMiktari: 5 }
];

function siparisOlustur({ urunId, adet }) {
  // 1) Zorunlu alan kontrolü
  if (urunId === undefined || urunId === null) {
    return { basarili: false, kod: 400, mesaj: "urunId alanı zorunludur." };
  }
  if (adet === undefined || adet === null) {
    return { basarili: false, kod: 400, mesaj: "adet alanı zorunludur." };
  }

  // 2) Tip/değer kontrolü
  // NOT: Test sırasında "adet: 1.5" gibi ondalıklı bir değerin
  // yanlışlıkla kabul edildiği görüldü. Kök neden, kontrolün ilk
  // halinde sadece "typeof adet === 'number'" kullanılması,
  // Number.isInteger() kontrolünün olmamasıydı. Aşağıdaki satır
  // bu düzeltmeyi içerir; düzeltme sonrası "adet ondalıklı değer"
  // senaryosu tekrar test edilip 400 döndüğü doğrulandı (bkz.
  // 03_test_sonuclari_raporu.md).
  if (typeof adet !== "number" || !Number.isInteger(adet) || adet <= 0) {
    return { basarili: false, kod: 400, mesaj: "adet alanı 0'dan büyük bir tam sayı olmalıdır." };
  }

  // 3) Ürün var mı?
  const urun = urunler.find(u => u.urunId === urunId);
  if (!urun) {
    return { basarili: false, kod: 404, mesaj: "Ürün bulunamadı." };
  }

  // 4) Stok yeterli mi?
  if (urun.stokMiktari < adet) {
    return { basarili: false, kod: 409, mesaj: `Yeterli stok yok. Mevcut stok: ${urun.stokMiktari}` };
  }

  // 5) Başarılı
  return { basarili: true, kod: 201, mesaj: "Sipariş oluşturuldu." };
}

// ---------------------------------------------------------
// Basit test yardımcı fonksiyonu
// ---------------------------------------------------------
function testCalistir(aciklama, girdi, beklenenKod) {
  const sonuc = siparisOlustur(girdi);
  const gecti = sonuc.kod === beklenenKod;

  console.log(
    `${gecti ? "✔ BAŞARILI" : "✘ BAŞARISIZ"} - ${aciklama} ` +
    `(beklenen: ${beklenenKod}, gelen: ${sonuc.kod}) -> ${sonuc.mesaj}`
  );

  return gecti;
}

// ---------------------------------------------------------
// Test senaryoları (00_test_plani.md ile birebir eşleşir)
// ---------------------------------------------------------
console.log("=== SİPARİŞ OLUŞTURMA TESTLERİ ===\n");

let basariliTestSayisi = 0;
const testler = [
  () => testCalistir("Geçerli bilgilerle sipariş oluşturma", { urunId: 101, adet: 2 }, 201),
  () => testCalistir("urunId alanı eksik", { adet: 2 }, 400),
  () => testCalistir("adet alanı eksik", { urunId: 101 }, 400),
  () => testCalistir("adet negatif değer", { urunId: 101, adet: -3 }, 400),
  () => testCalistir("adet ondalıklı değer", { urunId: 101, adet: 1.5 }, 400),
  () => testCalistir("İstenen adet mevcut stoktan fazla", { urunId: 101, adet: 100 }, 409),
  () => testCalistir("Var olmayan ürün ID'si", { urunId: 999, adet: 1 }, 404)
];

testler.forEach(t => {
  if (t()) basariliTestSayisi++;
});

console.log(`\nToplam: ${testler.length} test, ${basariliTestSayisi} başarılı.`);
