<template>
  <div class="visualisasi-detail">
    <!-- Loading State dengan Skeleton -->
    <div v-if="loading">
      <!-- Skeleton Hero Section -->
      <section class="visualisasi-hero">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-2 text-center">
              <div class="visualisasi-icon-container">
                <div class="skeleton skeleton-icon"></div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="visualisasi-info">
                <div class="skeleton skeleton-badge mb-3"></div>
                <div class="skeleton skeleton-title mb-3"></div>
                <div class="skeleton skeleton-description mb-4"></div>
                <div class="skeleton skeleton-description-short mb-4"></div>

                <div class="visualisasi-meta">
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
            <div class="col-lg-8">
              <div class="skeleton skeleton-chart"></div>
            </div>
            <div class="col-lg-4">
              <div class="skeleton skeleton-sidebar"></div>
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
      <button @click="fetchVisualisasi" class="btn btn-outline-danger btn-sm mt-2">
        Coba Lagi
      </button>
    </div>

    <!-- Main Content -->
    <div v-if="!loading && !error && visualisasi">
      <!-- Visualisasi Hero Section -->
      <section id="visualisasi-hero" class="visualisasi-hero">
        <div class="container" data-aos="fade-up">
          <div class="row align-items-center">
            <div class="col-lg-2 text-center visualisasi-icon-container-2">
              <div class="visualisasi-icon-container">
                <img src="@/assets/img/visualisasi.svg" alt="Mapsets" class="img-fluid" />
              </div>
            </div>
            <div class="col-lg-8">
              <div class="visualisasi-info">
                <div class="category-label text-white" :class="getCategoryClass(visualisasi.topic)">
                  <i class="bi bi-tag-fill me-2"></i>
                  {{ visualisasi.topic }}
                </div>
                <h1 class="visualisasi-title">{{ visualisasi.nama }}</h1>
                <p class="visualisasi-description">
                  {{ visualisasi.deskripsi || 'Tidak ada deskripsi tersedia.' }}
                </p>

                <div class="visualisasi-meta">
                  <div class="meta-item">
                    <i class="bx bx-user"></i>
                    <span v-if="visualisasi.user && visualisasi.user.organization">
                      {{ visualisasi.user.organization.name }}
                    </span>
                    <span v-else-if="visualisasi.user">
                      {{ visualisasi.user.name }}
                    </span>
                  </div>
                  <div class="meta-item">
                    <i class="bx bx-calendar"></i>
                    <span>Diperbarui {{ formatDate(visualisasi.updated_at) }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="bx bx-eye"></i>
                    <span>{{ visualisasi.views.toLocaleString('id-ID') }} views</span>
                  </div>

                  <div class="meta-item">
                    <i class="bx bx-check-circle" v-if="visualisasi.is_public"></i>
                    <i class="bx bx-lock" v-else></i>
                    <span>{{ visualisasi.is_public ? 'Public' : 'Private' }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="download-panel">
                <button @click="shareVisualisasi" class="btn-share">
                  <i class="bi bi-share me-2"></i>Bagikan
                </button>
                <div class="dropdown">
                  <button class="btn-download dropdown-toggle" data-bs-toggle="dropdown">
                    <i class="bi bi-download me-2"></i>Download
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" @click="downloadChart('png')">
                        <i class="bi bi-image me-2"></i>PNG Image
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" @click="downloadChart('jpg')">
                        <i class="bi bi-image me-2"></i>JPG Image
                      </a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a class="dropdown-item" @click="exportData('csv')">
                        <i class="bi bi-file-earmark-text me-2"></i>CSV Data
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" @click="exportData('json')">
                        <i class="bi bi-file-earmark-code me-2"></i>JSON Data
                      </a>
                    </li>
                  </ul>
                </div>
                <button @click="toggleFullscreen" class="btn-fullscreen">
                  <i class="bi bi-arrows-fullscreen me-2"></i>Fullscreen
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
            <!-- Chart Section -->
            <div class="col-lg-8">
              <div class="chart-section" data-aos="fade-up" data-aos-delay="100">
                <div class="section-title">
                  <h3><i class="bx bx-chart"></i> Visualisasi Chart</h3>
                  <div class="chart-controls">
                    <button @click="resetChart" class="btn btn-sm btn-outline-primary">
                      <i class="bi bi-arrow-clockwise"></i> Reset
                    </button>
                    <button @click="toggleChartSettings" class="btn btn-sm btn-outline-secondary">
                      <i class="bi bi-gear"></i> Settings
                    </button>
                  </div>
                </div>

                <!-- Chart Container -->
                <div class="chart-container">
                  <div
                    ref="chartContainer"
                    id="visualization-chart"
                    class="echarts-chart"
                    v-if="isDataValid()"
                  ></div>
                  <div v-else class="no-data-message">
                    <i class="bx bx-chart"></i>
                    <h4>Data Tidak Tersedia</h4>
                    <p>Chart tidak dapat ditampilkan karena data tidak valid atau kosong.</p>
                  </div>

                  <!-- Chart Settings Panel -->
                  <div v-if="showChartSettings" class="chart-settings-panel">
                    <h6>Pengaturan Chart</h6>
                    <div class="setting-item">
                      <label>
                        <input
                          type="checkbox"
                          v-model="chartSettings.showLabels"
                          @change="updateChart"
                        />
                        Tampilkan Label
                      </label>
                    </div>
                    <div class="setting-item">
                      <label>
                        <input
                          type="checkbox"
                          v-model="chartSettings.showLegend"
                          @change="updateChart"
                        />
                        Tampilkan Legend
                      </label>
                    </div>
                    <div class="setting-item" v-if="visualisasi.tipe !== 'pie_chart'">
                      <label>
                        <input
                          type="checkbox"
                          v-model="chartSettings.showGrid"
                          @change="updateChart"
                        />
                        Tampilkan Grid
                      </label>
                    </div>
                    <div class="setting-item">
                      <label>Tema:</label>
                      <select v-model="chartSettings.theme" @change="updateChart">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Data Table Section -->
              <div class="data-section" data-aos="fade-up" data-aos-delay="200" v-if="chartData">
                <div class="section-title">
                  <h3><i class="bx bx-table"></i> Data Table</h3>
                  <div class="table-controls">
                    <button
                      @click="showAllData = !showAllData"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      {{ showAllData ? 'Tampilkan Sebagian' : 'Tampilkan Semua' }}
                    </button>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>{{ chartData.xLabel }}</th>
                        <th>{{ chartData.yLabel }}</th>
                        <th>Persentase</th>
                        <th>Warna</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(label, index) in showAllData
                          ? chartData.labels
                          : chartData.labels.slice(0, 10)"
                        :key="index"
                      >
                        <td>{{ label }}</td>
                        <td>{{ chartData.values[index].toFixed(1) }}</td>
                        <td>{{ getPercentage(chartData.values[index]).toFixed(1) }}%</td>
                        <td>
                          <span
                            class="color-indicator"
                            :style="{ backgroundColor: chartData.colors[index] }"
                          ></span>
                          {{ chartData.colors[index] }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="col-lg-4">
              <!-- Statistik -->
              <div class="sidebar-widget" data-aos="fade-up" data-aos-delay="150">
                <h4><i class="bx bx-bar-chart-alt-2"></i> Statistik Data</h4>
                <div class="stats-container" v-if="chartData">
                  <div class="stat-box">
                    <span class="stat-number">{{ getMaxValue().toFixed(1) }}</span>
                    <span class="stat-label">Nilai Tertinggi</span>
                  </div>
                  <div class="stat-box">
                    <span class="stat-number">{{ getMinValue().toFixed(1) }}</span>
                    <span class="stat-label">Nilai Terendah</span>
                  </div>
                  <div class="stat-box">
                    <span class="stat-number">{{ getAverageValue().toFixed(1) }}</span>
                    <span class="stat-label">Rata-rata</span>
                  </div>
                  <div class="stat-box">
                    <span class="stat-number">{{ chartData.labels.length }}</span>
                    <span class="stat-label">Total Data</span>
                  </div>
                </div>
              </div>

              <!-- Informasi Detail -->
              <div class="sidebar-widget" data-aos="fade-up" data-aos-delay="200">
                <h4><i class="bx bx-info-circle"></i> Informasi Detail</h4>

                <div class="metadata-section">
                  <div class="metadata-section-title">Data Source</div>
                  <div class="metadata-item">
                    <strong>Sumber Data:</strong>
                    <span>{{
                      visualisasi.data_source === 'manual' ? 'Manual Input' : 'File Upload'
                    }}</span>
                  </div>
                  <div class="metadata-item">
                    <strong>Tipe Chart:</strong>
                    <span>{{ getChartTypeLabel(visualisasi.tipe) }}</span>
                  </div>
                  <div class="metadata-item">
                    <strong>Status:</strong>
                    <span
                      class="badge"
                      :class="visualisasi.is_active ? 'bg-success' : 'bg-secondary'"
                    >
                      {{ visualisasi.is_active ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                </div>

                <!-- <div class="metadata-section">
                  <div class="metadata-section-title">Creator</div>
                  <div class="metadata-item">
                    <strong>Nama:</strong>
                    <span>{{ visualisasi.user.name }}</span>
                  </div>
                  <div class="metadata-item">
                    <strong>Email:</strong>
                    <span>{{ visualisasi.user.email }}</span>
                  </div>
                  <div class="metadata-item">
                    <strong>Organisasi:</strong>
                    <span>{{
                      visualisasi.user.organization_id
                        ? 'Organisasi #' + visualisasi.user.organization_id
                        : 'Individual'
                    }}</span>
                  </div>
                </div> -->

                <div class="metadata-section">
                  <div class="metadata-section-title">Timestamps</div>
                  <div class="metadata-item">
                    <strong>Dibuat:</strong>
                    <span>{{ formatDate(visualisasi.created_at) }}</span>
                  </div>
                  <div class="metadata-item">
                    <strong>Diperbarui:</strong>
                    <span>{{ formatDate(visualisasi.updated_at) }}</span>
                  </div>
                  <!-- <div class="metadata-item">
                    <strong>UUID:</strong>
                    <small class="text-muted font-monospace">{{ visualisasi.uuid }}</small>
                  </div> -->
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="sidebar-widget" data-aos="fade-up" data-aos-delay="250">
                <h4><i class="bx bx-flash"></i> Quick Actions</h4>
                <div class="download-list">
                  <button @click="refreshData" class="download-btn">
                    <div class="download-info">
                      <span class="format-name">Refresh Data</span>
                      <span class="file-size">Reload visualization data</span>
                    </div>
                    <i class="bi bi-arrow-clockwise"></i>
                  </button>
                  <button @click="shareVisualisasi" class="download-btn">
                    <div class="download-info">
                      <span class="format-name">Share Visualization</span>
                      <span class="file-size">Share with others</span>
                    </div>
                    <i class="bi bi-share"></i>
                  </button>
                  <button @click="exportData('json')" class="download-btn">
                    <div class="download-info">
                      <span class="format-name">Export JSON</span>
                      <span class="file-size">Download data as JSON</span>
                    </div>
                    <i class="bi bi-download"></i>
                  </button>
                </div>
              </div>

              <!-- Visualisasi Terkait
              <div
                class="sidebar-widget"
                data-aos="fade-up"
                data-aos-delay="300"
                v-if="relatedVisualizations.length > 0"
              >
                <h4><i class="bx bx-collection"></i> Visualisasi Terkait</h4>
                <div class="related-list">
                  <div
                    v-for="related in relatedVisualizations"
                    :key="related.id"
                    @click="navigateToVisualization(related.slug)"
                    class="related-item"
                  >
                    <div class="related-icon">
                      <i class="bx bx-chart"></i>
                    </div>
                    <div class="related-content">
                      <span class="topic" :class="getCategoryClass(related.topic)">{{
                        related.topic
                      }}</span>
                      <h6>{{ related.nama }}</h6>
                      <span class="views">{{ formatViews(related.views) }} views</span>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'

export default {
  name: 'VisualisasiDetailView',
  props: {
    slug: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      // API Configuration
      apiUrl: import.meta.env.VITE_API_URL,

      // Data
      visualisasi: null,
      chartData: null,
      relatedVisualizations: [],

      // States
      loading: true,
      error: null,
      showAllData: false,
      showChartSettings: false,

      // Chart references
      chartInstance: null,

      // Chart settings
      chartSettings: {
        showLabels: true,
        showLegend: true,
        showGrid: true,
        theme: 'light',
      },

      // Topic colors mapping
      topicClassMap: {
        Ekonomi: 'category-ekonomi',
        Infrastruktur: 'category-infrastruktur',
        Kemiskinan: 'category-kemiskinan',
        Kependudukan: 'category-kependudukan',
        Kesehatan: 'category-kesehatan',
        Teknologi: 'category-teknologi',
        'Lingkungan Hidup': 'category-lingkungan',
        Pariwisata: 'category-pariwisata',
        Pemerintahan: 'category-pemerintah',
        Pendidikan: 'category-pendidikan',
        Sosial: 'category-sosial',
      },
    }
  },

  async mounted() {
    await this.fetchVisualisasi()

    if (this.chartData && !this.error) {
      this.$nextTick(() => {
        this.initChart()
      })
    }

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
      })
    }

    // Add keyboard event listeners
    window.addEventListener('keydown', this.handleKeyboard)
    window.addEventListener('resize', this.handleResize)
  },

  beforeUnmount() {
    this.cleanup()
    window.removeEventListener('keydown', this.handleKeyboard)
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    async fetchVisualisasi() {
      this.loading = true
      this.error = null

      try {
        const apiUrl = this.apiUrl.endsWith('/') ? this.apiUrl.slice(0, -1) : this.apiUrl
        const response = await axios.get(`${apiUrl}/visualisasi/${this.slug}`)

        if (response.data.success) {
          this.visualisasi = response.data.data.visualisasi

          // Process chart data from data_config
          if (this.visualisasi.data_config && this.visualisasi.data_config.data) {
            const rawData = this.visualisasi.data_config.data

            // Process data untuk menggabungkan duplicate labels
            const dataMap = new Map()

            rawData.labels.forEach((label, index) => {
              const value = rawData.values[index]
              if (dataMap.has(label)) {
                // Jika label sudah ada, tambahkan nilainya
                dataMap.set(label, dataMap.get(label) + value)
              } else {
                // Jika label baru, set nilainya
                dataMap.set(label, value)
              }
            })

            // Convert map back to arrays dan urutkan berdasarkan nilai (descending)
            const sortedEntries = Array.from(dataMap.entries()).sort((a, b) => b[1] - a[1])

            const processedLabels = sortedEntries.map((entry) => entry[0])
            const processedValues = sortedEntries.map((entry) => entry[1])

            this.chartData = {
              labels: processedLabels,
              values: processedValues,
              colors: this.generateColors(processedLabels.length),
              xLabel: this.visualisasi.data_config.x_label || 'Kategori',
              yLabel: this.visualisasi.data_config.y_label || 'Nilai',
            }
          }

          // Mock related visualizations (in real app, fetch from API)
          this.relatedVisualizations = [
            { id: 2, nama: 'Visualisasi Terkait 1', topic: 'Teknologi', views: 150, slug: 'vis-1' },
            { id: 3, nama: 'Visualisasi Terkait 2', topic: 'Kesehatan', views: 89, slug: 'vis-2' },
            { id: 4, nama: 'Visualisasi Terkait 3', topic: 'Ekonomi', views: 67, slug: 'vis-3' },
          ]
        } else {
          throw new Error(response.data.message || 'Failed to fetch visualisasi')
        }
      } catch (error) {
        console.error('Error fetching visualisasi:', error)
        if (error.response && error.response.status === 404) {
          this.$router.push({ name: 'NotFound' })
        } else {
          this.error = 'Gagal memuat detail visualisasi. Silakan coba lagi.'
        }
      } finally {
        this.loading = false
      }
    },

    generateColors(count) {
      const baseColors = [
        '#FF6B6B',
        '#4ECDC4',
        '#45B7D1',
        '#FFA07A',
        '#98D8C8',
        '#F7DC6F',
        '#BB8FCE',
        '#85C1E9',
        '#F8C471',
        '#82E0AA',
        '#F1948A',
        '#85C1E9',
        '#D7BDE2',
        '#A3E4D7',
        '#F9E79F',
      ]

      const colors = []
      for (let i = 0; i < count; i++) {
        if (i < baseColors.length) {
          colors.push(baseColors[i])
        } else {
          // Generate random color if we need more
          const hue = (i * 137.5) % 360
          colors.push(`hsl(${hue}, 70%, 60%)`)
        }
      }
      return colors
    },

    initChart() {
      if (!this.$refs.chartContainer || !this.chartData || !this.visualisasi) return

      try {
        // Initialize ECharts instance
        this.chartInstance = echarts.init(this.$refs.chartContainer, this.chartSettings.theme)

        // Create chart based on type
        this.updateChart()
      } catch (error) {
        console.error('Error initializing chart:', error)
      }
    },

    updateChart() {
      if (!this.chartInstance || !this.chartData) return

      let option = {}

      switch (this.visualisasi.tipe) {
        case 'pie_chart':
          option = this.getPieChartOption()
          break
        case 'bar_chart':
          option = this.getBarChartOption()
          break
        case 'line_chart':
          option = this.getLineChartOption()
          break
        default:
          option = this.getPieChartOption()
      }

      this.chartInstance.setOption(option, true)
    },

    getPieChartOption() {
      const data = this.chartData.labels.map((label, index) => ({
        name: label,
        value: this.chartData.values[index],
        itemStyle: {
          color: this.chartData.colors[index],
        },
      }))

      return {
        title: {
          text: this.visualisasi.nama,
          left: 'center',
          show: this.chartSettings.showLabels,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          show: this.chartSettings.showLegend,
          data: this.chartData.labels,
        },
        series: [
          {
            name: this.chartData.yLabel,
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: this.chartSettings.showLabels,
              position: 'outside',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: this.chartSettings.showLabels,
            },
            data: data,
          },
        ],
      }
    },

    getBarChartOption() {
      return {
        title: {
          text: this.visualisasi.nama,
          left: 'center',
          show: this.chartSettings.showLabels,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          show: this.chartSettings.showLegend,
          data: [this.chartData.yLabel],
        },
        grid: {
          show: this.chartSettings.showGrid,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            name: this.chartData.xLabel,
            data: this.chartData.labels,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              rotate: this.chartData.labels.some((label) => label.length > 8) ? 45 : 0,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: this.chartData.yLabel,
          },
        ],
        series: [
          {
            name: this.chartData.yLabel,
            type: 'bar',
            barWidth: '60%',
            data: this.chartData.values.map((value, index) => ({
              value: value,
              itemStyle: {
                color: this.chartData.colors[index],
              },
            })),
          },
        ],
      }
    },

    getLineChartOption() {
      return {
        title: {
          text: this.visualisasi.nama,
          left: 'center',
          show: this.chartSettings.showLabels,
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          show: this.chartSettings.showLegend,
          data: [this.chartData.yLabel],
        },
        grid: {
          show: this.chartSettings.showGrid,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          name: this.chartData.xLabel,
          boundaryGap: false,
          data: this.chartData.labels,
        },
        yAxis: {
          type: 'value',
          name: this.chartData.yLabel,
        },
        series: [
          {
            name: this.chartData.yLabel,
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 3,
              color: '#4ECDC4',
            },
            showSymbol: true,
            symbolSize: 8,
            itemStyle: {
              color: '#4ECDC4',
              borderColor: '#4ECDC4',
              borderWidth: 2,
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(78, 205, 196, 0.3)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(78, 205, 196, 0.05)',
                  },
                ],
              },
            },
            data: this.chartData.values,
          },
        ],
      }
    },

    resetChart() {
      this.chartSettings = {
        showLabels: true,
        showLegend: true,
        showGrid: true,
        theme: 'light',
      }
      this.updateChart()
      this.showToast('Chart berhasil direset', 'success')
    },

    toggleChartSettings() {
      this.showChartSettings = !this.showChartSettings
    },

    handleResize() {
      if (this.chartInstance) {
        setTimeout(() => {
          this.chartInstance.resize()
        }, 100)
      }
    },

    cleanup() {
      if (this.chartInstance) {
        this.chartInstance.dispose()
        this.chartInstance = null
      }
    },

    toggleFullscreen() {
      const chartContainer = this.$refs.chartContainer
      if (!chartContainer) return

      if (!document.fullscreenElement) {
        chartContainer.parentElement
          .requestFullscreen()
          .then(() => {
            setTimeout(() => {
              if (this.chartInstance) {
                this.chartInstance.resize()
              }
            }, 100)
          })
          .catch((error) => {
            console.error('Error entering fullscreen:', error)
            this.showToast('Failed to enter fullscreen', 'error')
          })
      } else {
        document.exitFullscreen().then(() => {
          setTimeout(() => {
            if (this.chartInstance) {
              this.chartInstance.resize()
            }
          }, 100)
        })
      }
    },

    downloadChart(format = 'png') {
      if (!this.chartInstance || !this.visualisasi) return

      try {
        const dataURL = this.chartInstance.getDataURL({
          type: format,
          pixelRatio: 2,
          backgroundColor: '#fff',
        })

        const link = document.createElement('a')
        link.download = `${this.visualisasi.nama
          .toLowerCase()
          .replace(/\s+/g, '_')}_chart.${format}`
        link.href = dataURL

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        this.showToast('Chart berhasil diunduh!', 'success')
      } catch (error) {
        console.error('Error downloading chart:', error)
        this.showToast('Gagal mengunduh chart', 'error')
      }
    },

    exportData(format) {
      if (!this.chartData) return

      if (format === 'csv') {
        this.exportCSV()
      } else if (format === 'json') {
        this.exportJSON()
      }
    },

    exportCSV() {
      const headers = [this.chartData.xLabel, this.chartData.yLabel]
      const rows = this.chartData.labels.map((label, index) => [
        label,
        this.chartData.values[index],
      ])

      let csvContent = headers.join(',') + '\n'
      csvContent += rows.map((row) => row.join(',')).join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${this.visualisasi.nama.toLowerCase().replace(/\s+/g, '_')}_data.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      this.showToast('Data CSV berhasil diunduh!', 'success')
    },

    exportJSON() {
      const exportData = {
        visualisasi: {
          nama: this.visualisasi.nama,
          tipe: this.visualisasi.tipe,
          topic: this.visualisasi.topic,
          deskripsi: this.visualisasi.deskripsi,
          created_at: this.visualisasi.created_at,
        },
        data: {
          labels: this.chartData.labels,
          values: this.chartData.values,
          colors: this.chartData.colors,
          xLabel: this.chartData.xLabel,
          yLabel: this.chartData.yLabel,
        },
        exported_at: new Date().toISOString(),
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${this.visualisasi.nama.toLowerCase().replace(/\s+/g, '_')}_data.json`
      a.click()
      window.URL.revokeObjectURL(url)

      this.showToast('Data JSON berhasil diunduh!', 'success')
    },

    shareVisualisasi() {
      if (navigator.share) {
        navigator
          .share({
            title: this.visualisasi.nama,
            text: this.visualisasi.deskripsi,
            url: window.location.href,
          })
          .catch((error) => {
            this.fallbackShare()
          })
      } else {
        this.fallbackShare()
      }
    },

    fallbackShare() {
      const shareUrl = window.location.href
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(shareUrl)
          .then(() => {
            this.showToast('Link berhasil disalin ke clipboard!', 'success')
          })
          .catch((error) => {
            console.error('Failed to copy to clipboard:', error)
            this.showToast('Gagal menyalin link', 'error')
          })
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = shareUrl
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
          const successful = document.execCommand('copy')
          if (successful) {
            this.showToast('Link berhasil disalin ke clipboard!', 'success')
          } else {
            this.showToast('Gagal menyalin link', 'error')
          }
        } catch (error) {
          console.error('Fallback copy failed:', error)
          this.showToast('Gagal menyalin link', 'error')
        }
        document.body.removeChild(textArea)
      }
    },

    showToast(message, type = 'info', duration = 3000) {
      const toast = document.createElement('div')
      toast.className = `toast toast-${type}`
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-size: 14px;
        font-weight: 500;
      `
      toast.textContent = message

      document.body.appendChild(toast)

      setTimeout(() => {
        toast.style.opacity = '1'
        toast.style.transform = 'translateX(0)'
      }, 10)

      setTimeout(() => {
        toast.style.opacity = '0'
        toast.style.transform = 'translateX(100%)'
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast)
          }
        }, 300)
      }, duration)
    },

    async refreshData() {
      await this.fetchVisualisasi()

      if (this.chartData && !this.error) {
        this.$nextTick(() => {
          this.initChart()
        })
      }

      this.showToast('Data berhasil diperbarui!', 'success')
    },

    getChartTypeLabel(type) {
      const typeLabels = {
        line_chart: 'Line Chart',
        bar_chart: 'Bar Chart',
        pie_chart: 'Pie Chart',
      }
      return typeLabels[type] || type
    },

    getMaxValue() {
      return this.chartData ? Math.max(...this.chartData.values) : 0
    },

    getMinValue() {
      return this.chartData ? Math.min(...this.chartData.values) : 0
    },

    getAverageValue() {
      if (!this.chartData) return 0
      const sum = this.chartData.values.reduce((acc, val) => acc + val, 0)
      return sum / this.chartData.values.length
    },

    getPercentage(value) {
      if (!this.chartData) return 0
      const total = this.chartData.values.reduce((acc, val) => acc + val, 0)
      return (value / total) * 100
    },

    getCategoryClass(topic) {
      return this.topicClassMap[topic] || 'category-default'
    },

    formatDate(dateString) {
      if (!dateString) return '-'

      try {
        const date = new Date(dateString)
        return date.toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      } catch (error) {
        console.error('Error formatting date:', error)
        return dateString
      }
    },

    formatViews(views) {
      if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M'
      } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K'
      }
      return views.toString()
    },

    navigateToVisualization(slug) {
      this.$router.push({ name: 'VisualisasiDetail', params: { slug } })
    },

    isDataValid() {
      return (
        this.chartData &&
        this.chartData.labels &&
        this.chartData.values &&
        this.chartData.labels.length > 0 &&
        this.chartData.values.length > 0 &&
        this.chartData.labels.length === this.chartData.values.length
      )
    },

    handleKeyboard(event) {
      if (!this.visualisasi) return

      switch (event.key) {
        case 'Escape':
          if (document.fullscreenElement) {
            document.exitFullscreen()
          }
          this.showChartSettings = false
          break
        case 'f':
        case 'F':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            this.toggleFullscreen()
          }
          break
        case 'r':
        case 'R':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            this.resetChart()
          }
          break
        case 's':
        case 'S':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            this.shareVisualisasi()
          }
          break
        case 'd':
        case 'D':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            this.downloadChart()
          }
          break
      }
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
  border-radius: 8px;
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
  border-radius: 20px;
}

.skeleton-badge {
  width: 80px;
  height: 24px;
  border-radius: 20px;
}

.skeleton-title {
  width: 70%;
  height: 40px;
}

.skeleton-description {
  width: 100%;
  height: 20px;
}

.skeleton-description-short {
  width: 80%;
  height: 20px;
}

.skeleton-meta {
  width: 120px;
  height: 16px;
}

.skeleton-chart {
  width: 100%;
  height: 500px;
  border-radius: 12px;
}

.skeleton-sidebar {
  width: 100%;
  height: 300px;
  border-radius: 12px;
}

/* Hero Section */
.visualisasi-hero {
  /* padding: 120px 0; */
  padding-top: 120px !important;
  background: linear-gradient(135deg, #040677 0%, #1e40af 100%);
  color: white;
}

.visualisasi-icon-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 25px;
  backdrop-filter: blur(10px);
  display: inline-block;
  margin-bottom: 20px;
}

.visualisasi-icon-container i {
  font-size: 50px;
  color: white;
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
}

.visualisasi-title {
  color: #ffffff;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
}

.visualisasi-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.9;
}

.visualisasi-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
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
  background: #47b2e4;
  color: white;
}

.btn-download:hover {
  background: #209dd8;
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

/* Main Content */
.section-bg {
  background-color: #f3f5fa;
  padding: 80px 0;
}

.chart-section,
.data-section {
  background: white;
  border-radius: 12px;
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
  color: #47b2e4;
}

.chart-controls,
.table-controls {
  display: flex;
  gap: 10px;
}

/* Chart Container */
.chart-container {
  position: relative;
  border-radius: 12px;
  overflow: visible;
}

.echarts-chart {
  height: 500px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #ebeef4;
}

.no-data-message {
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #ebeef4;
}

.no-data-message i {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* Chart Settings Panel */
.chart-settings-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  min-width: 200px;
  border: 1px solid #ebeef4;
}

.chart-settings-panel h6 {
  font-size: 14px;
  font-weight: 600;
  color: #37517e;
  margin-bottom: 15px;
}

.setting-item {
  margin-bottom: 12px;
  font-size: 14px;
}

.setting-item label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin: 0;
}

.setting-item select {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
}

/* Data Table */
.table-responsive {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ebeef4;
}

.table {
  margin-bottom: 0;
  font-size: 14px;
}

.table th {
  background-color: #f8f9fa;
  color: #37517e;
  font-weight: 600;
  border-top: none;
}

.color-indicator {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  margin-right: 8px;
  border: 1px solid #ddd;
}

/* Sidebar */
.sidebar-widget {
  background: white;
  border-radius: 12px;
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
  color: #47b2e4;
}

/* Stats Container */
.stats-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.stat-box {
  text-align: center;
  padding: 20px 15px;
  background: linear-gradient(135deg, #47b2e4, #209dd8);
  border-radius: 10px;
  color: white;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  display: block;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  opacity: 0.9;
  text-transform: uppercase;
  font-weight: 600;
}

/* Metadata Sections */
.metadata-section {
  margin-bottom: 25px;
}

.metadata-section-title {
  font-size: 14px;
  font-weight: 700;
  color: #37517e;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #47b2e4;
}

.metadata-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0;
  border-bottom: 1px solid #ebeef4;
  font-size: 14px;
}

.metadata-item:last-child {
  border-bottom: none;
}

.metadata-item strong {
  color: #37517e;
  min-width: 100px;
}

.metadata-item span {
  text-align: right;
  flex: 1;
  margin-left: 10px;
}

.metadata-item .badge {
  font-size: 11px;
  padding: 4px 8px;
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
  background: #f8f9fa;
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
  box-shadow: 0 4px 15px rgba(71, 178, 228, 0.3);
}

.download-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.format-name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
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
  background: #f8f9fa;
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;
  border: 1px solid #ebeef4;
}

.related-item:hover {
  background: linear-gradient(135deg, #47b2e4, #209dd8);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(71, 178, 228, 0.3);
}

.related-icon {
  background: #47b2e4;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.related-item:hover .related-icon {
  background: rgba(255, 255, 255, 0.2);
}

.related-content {
  flex: 1;
  min-width: 0;
}

.related-content h6 {
  font-size: 14px;
  font-weight: 600;
  color: #37517e;
  margin-bottom: 5px;
  line-height: 1.3;
}

.related-item:hover .related-content h6 {
  color: white;
}

.related-content .topic {
  font-size: 12px;
  color: #47b2e4;
  font-weight: 600;
  display: block;
  margin-bottom: 3px;
}

.related-item:hover .related-content .topic {
  color: rgba(255, 255, 255, 0.9);
}

.related-content .views {
  font-size: 11px;
  color: #6c757d;
}

.related-item:hover .related-content .views {
  color: rgba(255, 255, 255, 0.8);
}

/* Category Colors */
.category-ekonomi {
  background: rgba(255, 193, 7, 0.3);
  color: #856404;
}
.category-infrastruktur {
  background: rgba(111, 66, 193, 0.3);
  color: #5a2d91;
}
.category-kemiskinan {
  background: rgba(220, 53, 69, 0.3);
  color: #721c24;
}
.category-kependudukan {
  background: rgba(32, 201, 151, 0.3);
  color: #0f5132;
}
.category-kesehatan {
  background: rgba(71, 178, 228, 0.3);
  color: #055160;
}
.category-teknologi {
  background: rgba(13, 110, 253, 0.3);
  color: #052c65;
}
.category-lingkungan {
  background: rgba(25, 135, 84, 0.3);
  color: #0f5132;
}
.category-pariwisata {
  background: rgba(253, 126, 20, 0.3);
  color: #a24e00;
}
.category-pemerintah {
  background: rgba(108, 117, 125, 0.3);
  color: #495057;
}
.category-pendidikan {
  background: rgba(13, 202, 240, 0.3);
  color: #055160;
}
.category-sosial {
  background: rgba(232, 62, 140, 0.3);
  color: #801f4f;
}
.category-default {
  background: rgba(55, 81, 126, 0.3);
  color: #37517e;
}

/* Alert Styling */
.alert {
  border-radius: 12px;
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

/* Dropdown Menu */
.dropdown-menu {
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}

.dropdown-item {
  padding: 10px 15px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.dropdown-item:hover {
  background-color: #47b2e4;
  color: white;
}

.dropdown-item i {
  width: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .visualisasi-hero {
    padding: 80px 0 40px;
    text-align: center;
  }

  .visualisasi-title {
    font-size: 28px;
  }

  .visualisasi-description {
    font-size: 16px;
  }

  .visualisasi-meta {
    justify-content: center;
    gap: 15px;
    flex-direction: column;
    align-items: center;
  }

  .download-panel {
    margin-top: 30px;
  }

  .section-bg {
    padding: 60px 0;
  }

  .chart-section,
  .data-section {
    padding: 20px;
  }

  .echarts-chart {
    height: 400px;
  }

  .chart-settings-panel {
    position: relative;
    top: 0;
    right: 0;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .chart-controls,
  .table-controls {
    flex-direction: column;
    gap: 8px;
  }

  .section-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .metadata-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .metadata-item span {
    text-align: left;
  }
}

@media (max-width: 576px) {
  .visualisasi-hero {
    padding: 60px 0 30px;
  }
  .visualisasi-icon-container {
    width: 100px;
    height: 100px;
  }
  .visualisasi-icon-container-2 {
    padding-top: 100px;
  }
  .visualisasi-title {
    font-size: 24px;
  }

  .visualisasi-description {
    font-size: 14px;
  }

  .chart-section,
  .data-section,
  .sidebar-widget {
    padding: 15px;
  }

  .echarts-chart {
    height: 350px;
  }

  .section-title h3 {
    font-size: 20px;
  }

  .stat-number {
    font-size: 20px;
  }

  .download-panel {
    padding: 15px;
  }

  .btn-download,
  .btn-share,
  .btn-fullscreen {
    padding: 10px 12px;
    font-size: 13px;
  }
}
</style>
