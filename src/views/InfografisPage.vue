<template>
  <div class="infografis-page">
    <!-- Hero Section -->
    <section class="infografis-hero">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <div class="hero-content" data-aos="fade-up">
              <h1 class="hero-title">Infografis</h1>
              <p class="hero-description">
                Jelajahi koleksi infografis informatif yang menyajikan data dan informasi Kota
                Ternate dalam format visual yang menarik dan mudah dipahami.
              </p>
              <div class="hero-stats" v-if="!loading && stats">
                <div class="stat-item">
                  <i class="bi bi-image"></i>
                  <span>{{ stats.total.toLocaleString('id-ID') }} Infografis</span>
                </div>
                <div class="stat-item">
                  <i class="bi bi-eye"></i>
                  <span>{{ stats.total_views.toLocaleString('id-ID') }} Views</span>
                </div>
                <div class="stat-item">
                  <i class="bi bi-download"></i>
                  <span>{{ stats.total_downloads.toLocaleString('id-ID') }} Downloads</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="hero-image" data-aos="fade-left" data-aos-delay="200">
              <img src="../assets/img/infografis.svg" alt="Infografis" class="img-fluid" />
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
                  placeholder="Cari infografis berdasarkan nama, deskripsi, atau topik..."
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
                <option v-for="(count, topic) in availableTopics" :key="topic" :value="topic">
                  {{ topic }} ({{ count }})
                </option>
              </select>
            </div>
            <div class="col-lg-3">
              <select v-model="sortBy" @change="applyFilters" class="form-select">
                <option value="latest">Terbaru</option>
                <option value="name">Nama A-Z</option>
                <option value="popular">Paling Populer</option>
                <option value="downloads">Download Terbanyak</option>
                <option value="oldest">Terlama</option>
              </select>
            </div>
          </div>

          <!-- Tags Filter -->
          <div class="row mt-3" v-if="popularTags && Object.keys(popularTags).length > 0">
            <div class="col-12">
              <div class="tags-filter">
                <span class="filter-label">Tags Populer:</span>
                <button
                  v-for="(count, tag) in Object.fromEntries(
                    Object.entries(popularTags).slice(0, 10)
                  )"
                  :key="tag"
                  @click="filterByTag(tag)"
                  :class="{ active: selectedTag === tag }"
                  class="tag-btn"
                >
                  {{ tag }} ({{ count }})
                </button>
              </div>
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
            <div class="infografis-card skeleton-card">
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
              <button @click="fetchInfografis" class="btn btn-outline-danger btn-sm mt-2">
                Coba Lagi
              </button>
            </div>
          </div>
        </div>

        <!-- Results Info -->
        <div v-if="!loading && !error" class="results-info" data-aos="fade-up">
          <div class="row align-items-center mb-4">
            <div class="col-md-8">
              <p class="results-text">
                Menampilkan {{ pagination.from || 0 }}-{{ pagination.to || 0 }} dari
                {{ pagination.total || 0 }} infografis
                <span v-if="searchQuery || selectedTopic || selectedTag" class="filter-indicator">
                  (difilter)
                </span>
              </p>
              <!-- Active Filters -->
              <div v-if="hasActiveFilters" class="active-filters mt-2">
                <span class="filter-label">Filter aktif:</span>
                <span v-if="selectedTopic" class="filter-tag">
                  Topik: {{ selectedTopic }}
                  <button @click="clearTopicFilter" class="remove-filter">
                    <i class="bi bi-x"></i>
                  </button>
                </span>
                <span v-if="selectedTag" class="filter-tag">
                  Tag: {{ selectedTag }}
                  <button @click="clearTagFilter" class="remove-filter">
                    <i class="bi bi-x"></i>
                  </button>
                </span>
                <span v-if="searchQuery" class="filter-tag">
                  Pencarian: "{{ searchQuery }}"
                  <button @click="clearSearch" class="remove-filter">
                    <i class="bi bi-x"></i>
                  </button>
                </span>
              </div>
            </div>
            <div class="col-md-4 text-md-end">
              <button
                @click="clearAllFilters"
                v-if="hasActiveFilters"
                class="btn btn-outline-secondary btn-sm"
              >
                <i class="bi bi-x-circle me-1"></i>
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        <!-- Infografis Grid -->
        <div v-if="!loading && !error">
          <div class="row">
            <div
              v-for="(infografis, index) in infografis"
              :key="infografis.id"
              class="col-lg-4 col-md-6 mb-4"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
            >
              <div class="infografis-card">
                <div class="card-image">
                  <img
                    :src="infografis.gambar_url || getPlaceholderImage()"
                    :alt="infografis.nama"
                    class="img-fluid"
                    loading="lazy"
                    @error="handleImageError"
                  />
                  <div class="image-overlay">
                    <button @click="viewInfografis(infografis)" class="btn btn-primary">
                      <i class="bi bi-eye me-2"></i>Lihat Detail
                    </button>
                  </div>
                  <div
                    class="category-tag"
                    :class="getCategoryClass(infografis.topic)"
                    v-if="infografis.topic"
                  >
                    <i class="bi bi-tag-fill me-1"></i>
                    {{ infografis.topic }}
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">{{ infografis.nama }}</h5>
                  <p class="card-description">{{ truncateText(infografis.deskripsi, 100) }}</p>

                  <!-- Tags -->
                  <div class="tags-container" v-if="infografis.tags && infografis.tags.length > 0">
                    <span
                      v-for="tag in infografis.tags.slice(0, 3)"
                      :key="tag"
                      @click="filterByTag(tag)"
                      class="tag-item clickable"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <div class="card-meta" v-if="infografis.user">
                    <div class="meta-item">
                      <i class="bi bi-building"></i>
                      <span>{{ getOrganizationName(infografis.user) }}</span>
                    </div>
                    <div class="meta-item">
                      <i class="bi bi-calendar"></i>
                      <span>{{ formatDate(infografis.updated_at) }}</span>
                    </div>
                  </div>
                  <div class="card-stats">
                    <div class="stat">
                      <i class="bi bi-eye"></i>
                      <span>{{ infografis.views?.toLocaleString('id-ID') || 0 }}</span>
                    </div>
                    <div class="stat">
                      <i class="bi bi-download"></i>
                      <span>{{ infografis.downloads?.toLocaleString('id-ID') || 0 }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="infografis.length === 0" class="empty-state text-center">
            <i class="bi bi-image empty-icon"></i>
            <h3>Tidak Ada Infografis Ditemukan</h3>
            <p v-if="hasActiveFilters">
              Coba ubah kata kunci pencarian atau filter yang digunakan.
            </p>
            <p v-else>Belum ada infografis yang tersedia saat ini.</p>
            <button v-if="hasActiveFilters" @click="clearAllFilters" class="btn btn-primary">
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
  name: 'InfografisPage',
  data() {
    return {
      // API Configuration
      apiUrl: import.meta.env.VITE_API_URL,

      // State Management
      loading: true,
      error: null,

      // Data
      infografis: [],
      pagination: {},
      availableTopics: {},
      popularTags: {},
      stats: {},

      // Filters and Search
      searchQuery: '',
      selectedTopic: '',
      selectedTag: '',
      sortBy: 'latest',

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
    hasActiveFilters() {
      return !!(this.searchQuery || this.selectedTopic || this.selectedTag)
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
    await this.fetchInfografis()

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
    async fetchInfografis(page = 1) {
      this.loading = true
      this.error = null

      try {
        const params = {
          page: page,
          per_page: 12,
          sort: this.sortBy,
        }

        if (this.searchQuery) {
          params.search = this.searchQuery
        }

        if (this.selectedTopic) {
          params.topic = this.selectedTopic
        }

        if (this.selectedTag) {
          params.tag = this.selectedTag
        }

        const response = await axios.get(`${this.apiUrl}infografis`, { params })

        if (response.data.success) {
          const data = response.data.data
          this.infografis = data.infografis || []
          this.pagination = data.pagination || {}
          this.availableTopics = data.filters?.topics || {}
          this.popularTags = data.filters?.popular_tags || {}
          this.stats = data.stats || {}
        } else {
          throw new Error(response.data.message || 'Failed to fetch infografis')
        }
      } catch (error) {
        if (error.response?.status === 404) {
          this.error = 'Endpoint infografis tidak ditemukan'
        } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network')) {
          this.error = 'Gagal terhubung ke server. Periksa koneksi internet Anda.'
        } else {
          this.error = 'Gagal memuat infografis. Silakan coba lagi.'
        }

        // Set empty data as fallback
        this.infografis = []
        this.pagination = {}
        this.availableTopics = {}
        this.popularTags = {}
        this.stats = {}
      } finally {
        this.loading = false
      }
    },

    handleSearch() {
      // Debounce search
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.fetchInfografis(1) // Reset to first page when searching
      }, 300)
    },

    applyFilters() {
      this.fetchInfografis(1) // Reset to first page when filtering
    },

    clearSearch() {
      this.searchQuery = ''
      this.fetchInfografis(1)
    },

    clearTopicFilter() {
      this.selectedTopic = ''
      this.fetchInfografis(1)
    },

    clearTagFilter() {
      this.selectedTag = ''
      this.fetchInfografis(1)
    },

    clearAllFilters() {
      this.searchQuery = ''
      this.selectedTopic = ''
      this.selectedTag = ''
      this.fetchInfografis(1)
    },

    filterByTag(tag) {
      if (this.selectedTag === tag) {
        this.selectedTag = ''
      } else {
        this.selectedTag = tag
      }
      this.fetchInfografis(1)
    },

    changePage(page) {
      if (page >= 1 && page <= this.pagination.last_page) {
        this.fetchInfografis(page)
        this.scrollToTop()
      }
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    getCategoryClass(topic) {
      return this.topicClassMap[topic] || 'category-default'
    },

    getPlaceholderImage() {
      return '/assets/img/infografis-placeholder.svg'
    },

    handleImageError(event) {
      // Fallback untuk gambar yang error
      event.target.src = this.getPlaceholderImage()
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

    getOrganizationName(user) {
      if (!user) return 'Tidak diketahui'

      // Prioritas: nama organisasi jika ada, jika tidak pakai nama user
      if (user.organization && user.organization.name) {
        return user.organization.name
      }

      return user.name || 'Tidak diketahui'
    },

    viewInfografis(infografis) {
      // Navigate to infografis detail page
      this.$router.push(`/infografis/${infografis.slug || infografis.id}`)
    },
  },
}
</script>

<style scoped>
/* Hero Section */
.infografis-hero {
  background: linear-gradient(135deg, #040677 0%, #1e40af 100%);
  color: white;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

.infografis-hero::before {
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
  flex-wrap: wrap;
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

/* Tags Filter */
.tags-filter {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #37517e;
}

.tag-btn {
  background: #e5e7eb;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag-btn:hover,
.tag-btn.active {
  background: #47b2e4;
  color: white;
  border-color: #47b2e4;
}

/* Active Filters */
.active-filters {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  background: #47b2e4;
  color: white;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
}

.remove-filter {
  background: none;
  border: none;
  color: white;
  margin-left: 5px;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.remove-filter:hover {
  background: rgba(255, 255, 255, 0.2);
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

/* Infografis Cards */
.infografis-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid #ebeef4;
}

.infografis-card:hover {
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

.infografis-card:hover .card-image img {
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

.infografis-card:hover .image-overlay {
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
  margin-bottom: 15px;
}

/* Tags Container */
.tags-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.tag-item {
  background: #f1f5f9;
  color: #475569;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid #e2e8f0;
}

.tag-item.clickable {
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-item.clickable:hover {
  background: #47b2e4;
  color: white;
  border-color: #47b2e4;
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
/* Category Colors - Glass Effect */
.category-ekonomi {
  background: rgba(16, 185, 129, 0.25); /* hijau soft */
  backdrop-filter: blur(6px);
  border-radius: 6px;
}

.category-infrastruktur {
  background: rgba(245, 158, 11, 0.25); /* oranye soft */
  backdrop-filter: blur(6px);
  border-radius: 6px;
}

.category-kemiskinan {
  background: rgba(239, 68, 68, 0.25); /* merah soft */
  backdrop-filter: blur(6px);
  border-radius: 6px;
}

.category-kependudukan {
  background: rgba(139, 92, 246, 0.25); /* ungu soft */
  backdrop-filter: blur(6px);
  border-radius: 6px;
}

.category-kesehatan {
  background: rgba(6, 182, 212, 0.25); /* biru muda */
  backdrop-filter: blur(6px);
  border-radius: 6px;
}

.category-lingkungan {
  background: rgba(132, 204, 22, 0.25); /* hijau lime */
  backdrop-filter: blur(6px);
  border-radius: 6px;
}

.category-pariwisata {
  background: rgba(249, 115, 22, 0.25); /* oranye terang */
  backdrop-filter: blur(6px);
  border-radius: 6px;
}

.category-pemerintah {
  background: rgba(99, 102, 241, 0.25); /* biru-ungu */
  backdrop-filter: blur(6px);
  border-radius: 6px;
}

.category-pendidikan {
  background: rgba(236, 72, 153, 0.25); /* pink soft */
  backdrop-filter: blur(6px);
  border-radius: 6px;
}

.category-sosial {
  background: rgba(20, 184, 166, 0.25); /* teal soft */
  backdrop-filter: blur(6px);
  border-radius: 6px;
}

.category-default {
  background: rgba(71, 178, 228, 0.25); /* biru default */
  backdrop-filter: blur(6px);
  border-radius: 6px;
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

.btn-outline-secondary {
  border: 2px solid #6c757d;
  color: #6c757d;
  background: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-outline-secondary:hover {
  background: #6c757d;
  color: white;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .infografis-hero {
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

  .tags-filter {
    margin-top: 10px;
    justify-content: center;
  }

  .main-content {
    padding: 40px 0;
  }

  .results-info .row > div {
    text-align: center;
    margin-bottom: 15px;
  }

  .active-filters {
    justify-content: center;
  }

  .card-body {
    padding: 20px;
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

  .infografis-card {
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

  .hero-stats {
    gap: 15px;
  }

  .stat-item {
    font-size: 14px;
  }

  .tags-filter {
    gap: 8px;
  }

  .tag-btn {
    padding: 4px 8px;
    font-size: 11px;
  }
}

/* Additional Animations */
.infografis-card {
  position: relative;
  overflow: hidden;
}

.infografis-card::before {
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

.infografis-card:hover::before {
  left: 100%;
}

/* Focus States */
.infografis-card:focus-within {
  outline: 2px solid #47b2e4;
  outline-offset: 2px;
}

/* Print Styles */
@media print {
  .search-filter-section,
  .pagination-container {
    display: none;
  }

  .infografis-card {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #ddd;
  }
}
</style>
