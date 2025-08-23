<template>
  <div class="organization-detail">
    <!-- Organization Hero Section -->
    <section class="organization-hero section pt-5">
      <div class="container mt-5">
        <div class="row">
          <div class="col-lg-12 text-center">
            <!-- Loading Hero -->
            <div v-if="loading">
              <div class="skeleton skeleton-hero-title mb-4"></div>
              <div class="skeleton skeleton-hero-description mb-4"></div>
              <div class="skeleton skeleton-hero-stats"></div>
            </div>

            <!-- Hero Content -->
            <div v-else-if="organization && organization.name">
              <div class="org-logo-hero mb-3">
                <img
                  :src="organization.logo_url || '/assets/img/default-organization.png'"
                  :alt="organization.name || 'Organization'"
                  class="hero-logo"
                  @error="handleImageError"
                />
              </div>
              <h1 class="display-4 text-white mb-2">
                {{ organization.name || 'Nama Organisasi' }}
              </h1>
              <p class="lead text-white-50 mb-1">{{ organization.code || '' }}</p>
              <p class="lead text-white-50 mb-4" v-if="organization.description">
                {{ organization.description }}
              </p>

              <!-- Website Link -->
              <div class="hero-website mb-4" v-if="organization.website">
                <a
                  :href="organization.formatted_website || organization.website"
                  target="_blank"
                  class="btn btn-outline-light"
                >
                  <i class="bi bi-globe me-2"></i>Kunjungi Website
                </a>
              </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-5">
              <div class="alert alert-danger d-inline-block" role="alert">
                <i class="bi bi-exclamation-triangle me-2"></i>
                {{ error }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container py-5">
      <!-- Error State -->
      <div v-if="error" class="alert alert-danger" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        {{ error }}
        <button @click="fetchOrganizationDetail" class="btn btn-outline-danger btn-sm ms-2">
          Coba Lagi
        </button>
      </div>

      <!-- Content Navigation -->
      <div v-if="!loading && !error && organization" class="content-navigation mb-4">
        <ul class="nav nav-pills justify-content-center">
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'overview' }"
              @click="activeTab = 'overview'"
            >
              <i class="bi bi-info-circle me-2"></i>Overview
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'datasets' }"
              @click="activeTab = 'datasets'"
            >
              <i class="bi bi-database me-2"></i>Dataset ({{
                (organization && organization.total_datasets) || 0
              }})
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'infografis' }"
              @click="activeTab = 'infografis'"
            >
              <i class="bi bi-bar-chart me-2"></i>Infografis ({{
                (organization && organization.total_infografis) || 0
              }})
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'mapsets' }"
              @click="activeTab = 'mapsets'"
            >
              <i class="bi bi-map me-2"></i>Mapset ({{
                (organization && organization.total_mapsets) || 0
              }})
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'visualisasi' }"
              @click="activeTab = 'visualisasi'"
            >
              <i class="bi bi-eye me-2"></i>Visualisasi ({{
                (organization && organization.total_visualisasi) || 0
              }})
            </button>
          </li>
        </ul>
      </div>

      <!-- Loading Content -->
      <div v-if="loading" class="content-loading">
        <div class="row g-4">
          <div class="col-12" v-for="n in 6" :key="n">
            <div class="skeleton-content-card">
              <div class="skeleton-content-body">
                <div class="row align-items-center">
                  <div class="col-md-2">
                    <div class="skeleton skeleton-content-image"></div>
                  </div>
                  <div class="col-md-8">
                    <div class="skeleton skeleton-content-title mb-2"></div>
                    <div class="skeleton skeleton-content-desc mb-2"></div>
                    <div class="skeleton skeleton-content-meta"></div>
                  </div>
                  <div class="col-md-2">
                    <div class="skeleton skeleton-content-button"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content -->
      <div v-if="!loading && !error && organization" class="tab-content">
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="tab-pane active">
          <div class="row">
            <div class="col-lg-8">
              <div class="overview-card">
                <h4 class="mb-3">Informasi Organisasi</h4>
                <div class="info-grid">
                  <div class="info-item">
                    <label>Nama Lengkap:</label>
                    <span>{{ organization.name || 'Tidak tersedia' }}</span>
                  </div>
                  <div class="info-item">
                    <label>Kode Organisasi:</label>
                    <span class="badge bg-primary">{{ organization.code || 'N/A' }}</span>
                  </div>
                  <div class="info-item" v-if="organization.description">
                    <label>Deskripsi:</label>
                    <span>{{ organization.description }}</span>
                  </div>
                  <div class="info-item" v-if="organization.website">
                    <label>Website:</label>
                    <a
                      :href="organization.formatted_website || organization.website"
                      target="_blank"
                      class="website-link"
                    >
                      <i class="bi bi-globe me-1"></i>{{ organization.website }}
                    </a>
                  </div>
                  <div class="info-item">
                    <label>Dibuat:</label>
                    <span>{{ formatDate(organization.created_at) }}</span>
                  </div>
                  <div class="info-item">
                    <label>Terakhir Update:</label>
                    <span>{{ formatDate(organization.updated_at) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="stats-card">
                <h4 class="mb-3">Statistik Konten</h4>
                <div class="stats-list">
                  <div class="stat-row">
                    <i class="bi bi-database text-success"></i>
                    <span>Dataset</span>
                    <strong>{{ organization.total_datasets || 0 }}</strong>
                  </div>
                  <div class="stat-row">
                    <i class="bi bi-bar-chart text-info"></i>
                    <span>Infografis</span>
                    <strong>{{ organization.total_infografis || 0 }}</strong>
                  </div>
                  <div class="stat-row">
                    <i class="bi bi-map text-warning"></i>
                    <span>Mapset</span>
                    <strong>{{ organization.total_mapsets || 0 }}</strong>
                  </div>
                  <div class="stat-row">
                    <i class="bi bi-eye text-primary"></i>
                    <span>Visualisasi</span>
                    <strong>{{ organization.total_visualisasi || 0 }}</strong>
                  </div>
                  <div class="stat-row total-row">
                    <i class="bi bi-collection"></i>
                    <span>Total Konten</span>
                    <strong>{{ organization.total_content || 0 }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Datasets Tab -->
        <div v-if="activeTab === 'datasets'" class="tab-pane active">
          <div class="content-header">
            <h4>Dataset ({{ (content.datasets && content.datasets.length) || 0 }})</h4>
            <p class="text-muted">
              Dataset yang dipublikasikan oleh {{ organization.name || 'organisasi ini' }}
            </p>
          </div>

          <div v-if="content.datasets && content.datasets.length > 0" class="row g-4">
            <div class="col-12" v-for="dataset in content.datasets" :key="dataset.id">
              <div class="content-card">
                <div class="row align-items-center">
                  <div class="col-md-1">
                    <div class="content-icon">
                      <i class="bi bi-file-spreadsheet text-success"></i>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h6 class="content-title">{{ dataset.title || 'Untitled Dataset' }}</h6>
                    <p class="content-description">
                      {{ dataset.description || 'Tidak ada deskripsi' }}
                    </p>
                    <div class="content-meta">
                      <span class="badge bg-secondary me-2" v-if="dataset.file_type">{{
                        dataset.file_type.toUpperCase()
                      }}</span>
                      <small class="text-muted" v-if="dataset.user && dataset.user.name">
                        <i class="bi bi-person me-1"></i>{{ dataset.user.name }}
                      </small>
                      <small class="text-muted ms-3">
                        <i class="bi bi-calendar me-1"></i>{{ formatDate(dataset.updated_at) }}
                      </small>
                    </div>
                    <div class="content-tags mt-2" v-if="dataset.tags && dataset.tags.length > 0">
                      <span
                        v-for="tag in dataset.tags"
                        :key="tag"
                        class="badge bg-light text-dark me-1"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                  <div class="col-md-3 text-end">
                    <div class="content-stats mb-2">
                      <small class="text-muted d-block">
                        <i class="bi bi-download me-1"></i>{{ dataset.download_count || 0 }} unduhan
                      </small>
                      <small class="text-muted d-block">
                        <i class="bi bi-eye me-1"></i>{{ dataset.view_count || 0 }} dilihat
                      </small>
                    </div>
                    <button
                      class="btn btn-primary btn-sm"
                      @click="viewContent('dataset', dataset.slug)"
                      v-if="dataset.slug"
                    >
                      <i class="bi bi-eye me-1"></i>Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="empty-content">
            <i class="bi bi-database display-4 text-muted"></i>
            <h5 class="mt-3">Belum ada dataset</h5>
            <p class="text-muted">Organisasi ini belum mempublikasikan dataset apapun</p>
          </div>
        </div>

        <!-- Infografis Tab -->
        <div v-if="activeTab === 'infografis'" class="tab-pane active">
          <div class="content-header">
            <h4>Infografis ({{ (content.infografis && content.infografis.length) || 0 }})</h4>
            <p class="text-muted">
              Infografis yang dipublikasikan oleh {{ organization.name || 'organisasi ini' }}
            </p>
          </div>

          <div v-if="content.infografis && content.infografis.length > 0" class="row g-4">
            <div class="col-12" v-for="infografis in content.infografis" :key="infografis.id">
              <div class="content-card">
                <div class="row align-items-center">
                  <div class="col-md-1">
                    <div class="content-icon">
                      <i class="bi bi-bar-chart text-info"></i>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h6 class="content-title">{{ infografis.nama || 'Untitled Infografis' }}</h6>
                    <p class="content-description">
                      {{ infografis.deskripsi || 'Tidak ada deskripsi' }}
                    </p>
                    <div class="content-meta">
                      <span class="badge bg-secondary me-2" v-if="infografis.topic">{{
                        infografis.topic
                      }}</span>
                      <small class="text-muted" v-if="infografis.user && infografis.user.name">
                        <i class="bi bi-person me-1"></i>{{ infografis.user.name }}
                      </small>
                      <small class="text-muted ms-3">
                        <i class="bi bi-calendar me-1"></i>{{ formatDate(infografis.updated_at) }}
                      </small>
                    </div>
                    <div
                      class="content-tags mt-2"
                      v-if="infografis.tags && infografis.tags.length > 0"
                    >
                      <span
                        v-for="tag in infografis.tags"
                        :key="tag"
                        class="badge bg-light text-dark me-1"
                      >
                        {{ tag }}
                      </span>
                    </div>
                    <div
                      class="content-period mt-2"
                      v-if="infografis.periode_data_mulai || infografis.periode_data_selesai"
                    >
                      <small class="text-muted">
                        <i class="bi bi-calendar-range me-1"></i>
                        Periode: {{ formatDate(infografis.periode_data_mulai) }} -
                        {{ formatDate(infografis.periode_data_selesai) }}
                      </small>
                    </div>
                  </div>
                  <div class="col-md-3 text-end">
                    <div class="content-stats mb-2">
                      <small class="text-muted d-block">
                        <i class="bi bi-download me-1"></i>{{ infografis.downloads || 0 }} unduhan
                      </small>
                      <small class="text-muted d-block">
                        <i class="bi bi-eye me-1"></i>{{ infografis.views || 0 }} dilihat
                      </small>
                    </div>
                    <button
                      class="btn btn-primary btn-sm"
                      @click="viewContent('infografis', infografis.slug)"
                      v-if="infografis.slug"
                    >
                      <i class="bi bi-eye me-1"></i>Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="empty-content">
            <i class="bi bi-bar-chart display-4 text-muted"></i>
            <h5 class="mt-3">Belum ada infografis</h5>
            <p class="text-muted">Organisasi ini belum mempublikasikan infografis apapun</p>
          </div>
        </div>

        <!-- Mapsets Tab -->
        <div v-if="activeTab === 'mapsets'" class="tab-pane active">
          <div class="content-header">
            <h4>Mapset ({{ (content.mapsets && content.mapsets.length) || 0 }})</h4>
            <p class="text-muted">
              Mapset yang dipublikasikan oleh {{ organization.name || 'organisasi ini' }}
            </p>
          </div>

          <div v-if="content.mapsets && content.mapsets.length > 0" class="row g-4">
            <div class="col-12" v-for="mapset in content.mapsets" :key="mapset.id">
              <div class="content-card">
                <div class="row align-items-center">
                  <div class="col-md-1">
                    <div class="content-icon">
                      <i class="bi bi-map text-warning"></i>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h6 class="content-title">{{ mapset.nama || 'Untitled Mapset' }}</h6>
                    <p class="content-description">
                      {{ mapset.deskripsi || 'Tidak ada deskripsi' }}
                    </p>
                    <div class="content-meta">
                      <span class="badge bg-secondary me-2" v-if="mapset.topic">{{
                        mapset.topic
                      }}</span>
                      <small class="text-muted" v-if="mapset.user && mapset.user.name">
                        <i class="bi bi-person me-1"></i>{{ mapset.user.name }}
                      </small>
                      <small class="text-muted ms-3">
                        <i class="bi bi-calendar me-1"></i>{{ formatDate(mapset.updated_at) }}
                      </small>
                      <small class="text-muted ms-3" v-if="mapset.uuid">
                        <i class="bi bi-hash me-1"></i>{{ mapset.uuid.substring(0, 8) }}...
                      </small>
                    </div>
                    <div class="content-status mt-2">
                      <span class="badge bg-success me-1" v-if="mapset.is_visible">Visible</span>
                      <span class="badge bg-primary me-1" v-if="mapset.is_active">Active</span>
                    </div>
                  </div>
                  <div class="col-md-3 text-end">
                    <div class="content-stats mb-2">
                      <small class="text-muted d-block">
                        <i class="bi bi-eye me-1"></i>{{ mapset.views || 0 }} dilihat
                      </small>
                    </div>
                    <button
                      class="btn btn-primary btn-sm"
                      @click="viewContent('mapset', mapset.slug)"
                      v-if="mapset.slug"
                    >
                      <i class="bi bi-eye me-1"></i>Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="empty-content">
            <i class="bi bi-map display-4 text-muted"></i>
            <h5 class="mt-3">Belum ada mapset</h5>
            <p class="text-muted">Organisasi ini belum mempublikasikan mapset apapun</p>
          </div>
        </div>

        <!-- Visualisasi Tab -->
        <div v-if="activeTab === 'visualisasi'" class="tab-pane active">
          <div class="content-header">
            <h4>Visualisasi ({{ (content.visualisasi && content.visualisasi.length) || 0 }})</h4>
            <p class="text-muted">
              Visualisasi yang dipublikasikan oleh {{ organization.name || 'organisasi ini' }}
            </p>
          </div>

          <div v-if="content.visualisasi && content.visualisasi.length > 0" class="row g-4">
            <div class="col-12" v-for="visualisasi in content.visualisasi" :key="visualisasi.id">
              <div class="content-card">
                <div class="row align-items-center">
                  <div class="col-md-1">
                    <div class="content-icon">
                      <i class="bi bi-eye text-primary"></i>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h6 class="content-title">
                      {{ visualisasi.nama || visualisasi.title || 'Untitled Visualisasi' }}
                    </h6>
                    <p class="content-description">
                      {{
                        visualisasi.deskripsi || visualisasi.description || 'Tidak ada deskripsi'
                      }}
                    </p>
                    <div class="content-meta">
                      <span class="badge bg-secondary me-2" v-if="visualisasi.topic">{{
                        visualisasi.topic
                      }}</span>
                      <small class="text-muted" v-if="visualisasi.user && visualisasi.user.name">
                        <i class="bi bi-person me-1"></i>{{ visualisasi.user.name }}
                      </small>
                      <small class="text-muted ms-3">
                        <i class="bi bi-calendar me-1"></i>{{ formatDate(visualisasi.updated_at) }}
                      </small>
                    </div>
                    <div
                      class="content-tags mt-2"
                      v-if="visualisasi.tags && visualisasi.tags.length > 0"
                    >
                      <span
                        v-for="tag in visualisasi.tags"
                        :key="tag"
                        class="badge bg-light text-dark me-1"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                  <div class="col-md-3 text-end">
                    <div class="content-stats mb-2">
                      <small class="text-muted d-block" v-if="visualisasi.views !== undefined">
                        <i class="bi bi-eye me-1"></i>{{ visualisasi.views || 0 }} dilihat
                      </small>
                      <small class="text-muted d-block" v-if="visualisasi.downloads !== undefined">
                        <i class="bi bi-download me-1"></i>{{ visualisasi.downloads || 0 }} unduhan
                      </small>
                    </div>
                    <button
                      class="btn btn-primary btn-sm"
                      @click="viewContent('visualisasi', visualisasi.slug)"
                      v-if="visualisasi.slug"
                    >
                      <i class="bi bi-eye me-1"></i>Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="empty-content">
            <i class="bi bi-eye display-4 text-muted"></i>
            <h5 class="mt-3">Belum ada visualisasi</h5>
            <p class="text-muted">Organisasi ini belum mempublikasikan visualisasi apapun</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OrganizationDetail',
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
      loading: false,
      error: null,
      activeTab: 'overview',
      organization: null,
      content: {
        datasets: [],
        infografis: [],
        mapsets: [],
        visualisasi: [],
      },
      statistics: {},
    }
  },

  async mounted() {
    await this.fetchOrganizationDetail()
  },

  methods: {
    async fetchOrganizationDetail() {
      this.loading = true
      this.error = null

      try {
        const slug = this.$route.params.slug

        if (!slug) {
          throw new Error('Slug parameter is missing')
        }

        const apiUrl = this.apiUrl.endsWith('/') ? this.apiUrl.slice(0, -1) : this.apiUrl

        const response = await axios.get(`${apiUrl}/organizations/${slug}`)

        if (response.data.success) {
          this.organization = response.data.data.organization
          this.content = response.data.data.content || {
            datasets: [],
            infografis: [],
            mapsets: [],
            visualisasi: [],
          }
          this.statistics = response.data.data.statistics || {}
        } else {
          throw new Error(response.data.message || 'Failed to fetch organization')
        }
      } catch (error) {
        console.error('Error fetching organization:', error)
        if (error.response && error.response.status === 404) {
          this.error = 'Organisasi tidak ditemukan'
        } else {
          this.error = 'Gagal memuat detail organisasi. Silakan coba lagi.'
        }
      } finally {
        this.loading = false
      }
    },

    formatDate(dateStr) {
      if (!dateStr) return 'Tidak tersedia'
      try {
        const date = new Date(dateStr)
        return date.toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      } catch (error) {
        return 'Invalid date'
      }
    },

    handleImageError(event) {
      event.target.src = '/assets/img/default-organization.png'
    },

    viewContent(type, slug) {
      if (slug && this.$router) {
        this.$router.push(`/${type}/${slug}`)
      }
    },
  },
}
</script>

<style scoped>
.organization-detail {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.organization-hero {
  background: linear-gradient(135deg, #040677 0%, #1e40af 100%);
  color: white;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
  padding-top: 100px !important;
}

.org-logo-hero {
  margin-bottom: 1rem;
}

.hero-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
}

.hero-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.stat-hero-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
}

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

.skeleton-hero-title {
  height: 60px;
  width: 400px;
  margin: 0 auto;
}

.skeleton-hero-description {
  height: 24px;
  width: 300px;
  margin: 0 auto;
}

.skeleton-hero-stats {
  height: 40px;
  width: 500px;
  margin: 0 auto;
}

.skeleton-content-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
}

.skeleton-content-image {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin: 0 auto;
}

.skeleton-content-title {
  height: 20px;
  width: 80%;
}

.skeleton-content-desc {
  height: 16px;
  width: 100%;
}

.skeleton-content-meta {
  height: 14px;
  width: 60%;
}

.skeleton-content-button {
  height: 32px;
  width: 100px;
  margin-left: auto;
}

.content-navigation {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.nav-pills .nav-link {
  color: #6c757d;
  background: transparent;
  border: 1px solid #e9ecef;
  margin: 0 0.25rem;
  border-radius: 8px;
}

.nav-pills .nav-link.active {
  background: #0d6efd;
  border-color: #0d6efd;
  color: white;
}

.overview-card,
.stats-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: 100%;
}

.info-grid {
  display: grid;
  gap: 1rem;
}

.info-item {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.info-item label {
  font-weight: 600;
  color: #495057;
  margin: 0;
}

.website-link {
  color: #0d6efd;
  text-decoration: none;
}

.website-link:hover {
  text-decoration: underline;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-row span {
  flex: 1;
  color: #6c757d;
}

.total-row {
  background: #e7f3ff;
  border: 1px solid #b6d7ff;
}

.content-header {
  margin-bottom: 2rem;
}

.content-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.content-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.content-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 12px;
  margin: 0 auto;
}

.content-icon i {
  font-size: 24px;
}

.content-title {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #212529;
}

.content-description {
  color: #6c757d;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.content-meta {
  margin-bottom: 0.5rem;
}

.content-tags .badge {
  font-size: 0.75rem;
}

.content-stats small {
  font-size: 0.8rem;
}

.empty-content {
  text-align: center;
  padding: 3rem 1rem;
  color: #6c757d;
}

@media (max-width: 768px) {
  .hero-stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .stat-hero-item {
    font-size: 0.9rem;
    padding: 0.5rem;
  }

  .info-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    text-align: center;
  }

  .content-card .row > .col-md-1,
  .content-card .row > .col-md-8,
  .content-card .row > .col-md-3 {
    margin-bottom: 1rem;
  }

  .content-card .col-md-3 {
    text-align: center !important;
  }
}
</style>
