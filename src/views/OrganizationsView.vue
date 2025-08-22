<template>
  <div class="organizations-simple">
    <!-- Hero Section -->
    <section class="organizations-hero">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <div class="hero-content" data-aos="fade-up">
              <h1 class="hero-title">Organisasi</h1>
              <p class="hero-description">
                Dapatkan daftar Perangkat Daerah (PD) yang berkontribusi dalam membangun ekosistem
                data yang terbuka dan terpercaya melalui publikasi data di Open Data Ternate.
              </p>
              <div class="hero-stats" v-if="!loading && stats.total">
                <div class="stat-item text-white">
                  <i class="bi bi-building"></i>
                  <span>{{ stats.total.toLocaleString('id-ID') }} Organisasi</span>
                </div>
                <div class="stat-item text-white">
                  <i class="bi bi-globe"></i>
                  <span>{{ stats.with_website.toLocaleString('id-ID') }} Dengan Website</span>
                </div>
              </div>
              <!-- Hero Stats Skeleton -->
              <div class="hero-stats" v-if="loading">
                <div class="stat-item text-white">
                  <div class="skeleton skeleton-icon"></div>
                  <div class="skeleton skeleton-text-hero"></div>
                </div>
                <div class="stat-item text-white">
                  <div class="skeleton skeleton-icon"></div>
                  <div class="skeleton skeleton-text-hero"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="hero-image" data-aos="fade-left" data-aos-delay="200">
              <img src="@/assets/img/organization.svg" alt="Organisasi" class="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container py-5">
      <!-- Header -->
      <div class="header-section mb-5" style="display: none">
        <h1 class="page-title">Organisasi</h1>
        <p class="page-description">
          Dapatkan daftar Perangkat Daerah (PD) yang berkontribusi dalam membangun ekosistem data
          yang terbuka dan terpercaya melalui publikasi data di Open Data Jabar.
        </p>
      </div>

      <!-- Search and Filter Section -->
      <div class="search-filter-section mb-4" v-if="!loading">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="search-box">
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0">
                  <i class="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  class="form-control border-start-0"
                  placeholder="Cari organisasi"
                  v-model="searchQuery"
                  @input="filterOrganizations"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex justify-content-between align-items-center">
              <div class="result-count">
                <strong>{{ filteredOrganizations.length }}</strong> Organisasi ditemukan
              </div>
              <div class="sort-section">
                <label class="me-2">Urutkan :</label>
                <select
                  class="form-select form-select-sm d-inline-block w-auto"
                  v-model="sortBy"
                  @change="sortOrganizations"
                >
                  <option value="name">Abjad</option>
                  <option value="content_desc">Konten Terbanyak</option>
                  <option value="newest">Terbaru</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filter Skeleton -->
      <div class="search-filter-section mb-4" v-if="loading">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="skeleton skeleton-search"></div>
          </div>
          <div class="col-md-6">
            <div class="d-flex justify-content-between align-items-center">
              <div class="skeleton skeleton-result-count"></div>
              <div class="skeleton skeleton-sort"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="alert alert-danger" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        {{ error }}
        <button @click="fetchOrganizations" class="btn btn-outline-danger btn-sm ms-2">
          Coba Lagi
        </button>
      </div>

      <!-- Organizations Grid -->
      <div v-if="!loading && !error" class="organizations-grid">
        <div class="row g-4">
          <div
            class="col-lg-4 col-md-6"
            v-for="organization in paginatedOrganizations"
            :key="organization.id"
          >
            <div class="organization-card">
              <!-- Logo -->
              <div class="org-logo-container">
                <img
                  :src="organization.logo_url"
                  :alt="organization.name"
                  class="org-logo"
                  @error="handleImageError"
                />
              </div>

              <!-- Content -->
              <div class="org-content">
                <h6 class="org-name">{{ organization.name }}</h6>

                <!-- Stats -->
                <div class="org-stats">
                  <div class="stat-item">
                    <i class="bi bi-database text-success"></i>
                    <span>{{ organization.total_datasets || 0 }}</span>
                  </div>
                  <div class="stat-item">
                    <i class="bi bi-bar-chart text-info"></i>
                    <span>{{ organization.total_infografis || 0 }}</span>
                  </div>
                  <div class="stat-item">
                    <i class="bi bi-map text-warning"></i>
                    <span>{{ organization.total_mapsets || 0 }}</span>
                  </div>
                  <div class="stat-item">
                    <i class="bi bi-eye text-primary"></i>
                    <span>{{ organization.total_visualisasi || 0 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredOrganizations.length === 0" class="text-center py-5">
          <i class="bi bi-search display-4 text-muted"></i>
          <h5 class="mt-3">Organisasi tidak ditemukan</h5>
          <p class="text-muted">Coba ubah kata kunci pencarian Anda</p>
          <button class="btn btn-primary" @click="clearSearch">Reset Pencarian</button>
        </div>

        <!-- Pagination -->
        <nav v-if="totalPages > 1" class="mt-5">
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
      </div>

      <!-- Skeleton Loading for Organizations Grid -->
      <div v-if="loading" class="organizations-grid">
        <div class="row g-4">
          <div class="col-lg-4 col-md-6" v-for="n in 12" :key="`skeleton-${n}`">
            <div class="organization-card skeleton-card">
              <!-- Logo Skeleton -->
              <div class="org-logo-container">
                <div class="skeleton skeleton-logo"></div>
              </div>

              <!-- Content Skeleton -->
              <div class="org-content">
                <div class="skeleton skeleton-title mb-3"></div>

                <!-- Stats Skeleton -->
                <div class="org-stats">
                  <div class="stat-item">
                    <div class="skeleton skeleton-stat-icon"></div>
                    <div class="skeleton skeleton-stat-text"></div>
                  </div>
                  <div class="stat-item">
                    <div class="skeleton skeleton-stat-icon"></div>
                    <div class="skeleton skeleton-stat-text"></div>
                  </div>
                  <div class="stat-item">
                    <div class="skeleton skeleton-stat-icon"></div>
                    <div class="skeleton skeleton-stat-text"></div>
                  </div>
                  <div class="stat-item">
                    <div class="skeleton skeleton-stat-icon"></div>
                    <div class="skeleton skeleton-stat-text"></div>
                  </div>
                </div>
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
  name: 'OrganizationsSimple',
  data() {
    return {
      // API Configuration
      apiUrl: import.meta.env.VITE_API_URL,

      // States
      loading: false,
      error: null,
      searchQuery: '',
      sortBy: 'name',
      currentPage: 1,
      itemsPerPage: 12,

      // Data
      organizations: [],
      stats: {},
    }
  },

  computed: {
    filteredOrganizations() {
      let filtered = this.organizations

      // Search filter
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(
          (org) => org.name.toLowerCase().includes(query) || org.code.toLowerCase().includes(query)
        )
      }

      return filtered
    },

    sortedOrganizations() {
      const sorted = [...this.filteredOrganizations]

      switch (this.sortBy) {
        case 'name':
          return sorted.sort((a, b) => a.name.localeCompare(b.name))
        case 'content_desc':
          return sorted.sort((a, b) => (b.total_content || 0) - (a.total_content || 0))
        case 'newest':
          return sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        default:
          return sorted
      }
    },

    totalPages() {
      return Math.ceil(this.sortedOrganizations.length / this.itemsPerPage)
    },

    paginatedOrganizations() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.sortedOrganizations.slice(start, end)
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
    await this.fetchOrganizations()

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
    async fetchOrganizations() {
      this.loading = true
      this.error = null

      try {
        // Pastikan tidak ada double slash
        const apiUrl = this.apiUrl.endsWith('/') ? this.apiUrl.slice(0, -1) : this.apiUrl
        const response = await axios.get(`${apiUrl}/organizations`)

        if (response.data.success) {
          this.organizations = response.data.data.organizations
          this.stats = response.data.data.stats || {}
        } else {
          throw new Error(response.data.message || 'Failed to fetch organizations')
        }
      } catch (error) {
        console.error('Error fetching organizations:', error)
        this.error = 'Gagal memuat organisasi. Silakan coba lagi.'
        this.organizations = []
      } finally {
        this.loading = false
      }
    },

    filterOrganizations() {
      this.currentPage = 1
    },

    sortOrganizations() {
      this.currentPage = 1
    },

    clearSearch() {
      this.searchQuery = ''
      this.currentPage = 1
    },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },

    handleImageError(event) {
      event.target.src = '/assets/img/default-organization.png'
    },
  },
}
</script>

<style scoped>
.organizations-simple {
  background-color: #f8f9fa;
  min-height: 100vh;
}

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

/* Hero Section Skeleton */
.skeleton-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.skeleton-text-hero {
  width: 120px;
  height: 16px;
}

/* Search Filter Skeleton */
.skeleton-search {
  height: 38px;
  width: 100%;
  border-radius: 6px;
}

.skeleton-result-count {
  width: 150px;
  height: 16px;
}

.skeleton-sort {
  width: 100px;
  height: 32px;
  border-radius: 4px;
}

/* Organization Card Skeleton */
.skeleton-card {
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

@keyframes skeleton-pulse {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.8;
  }
}

.skeleton-logo {
  width: 80px;
  height: 80px;
  border-radius: 8px;
}

.skeleton-title {
  width: 80%;
  height: 16px;
  margin: 0 auto;
}

.skeleton-stat-icon {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

.skeleton-stat-text {
  width: 20px;
  height: 12px;
}

/* Hero Section */
.organizations-hero {
  background: linear-gradient(135deg, #040677 0%, #1e40af 100%);
  color: white;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

.organizations-hero::before {
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

.container {
  max-width: 1200px;
}

/* Header */
.header-section {
  text-align: left;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 1rem;
}

.page-description {
  color: #6c757d;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 800px;
}

/* Search and Filter */
.search-filter-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-box .input-group-text {
  border-color: #dee2e6;
}

.search-box .form-control {
  border-color: #dee2e6;
}

.search-box .form-control:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.result-count {
  color: #6c757d;
  font-size: 0.9rem;
}

.sort-section {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.sort-section label {
  color: #6c757d;
  margin-bottom: 0;
}

/* Organizations Grid */
.organizations-grid {
  margin-top: 2rem;
}

.organization-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.organization-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.org-logo-container {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.org-logo {
  max-width: 80px;
  max-height: 80px;
  object-fit: contain;
  border-radius: 8px;
}

.org-content {
  flex: 1;
}

.org-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 1rem;
  line-height: 1.4;
  min-height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.org-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  justify-items: center;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #6c757d;
  font-size: 0.8rem;
  font-weight: 500;
}

.stat-item i {
  font-size: 0.9rem;
}

/* Pagination */
.pagination {
  margin-top: 2rem;
}

.page-link {
  color: #6c757d;
  border: 1px solid #dee2e6;
  padding: 0.5rem 0.75rem;
}

.page-link:hover {
  color: #0d6efd;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

/* Empty State */
.display-4 {
  font-size: 2.5rem;
  opacity: 0.5;
}

/* Responsive */
@media (max-width: 768px) {
  .organizations-hero {
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

  .page-title {
    font-size: 2rem;
  }

  .search-filter-section {
    padding: 1rem;
  }

  .search-filter-section .row > div {
    margin-bottom: 1rem;
  }

  .search-filter-section .row > div:last-child {
    margin-bottom: 0;
  }

  .sort-section {
    justify-content: space-between;
  }

  .organization-card {
    padding: 1rem;
  }

  .org-logo-container {
    height: 60px;
  }

  .org-logo {
    max-width: 60px;
    max-height: 60px;
  }

  .skeleton-logo {
    width: 60px;
    height: 60px;
  }

  .org-name {
    font-size: 0.9rem;
    min-height: 2.4rem;
  }

  .org-stats {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .stat-item {
    font-size: 0.75rem;
    gap: 0.3rem;
  }

  .stat-item i {
    font-size: 0.8rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 24px;
  }

  .sort-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .organizations-grid {
    margin-top: 1rem;
  }
}
</style>
