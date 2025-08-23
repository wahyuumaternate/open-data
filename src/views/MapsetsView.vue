<template>
  <div class="mapsets-page">
    <!-- Hero Section -->
    <section class="mapsets-hero">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <div class="hero-content" data-aos="fade-up">
              <h1 class="hero-title">Mapsets</h1>
              <p class="hero-description">
                Jelajahi koleksi data geospasial dan peta digital yang menyajikan informasi
                geografis Kota Ternate dalam format yang mudah diakses dan dianalisis.
              </p>
              <div class="hero-stats" v-if="!loading">
                <div class="stat-item">
                  <i class="bi bi-map"></i>
                  <span>{{ totalMapsets.toLocaleString('id-ID') }} Mapsets</span>
                </div>
                <div class="stat-item">
                  <i class="bi bi-eye"></i>
                  <span>{{ totalViews.toLocaleString('id-ID') }} Views</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="hero-image" data-aos="fade-left" data-aos-delay="200">
              <img src="../assets/img/map.svg" alt="Mapsets" class="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="search-filter-section">
      <div class="container">
        <div class="search-filter-card" data-aos="fade-up">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="search-box">
                <i class="bi bi-search"></i>
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Cari mapsets berdasarkan judul, deskripsi, atau topik..."
                  class="form-control"
                  @input="handleSearch"
                />
                <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
                  <i class="bi bi-x"></i>
                </button>
              </div>
            </div>
            <div class="col-lg-3">
              <select v-model="selectedTopic" @change="applyFilters" class="form-select">
                <option value="">Semua Topik</option>
                <option v-for="topic in availableTopics" :key="topic.id" :value="topic.name">
                  {{ topic.name }} ({{ topic.count }})
                </option>
              </select>
            </div>
            <div class="col-lg-3">
              <select v-model="sortBy" @change="applyFilters" class="form-select">
                <option value="created_at">Terbaru</option>
                <option value="title">Nama A-Z</option>
                <option value="view_count">View Terbanyak</option>
                <option value="updated_at">Terakhir Diperbarui</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="main-content">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="row">
          <div v-for="n in 6" :key="n" class="col-lg-4 col-md-6 mb-4">
            <div class="mapset-card skeleton-card">
              <div class="skeleton skeleton-image"></div>
              <div class="card-body">
                <div class="skeleton skeleton-badge mb-2"></div>
                <div class="skeleton skeleton-title mb-3"></div>
                <div class="skeleton skeleton-description mb-3"></div>
                <div class="skeleton skeleton-meta"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-if="error" class="row">
          <div class="col-12">
            <div class="alert alert-danger text-center">
              <i class="bi bi-exclamation-triangle me-2"></i>
              {{ error }}
              <br />
              <button @click="fetchMapsets" class="btn btn-outline-danger btn-sm mt-2">
                Coba Lagi
              </button>
            </div>
          </div>
        </div>

        <!-- Results Info -->
        <div v-if="!loading && !error" class="results-info" data-aos="fade-up">
          <div class="row align-items-center mb-4">
            <div class="col-md-6">
              <p class="results-text">
                Menampilkan {{ pagination.from || 0 }}-{{ pagination.to || 0 }} dari
                {{ pagination.total || 0 }} mapsets
                <span v-if="searchQuery || selectedTopic" class="filter-indicator">
                  (difilter)
                </span>
              </p>
            </div>
            <div class="col-md-6 text-md-end">
              <div class="view-options">
                <button
                  @click="viewMode = 'grid'"
                  :class="{ active: viewMode === 'grid' }"
                  class="view-btn"
                >
                  <i class="bi bi-grid-3x3-gap"></i>
                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="{ active: viewMode === 'list' }"
                  class="view-btn"
                >
                  <i class="bi bi-list"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mapsets Grid/List -->
        <div v-if="!loading && !error">
          <!-- Grid View -->
          <div v-if="viewMode === 'grid'" class="row">
            <div
              v-for="(mapset, index) in mapsets"
              :key="mapset.uuid"
              class="col-lg-4 col-md-6 mb-4"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
            >
              <div class="mapset-card">
                <div class="card-image">
                  <img
                    :src="getMapsetThumbnail(mapset)"
                    :alt="mapset.title"
                    class="img-fluid"
                    loading="lazy"
                    @error="handleImageError"
                  />
                  <div class="image-overlay">
                    <button @click="viewMapset(mapset)" class="btn btn-primary">
                      <i class="bi bi-eye me-2"></i>Lihat Detail
                    </button>
                  </div>
                  <div class="category-tag" :class="getCategoryClass(mapset.topic)">
                    <i class="bi bi-tag-fill me-1"></i>
                    {{ mapset.topic }}
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">{{ mapset.title }}</h5>
                  <p class="card-description">{{ truncateText(mapset.description, 100) }}</p>
                  <div class="card-meta">
                    <div class="meta-item">
                      <i class="bi bi-building"></i>
                      <span>{{ mapset.organization_name }}</span>
                    </div>
                    <div class="meta-item">
                      <i class="bi bi-calendar"></i>
                      <span>{{ formatDate(mapset.updated_at) }}</span>
                    </div>
                  </div>
                  <div class="card-stats">
                    <div class="stat">
                      <i class="bi bi-eye"></i>
                      <span>{{ mapset.view_count.toLocaleString('id-ID') }}</span>
                    </div>
                    <div class="stat">
                      <i class="bi bi-geo-alt"></i>
                      <span>GeoData</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- List View -->
          <div v-if="viewMode === 'list'" class="mapsets-list">
            <div
              v-for="(mapset, index) in mapsets"
              :key="mapset.uuid"
              class="list-item"
              data-aos="fade-up"
              :data-aos-delay="index * 50"
            >
              <div class="row align-items-center">
                <div class="col-md-2">
                  <img
                    :src="getMapsetThumbnail(mapset)"
                    :alt="mapset.title"
                    class="list-thumbnail"
                    loading="lazy"
                    @error="handleImageError"
                  />
                </div>
                <div class="col-md-7">
                  <div class="list-content">
                    <div class="list-category" :class="getCategoryClass(mapset.topic)">
                      <i class="bi bi-tag-fill me-1"></i>
                      {{ mapset.topic }}
                    </div>
                    <h5 class="list-title">{{ mapset.title }}</h5>
                    <p class="list-description">{{ truncateText(mapset.description, 150) }}</p>
                    <div class="list-meta">
                      <span><i class="bi bi-building me-1"></i>{{ mapset.organization_name }}</span>
                      <span
                        ><i class="bi bi-calendar me-1"></i
                        >{{ formatDate(mapset.updated_at) }}</span
                      >
                      <span
                        ><i class="bi bi-eye me-1"></i
                        >{{ mapset.view_count.toLocaleString('id-ID') }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-3 text-end">
                  <button @click="viewMapset(mapset)" class="btn btn-outline-primary">
                    <i class="bi bi-eye me-2"></i>Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="mapsets.length === 0" class="empty-state text-center">
            <i class="bi bi-map empty-icon"></i>
            <h3>Tidak Ada Mapsets Ditemukan</h3>
            <p v-if="searchQuery || selectedTopic">
              Coba ubah kata kunci pencarian atau filter yang digunakan.
            </p>
            <p v-else>Belum ada mapsets yang tersedia saat ini.</p>
            <button
              v-if="searchQuery || selectedTopic"
              @click="clearAllFilters"
              class="btn btn-primary"
            >
              Reset Filter
            </button>
          </div>

          <!-- Pagination -->
          <div v-if="pagination.last_page > 1" class="pagination-container">
            <nav aria-label="Pagination">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                  <button @click="changePage(pagination.current_page - 1)" class="page-link">
                    <i class="bi bi-chevron-left"></i>
                  </button>
                </li>
                <li
                  v-for="page in visiblePages"
                  :key="page"
                  class="page-item"
                  :class="{ active: page === pagination.current_page }"
                >
                  <button @click="changePage(page)" class="page-link">{{ page }}</button>
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: pagination.current_page === pagination.last_page }"
                >
                  <button @click="changePage(pagination.current_page + 1)" class="page-link">
                    <i class="bi bi-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MapsetsPage',
  data() {
    return {
      // API Configuration
      apiUrl: import.meta.env.VITE_API_URL,

      // State Management
      loading: true,
      error: null,

      // Data
      mapsets: [],
      pagination: {},
      availableTopics: [],

      // Filters and Search
      searchQuery: '',
      selectedTopic: '',
      sortBy: 'created_at',
      viewMode: 'grid', // 'grid' or 'list'

      // Search debounce
      searchTimeout: null,

      // Topic mapping untuk kategori
      topicClassMap: {
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
      },
    }
  },

  computed: {
    totalMapsets() {
      return this.pagination.total || 0
    },

    totalViews() {
      return this.mapsets.reduce((sum, mapset) => sum + (mapset.view_count || 0), 0)
    },

    visiblePages() {
      const current = this.pagination.current_page || 1
      const last = this.pagination.last_page || 1
      const delta = 2
      const range = []

      for (let i = Math.max(1, current - delta); i <= Math.min(last, current + delta); i++) {
        range.push(i)
      }

      return range
    },
  },

  async mounted() {
    await this.fetchMapsets()

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
    async fetchMapsets(page = 1) {
      this.loading = true
      this.error = null

      try {
        const params = {
          page: page,
          per_page: 12,
          sort: this.sortBy,
          order: 'desc',
        }

        if (this.searchQuery) {
          params.search = this.searchQuery
        }

        if (this.selectedTopic) {
          params.topic = this.selectedTopic
        }

        const response = await axios.get(`${this.apiUrl}mapsets`, { params })

        if (response.data.success) {
          this.mapsets = response.data.data.mapsets || []
          this.pagination = response.data.data.pagination || {}
          this.availableTopics = response.data.data.filters.available_topics || []
        } else {
          throw new Error(response.data.message || 'Failed to fetch mapsets')
        }
      } catch (error) {
        console.error('Error fetching mapsets:', error)

        if (error.response?.status === 404) {
          this.error = 'Endpoint mapsets tidak ditemukan'
        } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network')) {
          this.error = 'Gagal terhubung ke server. Periksa koneksi internet Anda.'
        } else {
          this.error = 'Gagal memuat mapsets. Silakan coba lagi.'
        }

        // Set empty data as fallback
        this.mapsets = []
        this.pagination = {}
        this.availableTopics = []
      } finally {
        this.loading = false
      }
    },

    handleSearch() {
      // Debounce search
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.fetchMapsets(1) // Reset to first page when searching
      }, 300)
    },

    applyFilters() {
      this.fetchMapsets(1) // Reset to first page when filtering
    },

    clearSearch() {
      this.searchQuery = ''
      this.fetchMapsets(1)
    },

    clearAllFilters() {
      this.searchQuery = ''
      this.selectedTopic = ''
      this.fetchMapsets(1)
    },

    changePage(page) {
      if (page >= 1 && page <= this.pagination.last_page) {
        this.fetchMapsets(page)
        this.scrollToTop()
      }
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    getCategoryClass(topic) {
      return this.topicClassMap[topic] || 'category-default'
    },

    getMapsetThumbnail(mapset) {
      // Return thumbnail if available, otherwise use default map image
      return 'assets/img/map.png'
    },

    handleImageError(event) {
      // Fallback untuk gambar yang error
      event.target.src = 'assets/img/map.png'
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

    truncateText(text, maxLength) {
      if (!text) return 'Tidak ada deskripsi'
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
    },

    viewMapset(mapset) {
      // Navigate to mapset detail page
      this.$router.push(`/mapset/${mapset.slug || mapset.uuid}`)
    },
  },
}
</script>

<style scoped>
/* Hero Section */
.mapsets-hero {
  background: linear-gradient(135deg, #040677 0%, #1e40af 100%);
  color: white;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

.mapsets-hero::before {
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

.category-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

.hero-title {
  color: #ffffff;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-description {
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 30px;
  opacity: 0.9;
}

.hero-stats {
  display: flex;
  gap: 30px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
}

.stat-item i {
  font-size: 20px;
}

.hero-image img {
  max-width: 100%;
  height: auto;
}

/* Search Filter Section */
.search-filter-section {
  background: #f8f9fa;
  padding: 40px 0;
  margin-top: -40px;
  position: relative;
  z-index: 10;
}

.search-filter-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef4;
}

.search-box {
  position: relative;
}

.search-box i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
}

.search-box input {
  padding-left: 45px;
  padding-right: 45px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.search-box input:focus {
  border-color: #47b2e4;
  box-shadow: 0 0 0 3px rgba(71, 178, 228, 0.1);
  outline: none;
}

.clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: #f1f5f9;
  color: #37517e;
}

.form-select {
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-select:focus {
  border-color: #47b2e4;
  box-shadow: 0 0 0 3px rgba(71, 178, 228, 0.1);
}

/* Main Content */
.main-content {
  background: #f8f9fa;
  padding: 60px 0;
}

.results-info {
  margin-bottom: 30px;
}

.results-text {
  color: #6c757d;
  font-size: 14px;
  margin: 0;
}

.filter-indicator {
  color: #47b2e4;
  font-weight: 600;
}

.view-options {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
}

.view-btn {
  background: white;
  border: 2px solid #e5e7eb;
  padding: 8px 12px;
  border-radius: 8px;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-btn:hover,
.view-btn.active {
  background: #47b2e4;
  color: white;
  border-color: #47b2e4;
}

/* Mapset Cards */
.mapset-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid #ebeef4;
}

.mapset-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.mapset-card:hover .card-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(4, 6, 119, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mapset-card:hover .image-overlay {
  opacity: 1;
}

.category-tag {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-body {
  padding: 25px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #37517e;
  margin-bottom: 15px;
  line-height: 1.3;
}

.card-description {
  color: #6c757d;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #6c757d;
}

.meta-item i {
  color: #47b2e4;
  width: 14px;
}

.card-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #ebeef4;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6c757d;
}

.stat i {
  color: #47b2e4;
}

/* List View */
.mapsets-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.list-item {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #ebeef4;
}

.list-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.list-thumbnail {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
}

.list-category {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 11px;
  font-weight: 600;
  background-color: #1e40af;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.list-title {
  font-size: 20px;
  font-weight: 700;
  color: #37517e;
  margin-bottom: 10px;
}

.list-description {
  color: #6c757d;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
}

.list-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 12px;
  color: #6c757d;
}

.list-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.list-meta i {
  color: #47b2e4;
}
/* Semua kategori pakai glass effect */
[class^='category-'] {
  background: #47b2e4; /* transparan putih */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* untuk Safari */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff; /* teks putih biar kontras */
  padding: 8px 12px;
}

/* Loading States */
.skeleton-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-image {
  height: 200px;
  border-radius: 0;
}

.skeleton-badge {
  height: 20px;
  width: 80px;
}

.skeleton-title {
  height: 24px;
  width: 70%;
}

.skeleton-description {
  height: 16px;
  width: 100%;
}

.skeleton-meta {
  height: 14px;
  width: 60%;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Empty State */
.empty-state {
  padding: 80px 20px;
}

.empty-icon {
  font-size: 64px;
  color: #e5e7eb;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #37517e;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
}

.empty-state p {
  color: #6c757d;
  font-size: 16px;
  margin-bottom: 25px;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.pagination {
  gap: 5px;
}

.page-link {
  border: 2px solid #e5e7eb;
  color: #37517e;
  background: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
}

.page-link:hover {
  background: #47b2e4;
  color: white;
  border-color: #47b2e4;
  transform: translateY(-1px);
}

.page-item.active .page-link {
  background: #47b2e4;
  color: white;
  border-color: #47b2e4;
}

.page-item.disabled .page-link {
  color: #9ca3af;
  background: #f3f4f6;
  border-color: #e5e7eb;
  cursor: not-allowed;
  opacity: 0.6;
}

.page-item.disabled .page-link:hover {
  background: #f3f4f6;
  color: #9ca3af;
  transform: none;
}

/* Alert Styling */
.alert {
  border-radius: 10px;
  padding: 20px;
  font-size: 14px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.alert-danger {
  background: linear-gradient(135deg, #f8d7da 0%, #f5c2c7 100%);
  color: #721c24;
}

.btn-outline-danger {
  border-color: #dc3545;
  color: #721c24;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
  transform: translateY(-2px);
}

/* Button Styling */
.btn-primary {
  background: linear-gradient(135deg, #47b2e4 0%, #209dd8 100%);
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(71, 178, 228, 0.3);
}

.btn-outline-primary {
  border: 2px solid #47b2e4;
  color: #47b2e4;
  background: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background: #47b2e4;
  color: white;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .mapsets-hero {
    padding: 80px 0 60px;
    text-align: center;
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-description {
    font-size: 16px;
  }

  .hero-stats {
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .search-filter-card {
    padding: 20px;
  }

  .search-filter-card .row > div {
    margin-bottom: 15px;
  }

  .main-content {
    padding: 40px 0;
  }

  .results-info .row > div {
    text-align: center;
    margin-bottom: 15px;
  }

  .view-options {
    justify-content: center;
  }

  .card-body {
    padding: 20px;
  }

  .list-item {
    padding: 20px;
  }

  .list-item .row > div {
    margin-bottom: 15px;
    text-align: center;
  }

  .list-meta {
    justify-content: center;
    gap: 15px;
  }

  .pagination {
    flex-wrap: wrap;
    justify-content: center;
  }

  .page-link {
    padding: 8px 12px;
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 24px;
  }

  .mapset-card {
    margin-bottom: 20px;
  }

  .card-image {
    height: 150px;
  }

  .empty-state {
    padding: 60px 15px;
  }

  .empty-icon {
    font-size: 48px;
  }

  .empty-state h3 {
    font-size: 20px;
  }

  .search-box input {
    font-size: 14px;
    padding-left: 40px;
  }

  .search-box i {
    left: 12px;
  }
}

/* Additional Animations */
.mapset-card {
  position: relative;
  overflow: hidden;
}

.mapset-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(71, 178, 228, 0.1), transparent);
  transition: left 0.6s;
  z-index: 1;
}

.mapset-card:hover::before {
  left: 100%;
}

.list-item {
  position: relative;
  overflow: hidden;
}

.list-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(71, 178, 228, 0.1), transparent);
  transition: left 0.6s;
  z-index: 1;
}

.list-item:hover::before {
  left: 100%;
}

/* Focus States */
.mapset-card:focus-within,
.list-item:focus-within {
  outline: 2px solid #47b2e4;
  outline-offset: 2px;
}

/* Print Styles */
@media print {
  .search-filter-section,
  .pagination-container,
  .view-options {
    display: none;
  }

  .mapset-card,
  .list-item {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #ddd;
  }
}
</style>
