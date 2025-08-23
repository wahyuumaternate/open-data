<template>
  <!-- Hero Section -->
  <section class="bantuan-hero section dark-background pt-5">
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-12 text-center" data-aos="fade-up">
          <h1 class="display-4 text-white mb-4">Bantuan Open Data Kota Ternate</h1>
          <p class="lead text-white-50 mb-4">
            Panduan penggunaan portal Open Data Ternate untuk mengakses, mencari, dan mengunduh data
            publik.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Content Section -->
  <div class="about">
    <div class="container p-4 mb-4 card">
      <h2>Panduan Dasar</h2>
      <p>
        Portal <strong>Open Data Kota Ternate</strong> menyediakan berbagai dataset resmi yang dapat
        digunakan untuk penelitian, perencanaan, maupun kebutuhan publik. Berikut beberapa informasi
        penting:
      </p>
      <ul>
        <li>Cari dataset dengan fitur pencarian di halaman utama.</li>
        <li>Gunakan filter kategori atau organisasi untuk mempersempit hasil.</li>
        <li>Dataset tersedia dalam berbagai format (CSV, JSON, Excel, PDF).</li>
        <li>Setiap dataset menampilkan statistik unduhan dan informasi organisasi terkait.</li>
      </ul>

      <h2 class="mt-4">FAQ (Pertanyaan Umum)</h2>
      <div class="accordion" id="faqAccordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="faq1">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqCollapse1"
            >
              Bagaimana cara mengunduh dataset?
            </button>
          </h2>
          <div
            id="faqCollapse1"
            class="accordion-collapse collapse show"
            data-bs-parent="#faqAccordion"
          >
            <div class="accordion-body">
              Klik tombol <i class="bi bi-download"></i> pada dataset yang dipilih, lalu pilih
              format yang tersedia.
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="faq2">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqCollapse2"
            >
              Apakah data selalu diperbarui?
            </button>
          </h2>
          <div id="faqCollapse2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              Ya, setiap organisasi terkait bertanggung jawab memperbarui dataset sesuai jadwal
              publikasi resmi mereka.
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="faq3">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqCollapse3"
            >
              Bagaimana jika saya menemukan kesalahan data?
            </button>
          </h2>
          <div id="faqCollapse3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              Silakan hubungi admin Open Data Ternate melalui menu kontak atau email resmi
              pemerintah kota.
            </div>
          </div>
        </div>
      </div>

      <h2 class="mt-4">Kontak Bantuan</h2>
      <p>Jika membutuhkan bantuan lebih lanjut, silakan hubungi:</p>
      <ul>
        <li>Email: <a href="mailto:opendata@ternate.go.id">opendata@ternate.go.id</a></li>
        <li>Telepon: (0921) 123456</li>
        <li>Alamat: Dinas Komunikasi dan Informatika Kota Ternate</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpView',
}
</script>

<style scoped>
.about {
  margin-top: 2rem;
}
.accordion-button {
  font-weight: 500;
}
</style>
