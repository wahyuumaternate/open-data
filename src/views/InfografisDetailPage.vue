<template>
  <!-- Skeleton Loading State -->
  <div v-if="loading" class="loading-state">
    <!-- Hero Section Skeleton -->
    <section class="infografis-hero">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-2 text-center">
            <div class="skeleton skeleton-icon"></div>
          </div>
          <div class="col-lg-8">
            <div class="infografis-info">
              <div class="skeleton skeleton-category mb-3"></div>
              <div class="skeleton skeleton-title mb-3"></div>
              <div class="skeleton skeleton-description mb-4"></div>
              <div class="infografis-meta">
                <div class="skeleton skeleton-meta" v-for="n in 6" :key="n"></div>
              </div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="download-panel">
              <div class="skeleton skeleton-button mb-2" v-for="n in 3" :key="n"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Skeleton -->
    <section class="section-bg">
      <div class="container">
        <div class="row">
          <!-- Main Content Skeleton -->
          <div class="col-lg-8">
            <!-- Infografis Image Section Skeleton -->
            <div class="infografis-section">
              <div class="section-title">
                <div class="skeleton skeleton-section-title"></div>
                <div class="image-controls">
                  <div class="skeleton skeleton-control-btn" v-for="n in 2" :key="n"></div>
                </div>
              </div>
              <div class="skeleton skeleton-image"></div>
            </div>

            <!-- Additional Information Skeleton -->
            <div class="additional-info-section">
              <div class="section-title">
                <div class="skeleton skeleton-section-title"></div>
              </div>
              <div class="info-content">
                <!-- Data Sources Skeleton -->
                <div class="info-section">
                  <div class="skeleton skeleton-info-title mb-3"></div>
                  <div class="skeleton skeleton-info-item mb-2" v-for="n in 3" :key="n"></div>
                </div>

                <!-- Methodology Skeleton -->
                <div class="info-section">
                  <div class="skeleton skeleton-info-title mb-3"></div>
                  <div class="skeleton skeleton-info-text mb-2" v-for="n in 2" :key="n"></div>
                </div>

                <!-- Tags Skeleton -->
                <div class="info-section">
                  <div class="skeleton skeleton-info-title mb-3"></div>
                  <div class="tags-container">
                    <div class="skeleton skeleton-tag" v-for="n in 5" :key="n"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar Skeleton -->
          <div class="col-lg-4">
            <div class="sidebar">
              <!-- Quick Info Card Skeleton -->
              <div class="sidebar-widget">
                <div class="skeleton skeleton-widget-title mb-3"></div>
                <div class="info-list">
                  <div class="info-item" v-for="n in 6" :key="n">
                    <div class="skeleton skeleton-info-label"></div>
                    <div class="skeleton skeleton-info-value"></div>
                  </div>
                </div>
              </div>

              <!-- Share Card Skeleton -->
              <div class="sidebar-widget">
                <div class="skeleton skeleton-widget-title mb-3"></div>
                <div class="share-buttons mb-3">
                  <div class="skeleton skeleton-share-btn" v-for="n in 4" :key="n"></div>
                </div>
                <div class="share-link-container">
                  <div class="skeleton skeleton-share-input"></div>
                  <div class="skeleton skeleton-share-copy-btn"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Section Skeleton -->
    <div class="related-section">
      <div class="container">
        <div class="skeleton skeleton-related-title mb-5"></div>
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" v-for="n in 3" :key="n">
            <div class="related-card">
              <div class="skeleton skeleton-related-image"></div>
              <div class="card-body">
                <div class="skeleton skeleton-related-title mb-2"></div>
                <div class="skeleton skeleton-related-desc mb-3"></div>
                <div class="skeleton skeleton-related-btn"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="error-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 text-center">
          <div class="alert alert-danger">
            <i class="bi bi-exclamation-triangle-fill mb-3" style="font-size: 48px"></i>
            <h4>Terjadi Kesalahan</h4>
            <p>{{ error }}</p>
            <button @click="fetchInfografis" class="btn btn-outline-danger">
              <i class="bi bi-arrow-clockwise me-2"></i>Coba Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div v-else-if="!loading && !error && infografis" class="main-content">
    <!-- Infografis Hero Section -->
    <section id="infografis-hero" class="infografis-hero">
      <div class="container" data-aos="fade-up">
        <div class="row align-items-center">
          <div class="col-lg-2 text-center">
            <div class="infografis-icon-container">
              <img src="../assets/img/infografis.svg" alt="Infografis" class="img-fluid" />
            </div>
          </div>
          <div class="col-lg-8">
            <div class="infografis-info">
              <div
                class="category-label"
                :class="getCategoryClass(infografis.topic)"
                v-if="infografis.topic"
              >
                <i class="bi bi-tag-fill me-2"></i>
                {{ infografis.topic }}
              </div>
              <h1 class="infografis-title">{{ infografis.nama }}</h1>
              <p class="infografis-description">
                {{ infografis.deskripsi || 'Tidak ada deskripsi tersedia.' }}
              </p>

              <div class="infografis-meta">
                <div class="meta-item">
                  <i class="bx bx-building"></i>
                  <span>{{ getOrganizationName(infografis.user) }}</span>
                </div>
                <div class="meta-item">
                  <i class="bx bx-calendar"></i>
                  <span>Diperbarui {{ formatDate(infografis.updated_at) }}</span>
                </div>
                <div class="meta-item">
                  <i class="bx bx-eye"></i>
                  <span>{{ (infografis.views || 0).toLocaleString('id-ID') }} views</span>
                </div>
                <div class="meta-item">
                  <i class="bx bx-download"></i>
                  <span>{{ (infografis.downloads || 0).toLocaleString('id-ID') }} downloads</span>
                </div>
                <div class="meta-item" v-if="metadata.periode_text">
                  <i class="bx bx-clock"></i>
                  <span>{{ metadata.periode_text }}</span>
                </div>
                <div class="meta-item">
                  <i class="bx bx-globe"></i>
                  <span>{{ infografis.is_public ? 'Publik' : 'Terbatas' }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="download-panel">
              <button @click="downloadInfografis" class="btn-download">
                <i class="bi bi-download me-2"></i>Download
              </button>
              <button @click="shareInfografis" class="btn-share">
                <i class="bi bi-share me-2"></i>Bagikan
              </button>
              <button @click="toggleFullscreen" class="btn-fullscreen">
                <i class="bi bi-arrows-fullscreen me-2"></i>Fullscreen
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Section -->
    <section class="section-bg">
      <div class="container">
        <div class="row">
          <!-- Main Content -->
          <div class="col-lg-8">
            <!-- Infografis Image Section -->
            <div class="infografis-section" data-aos="fade-up" data-aos-delay="100">
              <!-- <div class="section-title">
                <h3><i class="bx bx-image"></i> Infografis</h3>
                <div class="image-controls">
                  <button @click="toggleFullscreen" class="btn btn-sm btn-outline-primary">
                    <i class="bi bi-arrows-fullscreen"></i> Fullscreen
                  </button>
                  <button @click="downloadInfografis" class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-download"></i> Download
                  </button>
                </div>
              </div> -->

              <!-- Image Container -->
              <div class="image-container" :class="{ fullscreen: isFullscreen }">
                <img
                  :src="infografis.gambar_url || getPlaceholderImage()"
                  :alt="infografis.nama"
                  class="img-fluid infografis-image"
                  @error="handleImageError"
                  @click="toggleFullscreen"
                />
                <div class="image-overlay" v-if="!isFullscreen">
                  <button @click="toggleFullscreen" class="btn btn-light btn-sm">
                    <i class="bi bi-zoom-in me-1"></i>
                    Klik untuk memperbesar
                  </button>
                </div>
                <button v-if="isFullscreen" @click="toggleFullscreen" class="close-fullscreen">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>

            <!-- Additional Information -->
            <div class="additional-info-section" data-aos="fade-up" data-aos-delay="200">
              <div class="section-title">
                <h3><i class="bx bx-info-circle"></i> Informasi Tambahan</h3>
              </div>

              <div class="info-content">
                <!-- Data Sources -->
                <div
                  class="info-section"
                  v-if="infografis.data_sources && infografis.data_sources.length > 0"
                >
                  <h5>Sumber Data</h5>
                  <ul class="data-sources-list">
                    <li v-for="(source, index) in infografis.data_sources" :key="index">
                      {{ source }}
                    </li>
                  </ul>
                </div>

                <!-- Methodology -->
                <div class="info-section" v-if="infografis.metodologi">
                  <h5>Metodologi</h5>
                  <p>{{ infografis.metodologi }}</p>
                </div>

                <!-- Tags -->
                <div class="info-section" v-if="infografis.tags && infografis.tags.length > 0">
                  <h5>Tags</h5>
                  <div class="tags-container">
                    <span
                      v-for="tag in infografis.tags"
                      :key="tag"
                      @click="searchByTag(tag)"
                      class="tag-item clickable"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="col-lg-4">
            <div class="sidebar" data-aos="fade-left" data-aos-delay="300">
              <!-- Quick Info Card -->
              <div class="sidebar-widget">
                <h4><i class="bx bx-info-circle"></i> Informasi Detail</h4>
                <div class="info-list">
                  <div class="info-item">
                    <span class="label">Topik:</span>
                    <span class="value">{{ infografis.topic || 'Tidak dikategorikan' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">Organisasi:</span>
                    <span class="value">{{ getOrganizationName(infografis.user) }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">Dibuat:</span>
                    <span class="value">{{ formatDate(infografis.created_at) }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">Diperbarui:</span>
                    <span class="value">{{ formatDate(infografis.updated_at) }}</span>
                  </div>
                  <div class="info-item" v-if="metadata.periode_text">
                    <span class="label">Periode Data:</span>
                    <span class="value">{{ metadata.periode_text }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">Status:</span>
                    <span class="value">
                      <span
                        class="status-badge"
                        :class="infografis.is_public ? 'public' : 'private'"
                      >
                        <i class="bi" :class="infografis.is_public ? 'bi-globe' : 'bi-lock'"></i>
                        {{ infografis.is_public ? 'Publik' : 'Terbatas' }}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Share Card -->
              <div class="sidebar-widget">
                <h4><i class="bx bx-share-alt"></i> Bagikan Infografis</h4>
                <div class="share-buttons">
                  <button @click="shareToFacebook" class="share-btn facebook">
                    <i class="bi bi-facebook"></i>
                  </button>
                  <button @click="shareToTwitter" class="share-btn twitter">
                    <i class="bi bi-twitter"></i>
                  </button>
                  <button @click="shareToWhatsApp" class="share-btn whatsapp">
                    <i class="bi bi-whatsapp"></i>
                  </button>
                  <button @click="copyLink" class="share-btn copy">
                    <i class="bi bi-link-45deg"></i>
                  </button>
                </div>
                <div class="share-link-container">
                  <input
                    type="text"
                    :value="currentUrl"
                    readonly
                    class="form-control form-control-sm"
                    id="shareLink"
                  />
                  <button @click="copyLink" class="btn btn-sm btn-outline-primary">
                    <i class="bi bi-clipboard"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Similar/Related Infografis -->
    <div
      v-if="(similar && similar.length > 0) || (related && related.length > 0)"
      class="related-section"
    >
      <div class="container">
        <h2 data-aos="fade-up">Infografis Terkait</h2>
        <div class="row">
          <div
            v-for="(item, index) in [...(similar || []), ...(related || [])].slice(0, 3)"
            :key="item.id"
            class="col-lg-4 col-md-6 mb-4"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="related-card">
              <div class="card-image">
                <img
                  :src="item.gambar_url || getPlaceholderImage()"
                  :alt="item.nama"
                  class="img-fluid"
                  @error="handleImageError"
                />
                <div class="category-tag" :class="getCategoryClass(item.topic)" v-if="item.topic">
                  {{ item.topic }}
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ item.nama }}</h5>
                <p class="card-description">{{ truncateText(item.deskripsi, 80) }}</p>
                <router-link
                  :to="`/infografis/${item.slug || item.id}`"
                  class="btn btn-primary btn-sm"
                >
                  Lihat Detail
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast Notification -->
  <div v-if="showToast" class="toast-container">
    <div class="toast show">
      <div class="toast-body">
        <i :class="toastIcon"></i>
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'InfografisDetail',
  data() {
    return {
      // API Configuration
      apiUrl: import.meta.env.VITE_API_URL,

      // State Management
      loading: true,
      error: null,

      // Data
      infografis: {},
      similar: [],
      related: [],
      metadata: {},

      // UI State
      isFullscreen: false,
      showToast: false,
      toastMessage: '',
      toastIcon: '',

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
    currentUrl() {
      return window.location.href
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

    // Track view
    this.trackView()
  },

  methods: {
    async fetchInfografis() {
      this.loading = true
      this.error = null

      try {
        // Simulate minimum loading time for better UX
        const [response] = await Promise.all([
          axios.get(`${this.apiUrl}infografis/${this.$route.params.slug || this.$route.params.id}`),
          new Promise((resolve) => setTimeout(resolve, 800)), // Minimum 800ms loading
        ])

        if (response.data.success) {
          const data = response.data.data
          this.infografis = data.infografis || {}
          this.similar = data.similar || []
          this.related = data.related || []
          this.metadata = data.metadata || {}

          // Update page title
          document.title = `${this.infografis.nama} - Satu Data Ternate`
        } else {
          throw new Error(response.data.message || 'Failed to fetch infografis')
        }
      } catch (error) {
        if (error.response?.status === 404) {
          this.$router.push({ name: 'NotFound' })
        } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network')) {
          this.error = 'Gagal terhubung ke server. Periksa koneksi internet Anda.'
        } else {
          this.error = 'Gagal memuat detail infografis. Silakan coba lagi.'
        }
      } finally {
        this.loading = false
      }
    },

    async trackView() {
      try {
        const slug = this.$route.params.slug || this.$route.params.id
        await axios.post(`${this.apiUrl}infografis/${slug}/view`)
      } catch (error) {
        // Silent fail for view tracking
        console.log('Failed to track view:', error)
      }
    },

    async downloadInfografis() {
      try {
        const slug = this.$route.params.slug || this.$route.params.id

        // Track download
        await axios.post(`${this.apiUrl}infografis/${slug}/download`)

        // Download file
        const link = document.createElement('a')
        link.href = this.infografis.gambar_url
        link.download = `${this.infografis.nama}.png`
        link.click()

        // Update download count
        this.infografis.downloads = (this.infografis.downloads || 0) + 1

        this.showToastMessage('File berhasil didownload!', 'bi-check-circle-fill')
      } catch (error) {
        this.showToastMessage('Gagal mendownload file', 'bi-exclamation-circle-fill')
      }
    },

    shareInfografis() {
      if (navigator.share) {
        navigator.share({
          title: this.infografis.nama,
          text: this.infografis.deskripsi,
          url: this.currentUrl,
        })
      } else {
        this.copyLink()
      }
    },

    shareToFacebook() {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        this.currentUrl
      )}`
      window.open(url, '_blank', 'width=600,height=400')
    },

    shareToTwitter() {
      const text = `${this.infografis.nama} - ${this.infografis.deskripsi}`
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(this.currentUrl)}`
      window.open(url, '_blank', 'width=600,height=400')
    },

    shareToWhatsApp() {
      const text = `${this.infografis.nama}\n${this.infografis.deskripsi}\n${this.currentUrl}`
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`
      window.open(url, '_blank')
    },

    async copyLink() {
      try {
        await navigator.clipboard.writeText(this.currentUrl)
        this.showToastMessage('Link berhasil disalin!', 'bi-check-circle-fill')
      } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = this.currentUrl
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        this.showToastMessage('Link berhasil disalin!', 'bi-check-circle-fill')
      }
    },

    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen
      if (this.isFullscreen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },

    searchByTag(tag) {
      this.$router.push(`/infografis?tag=${encodeURIComponent(tag)}`)
    },

    showToastMessage(message, icon) {
      this.toastMessage = message
      this.toastIcon = icon
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 3000)
    },

    getCategoryClass(topic) {
      return this.topicClassMap[topic] || 'category-default'
    },

    getPlaceholderImage() {
      return '/assets/img/infografis-placeholder.svg'
    },

    handleImageError(event) {
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
      if (user.organization && user.organization.name) {
        return user.organization.name
      }
      return user.name || 'Tidak diketahui'
    },
  },

  beforeUnmount() {
    // Reset body overflow when leaving page
    document.body.style.overflow = 'auto'
  },
}
</script>

<style scoped>
/* Skeleton Loading Styles */
.loading-state {
  min-height: 100vh;
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 8px;
  display: inline-block;
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
  width: 100px;
  height: 100px;
  border-radius: 20px;
}

.skeleton-category {
  width: 120px;
  height: 32px;
  border-radius: 20px;
}

.skeleton-title {
  width: 85%;
  height: 44px;
  border-radius: 8px;
}

.skeleton-description {
  width: 95%;
  height: 20px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.skeleton-meta {
  width: 100px;
  height: 18px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.skeleton-button {
  width: 100%;
  height: 44px;
  border-radius: 8px;
}

/* Main Content Skeleton */
.skeleton-section-title {
  width: 200px;
  height: 28px;
  border-radius: 8px;
}

.skeleton-control-btn {
  width: 100px;
  height: 32px;
  border-radius: 8px;
  margin-left: 8px;
}

.skeleton-image {
  width: 100%;
  height: 400px;
  border-radius: 12px;
}

.skeleton-info-title {
  width: 150px;
  height: 22px;
  border-radius: 8px;
}

.skeleton-info-item {
  width: 100%;
  height: 45px;
  border-radius: 8px;
}

.skeleton-info-text {
  width: 95%;
  height: 18px;
  border-radius: 8px;
}

.skeleton-tag {
  width: 80px;
  height: 32px;
  border-radius: 20px;
  margin-right: 8px;
  margin-bottom: 8px;
}

/* Sidebar Skeleton */
.skeleton-widget-title {
  width: 180px;
  height: 22px;
  border-radius: 8px;
}

.skeleton-info-label {
  width: 80px;
  height: 16px;
  border-radius: 8px;
}

.skeleton-info-value {
  width: 120px;
  height: 16px;
  border-radius: 8px;
}

.skeleton-share-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
}

.skeleton-share-input {
  flex: 1;
  height: 32px;
  border-radius: 8px;
}

.skeleton-share-copy-btn {
  width: 40px;
  height: 32px;
  border-radius: 8px;
  margin-left: 8px;
}

/* Related Section Skeleton */
.skeleton-related-title {
  width: 280px;
  height: 36px;
  border-radius: 8px;
  margin: 0 auto;
}

.skeleton-related-image {
  width: 100%;
  height: 200px;
  border-radius: 15px 15px 0 0;
}

.related-card .skeleton-related-title {
  width: 85%;
  height: 20px;
  border-radius: 8px;
}

.skeleton-related-desc {
  width: 95%;
  height: 16px;
  border-radius: 8px;
  margin-bottom: 4px;
}

.skeleton-related-btn {
  width: 110px;
  height: 32px;
  border-radius: 20px;
}

/* Hero Section - Matching Mapset Detail Style */
.infografis-hero {
  padding-top: 120px !important;
   background: #1581BF;
  color: white;
}

.infografis-icon-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  backdrop-filter: blur(10px);
  display: inline-block;
}

.infografis-icon-container img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 12px;
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
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
}

.infografis-title {
  color: #ffffff;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
}

.infografis-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.9;
}

.infografis-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
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

/* Download Panel - Matching Mapset Style */
.download-panel {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  text-align: center;
}

.btn-download,
.btn-share,
.btn-fullscreen {
  display: block;
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 14px;
}

.btn-download {
  background: #1acc8d;
  color: white;
}

.btn-download:hover {
  background: #1ff4a9ff;
  transform: translateY(-2px);
}

.btn-share,
.btn-fullscreen {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-share:hover,
.btn-fullscreen:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Main Content Section */
.section-bg {
  background-color: #f3f5fa;
  padding: 80px 0;
}

.infografis-section,
.additional-info-section {
  background: white;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 0 29px 0 rgba(68, 88, 144, 0.12);
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.section-title h3 {
  font-size: 24px;
  font-weight: 700;
  color: #37517e;
  margin: 0;
}

.section-title i {
  margin-right: 10px;
  color: #1acc8d;
}

.image-controls {
  display: flex;
  gap: 10px;
}

/* Image Container - Enhanced */
.image-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.infografis-image {
  width: 100%;
  height: auto;
  display: block;
  cursor: zoom-in;
  transition: transform 0.3s ease;
  border-radius: 12px;
}

.image-container:hover .infografis-image {
  transform: scale(1.02);
}

.image-overlay {
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

/* Fullscreen Image */
.image-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.95);
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container.fullscreen .infografis-image {
  max-width: 95%;
  max-height: 95%;
  width: auto;
  height: auto;
  cursor: zoom-out;
  object-fit: contain;
}

.close-fullscreen {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.close-fullscreen:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Info Content */
.info-content {
  padding: 0;
}

.info-section {
  margin-bottom: 30px;
}

.info-section:last-child {
  margin-bottom: 0;
}

.info-section h5 {
  font-size: 18px;
  font-weight: 700;
  color: #37517e;
  margin-bottom: 15px;
  border-bottom: 2px solid #1acc8d;
  padding-bottom: 8px;
}

.data-sources-list {
  list-style: none;
  padding: 0;
}

.data-sources-list li {
  background: #f8f9fa;
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 8px;
  border-left: 4px solid #1acc8d;
  font-size: 14px;
}

.tags-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag-item {
  background: #f1f5f9;
  color: #475569;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.tag-item.clickable {
  cursor: pointer;
}

.tag-item.clickable:hover {
  background: #1acc8d;
  color: white;
  border-color: #1acc8d;
  transform: translateY(-2px);
}

/* Sidebar - Matching Mapset Style */
.sidebar {
  position: sticky;
  top: 20px;
}

.sidebar-widget {
  background: white;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 0 29px 0 rgba(68, 88, 144, 0.12);
}

.sidebar-widget h4 {
  font-size: 18px;
  font-weight: 700;
  color: #37517e;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.sidebar-widget h4 i {
  margin-right: 10px;
  color: #1acc8d;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef4;
  font-size: 14px;
}

.info-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.info-item .label {
  font-weight: 600;
  color: #37517e;
  min-width: 100px;
}

.info-item .value {
  color: #6c757d;
  text-align: right;
  flex: 1;
  margin-left: 10px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.status-badge.public {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.private {
  background: #fee2e2;
  color: #991b1b;
}

/* Share Card */
.share-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.share-btn {
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.share-btn.facebook {
  background: #1877f2;
}

.share-btn.twitter {
  background: #1da1f2;
}

.share-btn.whatsapp {
  background: #25d366;
}

.share-btn.copy {
  background: #6c757d;
}

.share-link-container {
  display: flex;
  gap: 8px;
}

.share-link-container input {
  flex: 1;
  font-size: 12px;
}

/* Related Section */
.related-section {
  background: #f3f5fa;
  padding: 80px 0;
}

.related-section h2 {
  font-size: 32px;
  font-weight: 700;
  color: #37517e;
  text-align: center;
  margin-bottom: 40px;
}

.related-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid #ebeef4;
}

.related-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.related-card .card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.related-card .card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-card:hover .card-image img {
  transform: scale(1.05);
}

.related-card .category-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 11px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
}

.related-card .card-body {
  padding: 20px;
}

.related-card .card-title {
  font-size: 16px;
  font-weight: 700;
  color: #37517e;
  margin-bottom: 10px;
  line-height: 1.3;
}

.related-card .card-description {
  color: #6c757d;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
}

/* Button Styling */
.btn {
  border-radius: 25px;
  font-weight: 600;
  padding: 10px 20px;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #1acc8d 0%, #1ff4a9ff 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(71, 178, 228, 0.3);
  color: white;
}

.btn-outline-primary {
  border: 2px solid #1acc8d;
  color: #1acc8d;
  background: transparent;
}

.btn-outline-primary:hover {
  background: #1acc8d;
  color: white;
  transform: translateY(-2px);
}

.btn-outline-secondary {
  border: 2px solid #6c757d;
  color: #6c757d;
  background: transparent;
}

.btn-outline-secondary:hover {
  background: #6c757d;
  color: white;
  transform: translateY(-2px);
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
}

.toast {
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid #ebeef4;
  min-width: 300px;
}

.toast-body {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: #37517e;
}

.toast-body .bi-check-circle-fill {
  color: #10b981;
}

.toast-body .bi-exclamation-circle-fill {
  color: #ef4444;
}

/* Error States */
.loading-section,
.error-section {
  padding: 60px 0;
  background: #f8f9fa;
}

.alert {
  border-radius: 15px;
  padding: 25px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.alert-danger {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
}

.btn-outline-danger {
  border: 2px solid #dc3545;
  color: #721c24;
  background: transparent;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.btn-outline-danger:hover {
  background: #dc3545;
  color: white;
  transform: translateY(-2px);
}

/* Enhanced Loading Animation for Skeleton */
.skeleton-shimmer {
  position: relative;
  overflow: hidden;
}

.skeleton-shimmer::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
  content: '';
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Skeleton Pulse Animation */
.skeleton-pulse {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Loading State Improvements */
.loading-state .infografis-hero {
  padding: 120px 0 80px;
}

.loading-state .section-bg {
  padding: 80px 0;
}

.loading-state .related-section {
  padding: 80px 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .infografis-hero {
    padding: 60px 0 40px;
    text-align: center;
  }

  .infografis-title {
    font-size: 24px;
  }

  .infografis-description {
    font-size: 16px;
  }

  .infografis-meta {
    justify-content: center;
    gap: 15px;
    flex-direction: column;
    align-items: center;
  }

  .download-panel {
    margin-top: 30px;
  }

  .section-bg {
    padding: 40px 0;
  }

  .infografis-section,
  .additional-info-section {
    padding: 20px;
  }

  .image-controls {
    flex-direction: column;
    gap: 8px;
  }

  .section-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .infografis-icon-container,
  .loading-state .skeleton-icon {
    display: none;
  }

  .sidebar {
    margin-top: 40px;
  }

  /* Mobile Skeleton Adjustments */
  .loading-state .infografis-hero {
    padding: 40px 0 30px;
  }

  .loading-state .section-bg,
  .loading-state .related-section {
    padding: 40px 0;
  }

  .skeleton-meta {
    margin-bottom: 15px;
  }

  .skeleton-image {
    height: 250px;
  }

  .skeleton-related-image {
    height: 150px;
  }
}

@media (max-width: 576px) {
  .infografis-hero {
    padding: 40px 0 30px;
  }

  .infografis-title {
    font-size: 20px;
  }

  .download-panel .btn-download,
  .download-panel .btn-share,
  .download-panel .btn-fullscreen {
    padding: 10px 12px;
    font-size: 13px;
  }

  .image-container.fullscreen .infografis-image {
    max-width: 90%;
    max-height: 90%;
  }

  .close-fullscreen {
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  .related-section {
    padding: 40px 0;
  }

  .related-section h2 {
    font-size: 24px;
  }

  .related-card .card-image {
    height: 150px;
  }

  .toast-container {
    left: 20px;
    right: 20px;
    top: 20px;
  }

  .toast {
    min-width: auto;
    width: 100%;
  }

  /* Small Mobile Skeleton Adjustments */
  .skeleton-title {
    height: 28px;
  }

  .skeleton-description {
    height: 16px;
  }

  .skeleton-image {
    height: 200px;
  }

  .skeleton-related-title {
    width: 280px;
    height: 24px;
  }
}

/* Print Styles */
@media print {
  .loading-state,
  .sidebar,
  .download-panel,
  .image-controls,
  .related-section {
    display: none;
  }

  .section-bg {
    padding: 0;
  }

  .infografis-section,
  .additional-info-section {
    box-shadow: none;
    border: 1px solid #ddd;
  }

  .image-container {
    box-shadow: none;
    border: 1px solid #ddd;
  }
}

/* Accessibility Improvements */
.btn:focus,
.form-control:focus {
  outline: 2px solid #1acc8d;
  outline-offset: 2px;
}

.tag-item:focus {
  outline: 2px solid #1acc8d;
  outline-offset: 2px;
}

/* Category Classes for Dynamic Styling */
.category-ekonomi {
  background: rgba(107, 114, 128, 0.2);
}
.category-infrastruktur {
  background: rgba(107, 114, 128, 0.2);
}
.category-kemiskinan {
  background: rgba(107, 114, 128, 0.2);
}
.category-kependudukan {
  background: rgba(107, 114, 128, 0.2);
}
.category-kesehatan {
  background: rgba(107, 114, 128, 0.2);
}
.category-lingkungan {
  background: rgba(107, 114, 128, 0.2);
}
.category-pariwisata {
  background: rgba(107, 114, 128, 0.2);
}
.category-pemerintah {
  background: rgba(107, 114, 128, 0.2);
}
.category-pendidikan {
  background: rgba(107, 114, 128, 0.2);
}
.category-sosial {
  background: rgba(107, 114, 128, 0.2);
}
.category-default {
  background: rgba(107, 114, 128, 0.2);
}

/* Animation Enhancements */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.infografis-section,
.additional-info-section,
.sidebar > div {
  animation: fadeInUp 0.6s ease-out;
}

/* Prefers Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .skeleton,
  .skeleton-loading,
  .skeleton-pulse,
  .skeleton-shimmer::after {
    animation: none;
  }

  .infografis-section,
  .additional-info-section,
  .sidebar > div {
    animation: none;
  }

  * {
    transition: none !important;
  }
}
</style>
