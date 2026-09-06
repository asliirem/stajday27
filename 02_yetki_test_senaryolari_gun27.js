// =========================================================
// Yetkilendirme - Test Senaryoları
// Staj Günü 27: Farklı rollerin erişim denemelerinin test edilmesi
// =========================================================

// Gün 26'daki rol-izin eşleştirme tablosunun basitleştirilmiş hali
const rolIzinleri = {
  Admin: ["URUN_SIL", "SIPARIS_OLUSTUR", "TUM_RAPORLARI_GOR"],
  BayiYoneticisi: ["SIPARIS_OLUSTUR", "KENDI_RAPORUNU_GOR"],
  SatisPersoneli: ["SIPARIS_OLUSTUR"],
  Bayi: ["SIPARIS_OLUSTUR"]
};

// ---------------------------------------------------------
// Basitleştirilmiş yetkilendirme kontrolü (token durumu dahil)
// ---------------------------------------------------------
function istegiDegerlendir({ tokenVarMi, tokenGecerliMi, rol, gerekliIzin }) {
  if (!tokenVarMi) {
    return { kod: 401, mesaj: "Yetkilendirme başlığı (token) bulunamadı." };
  }

  if (!tokenGecerliMi) {
    return { kod: 403, mesaj: "Token geçersiz veya süresi dolmuş." };
  }

  const izinler = rolIzinleri[rol] || [];
  if (!izinler.includes(gerekliIzin)) {
    return { kod: 403, mesaj: `Bu işlem için gerekli izniniz bulunmuyor: ${gerekliIzin}` };
  }

  return { kod: 200, mesaj: "İşlem gerçekleştirildi." };
}

// ---------------------------------------------------------
// Test yardımcı fonksiyonu
// ---------------------------------------------------------
function testCalistir(aciklama, girdi, beklenenKod) {
  const sonuc = istegiDegerlendir(girdi);
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
console.log("\n=== YETKİLENDİRME TESTLERİ ===\n");

let basariliTestSayisi = 0;
const testler = [
  () => testCalistir(
    "Admin, ürün silme işlemi yapmaya çalışıyor",
    { tokenVarMi: true, tokenGecerliMi: true, rol: "Admin", gerekliIzin: "URUN_SIL" },
    200
  ),
  () => testCalistir(
    "Satış Personeli, ürün silme işlemi yapmaya çalışıyor",
    { tokenVarMi: true, tokenGecerliMi: true, rol: "SatisPersoneli", gerekliIzin: "URUN_SIL" },
    403
  ),
  () => testCalistir(
    "Bayi, kendi siparişini oluşturmaya çalışıyor",
    { tokenVarMi: true, tokenGecerliMi: true, rol: "Bayi", gerekliIzin: "SIPARIS_OLUSTUR" },
    200
  ),
  () => testCalistir(
    "Bayi, tüm raporları görmeye çalışıyor",
    { tokenVarMi: true, tokenGecerliMi: true, rol: "Bayi", gerekliIzin: "TUM_RAPORLARI_GOR" },
    403
  ),
  () => testCalistir(
    "Token olmadan korumalı endpoint'e erişim",
    { tokenVarMi: false, tokenGecerliMi: false, rol: "Bayi", gerekliIzin: "SIPARIS_OLUSTUR" },
    401
  ),
  () => testCalistir(
    "Geçersiz/süresi dolmuş token ile erişim",
    { tokenVarMi: true, tokenGecerliMi: false, rol: "Bayi", gerekliIzin: "SIPARIS_OLUSTUR" },
    403
  )
];

testler.forEach(t => {
  if (t()) basariliTestSayisi++;
});

console.log(`\nToplam: ${testler.length} test, ${basariliTestSayisi} başarılı.`);
