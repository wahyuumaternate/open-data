<template>
  <!-- Stats Section -->
  <section id="stats" class="stats section light-background">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <!-- Judul Section -->
      <div class="section-header text-center mb-5">
        <h2>Statistik Satu Data</h2>
        <p class="text-muted">
          Rangkuman jumlah data yang tersedia di portal Satu Data Kota Ternate.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="row gy-4">
        <div
          v-for="n in 4"
          :key="n"
          class="col-lg-3 col-md-6 d-flex flex-column align-items-center"
        >
          <div class="skeleton-icon"></div>
          <div class="stats-item text-center">
            <div class="skeleton skeleton-number"></div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-description"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="row">
        <div class="col-12">
          <div class="alert alert-warning text-center">
            <i class="bi bi-exclamation-triangle me-2"></i>
            {{ error }}
            <br />
            <button @click="fetchStats" class="btn btn-outline-warning btn-sm mt-2">
              Coba Lagi
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div v-if="!loading && !error" class="row gy-4">
        <!-- Total Dataset -->
        <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center stats-hover">
          <i class="bi bi-folder2-open"></i>
          <div class="stats-item text-center">
            <span
              :data-purecounter-end="statsData.total_dataset"
              data-purecounter-start="0"
              data-purecounter-duration="2"
              class="purecounter"
              ref="datasetCounter"
            >
              {{ formatNumber(statsData.total_dataset) }}
            </span>
            <p>Total Dataset</p>
            <small>Kumpulan data-data mentah berupa tabel yang dapat diunduh dan dianalisis</small>
          </div>
        </div>
        <!-- End Stats Item -->

        <!-- Total Mapset -->
        <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center stats-hover">
          <i class="bi bi-geo-alt"></i>
          <div class="stats-item text-center">
            <span
              :data-purecounter-end="statsData.total_mapset"
              data-purecounter-start="0"
              data-purecounter-duration="2"
              class="purecounter"
              ref="mapsetCounter"
            >
              {{ formatNumber(statsData.total_mapset) }}
            </span>
            <p>Total Mapset</p>
            <small
              >Kumpulan data geospasial yang dapat digunakan untuk pemetaan dan analisis
              lokasi</small
            >
          </div>
        </div>
        <!-- End Stats Item -->

        <!-- Total Visualisasi -->
        <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center stats-hover">
          <i class="bi bi-bar-chart-line"></i>
          <div class="stats-item text-center">
            <span
              :data-purecounter-end="statsData.total_visualisasi"
              data-purecounter-start="0"
              data-purecounter-duration="2"
              class="purecounter"
              ref="visualisasiCounter"
            >
              {{ formatNumber(statsData.total_visualisasi) }}
            </span>
            <p>Total Visualisasi</p>
            <small>Gambaran informasi data dalam bentuk grafik interaktif dan mudah dipahami</small>
          </div>
        </div>
        <!-- End Stats Item -->

        <!-- Total Infografik -->
        <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center stats-hover">
          <i class="bi bi-graph-up"></i>
          <div class="stats-item text-center">
            <span
              :data-purecounter-end="statsData.total_infografis"
              data-purecounter-start="0"
              data-purecounter-duration="2"
              class="purecounter"
              ref="infografisCounter"
            >
              {{ formatNumber(statsData.total_infografis) }}
            </span>
            <p>Total Infografis</p>
            <small
              >Informasi disajikan dalam bentuk visual agar lebih mudah dipahami masyarakat</small
            >
          </div>
        </div>
        <!-- End Stats Item -->
      </div>
    </div>
  </section>
  <!-- /Stats Section -->
</template>

<script>
import axios from 'axios'

export default {
  name: 'StatsSection',
  data() {
    return {
      // API Configuration
      apiUrl: import.meta.env.VITE_API_URL,

      // State Management
      loading: true,
      error: null,

      // Stats Data
      statsData: {
        total_dataset: 0,
        total_mapset: 0,
        total_visualisasi: 0,
        total_infografis: 0,
      },

      // Counter animation flags
      countersAnimated: false,
    }
  },

  async mounted() {
    await this.fetchStats()

    // Initialize intersection observer for counter animation
    this.initScrollAnimation()
  },

  methods: {
    async fetchStats() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get(`${this.apiUrl}total-data`)

        if (response.data.success) {
          this.statsData = response.data.data

          // Trigger counter animation after data is loaded
          this.$nextTick(() => {
            this.initCounterAnimation()
          })
        } else {
          throw new Error(response.data.message || 'Failed to fetch statistics')
        }
      } catch (error) {
        console.error('Error fetching statistics:', error)

        if (error.response?.status === 404) {
          this.error = 'Endpoint statistik tidak ditemukan'
        } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network')) {
          this.error = 'Gagal terhubung ke server. Periksa koneksi internet Anda.'
        } else {
          this.error = 'Gagal memuat statistik. Silakan coba lagi.'
        }

        // Set fallback values
        this.statsData = {
          total_dataset: 0,
          total_mapset: 0,
          total_visualisasi: 0,
          total_infografis: 0,
        }
      } finally {
        this.loading = false
      }
    },

    formatNumber(num) {
      if (num === null || num === undefined || num === 0) return '0'
      return num.toLocaleString('id-ID')
    },

    initScrollAnimation() {
      // Use Intersection Observer to trigger animation when section is visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.countersAnimated) {
              this.animateCounters()
              this.countersAnimated = true
            }
          })
        },
        { threshold: 0.5 }
      )

      const statsSection = document.getElementById('stats')
      if (statsSection) {
        observer.observe(statsSection)
      }
    },

    initCounterAnimation() {
      // Initialize PureCounter if available
      if (typeof PureCounter !== 'undefined') {
        new PureCounter()
      } else {
        // Fallback to custom animation
        this.animateCounters()
      }
    },

    animateCounters() {
      // Custom counter animation fallback
      const counters = [
        { ref: 'datasetCounter', target: this.statsData.total_dataset },
        { ref: 'mapsetCounter', target: this.statsData.total_mapset },
        { ref: 'visualisasiCounter', target: this.statsData.total_visualisasi },
        { ref: 'infografisCounter', target: this.statsData.total_infografis },
      ]

      counters.forEach(({ ref, target }) => {
        const element = this.$refs[ref]
        if (element && target > 0) {
          this.animateValue(element, 0, target, 2000)
        }
      })
    },

    animateValue(element, start, end, duration) {
      const startTimestamp = performance.now()

      const step = (timestamp) => {
        const elapsed = timestamp - startTimestamp
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(start + (end - start) * easeOutQuart)

        element.textContent = this.formatNumber(currentValue)

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          element.textContent = this.formatNumber(end)
        }
      }

      requestAnimationFrame(step)
    },
  },
}
</script>

<style scoped></style>
