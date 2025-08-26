<template>
  <div class="datasets-view">
    <!-- Dataset Hero Section -->
    <section class="dataset-hero section pt-5">
      <div class="container mt-5">
        <div class="row">
          <div class="col-lg-12 text-center" data-aos="fade-up">
            <h1 class="display-4 text-white mb-4">Dataset Kota Ternate</h1>
            <p class="lead text-white mb-4">
              Temukan berbagai dataset pemerintahan Kota Ternate untuk kebutuhan penelitian,
              analisis, dan pengembangan aplikasi
            </p>

            <!-- Search Bar -->
            <div class="search-container mb-4">
              <div class="input-group input-group-lg">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Cari dataset..."
                  v-model="searchQuery"
                  @input="searchDatasets"
                />
                <button class="btn btn-primary" type="button">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container py-5">
      <!-- Loading State with Skeleton -->
      <div v-if="loading">
        <!-- Skeleton for filters -->
        <div class="top-filters mb-4">
          <div class="row align-items-center">
            <div class="col-lg-8 col-12">
              <div class="filter-dropdowns d-flex flex-wrap gap-3">
                <div class="skeleton skeleton-select"></div>
                <div class="skeleton skeleton-select"></div>
              </div>
            </div>
            <div class="col-lg-4 col-12">
              <div class="d-flex justify-content-between align-items-center">
                <div class="skeleton skeleton-text-small"></div>
                <div class="skeleton skeleton-select-small"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Skeleton for dataset cards -->
        <div class="row g-4">
          <div class="col-12" v-for="n in 8" :key="n">
            <div class="skeleton-card">
              <div class="skeleton-card-body">
                <div class="row align-items-center">
                  <!-- Skeleton Image -->
                  <div class="col-xl-1 col-lg-1 col-md-1 col-sm-2 col-3">
                    <div class="skeleton-image-container">
                      <div class="skeleton skeleton-image"></div>
                    </div>
                  </div>

                  <!-- Skeleton Content -->
                  <div class="col-xl-8 col-lg-7 col-md-7 col-sm-6 col-9">
                    <div class="skeleton-content">
                      <!-- Badge and Date -->
                      <div class="d-flex align-items-center mb-3">
                        <div class="skeleton skeleton-badge me-2"></div>
                        <div class="skeleton skeleton-date"></div>
                      </div>

                      <!-- Title -->
                      <div class="skeleton skeleton-title mb-2"></div>

                      <!-- Description lines -->
                      <div class="skeleton skeleton-desc-line mb-1"></div>
                      <div class="skeleton skeleton-desc-line-short mb-2"></div>

                      <!-- Organization -->
                      <div class="skeleton skeleton-org"></div>
                    </div>
                  </div>

                  <!-- Skeleton Formats -->
                  <div class="col-xl-1 col-lg-2 col-md-2 col-sm-2 col-6">
                    <div class="skeleton-formats">
                      <div class="skeleton skeleton-format-badge mb-2"></div>
                      <div class="skeleton skeleton-file-size"></div>
                    </div>
                  </div>

                  <!-- Skeleton Stats and Actions -->
                  <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-6">
                    <div class="skeleton-stats mb-3">
                      <div class="skeleton skeleton-stat mb-1"></div>
                      <div class="skeleton skeleton-stat"></div>
                    </div>
                    <div class="skeleton skeleton-button"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="alert alert-danger" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        {{ error }}
        <button @click="fetchDatasets" class="btn btn-outline-danger btn-sm ms-2">Coba Lagi</button>
      </div>

      <!-- Main Content - Only show when not loading -->
      <div v-if="!loading">
        <div class="top-filters mb-4">
          <div class="row align-items-center">
            <div class="col-lg-8 col-12">
              <div class="filter-dropdowns d-flex flex-wrap gap-3">
                <!-- Organization Filter -->
                <select
                  class="form-select filter-select"
                  v-model="selectedOrganization"
                  @change="filterDatasets"
                >
                  <option value="">Pilih Organisasi</option>
                  <option v-for="org in organizations" :key="org.id" :value="org.name">
                    {{ org.name }}
                  </option>
                </select>

                <!-- Topic Filter -->
                <select
                  class="form-select filter-select"
                  v-model="selectedTopic"
                  @change="filterDatasets"
                >
                  <option value="">Pilih Topik</option>
                  <option v-for="category in categories" :key="category.id" :value="category.name">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-lg-4 col-12">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <span class="dataset-count"
                    >{{ filteredDatasets.length.toLocaleString() }} Dataset ditemukan</span
                  >
                </div>
                <div class="sort-container">
                  <label class="sort-label me-2">Urutkan :</label>
                  <select class="form-select sort-select" v-model="sortBy" @change="sortDatasets">
                    <option value="newest">Terbaru</option>
                    <option value="oldest">Terlama</option>
                    <option value="name">Nama A-Z</option>
                    <option value="popular">Populer</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- Dataset List -->
          <div class="col-12">
            <!-- Dataset Cards -->
            <div class="row g-4">
              <div class="col-12" v-for="dataset in paginatedDatasets" :key="dataset.id">
                <div class="dataset-card card" data-aos="fade-up">
                  <div class="card-body p-4">
                    <div class="row align-items-center">
                      <!-- Dataset Image -->
                      <div class="col-xl-1 col-lg-1 col-md-1 col-sm-2 col-3">
                        <div class="dataset-image-container">
                          <img
                            :src="getCategoryImage(dataset.category_id)"
                            :alt="getCategoryName(dataset.category_id)"
                            class="category-icon"
                          />
                        </div>
                      </div>

                      <!-- Dataset Content -->
                      <div class="col-xl-8 col-lg-7 col-md-7 col-sm-6 col-9">
                        <div class="dataset-content">
                          <!-- Category Badge and Date -->
                          <div class="d-flex align-items-center mb-2">
                            <span class="badge-primary category-badge me-2">{{
                              getCategoryName(dataset.category_id)
                            }}</span>
                            <small class="text-muted">{{ formatDate(dataset.updated_at) }}</small>
                          </div>

                          <!-- Title -->
                          <h5 class="dataset-title mb-2">
                            <a
                              href="#"
                              @click.prevent="viewDataset(dataset)"
                              class="text-decoration-none"
                            >
                              {{ dataset.title }}
                            </a>
                          </h5>

                          <!-- Description -->
                          <p class="dataset-description text-muted mb-2">
                            {{ dataset.description }}
                          </p>

                          <!-- Organization -->
                          <div class="dataset-meta">
                            <small class="text-muted">
                              <i class="bi bi-building me-1"></i>
                              {{ getOrganizationName(dataset.organization_id) }}
                            </small>
                          </div>

                          <!-- Tags -->
                          <div
                            class="dataset-tags mt-2"
                            v-if="dataset.tags && dataset.tags.length > 0"
                          >
                            <span
                              v-for="tag in dataset.tags"
                              :key="tag"
                              class="badge bg-secondary me-1"
                              style="font-size: 0.7rem"
                            >
                              {{ tag }}
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- Dataset Formats and Stats -->
                      <div class="col-xl-1 col-lg-2 col-md-2 col-sm-2 col-6">
                        <div class="dataset-formats mb-2">
                          <span
                            v-for="format in dataset.formats"
                            :key="format"
                            class="format-badge me-1 mb-1"
                          >
                            {{ format.toUpperCase() }}
                          </span>
                        </div>
                        <div class="dataset-size">
                          <small class="text-muted">
                            <i class="bi bi-file-earmark me-1"></i>{{ dataset.file_size_formatted }}
                          </small>
                        </div>
                      </div>

                      <!-- Dataset Stats and Actions -->
                      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-6">
                        <div class="dataset-stats text-end mb-3">
                          <div class="mb-1">
                            <small class="text-muted">
                              <i class="bi bi-download me-1"></i
                              >{{ dataset.downloads || 0 }} unduhan
                            </small>
                          </div>
                          <div>
                            <small class="text-muted">
                              <i class="bi bi-eye me-1"></i>{{ dataset.views || 0 }} dilihat
                            </small>
                          </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="dataset-actions text-end">
                          <button
                            class="btn btn-primary btn-sm mb-1 w-100"
                            @click="viewDataset(dataset)"
                          >
                            <i class="bi bi-eye me-1"></i>Lihat Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <nav aria-label="Dataset pagination" class="mt-5" v-if="totalPages > 1">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                    <i class="bi bi-chevron-left"></i>
                  </a>
                </li>

                <li
                  class="page-item"
                  v-for="page in visiblePages"
                  :key="page"
                  :class="{ active: page === currentPage }"
                >
                  <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>

                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                    <i class="bi bi-chevron-right"></i>
                  </a>
                </li>
              </ul>
            </nav>

            <!-- Empty State -->
            <div v-if="!loading && filteredDatasets.length === 0" class="text-center py-5">
              <i class="bi bi-search display-1 text-muted"></i>
              <h4 class="mt-3">Dataset tidak ditemukan</h4>
              <p class="text-muted">Coba ubah filter atau kata kunci pencarian Anda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DatasetsView',
  data() {
    return {
      // API Configuration
      apiUrl: import.meta.env.VITE_API_URL,

      // Loading and Error States
      loading: false,
      error: null,

      // Filter States
      searchQuery: '',
      selectedCategories: [],
      selectedOrganization: '',
      selectedFormats: [],
      selectedTopic: '',
      selectedFileType: '',
      sortBy: 'newest',
      currentPage: 1,
      itemsPerPage: 12,

      // Data from API
      datasets: [],
      pagination: {},

      // Static data maintained for existing functionality
      categories: [
        { id: 'ekonomi', name: 'Ekonomi', count: 1, image: 'data-ekonomi.svg' },
        { id: 'infrastruktur', name: 'Infrastruktur', count: 1, image: 'data-infrastruktur.svg' },
        { id: 'kemiskinan', name: 'Kemiskinan', count: 0, image: 'data-kemiskinan.svg' },
        { id: 'kependudukan', name: 'Kependudukan', count: 1, image: 'data-kependudukan.svg' },
        { id: 'kesehatan', name: 'Kesehatan', count: 1, image: 'data-kesehatan.svg' },
        { id: 'lingkungan', name: 'Lingkungan Hidup', count: 0, image: 'data-lingkungan.svg' },
        {
          id: 'pariwisata',
          name: 'Pariwisata & Kebudayaan',
          count: 1,
          image: 'data-pariwisata.svg',
        },
        { id: 'pemerintah', name: 'Pemerintah & Desa', count: 0, image: 'data-pemerintah.svg' },
        { id: 'pendidikan', name: 'Pendidikan', count: 1, image: 'data-pendidikan.svg' },
        { id: 'sosial', name: 'Sosial', count: 0, image: 'data-sosial.svg' },
      ],

      organizations: [],
      formats: ['csv', 'json', 'excel', 'pdf', 'xml'],
    }
  },

  computed: {
    filteredDatasets() {
      let filtered = this.datasets

      // Search filter
      if (this.searchQuery) {
        filtered = filtered.filter(
          (dataset) =>
            dataset.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            dataset.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }

      // Category filter
      if (this.selectedCategories.length > 0) {
        filtered = filtered.filter((dataset) =>
          this.selectedCategories.includes(this.getCategoryIdFromTopic(dataset.topic))
        )
      }

      // Topic filter
      if (this.selectedTopic) {
        filtered = filtered.filter((dataset) => dataset.topic === this.selectedTopic)
      }

      // Organization filter
      if (this.selectedOrganization) {
        filtered = filtered.filter(
          (dataset) => dataset.organization_name === this.selectedOrganization
        )
      }

      // Format filter
      if (this.selectedFormats.length > 0) {
        filtered = filtered.filter((dataset) => this.selectedFormats.includes(dataset.file_type))
      }

      // File type filter (single selection)
      if (this.selectedFileType) {
        filtered = filtered.filter((dataset) => dataset.file_type === this.selectedFileType)
      }

      return filtered
    },

    sortedDatasets() {
      const sorted = [...this.filteredDatasets]

      switch (this.sortBy) {
        case 'newest':
          return sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        case 'oldest':
          return sorted.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at))
        case 'name':
          return sorted.sort((a, b) => a.title.localeCompare(b.title))
        case 'popular':
          return sorted.sort((a, b) => (b.download_count || 0) - (a.download_count || 0))
        default:
          return sorted
      }
    },

    totalPages() {
      return Math.ceil(this.sortedDatasets.length / this.itemsPerPage)
    },

    paginatedDatasets() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.sortedDatasets.slice(start, end)
    },

    visiblePages() {
      const pages = []
      const total = this.totalPages
      const current = this.currentPage

      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(total)
        } else if (current >= total - 3) {
          pages.push(1)
          pages.push('...')
          for (let i = total - 4; i <= total; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push('...')
          for (let i = current - 1; i <= current + 1; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(total)
        }
      }

      return pages
    },
  },

  async mounted() {
    await this.fetchDatasets()

    // Check for category filter from query params
    if (this.$route.query.category) {
      const categoryId = this.categories.find(
        (cat) => cat.name.toLowerCase() === this.$route.query.category.toLowerCase()
      )?.id

      if (categoryId) {
        this.selectedCategories = [categoryId]
      }
    }

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
    async fetchDatasets() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get(`${this.apiUrl}datasets`)

        if (response.data.success) {
          this.datasets = response.data.data.datasets.map((dataset) => ({
            ...dataset,
            formats: [dataset.file_type], // Convert file_type to formats array for compatibility
            category_id: this.getCategoryIdFromTopic(dataset.topic),
            organization_id: this.getOrganizationId(dataset.organization_name),
            downloads: dataset.download_count,
            views: dataset.view_count,
          }))

          // Extract unique organizations from API data
          this.organizations = [...new Set(this.datasets.map((d) => d.organization_name))].map(
            (name) => ({
              id: this.getOrganizationId(name),
              name: name,
            })
          )
        } else {
          throw new Error(response.data.message || 'Failed to fetch datasets')
        }
      } catch (error) {
        this.error = 'Gagal memuat dataset. Silakan coba lagi.'
        this.datasets = []
      } finally {
        this.loading = false
      }
    },

    getCategoryIdFromTopic(topic) {
      const topicMap = {
        Ekonomi: 'ekonomi',
        Infrastruktur: 'infrastruktur',
        Kemiskinan: 'kemiskinan',
        Kependudukan: 'kependudukan',
        Kesehatan: 'kesehatan',
        'Lingkungan Hidup': 'lingkungan',
        'Pariwisata & Kebudayaan': 'pariwisata',
        Pariwisata: 'pariwisata',
        'Pemerintah & Desa': 'pemerintah',
        Pemerintahan: 'pemerintah',
        Pendidikan: 'pendidikan',
        Sosial: 'sosial',
      }
      return topicMap[topic] || 'sosial'
    },

    getOrganizationId(name) {
      return name ? name.toLowerCase().replace(/\s+/g, '-') : ''
    },

    searchDatasets() {
      this.currentPage = 1
    },

    filterDatasets() {
      this.currentPage = 1
    },

    sortDatasets() {
      this.currentPage = 1
    },

    clearFilters() {
      this.selectedCategories = []
      this.selectedOrganization = ''
      this.selectedFormats = []
      this.selectedTopic = ''
      this.selectedFileType = ''
      this.searchQuery = ''
      this.currentPage = 1
    },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },

    getCategoryName(categoryId) {
      const category = this.categories.find((cat) => cat.id === categoryId)
      return category ? category.name : categoryId
    },

    getCategoryImage(categoryId) {
      const category = this.categories.find((cat) => cat.id === categoryId)
      return category ? `/assets/img/${category.image}` : '/assets/img/data-sosial.svg'
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

    viewDataset(dataset) {
      this.$router.push(`/dataset/${dataset.slug}`)
    },

    downloadDataset(dataset) {
      console.log('Download dataset:')
      // Handle download
    },
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

/* Skeleton Card Structure */
.skeleton-card {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  background: #fff;
}

.skeleton-card-body {
  padding: 1.5rem;
}

.skeleton-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  padding: 0.5rem;
}

.skeleton-content {
  padding-left: 1rem;
}

.skeleton-formats {
  text-align: center;
}

.skeleton-stats {
  text-align: right;
}

/* Skeleton Elements */
.skeleton-select {
  height: 42px;
  width: 180px;
  border-radius: 8px;
}

.skeleton-select-small {
  height: 35px;
  width: 120px;
  border-radius: 6px;
}

.skeleton-text-small {
  height: 16px;
  width: 150px;
}

.skeleton-image {
  height: 100px;
  width: 100px;
  border-radius: 16px;
}

.skeleton-badge {
  height: 22px;
  width: 80px;
  border-radius: 20px;
}

.skeleton-date {
  height: 14px;
  width: 100px;
}

.skeleton-title {
  height: 24px;
  width: 85%;
}

.skeleton-desc-line {
  height: 16px;
  width: 100%;
}

.skeleton-desc-line-short {
  height: 16px;
  width: 75%;
}

.skeleton-org {
  height: 14px;
  width: 60%;
}

.skeleton-format-badge {
  height: 20px;
  width: 50px;
  border-radius: 6px;
  margin: 0 auto;
}

.skeleton-file-size {
  height: 14px;
  width: 70px;
  margin: 0 auto;
}

.skeleton-stat {
  height: 14px;
  width: 100px;
  margin-left: auto;
}

.skeleton-button {
  height: 32px;
  width: 100%;
  border-radius: 6px;
}

/* Existing card styles */
.dataset-card {
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
}

.top-filters {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
}

.filter-dropdowns {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .skeleton-image-container {
    width: 80px;
    height: 80px;
  }

  .skeleton-image {
    width: 60px;
    height: 60px;
  }

  .skeleton-content {
    padding-left: 0.5rem;
  }

  .skeleton-select {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
.dataset-hero {
  background: linear-gradient(135deg, #040677 0%, #1e40af 100%);
  color: white;
  padding: 120px 0 80px !important;
  position: relative;
  overflow: hidden;
}
.dataset-hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>')
    repeat;
  opacity: 0.3;
}

.dataset-image-container img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
}
</style>
