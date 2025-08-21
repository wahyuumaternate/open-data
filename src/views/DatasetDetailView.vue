<template>
  <div class="dataset-detail">
    <!-- Dataset Hero Section -->
    <section id="dataset-hero" class="dataset-hero">
      <div class="container" data-aos="fade-up">
        <div class="row align-items-center">
          <div class="col-lg-2 text-center">
            <div class="dataset-icon-container">
              <img
                :src="getCategoryImage(dataset.category_id)"
                :alt="dataset.title"
                class="dataset-icon"
              />
            </div>
          </div>
          <div class="col-lg-7">
            <div class="dataset-info">
              <div class="category-label" :class="getCategoryClass(dataset.category_id)">
                {{ getCategoryName(dataset.category_id) }}
              </div>
              <h1 class="dataset-title">{{ dataset.title }}</h1>
              <p class="dataset-description">{{ dataset.description }}</p>

              <div class="dataset-meta">
                <div class="meta-item">
                  <i class="bx bx-building"></i>
                  <span>{{ getOrganizationName(dataset.organization_id) }}</span>
                </div>
                <div class="meta-item">
                  <i class="bx bx-calendar"></i>
                  <span>Diperbarui {{ formatDate(dataset.updated_at) }}</span>
                </div>
                <div class="meta-item">
                  <i class="bx bx-download"></i>
                  <span>{{ dataset.downloads.toLocaleString() }} downloads</span>
                </div>
                <div class="meta-item">
                  <i class="bx bx-show"></i>
                  <span>{{ dataset.views.toLocaleString() }} views</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="download-panel">
              <button class="btn-download" @click="downloadDataset">
                <i class="bx bx-download"></i>
                Download Dataset
              </button>
              <button class="btn-preview" @click="previewDataset">
                <i class="bx bx-show"></i>
                Preview Data
              </button>
              <button class="btn-share" @click="shareDataset">
                <i class="bx bx-share-alt"></i>
                Share Dataset
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="section-bg">
      <div class="container">
        <div class="row">
          <!-- Left Content -->
          <div class="col-lg-8">
            <!-- Dataset Information -->
            <div class="dataset-section" data-aos="fade-up">
              <div class="section-title">
                <h3><i class="bx bx-info-circle"></i> Informasi Dataset</h3>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <h5>Kategori</h5>
                  <span class="category-badge" :class="getCategoryClass(dataset.category_id)">
                    {{ getCategoryName(dataset.category_id) }}
                  </span>
                </div>
                <div class="info-item">
                  <h5>Organisasi</h5>
                  <p>{{ getOrganizationName(dataset.organization_id) }}</p>
                </div>
                <div class="info-item">
                  <h5>Format File</h5>
                  <div class="format-list">
                    <span v-for="format in dataset.formats" :key="format" class="format-badge">
                      {{ format.toUpperCase() }}
                    </span>
                  </div>
                </div>
                <div class="info-item">
                  <h5>Ukuran File</h5>
                  <p>{{ dataset.file_size }}</p>
                </div>
                <div class="info-item">
                  <h5>Lisensi</h5>
                  <p>{{ dataset.license }}</p>
                </div>
                <div class="info-item">
                  <h5>Terakhir Diperbarui</h5>
                  <p>{{ formatDate(dataset.updated_at) }}</p>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="dataset-section" data-aos="fade-up" data-aos-delay="100">
              <div class="section-title">
                <h3><i class="bx bx-file-blank"></i> Deskripsi</h3>
              </div>
              <div class="description-content">
                <p>{{ dataset.detailed_description }}</p>
                <h5>Data yang Tersedia:</h5>
                <ul class="data-fields">
                  <li v-for="field in dataset.data_fields" :key="field">{{ field }}</li>
                </ul>
              </div>
            </div>

            <!-- Data Preview -->
            <div class="dataset-section" data-aos="fade-up" data-aos-delay="200">
              <div class="section-title">
                <h3><i class="bx bx-table"></i> Preview Data</h3>
              </div>
              <div class="table-container">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th v-for="header in dataset.sample_data.headers" :key="header">
                          {{ header }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in dataset.sample_data.rows" :key="index">
                        <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="table-note">
                  <small
                    >Menampilkan 5 baris pertama dari
                    {{ dataset.total_rows.toLocaleString() }} total data</small
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Right Sidebar -->
          <div class="col-lg-4">
            <!-- Quick Stats -->
            <div class="sidebar-widget" data-aos="fade-up">
              <h4>Statistik</h4>
              <div class="stats-container">
                <div class="stat-box">
                  <div class="stat-number">{{ dataset.downloads.toLocaleString() }}</div>
                  <div class="stat-label">Downloads</div>
                </div>
                <div class="stat-box">
                  <div class="stat-number">{{ dataset.views.toLocaleString() }}</div>
                  <div class="stat-label">Views</div>
                </div>
                <div class="stat-box">
                  <div class="stat-number">{{ dataset.total_rows.toLocaleString() }}</div>
                  <div class="stat-label">Total Rows</div>
                </div>
                <div class="stat-box">
                  <div class="stat-number">{{ dataset.file_size }}</div>
                  <div class="stat-label">File Size</div>
                </div>
              </div>
            </div>

            <!-- Download Options -->
            <div class="sidebar-widget" data-aos="fade-up" data-aos-delay="100">
              <h4>Format Download</h4>
              <div class="download-list">
                <div v-for="format in dataset.formats" :key="format" class="download-item">
                  <button class="download-btn" @click="downloadFormat(format)">
                    <i class="bx bx-download"></i>
                    <span class="format-name">{{ format.toUpperCase() }}</span>
                    <span class="file-size">{{ getFormatSize(format) }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Related Datasets -->
            <div class="sidebar-widget" data-aos="fade-up" data-aos-delay="200">
              <h4>Dataset Terkait</h4>
              <div class="related-list">
                <div v-for="related in relatedDatasets" :key="related.id" class="related-item">
                  <div class="related-icon">
                    <img :src="getCategoryImage(related.category_id)" :alt="related.title" />
                  </div>
                  <div class="related-content">
                    <h6>{{ related.title }}</h6>
                    <span class="downloads">{{ related.downloads }} downloads</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="sidebar-widget" data-aos="fade-up" data-aos-delay="300">
              <h4>Kontak</h4>
              <div class="contact-list">
                <div class="contact-item">
                  <i class="bx bx-building"></i>
                  <span>{{ getOrganizationName(dataset.organization_id) }}</span>
                </div>
                <div class="contact-item">
                  <i class="bx bx-envelope"></i>
                  <span>{{ dataset.contact_email }}</span>
                </div>
                <div class="contact-item">
                  <i class="bx bx-phone"></i>
                  <span>{{ dataset.contact_phone }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DatasetDetailView',
  props: ['id'],
  data() {
    return {
      dataset: {
        id: 1,
        title: 'Data Kependudukan Kota Ternate 2024',
        description:
          'Data lengkap kependudukan Kota Ternate tahun 2024 meliputi jumlah penduduk per kecamatan, usia, dan jenis kelamin.',
        detailed_description:
          'Dataset ini berisi informasi komprehensif tentang kependudukan Kota Ternate untuk tahun 2024. Data dikumpulkan dari berbagai sumber resmi dan telah diverifikasi oleh Dinas Kependudukan dan Pencatatan Sipil Kota Ternate. Dataset ini sangat berguna untuk penelitian demografi, perencanaan pembangunan, dan analisis sosial ekonomi.',
        category_id: 'kependudukan',
        organization_id: 'disdukcapil',
        formats: ['csv', 'json', 'excel'],
        downloads: 1245,
        views: 3847,
        updated_at: '2024-01-15',
        file_size: '2.5 MB',
        license: 'Creative Commons',
        total_rows: 125430,
        contact_email: 'data@disdukcapil.ternatekota.go.id',
        contact_phone: '(0921) 123-4567',
        data_fields: [
          'NIK (Nomor Induk Kependudukan)',
          'Nama Lengkap',
          'Jenis Kelamin',
          'Tanggal Lahir',
          'Alamat',
          'Kecamatan',
          'Kelurahan',
          'Status Perkawinan',
          'Pekerjaan',
          'Pendidikan Terakhir',
        ],
        sample_data: {
          headers: ['NIK', 'Nama', 'Jenis Kelamin', 'Umur', 'Kecamatan', 'Status'],
          rows: [
            ['8271****001', 'Ahmad Suryadi', 'L', '35', 'Ternate Utara', 'Kawin'],
            ['8271****002', 'Siti Maryam', 'P', '28', 'Ternate Selatan', 'Kawin'],
            ['8271****003', 'Muhammad Rizki', 'L', '22', 'Ternate Tengah', 'Belum Kawin'],
            ['8271****004', 'Fatimah Zahra', 'P', '31', 'Moti', 'Kawin'],
            ['8271****005', 'Abdul Rahman', 'L', '45', 'Pulau Ternate', 'Kawin'],
          ],
        },
      },
      relatedDatasets: [
        {
          id: 2,
          title: 'Data Kesehatan Masyarakat 2024',
          category_id: 'kesehatan',
          downloads: 876,
        },
        {
          id: 3,
          title: 'Data Pendidikan Kota Ternate',
          category_id: 'pendidikan',
          downloads: 654,
        },
        {
          id: 4,
          title: 'Data Ekonomi Regional 2024',
          category_id: 'ekonomi',
          downloads: 1023,
        },
      ],
      categories: [
        { id: 'kependudukan', name: 'Kependudukan' },
        { id: 'kesehatan', name: 'Kesehatan' },
        { id: 'pendidikan', name: 'Pendidikan' },
        { id: 'ekonomi', name: 'Ekonomi' },
      ],
      organizations: [
        { id: 'disdukcapil', name: 'Dinas Kependudukan dan Pencatatan Sipil' },
        { id: 'dinkes', name: 'Dinas Kesehatan' },
        { id: 'dindik', name: 'Dinas Pendidikan' },
      ],
    }
  },
  mounted() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
      })
    }
  },
  methods: {
    getCategoryName(categoryId) {
      const category = this.categories.find((cat) => cat.id === categoryId)
      return category ? category.name : categoryId
    },
    getCategoryClass(categoryId) {
      const classes = {
        kependudukan: 'category-kependudukan',
        kesehatan: 'category-kesehatan',
        pendidikan: 'category-pendidikan',
        ekonomi: 'category-ekonomi',
      }
      return classes[categoryId] || 'category-default'
    },
    getCategoryImage(categoryId) {
      return `/assets/img/data-${categoryId}.svg`
    },
    getOrganizationName(orgId) {
      const org = this.organizations.find((o) => o.id === orgId)
      return org ? org.name : orgId
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    getFormatSize(format) {
      const sizes = {
        csv: '1.2 MB',
        json: '2.5 MB',
        excel: '1.8 MB',
        pdf: '3.2 MB',
      }
      return sizes[format] || '1.0 MB'
    },
    downloadDataset() {
      alert('Mengunduh dataset lengkap...')
    },
    downloadFormat(format) {
      alert(`Mengunduh dataset dalam format ${format.toUpperCase()}...`)
    },
    previewDataset() {
      alert('Membuka preview dataset...')
    },
    shareDataset() {
      alert('Berbagi dataset...')
    },
  },
}
</script>

<style scoped>
/* Breadcrumbs */
.breadcrumbs {
  padding: 15px 0;
  background: #f3f5fa;
  border-bottom: 1px solid #ebeef4;
}

.breadcrumbs h2 {
  font-size: 28px;
  font-weight: 600;
  color: #37517e;
}

.breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
}

.breadcrumbs ol li + li {
  padding-left: 10px;
}

.breadcrumbs ol li + li::before {
  display: inline-block;
  padding-right: 10px;
  color: #4668a2;
  content: '/';
}

.breadcrumbs ol li a {
  color: #4668a2;
  text-decoration: none;
}

.breadcrumbs ol li a:hover {
  color: #47b2e4;
}

/* Dataset Hero Section */
.dataset-hero {
  padding: 80px 0;
  background: linear-gradient(45deg, #37517e, #47b2e4);
  color: white;
}

.dataset-icon-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  backdrop-filter: blur(10px);
  display: inline-block;
}

.dataset-icon {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.category-label {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;
}

.category-kependudukan {
  background: rgba(255, 255, 255, 0.2);
}
.category-kesehatan {
  background: rgba(71, 178, 228, 0.3);
}
.category-pendidikan {
  background: rgba(67, 233, 123, 0.3);
}
.category-ekonomi {
  background: rgba(255, 236, 210, 0.3);
}

.dataset-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
}

.dataset-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.9;
}

.dataset-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.meta-item i {
  font-size: 18px;
}

/* Download Panel */
.download-panel {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  backdrop-filter: blur(10px);
  text-align: center;
}

.btn-download,
.btn-preview,
.btn-share {
  display: block;
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  margin-bottom: 10px;
  cursor: pointer;
}

.btn-download {
  background: #47b2e4;
  color: white;
}

.btn-download:hover {
  background: #209dd8;
  transform: translateY(-2px);
}

.btn-preview,
.btn-share {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-preview:hover,
.btn-share:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Main Content */
.section-bg {
  background-color: #f3f5fa;
  padding: 80px 0;
}

.dataset-section {
  background: white;
  border-radius: 10px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 0 29px 0 rgba(68, 88, 144, 0.12);
}

.section-title h3 {
  font-size: 24px;
  font-weight: 700;
  color: #37517e;
  margin-bottom: 30px;
}

.section-title i {
  margin-right: 10px;
  color: #47b2e4;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.info-item h5 {
  font-size: 16px;
  font-weight: 600;
  color: #37517e;
  margin-bottom: 10px;
}

.info-item p {
  color: #444444;
  margin-bottom: 0;
}

/* Category Badge */
.category-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
}

.category-badge.category-kependudukan {
  background: #37517e;
}
.category-badge.category-kesehatan {
  background: #47b2e4;
}
.category-badge.category-pendidikan {
  background: #28a745;
}
.category-badge.category-ekonomi {
  background: #ffc107;
  color: #333;
}

/* Format List */
.format-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.format-badge {
  background: #f3f5fa;
  color: #37517e;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #ebeef4;
}

/* Description */
.description-content p {
  color: #444444;
  line-height: 1.8;
  margin-bottom: 30px;
}

.description-content h5 {
  color: #37517e;
  font-weight: 600;
  margin-bottom: 15px;
}

.data-fields {
  list-style: none;
  padding: 0;
}

.data-fields li {
  padding: 8px 0;
  border-bottom: 1px solid #ebeef4;
  color: #444444;
}

.data-fields li:before {
  content: '▸';
  color: #47b2e4;
  margin-right: 10px;
  font-weight: bold;
}

/* Table */
.table-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ebeef4;
}

.table {
  margin-bottom: 0;
}

.table thead th {
  background: #37517e;
  color: white;
  border: none;
  padding: 15px 12px;
  font-weight: 600;
  font-size: 14px;
}

.table tbody td {
  padding: 12px;
  border-bottom: 1px solid #ebeef4;
  color: #444444;
}

.table-note {
  padding: 15px;
  background: #f8f9fa;
  text-align: center;
  color: #6c757d;
}

/* Sidebar */
.sidebar-widget {
  background: white;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 0 29px 0 rgba(68, 88, 144, 0.12);
}

.sidebar-widget h4 {
  font-size: 20px;
  font-weight: 700;
  color: #37517e;
  margin-bottom: 25px;
}

/* Stats */
.stats-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.stat-box {
  text-align: center;
  padding: 20px;
  background: #f3f5fa;
  border-radius: 10px;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: #37517e;
  display: block;
}

.stat-label {
  font-size: 12px;
  color: #6c757d;
  text-transform: uppercase;
  margin-top: 5px;
}

/* Download List */
.download-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.download-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px;
  background: #f3f5fa;
  border: 1px solid #ebeef4;
  border-radius: 8px;
  color: #37517e;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
}

.download-btn:hover {
  background: #47b2e4;
  color: white;
  transform: translateY(-2px);
}

.format-name {
  font-weight: 600;
}

.file-size {
  font-size: 12px;
  opacity: 0.7;
}

/* Related Items */
.related-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.related-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f3f5fa;
  border-radius: 8px;
  transition: all 0.3s;
  cursor: pointer;
}

.related-item:hover {
  background: #ebeef4;
  transform: translateY(-2px);
}

.related-icon img {
  width: 40px;
  height: 40px;
  border-radius: 8px;
}

.related-content h6 {
  font-size: 14px;
  font-weight: 600;
  color: #37517e;
  margin-bottom: 5px;
}

.related-content .downloads {
  font-size: 12px;
  color: #6c757d;
}

/* Contact */
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #444444;
}

.contact-item i {
  color: #47b2e4;
  font-size: 18px;
  width: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .dataset-hero {
    padding: 40px 0;
    text-align: center;
  }

  .dataset-title {
    font-size: 24px;
  }

  .dataset-description {
    font-size: 16px;
  }

  .dataset-meta {
    justify-content: center;
    gap: 20px;
  }

  .download-panel {
    margin-top: 30px;
  }

  .section-bg {
    padding: 40px 0;
  }

  .dataset-section {
    padding: 20px;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .sidebar-widget {
    padding: 20px;
  }
}
</style>
