<template>
  <div class="dataset-detail">
    <!-- Loading State with Skeleton -->
    <div v-if="loading">
      <!-- Skeleton Hero Section -->
      <section class="dataset-hero">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-2 text-center">
              <div class="dataset-icon-container">
                <div class="skeleton skeleton-icon"></div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="dataset-info">
                <div class="skeleton skeleton-badge mb-3"></div>
                <div class="skeleton skeleton-title mb-3"></div>
                <div class="skeleton skeleton-description mb-4"></div>
                <div class="skeleton skeleton-description-short mb-4"></div>

                <div class="dataset-meta">
                  <div class="meta-item">
                    <div class="skeleton skeleton-meta"></div>
                  </div>
                  <div class="meta-item">
                    <div class="skeleton skeleton-meta"></div>
                  </div>
                  <div class="meta-item">
                    <div class="skeleton skeleton-meta"></div>
                  </div>
                  <div class="meta-item">
                    <div class="skeleton skeleton-meta"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Skeleton Main Content -->
      <section class="section-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <!-- Skeleton Description Section -->
              <div class="dataset-section">
                <div class="section-title">
                  <div class="skeleton skeleton-section-title mb-4"></div>
                </div>
                <div class="description-content">
                  <div class="skeleton skeleton-text mb-3"></div>
                  <div class="skeleton skeleton-text mb-3"></div>
                  <div class="skeleton skeleton-text-short mb-4"></div>

                  <div class="skeleton skeleton-subtitle mb-3"></div>
                  <div class="skeleton skeleton-list-item mb-2"></div>
                  <div class="skeleton skeleton-list-item mb-2"></div>
                  <div class="skeleton skeleton-list-item mb-2"></div>
                  <div class="skeleton skeleton-list-item"></div>
                </div>
              </div>

              <!-- Skeleton Data Preview Section -->
              <div class="dataset-section">
                <div class="section-title">
                  <div class="skeleton skeleton-section-title mb-4"></div>
                </div>
                <div class="table-container">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th><div class="skeleton skeleton-table-header"></div></th>
                          <th><div class="skeleton skeleton-table-header"></div></th>
                          <th><div class="skeleton skeleton-table-header"></div></th>
                          <th><div class="skeleton skeleton-table-header"></div></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="n in 5" :key="n">
                          <td><div class="skeleton skeleton-table-cell"></div></td>
                          <td><div class="skeleton skeleton-table-cell"></div></td>
                          <td><div class="skeleton skeleton-table-cell"></div></td>
                          <td><div class="skeleton skeleton-table-cell"></div></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="table-note">
                    <div class="skeleton skeleton-note"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-12">
              <!-- Skeleton Related Datasets -->
              <div class="sidebar-widget">
                <div class="skeleton skeleton-widget-title mb-4"></div>
                <div class="related-list">
                  <div v-for="n in 3" :key="n" class="related-item">
                    <div class="related-icon">
                      <div class="skeleton skeleton-related-icon"></div>
                    </div>
                    <div class="related-content">
                      <div class="skeleton skeleton-related-title mb-2"></div>
                      <div class="skeleton skeleton-related-downloads"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Error State -->
    <div v-if="error" class="alert alert-danger text-center m-5" role="alert">
      <i class="bi bi-exclamation-triangle me-2"></i>
      {{ error }}
      <br />
      <button @click="fetchDataset" class="btn btn-outline-danger btn-sm mt-2">Coba Lagi</button>
    </div>

    <!-- Main Content -->
    <div v-if="!loading && !error && dataset">
      <!-- Dataset Hero Section -->
      <section id="dataset-hero" class="dataset-hero">
        <div class="container" data-aos="fade-up">
          <div class="row align-items-center">
            <div class="col-lg-2 text-center">
              <div class="dataset-icon-container">
                <img
                  :src="getCategoryImage(dataset.topic)"
                  :alt="dataset.title"
                  class="dataset-icon"
                />
              </div>
            </div>
            <div class="col-lg-8">
              <div class="dataset-info">
                <div class="category-label mt-3" :class="getCategoryClass(dataset.topic)">
                  {{ dataset.topic }}
                </div>
                <h1 class="dataset-title">{{ dataset.title }}</h1>
                <p class="dataset-description">{{ dataset.description }}</p>

                <div class="dataset-meta">
                  <div class="meta-item">
                    <i class="bx bx-building"></i>
                    <span>{{ dataset.organization_name || 'Unknown Organization' }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="bx bx-calendar"></i>
                    <span>Diperbarui {{ formatDate(dataset.updated_at) }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="bx bx-download"></i>
                    <span>{{ (dataset.download_count || 0).toLocaleString() }} downloads</span>
                  </div>
                  <div class="meta-item">
                    <i class="bx bx-show"></i>
                    <span>{{ (dataset.view_count || 0).toLocaleString() }} views</span>
                  </div>
                </div>
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
            <div class="col-lg-12">
              <!-- Description -->
              <div class="dataset-section" data-aos="fade-up" data-aos-delay="100">
                <div class="section-title">
                  <h3><i class="bx bx-file-blank"></i> Deskripsi</h3>
                </div>
                <div class="description-content">
                  <p>{{ dataset.description || 'Tidak ada deskripsi tersedia.' }}</p>
                </div>
              </div>

              <!-- Data Preview -->
              <div
                class="dataset-section"
                data-aos="fade-up"
                data-aos-delay="200"
                v-if="hasPreviewData"
              >
                <div class="section-title">
                  <h3><i class="bx bx-table"></i> Preview Data</h3>
                </div>
                <div class="table-container">
                  <table
                    id="datasetPreviewTable"
                    class="table table-striped table-bordered"
                    style="width: 100%"
                  >
                    <thead>
                      <tr>
                        <th v-for="(value, key) in getDataHeaders" :key="key">
                          {{ key }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in getPreviewData" :key="index">
                        <td v-for="(value, key) in row" :key="key">
                          {{ formatCellValue(value) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="table-note mt-3">
                  <small>
                    Dataset lengkap memiliki {{ (dataset.total_rows || 0).toLocaleString() }} baris
                    dan {{ (dataset.total_columns || 0).toLocaleString() }} kolom
                  </small>
                </div>
              </div>
            </div>

            <!-- Right Sidebar -->
            <div class="col-lg-12">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'

export default {
  name: 'DatasetDetailView',
  props: ['id'],
  data() {
    return {
      // API Configuration
      apiUrl: import.meta.env.VITE_API_URL,

      // Loading and Error States
      loading: false,
      error: null,

      // Data from API
      dataset: null,

      // Static data for related datasets
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

      // Category mapping
      topicImageMap: {
        Ekonomi: 'data-ekonomi.svg',
        Infrastruktur: 'data-infrastruktur.svg',
        Kemiskinan: 'data-kemiskinan.svg',
        Kependudukan: 'data-kependudukan.svg',
        Kesehatan: 'data-kesehatan.svg',
        'Lingkungan Hidup': 'data-lingkungan.svg',
        'Pariwisata & Kebudayaan': 'data-pariwisata.svg',
        Pariwisata: 'data-pariwisata.svg',
        'Pemerintah & Desa': 'data-pemerintah.svg',
        Pemerintahan: 'data-pemerintah.svg',
        Pendidikan: 'data-pendidikan.svg',
        Sosial: 'data-sosial.svg',
      },

      categories: [
        { id: 'kependudukan', name: 'Kependudukan' },
        { id: 'kesehatan', name: 'Kesehatan' },
        { id: 'pendidikan', name: 'Pendidikan' },
        { id: 'ekonomi', name: 'Ekonomi' },
        { id: 'sosial', name: 'Sosial' },
      ],
      organizations: [
        { id: 'disdukcapil', name: 'Dinas Kependudukan dan Pencatatan Sipil' },
        { id: 'dinkes', name: 'Dinas Kesehatan' },
        { id: 'dindik', name: 'Dinas Pendidikan' },
      ],
    }
  },

  computed: {
    hasPreviewData() {
      return this.dataset && this.dataset.data && this.dataset.data.length > 0
    },

    hasDataFields() {
      return this.hasPreviewData && this.getDataFields.length > 0
    },

    getDataHeaders() {
      if (!this.hasPreviewData) return {}
      return this.dataset.data[0] || {}
    },

    getPreviewData() {
      if (!this.hasPreviewData) return []
      return this.dataset.data || []
    },

    getDataFields() {
      if (!this.hasPreviewData) return []
      return Object.keys(this.dataset.data[0] || {})
    },
  },

  async mounted() {
    await this.fetchDataset()

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
    async fetchDataset() {
      this.loading = true
      this.error = null

      try {
        const slug =
          this.$route?.params?.slug ||
          this.$route?.params?.id ||
          window.location.pathname.split('/').pop()

        if (!slug) {
          throw new Error('Slug parameter tidak ditemukan di URL')
        }

        const response = await axios.get(`${this.apiUrl}datasets/${slug}`)

        if (response.data.success) {
          this.dataset = response.data.data.dataset

          document.title = `${this.dataset.title} - Open Data Ternate`
          // Initialize DataTable after data is loaded
          this.$nextTick(() => {
            setTimeout(() => {
              this.initDataTable()
            }, 500)
          })
        } else {
          throw new Error(response.data.message || 'Failed to fetch dataset')
        }
      } catch (error) {
        console.error('Error fetching dataset:', error)
        if (error.response?.status === 404) {
          this.$router.push({ name: 'NotFound' })
        } else if (error.message.includes('Slug parameter')) {
          this.error = 'Parameter URL tidak valid. Pastikan URL dalam format /dataset/{slug}'
        } else {
          this.error = 'Gagal memuat dataset. Silakan coba lagi.'
        }
      } finally {
        this.loading = false
      }
    },

    getCategoryName(categoryId) {
      const category = this.categories.find((cat) => cat.id === categoryId)
      return category ? category.name : categoryId
    },

    getCategoryClass(topic) {
      const classMap = {
        Ekonomi: 'category-ekonomi',
        Infrastruktur: 'category-infrastruktur',
        Kemiskinan: 'category-kemiskinan',
        Kependudukan: 'category-kependudukan',
        Kesehatan: 'category-kesehatan',
        'Lingkungan Hidup': 'category-lingkungan',
        'Pariwisata & Kebudayaan': 'category-pariwisata',
        Pariwisata: 'category-pariwisata',
        'Pemerintah & Desa': 'category-pemerintah',
        Pemerintahan: 'category-pemerintah',
        Pendidikan: 'category-pendidikan',
        Sosial: 'category-sosial',
      }
      return classMap[topic] || 'category-default'
    },

    getCategoryImage(categoryIdOrTopic) {
      let imageName
      if (typeof categoryIdOrTopic === 'string') {
        imageName =
          this.topicImageMap[categoryIdOrTopic] || `data-${categoryIdOrTopic.toLowerCase()}.svg`
      } else {
        imageName = `data-${categoryIdOrTopic}.svg`
      }
      return `/assets/img/${imageName}`
    },

    getOrganizationName(orgId) {
      const org = this.organizations.find((o) => o.id === orgId)
      return org ? org.name : orgId
    },

    formatDate(dateStr) {
      if (!dateStr) return 'N/A'
      const date = new Date(dateStr)
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },

    formatCellValue(value) {
      if (value === null || value === undefined) {
        return '-'
      }
      if (typeof value === 'string' && value.length > 50) {
        return value.substring(0, 50) + '...'
      }
      return value
    },

    downloadDataset() {
      alert('Mengunduh dataset lengkap...')
    },

    initDataTable() {
      if (this.hasPreviewData && this.getPreviewData.length > 0) {
        this.$nextTick(() => {
          setTimeout(() => {
            try {
              const tableElement = document.getElementById('datasetPreviewTable')

              if (tableElement) {
                // Destroy existing DataTable if exists
                if ($.fn.DataTable.isDataTable('#datasetPreviewTable')) {
                  $('#datasetPreviewTable').DataTable().destroy()
                }

                // Initialize DataTable with modern styling
                const dataTable = $('#datasetPreviewTable').DataTable({
                  responsive: true,
                  pageLength: 10,
                  lengthMenu: [
                    [5, 10, 25, 50, -1],
                    [5, 10, 25, 50, 'Semua'],
                  ],
                  language: {
                    search: 'Cari:',
                    lengthMenu: 'Tampilkan _MENU_ data per halaman',
                    info: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ data',
                    infoEmpty: 'Tidak ada data tersedia',
                    infoFiltered: '(difilter dari _MAX_ total data)',
                    zeroRecords: 'Data tidak ditemukan',
                    paginate: {
                      next: 'Selanjutnya',
                      previous: 'Sebelumnya',
                    },
                  },
                  columnDefs: [
                    {
                      targets: '_all',
                      render: function (data, type, row) {
                        if (type === 'display' && data != null) {
                          if (typeof data === 'string' && data.length > 50) {
                            return (
                              '<span title="' + data + '">' + data.substring(0, 50) + '...</span>'
                            )
                          }
                        }
                        return data || '-'
                      },
                      className: 'align-middle',
                    },
                  ],
                  dom:
                    '<"d-flex justify-content-between align-items-center mb-3"<"d-flex align-items-center"l><"d-flex align-items-center"f>>' +
                    '<"table-responsive"t>' +
                    '<"d-flex justify-content-between align-items-center mt-3"<"datatable-info"i><"datatable-pagination"p>>',
                  scrollX: true,
                  autoWidth: false,
                  processing: true,
                  drawCallback: function () {
                    // Apply modern styling after each draw
                    $('.dataTables_wrapper').addClass('modern-datatable')
                  },
                })
              } else {
                console.error('Table element not found')
              }
            } catch (error) {
              console.error('Error initializing DataTable:', error)
            }
          }, 500)
        })
      } else {
      }
    },
  },

  beforeUnmount() {
    // Clean up DataTable on component unmount
    if ($.fn.DataTable.isDataTable('#datasetPreviewTable')) {
      $('#datasetPreviewTable').DataTable().destroy()
    }
  },
}
</script>
<style scoped>
/* Skeleton Loading Styles */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Skeleton Elements */
.skeleton-icon {
  width: 100px;
  height: 100px;
  border-radius: 16px;
}

.skeleton-badge {
  width: 80px;
  height: 22px;
  border-radius: 20px;
}

.skeleton-title {
  width: 70%;
  height: 36px;
}

.skeleton-description {
  width: 100%;
  height: 18px;
}

.skeleton-description-short {
  width: 80%;
  height: 18px;
}

.skeleton-meta {
  width: 120px;
  height: 14px;
}

.skeleton-section-title {
  width: 200px;
  height: 24px;
}

.skeleton-text {
  width: 100%;
  height: 16px;
}

.skeleton-text-short {
  width: 75%;
  height: 16px;
}

.skeleton-subtitle {
  width: 150px;
  height: 18px;
}

.skeleton-list-item {
  width: 90%;
  height: 14px;
}

.skeleton-table-header {
  width: 100%;
  height: 16px;
}

.skeleton-table-cell {
  width: 100%;
  height: 14px;
}

.skeleton-note {
  width: 300px;
  height: 12px;
  margin: 0 auto;
}

.skeleton-widget-title {
  width: 150px;
  height: 20px;
}

.skeleton-related-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
}

.skeleton-related-title {
  width: 200px;
  height: 14px;
}

.skeleton-related-downloads {
  width: 100px;
  height: 12px;
}

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
  color: #1acc8d;
}

/* Dataset Hero Section */
.dataset-hero {
  padding-top: 120px !important;
  background: linear-gradient(135deg, #040677 0%, #1e40af 100%);
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
.category-sosial {
  background: rgba(255, 255, 255, 0.2);
}

.dataset-title {
  color: #ffffff;
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
  background: #1acc8d;
  color: white;
}

.btn-download:hover {
  background: #1ff4a9ff;
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
  color: #1acc8d;
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
  background: #1acc8d;
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
  color: #1acc8d;
  margin-right: 10px;
  font-weight: bold;
}

/* Table Container */
.table-container {
  margin-top: 1rem;
  border-radius: 12px;
  overflow: hidden;
  /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); */
  background: white;
}

/* DataTable Wrapper Styling */
.table-container .dataTables_wrapper {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
}

/* DataTable Header Styling */
.table-container .table thead th {
  background: linear-gradient(135deg, #040677 0%, #040677 100%);
  border: none;
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 15px 12px;
  text-align: center;
  position: relative;
  vertical-align: top;
  border-bottom: 3px solid #1e40af;
}

/* Column Filter Input Styling */
.table-container .table thead th .column-filter {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  color: #333;
  font-size: 12px;
  margin-top: 8px;
  width: 100%;
  padding: 6px 8px;
  font-weight: 400;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.table-container .table thead th .column-filter:focus {
  background: white;
  border-color: #60a5fa;
  box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
  outline: none;
}

.table-container .table thead th .column-filter::placeholder {
  color: #6b7280;
  font-size: 11px;
}

/* Table Body Styling */
.table-container .table tbody td {
  padding: 14px 12px;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  font-size: 14px;
  vertical-align: middle;
  background: white;
  transition: all 0.3s ease;
}

/* Striped Rows */
.table-container .table tbody tr:nth-child(even) td {
  background-color: #f8fafc;
}

/* Hover Effects */
.table-container .table tbody tr:hover td {
  background-color: #dbeafe !important;
  transform: scale(1.01);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}

/* Table Borders */
.table-container .table {
  margin-bottom: 0;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
}

.table-container .table-bordered {
  border: none;
}

.table-container .table-bordered > thead > tr > th,
.table-container .table-bordered > tbody > tr > td {
  border-left: none;
  border-right: none;
}

/* DataTable Controls Styling */
.table-container .dataTables_length,
.table-container .dataTables_filter {
  margin-bottom: 1.5rem;
}

.table-container .dataTables_length label,
.table-container .dataTables_filter label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.table-container .dataTables_length select {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.3s ease;
  min-width: 80px;
}

.table-container .dataTables_length select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

.table-container .dataTables_filter input {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 15px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.3s ease;
  margin-left: 10px;
  min-width: 250px;
}

.table-container .dataTables_filter input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

/* Info and Pagination */
.table-container .dataTables_info {
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  margin-top: 1.5rem;
}

.table-container .dataTables_paginate {
  margin-top: 1.5rem;
}

/* Pagination Buttons */
.table-container .dataTables_paginate .paginate_button {
  border: 2px solid #e5e7eb;
  color: #374151 !important;
  background: white;
  padding: 8px 16px;
  margin: 0 3px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
}

.table-container .dataTables_paginate .paginate_button:hover {
  background: #3b82f6 !important;
  color: white !important;
  border-color: #3b82f6;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.table-container .dataTables_paginate .paginate_button.current {
  background: #3b82f6 !important;
  color: white !important;
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.table-container .dataTables_paginate .paginate_button.disabled {
  color: #9ca3af !important;
  background: #f3f4f6;
  border-color: #e5e7eb;
  cursor: not-allowed;
  opacity: 0.6;
}

.table-container .dataTables_paginate .paginate_button.disabled:hover {
  background: #f3f4f6 !important;
  color: #9ca3af !important;
  transform: none;
  box-shadow: none;
}

/* Processing Indicator */
.table-container .dataTables_processing {
  background: rgba(255, 255, 255, 0.95);
  color: #3b82f6;
  font-weight: 600;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .table-container .dataTables_wrapper {
    padding: 1rem;
  }

  .table-container .dataTables_length,
  .table-container .dataTables_filter {
    text-align: center;
    margin-bottom: 1rem;
  }

  .table-container .dataTables_length label,
  .table-container .dataTables_filter label {
    flex-direction: column;
    gap: 8px;
  }

  .table-container .dataTables_filter input {
    margin-left: 0;
    min-width: 200px;
  }

  .table-container .table thead th {
    padding: 12px 8px;
    font-size: 12px;
  }

  .table-container .table thead th .column-filter {
    font-size: 11px;
    padding: 4px 6px;
  }

  .table-container .table tbody td {
    padding: 10px 8px;
    font-size: 13px;
  }
}

/* Scrollbar Styling */
.table-container .dataTables_scrollBody::-webkit-scrollbar {
  height: 8px;
}

.table-container .dataTables_scrollBody::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.table-container .dataTables_scrollBody::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 4px;
}

.table-container .dataTables_scrollBody::-webkit-scrollbar-thumb:hover {
  background: #1e40af;
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
  background: #1acc8d;
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
  color: #1acc8d;
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

  /* Mobile skeleton adjustments */
  .skeleton-icon {
    width: 80px;
    height: 80px;
  }

  .skeleton-title {
    width: 90%;
  }

  .dataset-meta {
    flex-direction: column;
    gap: 15px;
  }
}
/* Modern DataTable Styling */
.modern-datatable {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* Header styling */
.modern-datatable table.table thead th {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 16px 12px;
  text-align: center;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Table body styling */
.modern-datatable table.table tbody td {
  padding: 14px 12px;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  font-size: 14px;
  vertical-align: middle;
  transition: all 0.2s ease;
}

/* Striped rows */
.modern-datatable table.table tbody tr:nth-child(even) td {
  background-color: #f8fafc;
}

/* Hover effects */
.modern-datatable table.table tbody tr:hover td {
  background-color: #e0f2fe !important;
  transform: scale(1.01);
}

/* Controls styling */
.modern-datatable .dataTables_length label,
.modern-datatable .dataTables_filter label {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.modern-datatable .dataTables_length select,
.modern-datatable .dataTables_filter input {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.modern-datatable .dataTables_length select:focus,
.modern-datatable .dataTables_filter input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

/* Pagination styling */
.modern-datatable .dataTables_paginate .paginate_button {
  border: 2px solid #e5e7eb;
  color: #374151 !important;
  background: white;
  padding: 8px 16px;
  margin: 0 2px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.modern-datatable .dataTables_paginate .paginate_button:hover {
  background: #3b82f6 !important;
  color: white !important;
  border-color: #3b82f6;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.modern-datatable .dataTables_paginate .paginate_button.current {
  background: #3b82f6 !important;
  color: white !important;
  border-color: #3b82f6;
}

/* Info styling */
.modern-datatable .dataTables_info {
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
}

/* Responsive wrapper */
.table-responsive {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
