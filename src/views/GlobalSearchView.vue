<template>
  <div class="search-page">
    <!-- Hero Section -->
    <section class="search-hero">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <div class="hero-content">
              <h1 class="hero-title">Jelajahi Data Kota Ternate</h1>
              <p class="hero-description">
                Temukan data, peta, infografis, dan visualisasi yang Anda butuhkan dalam satu
                pencarian. Jelajahi berbagai informasi lengkap tentang Kota Ternate dengan mudah dan
                cepat.
              </p>

              <!-- Search Box -->
              <div class="search-box">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Cari dataset, mapset, infografis, atau visualisasi..."
                    v-model="searchQuery"
                    @keyup.enter="performSearch"
                  />
                  <button
                    class="btn btn-primary"
                    type="button"
                    @click="performSearch"
                    :disabled="loading"
                  >
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    <i v-else class="bi bi-search me-2"></i>
                    Cari
                  </button>
                </div>
              </div>

              <!-- Search Results Summary -->
              <div class="search-summary" v-if="hasSearched && totalResults > 0">
                <div class="summary-item">
                  <i class="bi bi-bullseye"></i>
                  <span>{{ totalResults }} Total Hasil</span>
                </div>
                <div class="summary-item" v-if="counts.datasets > 0">
                  <i class="bi bi-table"></i>
                  <span>{{ counts.datasets }} Dataset</span>
                </div>
                <div class="summary-item" v-if="counts.mapsets > 0">
                  <i class="bi bi-map"></i>
                  <span>{{ counts.mapsets }} Mapset</span>
                </div>
                <div class="summary-item" v-if="counts.infografis > 0">
                  <i class="bi bi-image"></i>
                  <span>{{ counts.infografis }} Infografis</span>
                </div>
                <div class="summary-item" v-if="counts.visualisasi > 0">
                  <i class="bi bi-bar-chart"></i>
                  <span>{{ counts.visualisasi }} Visualisasi</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="hero-image">
              <img src="../assets/img/search.svg" alt="Global Search" class="img-fluid" />
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="pagination-container">
            <nav aria-label="Search results pagination">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: !hasPrevPage }">
                  <button class="page-link" @click="prevPage" :disabled="!hasPrevPage">
                    <i class="bi bi-chevron-left"></i>
                    Sebelumnya
                  </button>
                </li>

                <!-- Page numbers -->
                <li
                  v-for="page in getVisiblePages()"
                  :key="page"
                  class="page-item"
                  :class="{ active: page === currentPage }"
                >
                  <button v-if="page === '...'" class="page-link" disabled>...</button>
                  <button v-else class="page-link" @click="changePage(page)">{{ page }}</button>
                </li>

                <li class="page-item" :class="{ disabled: !hasNextPage }">
                  <button class="page-link" @click="nextPage" :disabled="!hasNextPage">
                    Selanjutnya
                    <i class="bi bi-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>

            <!-- Pagination info -->
            <div class="pagination-info text-center mt-3">
              <small class="text-muted">
                Menampilkan {{ paginationInfo.from || 0 }} - {{ paginationInfo.to || 0 }} dari
                {{ totalResults }} hasil
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container py-5">
      <!-- Search Filters -->
      <div class="search-filters" v-if="hasSearched">
        <div class="row">
          <div class="col-md-3">
            <select class="form-select" v-model="selectedType" @change="performSearch(true)">
              <option value="all">Semua Tipe</option>
              <option value="dataset">Dataset</option>
              <option value="mapset">Mapset</option>
              <option value="infografis">Infografis</option>
              <option value="visualisasi">Visualisasi</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select" v-model="selectedTopic" @change="performSearch(true)">
              <option value="">Semua Topik</option>
              <option v-for="topic in availableTopics" :key="topic" :value="topic">
                {{ topic }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <input
              type="text"
              class="form-control"
              placeholder="Tag (pisahkan dengan koma)"
              v-model="selectedTags"
              @keyup.enter="performSearch(true)"
            />
          </div>
          <div class="col-md-3">
            <select class="form-select" v-model="sortBy" @change="performSearch(true)">
              <option value="relevance">Relevansi</option>
              <option value="date">Tanggal Terbaru</option>
              <option value="popularity">Popularitas</option>
              <option value="title">Nama A-Z</option>
            </select>
          </div>
        </div>

        <!-- Active Filters -->
        <div class="active-filters" v-if="hasActiveFilters">
          <span class="filter-label">Filter Aktif:</span>
          <span class="filter-badge" v-if="selectedType !== 'all'">
            {{ formatType(selectedType) }}
            <i class="bi bi-x" @click="clearFilter('type')"></i>
          </span>
          <span class="filter-badge" v-if="selectedTopic">
            {{ selectedTopic }}
            <i class="bi bi-x" @click="clearFilter('topic')"></i>
          </span>
          <span class="filter-badge" v-if="selectedTags">
            Tags: {{ selectedTags }}
            <i class="bi bi-x" @click="clearFilter('tags')"></i>
          </span>
          <button class="btn btn-sm btn-outline-secondary ms-2" @click="clearAllFilters">
            <i class="bi bi-x-circle me-1"></i>Reset Filter
          </button>
        </div>
      </div>

      <!-- Loading State with Skeleton -->
      <div v-if="loading" class="skeleton-loading">
        <!-- Skeleton for result sections -->
        <div class="skeleton-section" v-for="n in 3" :key="n">
          <div class="skeleton-section-header">
            <div class="skeleton skeleton-section-title"></div>
            <div class="skeleton skeleton-view-all-btn"></div>
          </div>

          <div class="skeleton-result-item" v-for="i in 4" :key="i">
            <div class="row align-items-center">
              <div class="col-md-2">
                <div class="skeleton skeleton-type-icon"></div>
              </div>
              <div class="col-md-8">
                <div class="skeleton skeleton-item-title mb-2"></div>
                <div class="skeleton skeleton-item-desc mb-2"></div>
                <div class="skeleton skeleton-item-desc-short mb-2"></div>
                <div class="skeleton-badges mb-2">
                  <div class="skeleton skeleton-badge" v-for="b in 3" :key="b"></div>
                </div>
                <div class="skeleton skeleton-author"></div>
              </div>
              <div class="col-md-2 text-end">
                <div class="skeleton skeleton-view-btn"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-danger" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        {{ error }}
        <button @click="performSearch" class="btn btn-outline-danger btn-sm ms-2">Coba Lagi</button>
      </div>

      <!-- Search Results -->
      <div v-else-if="hasSearched" class="search-results">
        <!-- No Results -->
        <div v-if="totalResults === 0" class="no-results text-center py-5">
          <i class="bi bi-search display-4 text-muted"></i>
          <h5 class="mt-3">Tidak ada hasil ditemukan</h5>
          <p class="text-muted">
            Coba gunakan kata kunci yang berbeda atau ubah filter pencarian Anda
          </p>
        </div>

        <!-- Results Found -->
        <div v-else>
          <!-- Datasets Section -->
          <div v-if="results.datasets && results.datasets.data.length > 0" class="result-section">
            <div class="section-header">
              <h4>
                <i class="bi bi-table me-2"></i>
                Dataset ({{ results.datasets.total }})
              </h4>
              <router-link to="/datasets" class="btn btn-outline-primary btn-sm">
                Lihat Semua Dataset
              </router-link>
            </div>

            <div class="result-item" v-for="item in results.datasets.data" :key="item.id">
              <div class="row align-items-center">
                <div class="col-md-2">
                  <div class="type-icon dataset">
                    <i class="bi bi-table"></i>
                  </div>
                </div>
                <div class="col-md-8">
                  <h6 class="item-title">
                    <router-link :to="'/dataset/' + item.slug">
                      {{ item.title }}
                    </router-link>
                  </h6>
                  <p class="item-description">{{ item.description || 'Tidak ada deskripsi' }}</p>
                  <div class="item-meta">
                    <span class="badge bg-primary me-2">{{ item.topic }}</span>
                    <span class="badge bg-success me-2" v-if="item.is_public">Publik</span>
                    <small class="text-muted">
                      <i class="bi bi-download me-1"></i>{{ item.download_count || 0 }} downloads
                    </small>
                  </div>
                  <div class="item-author" v-if="item.user">
                    <small class="text-muted">
                      <i class="bi bi-person me-1"></i>{{ item.user.name }}
                    </small>
                  </div>
                </div>
                <div class="col-md-2 text-end">
                  <router-link :to="'/dataset/' + item.slug" class="btn btn-primary btn-sm">
                    <i class="bi bi-eye me-1"></i>Lihat
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Mapsets Section -->
          <div v-if="results.mapsets && results.mapsets.data.length > 0" class="result-section">
            <div class="section-header">
              <h4>
                <i class="bi bi-map me-2"></i>
                Mapset ({{ results.mapsets.total }})
              </h4>
              <router-link to="/mapsets" class="btn btn-outline-primary btn-sm">
                Lihat Semua Mapset
              </router-link>
            </div>

            <div class="result-item" v-for="item in results.mapsets.data" :key="item.id">
              <div class="row align-items-center">
                <div class="col-md-2">
                  <div class="type-icon mapset">
                    <i class="bi bi-map"></i>
                  </div>
                </div>
                <div class="col-md-8">
                  <h6 class="item-title">
                    <router-link :to="'/mapset/' + item.slug">
                      {{ item.nama }}
                    </router-link>
                  </h6>
                  <p class="item-description">{{ item.deskripsi || 'Tidak ada deskripsi' }}</p>
                  <div class="item-meta">
                    <span class="badge bg-primary me-2">{{ item.topic }}</span>
                    <span class="badge bg-success me-2" v-if="item.is_visible">Aktif</span>
                    <small class="text-muted">
                      <i class="bi bi-eye me-1"></i>{{ item.views || 0 }} views
                    </small>
                  </div>
                  <div class="item-author" v-if="item.user">
                    <small class="text-muted">
                      <i class="bi bi-person me-1"></i>{{ item.user.name }}
                    </small>
                  </div>
                </div>
                <div class="col-md-2 text-end">
                  <router-link :to="'/mapset/' + item.slug" class="btn btn-primary btn-sm">
                    <i class="bi bi-eye me-1"></i>Lihat
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Infografis Section -->
          <div
            v-if="results.infografis && results.infografis.data.length > 0"
            class="result-section"
          >
            <div class="section-header">
              <h4>
                <i class="bi bi-image me-2"></i>
                Infografis ({{ results.infografis.total }})
              </h4>
              <router-link to="/infografis" class="btn btn-outline-primary btn-sm">
                Lihat Semua Infografis
              </router-link>
            </div>

            <div class="result-item" v-for="item in results.infografis.data" :key="item.id">
              <div class="row align-items-center">
                <div class="col-md-2">
                  <div class="type-icon infografis">
                    <i class="bi bi-image"></i>
                  </div>
                </div>
                <div class="col-md-8">
                  <h6 class="item-title">
                    <router-link :to="'/infografis/' + item.slug">
                      {{ item.nama }}
                    </router-link>
                  </h6>
                  <p class="item-description">{{ item.deskripsi || 'Tidak ada deskripsi' }}</p>
                  <div class="item-meta">
                    <span class="badge bg-primary me-2">{{ item.topic }}</span>
                    <span class="badge bg-success me-2" v-if="item.is_public">Publik</span>
                    <small class="text-muted me-3">
                      <i class="bi bi-eye me-1"></i>{{ item.views || 0 }} views
                    </small>
                    <small class="text-muted">
                      <i class="bi bi-download me-1"></i>{{ item.downloads || 0 }} downloads
                    </small>
                  </div>
                  <div class="item-author" v-if="item.user">
                    <small class="text-muted">
                      <i class="bi bi-person me-1"></i>{{ item.user.name }}
                    </small>
                  </div>
                </div>
                <div class="col-md-2 text-end">
                  <router-link :to="'/infografis/' + item.slug" class="btn btn-primary btn-sm">
                    <i class="bi bi-eye me-1"></i>Lihat
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Visualisasi Section -->
          <div
            v-if="results.visualisasi && results.visualisasi.data.length > 0"
            class="result-section"
          >
            <div class="section-header">
              <h4>
                <i class="bi bi-bar-chart me-2"></i>
                Visualisasi ({{ results.visualisasi.total }})
              </h4>
              <router-link to="/visualisasi" class="btn btn-outline-primary btn-sm">
                Lihat Semua Visualisasi
              </router-link>
            </div>

            <div class="result-item" v-for="item in results.visualisasi.data" :key="item.id">
              <div class="row align-items-center">
                <div class="col-md-2">
                  <div class="type-icon visualisasi">
                    <i class="bi bi-bar-chart"></i>
                  </div>
                </div>
                <div class="col-md-8">
                  <h6 class="item-title">
                    <router-link :to="'/visualisasi/' + item.slug">
                      {{ item.nama }}
                    </router-link>
                  </h6>
                  <p class="item-description">{{ item.deskripsi || 'Tidak ada deskripsi' }}</p>
                  <div class="item-meta">
                    <span class="badge bg-primary me-2">{{ item.topic }}</span>
                    <span class="badge bg-info me-2">{{ formatChartType(item.tipe) }}</span>
                    <span class="badge bg-success me-2" v-if="item.is_public">Publik</span>
                    <small class="text-muted">
                      <i class="bi bi-eye me-1"></i>{{ item.views || 0 }} views
                    </small>
                  </div>
                  <div class="item-author" v-if="item.user">
                    <small class="text-muted">
                      <i class="bi bi-person me-1"></i>{{ item.user.name }}
                    </small>
                  </div>
                </div>
                <div class="col-md-2 text-end">
                  <router-link :to="'/visualisasi/' + item.slug" class="btn btn-primary btn-sm">
                    <i class="bi bi-eye me-1"></i>Lihat
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Search Suggestions (shown when no search is performed) -->
      <div v-if="!hasSearched" class="quick-suggestions">
        <div class="row">
          <div class="col-md-12">
            <div class="suggestion-card">
              <h6>
                <i class="bi bi-filter me-2"></i>
                Filter berdasarkan Topik
              </h6>
              <div class="quick-buttons">
                <button
                  v-for="topic in availableTopics.slice(0, 6)"
                  :key="topic"
                  class="btn btn-outline-info btn-sm me-2 mb-2"
                  @click="quickTopic(topic)"
                >
                  {{ topic }}
                </button>
              </div>
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
  name: 'GlobalSearchPage',
  data() {
    return {
      // API
      apiUrl: import.meta.env.VITE_API_URL,

      // Search state
      searchQuery: '',
      loading: false,
      error: null,
      hasSearched: false,

      // Pagination
      currentPage: 1,
      itemsPerPage: 12,

      // Filters
      selectedType: 'all',
      selectedTopic: '',
      selectedTags: '',
      sortBy: 'relevance',

      // Results from API
      results: {},
      counts: {},
      totalResults: 0,
      availableTopics: [],

      // Default data
      popularTerms: ['ekonomi', 'kesehatan', 'pendidikan', 'infrastruktur', 'kemiskinan'],
    }
  },

  computed: {
    hasActiveFilters() {
      return this.selectedType !== 'all' || this.selectedTopic || this.selectedTags
    },

    // Pagination computed properties
    totalPages() {
      return Math.max(
        ...Object.values(this.results).map((result) =>
          result && result.last_page ? result.last_page : 1
        )
      )
    },

    hasNextPage() {
      return Object.values(this.results).some((result) => result && result.next_page_url)
    },

    hasPrevPage() {
      return this.currentPage > 1
    },

    paginationInfo() {
      const activeResults = Object.values(this.results).find(
        (result) => result && result.data && result.data.length > 0
      )
      return activeResults || { from: 0, to: 0, total: 0 }
    },
  },

  mounted() {
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const query = urlParams.get('q')
    const type = urlParams.get('type')
    const topic = urlParams.get('topic')

    if (query || type || topic) {
      // User has specific search parameters
      if (query) this.searchQuery = query
      if (type) this.selectedType = type
      if (topic) this.selectedTopic = topic
      this.performSearch()
    } else {
      // No search parameters, load all data
      this.loadAllData()
    }
  },

  methods: {
    async performSearch(resetPage = true) {
      if (resetPage) {
        this.currentPage = 1
      }

      this.loading = true
      this.error = null
      this.hasSearched = true

      try {
        const params = {}

        // Allow empty query to show all data
        params.q = this.searchQuery.trim()

        if (this.selectedType !== 'all') {
          params.type = this.selectedType
        }

        if (this.selectedTopic) {
          params.topic = this.selectedTopic
        }

        if (this.selectedTags) {
          params.tags = this.selectedTags
        }

        params.sort_by = this.sortBy
        params.per_page = this.itemsPerPage
        params.page = this.currentPage

        const response = await axios.get(`${this.apiUrl}search/global`, { params })

        if (response.data.success) {
          this.results = response.data.data.results
          this.counts = response.data.data.counts
          this.totalResults = response.data.data.total_results
          this.availableTopics = response.data.data.metadata.available_topics || []

          this.updateUrl()
        } else {
          throw new Error(response.data.message || 'Pencarian gagal')
        }
      } catch (error) {
        console.error('Search error:', error)
        this.error = 'Gagal melakukan pencarian. Silakan coba lagi.'
        this.results = {}
        this.counts = {}
        this.totalResults = 0
      } finally {
        this.loading = false
      }
    },

    async loadAllData() {
      this.currentPage = 1
      this.loading = true
      this.error = null
      this.hasSearched = true

      try {
        const params = {
          q: '', // Empty query to get all data
          per_page: this.itemsPerPage,
          page: this.currentPage,
        }

        const response = await axios.get(`${this.apiUrl}search/global`, { params })

        if (response.data.success) {
          this.results = response.data.data.results
          this.counts = response.data.data.counts
          this.totalResults = response.data.data.total_results
          this.availableTopics = response.data.data.metadata.available_topics || []
        } else {
          throw new Error(response.data.message || 'Gagal memuat data')
        }
      } catch (error) {
        console.error('Load all data error:', error)
        this.error = 'Gagal memuat data. Silakan coba lagi.'
        this.results = {}
        this.counts = {}
        this.totalResults = 0
      } finally {
        this.loading = false
      }
    },

    async loadInitialData() {
      try {
        const response = await axios.get(`${this.apiUrl}search/global`, {
          params: { q: '', per_page: 1 },
        })

        if (response.data.success && response.data.data.metadata) {
          this.availableTopics = response.data.data.metadata.available_topics || []
        }
      } catch (error) {
        console.error('Failed to load initial data:', error)
      }
    },

    // Pagination methods
    changePage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page
        this.performSearch(false) // Don't reset to page 1
        this.scrollToTop()
      }
    },

    nextPage() {
      if (this.hasNextPage) {
        this.changePage(this.currentPage + 1)
      }
    },

    prevPage() {
      if (this.hasPrevPage) {
        this.changePage(this.currentPage - 1)
      }
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    getVisiblePages() {
      const pages = []
      const total = this.totalPages
      const current = this.currentPage

      if (total <= 7) {
        // Show all pages if total is 7 or less
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        // Show smart pagination
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

    clearFilter(type) {
      if (type === 'type') {
        this.selectedType = 'all'
      } else if (type === 'topic') {
        this.selectedTopic = ''
      } else if (type === 'tags') {
        this.selectedTags = ''
      }
      this.performSearch()
    },

    clearAllFilters() {
      this.selectedType = 'all'
      this.selectedTopic = ''
      this.selectedTags = ''
      this.searchQuery = ''
      this.hasSearched = false
      this.results = {}
      this.counts = {}
      this.totalResults = 0
      this.updateUrl()
    },

    quickSearch(term) {
      this.searchQuery = term
      this.performSearch()
    },

    quickTopic(topic) {
      this.selectedTopic = topic
      this.performSearch()
    },

    updateUrl() {
      const params = new URLSearchParams()

      if (this.searchQuery) {
        params.set('q', this.searchQuery)
      }

      if (this.selectedType !== 'all') {
        params.set('type', this.selectedType)
      }

      if (this.selectedTopic) {
        params.set('topic', this.selectedTopic)
      }

      if (this.selectedTags) {
        params.set('tags', this.selectedTags)
      }

      const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '')
      window.history.replaceState({}, '', newUrl)
    },

    formatType(type) {
      const types = {
        all: 'Semua',
        dataset: 'Dataset',
        mapset: 'Mapset',
        infografis: 'Infografis',
        visualisasi: 'Visualisasi',
      }
      return types[type] || type
    },

    formatChartType(type) {
      const types = {
        bar_chart: 'Bar Chart',
        line_chart: 'Line Chart',
        pie_chart: 'Pie Chart',
        area_chart: 'Area Chart',
      }
      return types[type] || type
    },
  },
}
</script>

<style scoped>
.search-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.search-hero {
  background: linear-gradient(135deg, #040677 0%, #1e40af 100%);
  color: white;
  padding: 120px 0 80px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
  color: #ffffff;
}

.hero-description {
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 40px;
  opacity: 0.9;
}

/* Search Box */
.search-box {
  max-width: 600px;
  margin-bottom: 30px;
}

.input-group {
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.input-group-text {
  background: white;
  border: none;
  padding: 15px 20px;
}

.form-control {
  border: none;
  padding: 15px 20px;
  font-size: 16px;
}

.form-control:focus {
  box-shadow: none;
}

.btn-primary {
  padding: 15px 30px;
  border: none;
  background: linear-gradient(135deg, #47b2e4 0%, #209dd8 100%);
  font-weight: 600;
}

/* Search Summary */
.search-summary {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}

.summary-item i {
  font-size: 18px;
}

/* Search Filters */
.search-filters {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.active-filters {
  margin-top: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-label {
  font-weight: 600;
  color: #6c757d;
}

.filter-badge {
  background: #e9ecef;
  color: #495057;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-badge i {
  cursor: pointer;
  opacity: 0.7;
}

.filter-badge i:hover {
  opacity: 1;
}

/* Results */
.search-results {
  margin-top: 30px;
}

.result-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
}

.section-header h4 {
  color: #37517e;
  font-weight: 700;
  margin: 0;
}

.result-item {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.result-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #47b2e4;
}

.type-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 0 auto;
}

.type-icon.dataset {
  background: linear-gradient(135deg, #4fc3f7, #29b6f6);
  color: white;
}

.type-icon.mapset {
  background: linear-gradient(135deg, #66bb6a, #4caf50);
  color: white;
}

.type-icon.infografis {
  background: linear-gradient(135deg, #ffa726, #ff9800);
  color: white;
}

.type-icon.visualisasi {
  background: linear-gradient(135deg, #ab47bc, #9c27b0);
  color: white;
}

.item-title {
  margin-bottom: 8px;
  font-weight: 600;
}

.item-title a {
  color: #37517e;
  text-decoration: none;
}

.item-title a:hover {
  color: #47b2e4;
  text-decoration: underline;
}

.item-description {
  color: #6c757d;
  margin-bottom: 12px;
  line-height: 1.5;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.item-meta .badge {
  font-size: 11px;
  font-weight: 500;
}

.item-meta small {
  color: #6c757d;
  font-size: 13px;
}

.item-author {
  font-size: 13px;
}

/* Quick Suggestions */
.quick-suggestions {
  margin-top: 30px;
}

.suggestion-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.suggestion-card h6 {
  color: #37517e;
  font-weight: 600;
  margin-bottom: 15px;
}

.quick-buttons button {
  margin: 3px;
}

/* Default Content */
.default-content {
  margin-top: 40px;
}

.content-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.content-card h5 {
  color: #37517e;
  font-weight: 700;
  margin-bottom: 20px;
}

/* No Results */
.no-results {
  padding: 60px 20px;
}

.display-4 {
  font-size: 3rem;
  opacity: 0.4;
}

/* Skeleton Loading Styles */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 6px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-loading {
  margin-top: 30px;
}

.skeleton-section {
  margin-bottom: 40px;
}

.skeleton-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.skeleton-section-title {
  width: 200px;
  height: 28px;
}

.skeleton-view-all-btn {
  width: 120px;
  height: 32px;
  border-radius: 20px;
}

.skeleton-result-item {
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
}

.skeleton-type-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin: 0 auto;
}

.skeleton-item-title {
  width: 75%;
  height: 20px;
}

.skeleton-item-desc {
  width: 100%;
  height: 16px;
}

.skeleton-item-desc-short {
  width: 85%;
  height: 16px;
}

.skeleton-badges {
  display: flex;
  gap: 8px;
}

.skeleton-badge {
  width: 60px;
  height: 20px;
  border-radius: 12px;
}

.skeleton-author {
  width: 150px;
  height: 14px;
}

.skeleton-view-btn {
  width: 80px;
  height: 32px;
  border-radius: 20px;
}

/* Pagination Styles */
.pagination-container {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #e9ecef;
}

.pagination {
  margin-bottom: 0;
}

.page-link {
  color: #37517e;
  border: 1px solid #dee2e6;
  padding: 8px 12px;
  margin: 0 2px;
  border-radius: 6px;
  font-weight: 500;
  background: white;
}

.page-link:hover {
  color: #47b2e4;
  background-color: #f8f9fa;
  border-color: #47b2e4;
}

.page-item.active .page-link {
  background-color: #47b2e4;
  border-color: #47b2e4;
  color: white;
}

.page-item.disabled .page-link {
  color: #6c757d;
  background-color: #f8f9fa;
  border-color: #dee2e6;
  cursor: not-allowed;
}

.pagination-info {
  color: #6c757d;
  font-size: 14px;
}

/* Loading */
.loading-results {
  margin-top: 40px;
}

/* Responsive */
@media (max-width: 768px) {
  .search-hero {
    padding: 80px 0 60px;
    text-align: center;
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-description {
    font-size: 16px;
  }

  .search-summary {
    justify-content: center;
    gap: 15px;
  }

  .search-box {
    max-width: 100%;
  }

  .input-group {
    border-radius: 25px;
  }

  .search-filters {
    padding: 20px;
  }

  .search-filters .row > div {
    margin-bottom: 15px;
  }

  .search-filters .row > div:last-child {
    margin-bottom: 0;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .result-item .row > div {
    margin-bottom: 15px;
  }

  .result-item .row > div:last-child {
    margin-bottom: 0;
    text-align: center !important;
  }

  .active-filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .no-results {
    padding: 40px 15px;
  }

  .display-4 {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 24px;
  }

  .search-filters {
    padding: 15px;
  }

  .result-item {
    padding: 15px;
  }

  .content-card {
    padding: 20px;
  }

  .type-icon {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  .summary-item {
    font-size: 14px;
  }
}

/* Print Styles */
@media print {
  .search-filters,
  .search-summary,
  .default-content {
    display: none;
  }

  .search-hero {
    background: none;
    color: black;
    padding: 20px 0;
  }

  .result-item {
    box-shadow: none;
    border: 1px solid #ddd;
    break-inside: avoid;
  }
}
</style>
