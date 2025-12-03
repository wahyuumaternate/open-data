<template>
    <!-- Hero Section -->
    <section class="bantuan-hero section pt-5">
        <div class="container mt-5">
            <div class="row">
                <div class="col-lg-12 text-center" data-aos="fade-up">
                    <h1 class="display-4 text-white mb-4">
                        <i class="bi bi-question-circle me-3"></i>
                        Bantuan Satu Data Kota Ternate
                    </h1>
                    <p class="lead text-white-50 mb-4">
                        Panduan lengkap penggunaan portal Satu Data Ternate untuk mengakses, mencari, dan
                        mengunduh data publik secara optimal
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Navigation -->
    <div class="container mt-5">
        <div class="row g-3">
            <div class="col-md-3">
                <a href="#panduan-dasar" class="text-decoration-none">
                    <div class="card h-100 text-center p-3 quick-nav-card">
                        <i class="bi bi-book text-primary fs-1"></i>
                        <h5 class="mt-3">Panduan Dasar</h5>
                    </div>
                </a>
            </div>
            <div class="col-md-3">
                <a href="#cara-penggunaan" class="text-decoration-none">
                    <div class="card h-100 text-center p-3 quick-nav-card">
                        <i class="bi bi-search text-success fs-1"></i>
                        <h5 class="mt-3">Cara Penggunaan</h5>
                    </div>
                </a>
            </div>
            <div class="col-md-3">
                <a href="#faq" class="text-decoration-none">
                    <div class="card h-100 text-center p-3 quick-nav-card">
                        <i class="bi bi-question-square text-warning fs-1"></i>
                        <h5 class="mt-3">FAQ</h5>
                    </div>
                </a>
            </div>
            <div class="col-md-3">
                <a href="#kontak" class="text-decoration-none">
                    <div class="card h-100 text-center p-3 quick-nav-card">
                        <i class="bi bi-telephone text-danger fs-1"></i>
                        <h5 class="mt-3">Kontak Bantuan</h5>
                    </div>
                </a>
            </div>
        </div>
    </div>

    <!-- Panduan Dasar -->
    <div class="container mt-5" id="panduan-dasar">
        <div class="card p-4 mb-4 shadow-sm">
            <h2 class="mb-4">
                <i class="bi bi-book-half text-primary me-2"></i>
                Panduan Dasar
            </h2>
            <p class="lead">
                Portal <strong>Satu Data Kota Ternate</strong> adalah platform terpadu untuk mengakses
                berbagai dataset resmi pemerintah Kota Ternate. Portal ini dirancang untuk mendukung
                transparansi, akuntabilitas, dan pemanfaatan data untuk pembangunan daerah.
            </p>

            <div class="row mt-4">
                <div class="col-md-6">
                    <div class="feature-box p-3 mb-3">
                        <h5><i class="bi bi-check-circle-fill text-success me-2"></i>Fitur Utama</h5>
                        <ul>
                            <li>Akses gratis ke seluruh dataset publik</li>
                            <li>Interface yang mudah digunakan</li>
                            <li>Pencarian dan filter data yang canggih</li>
                            <li>Visualisasi data interaktif</li>
                            <li>Download dalam berbagai format</li>
                            <li>Informasi metadata yang lengkap</li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="feature-box p-3 mb-3">
                        <h5><i class="bi bi-file-earmark-text text-info me-2"></i>Format Data Tersedia</h5>
                        <ul>
                            <li><strong>CSV</strong> - Untuk analisis spreadsheet</li>
                            <li><strong>JSON</strong> - Untuk integrasi aplikasi</li>
                            <li><strong>Excel (XLSX)</strong> - Untuk pengolahan data</li>


                        </ul>
                    </div>
                </div>
            </div>

            <div class="alert alert-info mt-3">
                <i class="bi bi-info-circle me-2"></i>
                <strong>Catatan Penting:</strong> Semua data yang tersedia di portal ini bersifat publik
                dan dapat digunakan untuk kepentingan penelitian, analisis, dan pengembangan layanan
                publik.
            </div>
        </div>
    </div>

    <!-- Cara Penggunaan -->
    <div class="container mt-5" id="cara-penggunaan">
        <div class="card p-4 mb-4 shadow-sm">
            <h2 class="mb-4">
                <i class="bi bi-gear-fill text-success me-2"></i>
                Cara Penggunaan Portal
            </h2>

            <!-- Langkah 1 -->
            <div class="usage-step mb-4">
                <div class="step-header">
                    <span class="step-number">1</span>
                    <h4>Mencari Dataset</h4>
                </div>
                <div class="step-content">
                    <p>Gunakan fitur pencarian di halaman utama untuk menemukan dataset yang Anda butuhkan:</p>
                    <ul>
                        <li>Ketik kata kunci di kolom pencarian (contoh: "pendidikan", "kesehatan", "ekonomi")</li>
                        <li>Gunakan filter kategori untuk mempersempit hasil pencarian</li>
                        <li>Filter berdasarkan organisasi/instansi penyedia data</li>
                        <li>Urutkan hasil berdasarkan relevansi, terbaru, atau popularitas</li>
                    </ul>
                    <div class="alert alert-light border">
                        <strong>Tips:</strong> Gunakan kata kunci spesifik untuk hasil yang lebih akurat.
                        Contoh: "data siswa SD 2024" lebih baik daripada hanya "pendidikan".
                    </div>
                </div>
            </div>

            <!-- Langkah 2 -->
            <div class="usage-step mb-4">
                <div class="step-header">
                    <span class="step-number">2</span>
                    <h4>Melihat Detail Dataset</h4>
                </div>
                <div class="step-content">
                    <p>Klik pada dataset untuk melihat informasi lengkap:</p>
                    <ul>
                        <li><strong>Deskripsi:</strong> Penjelasan tentang isi dan tujuan dataset</li>
                        <li><strong>Metadata:</strong> Informasi teknis seperti format, ukuran, dan periode data</li>
                        <li><strong>Organisasi:</strong> Instansi penyedia dan penanggung jawab data</li>
                        <li><strong>Lisensi:</strong> Ketentuan penggunaan data</li>
                        <li><strong>Tanggal Pembaruan:</strong> Kapan data terakhir diperbarui</li>
                        <li><strong>Preview:</strong> Tampilan cuplikan data (jika tersedia)</li>
                    </ul>
                </div>
            </div>

            <!-- Langkah 3 -->
            <div class="usage-step mb-4">
                <div class="step-header">
                    <span class="step-number">3</span>
                    <h4>Mengunduh Dataset</h4>
                </div>
                <div class="step-content">
                    <p>Untuk mengunduh dataset:</p>
                    <ol>
                        <li>Klik tombol <span class="badge bg-primary"><i class="bi bi-download"></i> Unduh</span> pada
                            halaman detail dataset</li>
                        <li>Pilih format file yang diinginkan (CSV, JSON, Excel, dll.)</li>
                        <li>Tunggu proses download selesai</li>
                        <li>File akan tersimpan di folder download komputer Anda</li>
                    </ol>
                    <div class="alert alert-warning border">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        <strong>Perhatian:</strong> Pastikan koneksi internet stabil untuk dataset berukuran
                        besar. Ukuran file ditampilkan sebelum mengunduh.
                    </div>
                </div>
            </div>


            <!-- Langkah 4 -->
            <div class="usage-step mb-4">
                <div class="step-header">
                    <span class="step-number">4</span>
                    <h4>Visualisasi Data</h4>
                </div>
                <div class="step-content">
                    <p>Beberapa dataset menyediakan fitur visualisasi interaktif:</p>
                    <ul>
                        <li>Grafik dan chart untuk tren data</li>
                        <li>Peta untuk data geografis</li>
                        <li>Dashboard interaktif untuk analisis cepat</li>
                        <li>Export visualisasi ke format gambar</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Kategori Dataset -->
    <div class="container mt-5">
        <div class="card p-4 mb-4 shadow-sm">
            <h2 class="mb-4">
                <i class="bi bi-folder-fill text-warning me-2"></i>
                Kategori Dataset
            </h2>
            <div class="row">
                <div class="col-md-4 mb-3">
                    <div class="category-card p-3">
                        <h5><i class="bi bi-people-fill text-primary me-2"></i>Kependudukan</h5>
                        <p class="small mb-0">Data demografi, jumlah penduduk, KTP, KK, dan statistik
                            kependudukan</p>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="category-card p-3">
                        <h5><i class="bi bi-book-fill text-success me-2"></i>Pendidikan</h5>
                        <p class="small mb-0">Data sekolah, siswa, guru, fasilitas pendidikan, dan angka
                            partisipasi</p>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="category-card p-3">
                        <h5><i class="bi bi-heart-pulse-fill text-danger me-2"></i>Kesehatan</h5>
                        <p class="small mb-0">Data puskesmas, rumah sakit, tenaga kesehatan, dan indikator
                            kesehatan</p>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="category-card p-3">
                        <h5><i class="bi bi-graph-up-arrow text-info me-2"></i>Ekonomi</h5>
                        <p class="small mb-0">PDRB, inflasi, UMKM, investasi, dan indikator ekonomi lainnya</p>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="category-card p-3">
                        <h5><i class="bi bi-building text-secondary me-2"></i>Infrastruktur</h5>
                        <p class="small mb-0">Data jalan, jembatan, gedung publik, dan fasilitas umum</p>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="category-card p-3">
                        <h5><i class="bi bi-tree-fill text-success me-2"></i>Lingkungan</h5>
                        <p class="small mb-0">Data kualitas udara, sampah, ruang terbuka hijau, dan
                            konservasi</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- FAQ Section -->
    <div class="container mt-5" id="faq">
        <div class="card p-4 mb-4 shadow-sm">
            <h2 class="mb-4">
                <i class="bi bi-question-circle-fill text-warning me-2"></i>
                Pertanyaan yang Sering Diajukan (FAQ)
            </h2>

            <div class="accordion" id="faqAccordion">
                <!-- FAQ 1 -->
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#faq1">
                            <i class="bi bi-download me-2"></i>
                            Bagaimana cara mengunduh dataset?
                        </button>
                    </h2>
                    <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            <p>Untuk mengunduh dataset:</p>
                            <ol>
                                <li>Buka halaman detail dataset yang Anda inginkan</li>
                                <li>Klik tombol "Unduh" atau icon download</li>
                                <li>Pilih format file yang tersedia (CSV, JSON, Excel, PDF)</li>
                                <li>File akan otomatis terdownload ke komputer Anda</li>
                            </ol>
                            <p class="mb-0">
                                <strong>Catatan:</strong> Beberapa dataset besar mungkin memerlukan waktu lebih lama
                                untuk diunduh tergantung kecepatan internet Anda.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- FAQ 2 -->
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#faq2">
                            <i class="bi bi-arrow-clockwise me-2"></i>
                            Seberapa sering data diperbarui?
                        </button>
                    </h2>
                    <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            Frekuensi pembaruan data bervariasi tergantung jenis dataset dan kebijakan organisasi
                            penyedia:
                            <ul>
                                <li><strong>Harian:</strong> Data cuaca, harga pasar</li>
                                <li><strong>Mingguan:</strong> Data kesehatan masyarakat</li>
                                <li><strong>Bulanan:</strong> Data ekonomi, keuangan daerah</li>
                                <li><strong>Triwulanan:</strong> Data PDRB, inflasi</li>
                                <li><strong>Tahunan:</strong> Data sensus, statistik pendidikan</li>
                            </ul>
                            Tanggal pembaruan terakhir selalu ditampilkan pada halaman detail setiap dataset.
                        </div>
                    </div>
                </div>

                <!-- FAQ 3 -->
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#faq3">
                            <i class="bi bi-exclamation-triangle me-2"></i>
                            Bagaimana jika menemukan kesalahan data?
                        </button>
                    </h2>
                    <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            Jika Anda menemukan kesalahan atau ketidaksesuaian dalam data:
                            <ol>
                                <li>Catat nama dataset dan detail kesalahan yang ditemukan</li>
                                <li>Hubungi organisasi penyedia data (tertera di halaman dataset)</li>
                                <li>
                                    Atau laporkan melalui email:
                                    <a href="mailto:opendata@ternate.go.id">opendata@ternate.go.id</a>
                                </li>
                                <li>Sertakan screenshot atau dokumen pendukung jika diperlukan</li>
                            </ol>
                            Tim kami akan menindaklanjuti laporan Anda dalam 3-5 hari kerja.
                        </div>
                    </div>
                </div>

                <!-- FAQ 4 -->
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#faq4">
                            <i class="bi bi-shield-check me-2"></i>
                            Apakah saya perlu membuat akun untuk mengakses data?
                        </button>
                    </h2>
                    <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            <strong>Tidak.</strong> Semua dataset publik dapat diakses dan diunduh tanpa perlu
                            registrasi atau login. Namun, membuat akun memberikan beberapa keuntungan:
                            <ul>
                                <li>Menyimpan dataset favorit</li>
                                <li>Mendapatkan notifikasi pembaruan data</li>

                                <li>Berkontribusi dengan mengunggah dataset (untuk instansi)</li>
                            </ul>
                        </div>
                    </div>
                </div>



                <!-- FAQ 6 -->
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#faq6">
                            <i class="bi bi-file-earmark-text me-2"></i>
                            Apa itu metadata dan mengapa penting?
                        </button>
                    </h2>
                    <div id="faq6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            Metadata adalah "data tentang data" yang menjelaskan karakteristik dataset, meliputi:
                            <ul>
                                <li><strong>Judul:</strong> Nama dataset</li>
                                <li><strong>Deskripsi:</strong> Penjelasan isi dan tujuan</li>
                                <li><strong>Organisasi:</strong> Instansi penyedia</li>
                                <li><strong>Format:</strong> Jenis file (CSV, JSON, dll)</li>
                                <li><strong>Periode:</strong> Rentang waktu data</li>
                                <li><strong>Lisensi:</strong> Ketentuan penggunaan</li>
                                <li><strong>Tag:</strong> Kata kunci untuk pencarian</li>
                            </ul>
                            Metadata membantu Anda memahami konteks dan kualitas data sebelum menggunakannya.
                        </div>
                    </div>
                </div>

                <!-- FAQ 7 -->
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#faq7">
                            <i class="bi bi-award me-2"></i>
                            Bagaimana lisensi penggunaan data?
                        </button>
                    </h2>
                    <div id="faq7" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            Sebagian besar dataset menggunakan <strong>Lisensi Terbuka</strong> yang memungkinkan:
                            <ul>
                                <li>✅ Menggunakan untuk kepentingan komersial</li>
                                <li>✅ Memodifikasi dan mengolah data</li>
                                <li>✅ Mendistribusikan ulang</li>
                                <li>✅ Membuat karya turunan</li>
                            </ul>
                            <strong>Kewajiban Anda:</strong>
                            <ul>
                                <li>Mencantumkan sumber data (atribusi)</li>
                                <li>Menyebutkan jika ada modifikasi</li>
                                <li>Tidak menyatakan dukungan resmi pemerintah</li>
                            </ul>
                            <p class="mb-0 text-danger">
                                <strong>Catatan:</strong> Beberapa dataset khusus mungkin memiliki lisensi berbeda.
                                Selalu periksa lisensi pada halaman detail dataset.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- FAQ 8 -->
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#faq8">
                            <i class="bi bi-upload me-2"></i>
                            Bagaimana cara berkontribusi mengunggah data?
                        </button>
                    </h2>
                    <div id="faq8" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            Untuk instansi pemerintah yang ingin berkontribusi:
                            <ol>
                                <li>Daftarkan organisasi Anda melalui admin portal</li>
                                <li>Dapatkan akun organisasi dengan hak akses upload</li>
                                <li>Siapkan data sesuai standar format yang ditentukan</li>
                                <li>Upload melalui dashboard organisasi</li>
                                <li>Lengkapi metadata dengan detail</li>
                                <li>Tim admin akan review sebelum publikasi</li>
                            </ol>
                            <p class="mb-0">
                                Hubungi tim Satu Data untuk panduan lengkap dan pelatihan pengunggahan data.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- FAQ 9 -->
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#faq9">
                            <i class="bi bi-phone me-2"></i>
                            Apakah ada aplikasi mobile?
                        </button>
                    </h2>
                    <div id="faq9" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            Saat ini portal Satu Data Ternate sudah <strong>mobile-responsive</strong> dan dapat
                            diakses dengan baik melalui browser mobile. Aplikasi mobile native untuk Android dan
                            iOS sedang dalam tahap pengembangan dan akan segera diluncurkan.
                            <p class="mt-2 mb-0">
                                Untuk sementara, Anda dapat menambahkan portal ini ke home screen perangkat mobile
                                Anda untuk akses cepat.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- FAQ 10 -->
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#faq10">
                            <i class="bi bi-graph-up me-2"></i>
                            Bagaimana cara mengutip data dalam publikasi?
                        </button>
                    </h2>
                    <div id="faq10" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            Format sitasi yang direkomendasikan:
                            <div class="bg-light p-3 rounded mt-2">
                                <p class="mb-2"><strong>Format Umum:</strong></p>
                                <p class="font-monospace small mb-3">
                                    [Nama Organisasi]. ([Tahun]). [Judul Dataset]. Portal Satu Data Kota Ternate.
                                    Diakses pada [Tanggal Akses] dari [URL]
                                </p>
                                <p class="mb-2"><strong>Contoh:</strong></p>
                                <p class="font-monospace small mb-0">
                                    Dinas Pendidikan Kota Ternate. (2024). Data Jumlah Siswa SD/MI Tahun 2024. Portal
                                    Satu Data Kota Ternate. Diakses pada 15 Januari 2024 dari
                                    https://satudata.ternate.go.id/dataset/siswa-sd-2024
                                </p>
                            </div>
                            <p class="mt-2 mb-0">
                                Beberapa dataset menyediakan tombol "Kutip Dataset" yang otomatis generate sitasi
                                dalam berbagai format (APA, MLA, Chicago).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <!-- Kontak Bantuan -->
    <div class="container mt-5 mb-5" id="kontak">
        <div class="card p-4 shadow-sm">
            <h2 class="mb-4">
                <i class="bi bi-headset text-danger me-2"></i>
                Kontak Bantuan
            </h2>
            <p class="lead mb-4">
                Tim kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui saluran berikut:
            </p>

            <div class="row">
                <div class="col-md-4 mb-3">
                    <div class="contact-card p-4 text-center h-100">
                        <i class="bi bi-envelope-fill text-primary fs-1 mb-3"></i>
                        <h5>Email</h5>
                        <p class="mb-2">
                            <a href="mailto:opendata@ternate.go.id">satudata@ternatekota.go.id</a>
                        </p>
                        <p class="small text-muted">Respon dalam 1-2 hari kerja</p>
                    </div>
                </div>

                <div class="col-md-4 mb-3">
                    <div class="contact-card p-4 text-center h-100">
                        <i class="bi bi-telephone-fill text-success fs-1 mb-3"></i>
                        <h5>Telepon</h5>
                        <p class="mb-2">
                            <a href="tel:+62921123456">(0921) 123-456</a>
                        </p>
                        <p class="small text-muted">Senin - Jumat, 08:00 - 16:00 WIT</p>
                    </div>
                </div>

                <div class="col-md-4 mb-3">
                    <div class="contact-card p-4 text-center h-100">
                        <i class="bi bi-whatsapp text-success fs-1 mb-3"></i>
                        <h5>WhatsApp</h5>
                        <p class="mb-2">
                            <a href="https://wa.me/62921123456" target="_blank">+62 921-123-456</a>
                        </p>
                        <p class="small text-muted">Respon cepat di jam kerja</p>
                    </div>
                </div>
            </div>


            <div class="row mt-4">
                <div class="col-12">
                    <div class="alert alert-info">
                        <h5><i class="bi bi-info-circle me-2"></i>Informasi Tambahan</h5>
                        <ul class="mb-0">
                            <li>
                                Untuk pertanyaan teknis tentang dataset tertentu, hubungi langsung organisasi
                                penyedia data yang tertera di halaman dataset
                            </li>
                            <li>
                                Untuk permintaan data khusus yang belum tersedia di portal, kirimkan permohonan
                                melalui email dengan subjek "Permintaan Data: [Nama Data]"
                            </li>
                            <li>
                                Untuk pelatihan atau workshop penggunaan portal bagi instansi/organisasi, hubungi
                                kami untuk jadwal tersedia
                            </li>
                            <li>
                                Follow media sosial kami untuk update terbaru:
                                <a href="#" class="ms-2"><i class="bi bi-facebook"></i></a>
                                <a href="#" class="ms-2"><i class="bi bi-twitter"></i></a>
                                <a href="#" class="ms-2"><i class="bi bi-instagram"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'HelpView',
        mounted() {
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault()
                    const target = document.querySelector(this.getAttribute('href'))
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        })
                    }
                })
            })
        },
    }
</script>

<style scoped>
    /* Hero Section */
    .bantuan-hero {
        background: linear-gradient(135deg, #1581bf 0%, #0d5a8a 100%);
        color: white;
        padding: 120px 0 80px !important;
        position: relative;
        overflow: hidden;
    }

    .bantuan-hero::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 100%;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
        opacity: 0.3;
    }

    /* Quick Navigation Cards */
    .quick-nav-card {
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }

    .quick-nav-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        border-color: #1581bf;
    }

    /* Feature Box */
    .feature-box {
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #1581bf;
    }

    /* Usage Steps */
    .usage-step {
        border-left: 3px solid #1581bf;
        padding-left: 20px;
        position: relative;
    }

    .step-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    .step-number {
        background: #1581bf;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 15px;
        flex-shrink: 0;
    }

    .step-content {
        padding-left: 55px;
    }

    /* Category Cards */
    .category-card {
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #dee2e6;
        transition: all 0.3s ease;
    }

    .category-card:hover {
        background: white;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        transform: translateY(-3px);
    }

    /* Contact Cards */
    .contact-card {
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #dee2e6;
        transition: all 0.3s ease;
    }

    .contact-card:hover {
        background: white;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }

    /* Accordion */
    .accordion-button {
        font-weight: 500;
    }

    .accordion-button:not(.collapsed) {
        background-color: #e7f3ff;
        color: #1581bf;
    }

    /* Code Blocks */
    pre {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 5px;
        border-left: 3px solid #1581bf;
        overflow-x: auto;
    }

    code {
        color: #e83e8c;
        background: #f8f9fa;
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 0.9em;
    }

    /* Alerts */
    .alert {
        border-left: 4px solid;
    }

    .alert-info {
        border-left-color: #0dcaf0;
    }

    .alert-warning {
        border-left-color: #ffc107;
    }

    .alert-light {
        background: #f8f9fa;
        border-color: #dee2e6;
    }

    /* Links */
    a {
        color: #1581bf;
        text-decoration: none;
    }

    a:hover {
        color: #0d5a8a;
        text-decoration: underline;
    }

    /* Badges */
    .badge {
        padding: 0.35em 0.65em;
        font-weight: 500;
    }

    /* Tables */
    .table {
        font-size: 0.9rem;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .bantuan-hero {
            padding: 80px 0 50px !important;
        }

        .step-content {
            padding-left: 0;
        }

        .step-number {
            width: 35px;
            height: 35px;
            font-size: 1rem;
        }
    }
</style>
