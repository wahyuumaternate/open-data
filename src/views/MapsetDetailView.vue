<template>
  <div class="mapset-detail">
    <!-- Loading State dengan Skeleton -->
    <div v-if="loading">
      <!-- Skeleton Hero Section -->
      <section class="mapset-hero">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-2 text-center">
              <div class="mapset-icon-container">
                <div class="skeleton skeleton-icon"></div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="mapset-info">
                <div class="skeleton skeleton-badge mb-3"></div>
                <div class="skeleton skeleton-title mb-3"></div>
                <div class="skeleton skeleton-description mb-4"></div>
                <div class="skeleton skeleton-description-short mb-4"></div>

                <div class="mapset-meta">
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
              <div class="skeleton skeleton-map"></div>
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
      <button @click="fetchMapset" class="btn btn-outline-danger btn-sm mt-2">Coba Lagi</button>
    </div>

    <!-- Main Content -->
    <div v-if="!loading && !error && mapset">
      <!-- Mapset Hero Section -->
      <section id="mapset-hero" class="mapset-hero">
        <div class="container" data-aos="fade-up">
          <div class="row align-items-center">
            <div class="col-lg-2 text-center">
              <div class="mapset-icon-container">
                <img src="../assets/img/map.svg" alt="Mapsets" class="img-fluid" />
              </div>
            </div>
            <div class="col-lg-8">
              <div class="mapset-info">
                <div class="category-label" :class="getCategoryClass(mapset.topic)">
                  <i class="bi bi-geo-alt-fill me-2"></i>
                  {{ mapset.topic }}
                </div>
                <h1 class="mapset-title">{{ mapset.title }}</h1>
                <p class="mapset-description">
                  {{ mapset.description || 'Tidak ada deskripsi tersedia.' }}
                </p>

                <div class="mapset-meta">
                  <div class="meta-item">
                    <i class="bx bx-building"></i>
                    <span>{{ mapset.organization_name }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="bx bx-calendar"></i>
                    <span>Diperbarui {{ formatDate(mapset.updated_at) }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="bx bx-eye"></i>
                    <span>{{ mapset.view_count.toLocaleString('id-ID') }} views</span>
                  </div>
                  <div class="meta-item">
                    <i class="bx bx-map"></i>
                    <span>{{ mapset.statistics.feature_count }} Features</span>
                  </div>
                  <div class="meta-item">
                    <i class="bx bx-vector-pen"></i>
                    <span>{{ mapset.statistics.geometry_types.join(', ') }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="bx bx-area-chart"></i>
                    <span>{{ calculateArea() }} Area</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="download-panel">
                <button @click="downloadGeoJSON" class="btn-download">
                  <i class="bi bi-download me-2"></i>Download GeoJSON
                </button>
                <button @click="shareMapset" class="btn-share">
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

      <!-- Main Content -->
      <section class="section-bg">
        <div class="container">
          <div class="row">
            <!-- Map Section - Full Width -->
            <div class="col-12">
              <div class="map-section" data-aos="fade-up" data-aos-delay="100">
                <div class="section-title">
                  <h3><i class="bx bx-map"></i> Peta Interaktif</h3>
                  <div class="map-controls">
                    <button @click="resetMapView" class="btn btn-sm btn-outline-primary">
                      <i class="bi bi-house"></i> Reset View
                    </button>
                    <button @click="toggleLayerPanel" class="btn btn-sm btn-outline-secondary">
                      <i class="bi bi-layers"></i> Layers
                    </button>
                  </div>
                </div>

                <!-- Map Container -->
                <div class="map-container">
                  <div id="mapset-map" class="leaflet-map"></div>

                  <!-- Layer Panel -->
                  <div v-if="showLayerPanel" class="layer-panel">
                    <h6>Base Maps</h6>
                    <div class="layer-item">
                      <input
                        type="radio"
                        id="osm"
                        value="osm"
                        v-model="selectedBaseLayer"
                        @change="changeBaseLayer"
                      />
                      <label for="osm">OpenStreetMap</label>
                    </div>
                    <div class="layer-item">
                      <input
                        type="radio"
                        id="satellite"
                        value="satellite"
                        v-model="selectedBaseLayer"
                        @change="changeBaseLayer"
                      />
                      <label for="satellite">Satellite</label>
                    </div>
                    <div class="layer-item">
                      <input
                        type="radio"
                        id="terrain"
                        value="terrain"
                        v-model="selectedBaseLayer"
                        @change="changeBaseLayer"
                      />
                      <label for="terrain">Terrain</label>
                    </div>

                    <hr />

                    <h6>Data Layers</h6>
                    <div class="layer-item">
                      <input
                        type="checkbox"
                        id="features"
                        v-model="showFeatures"
                        @change="toggleFeatures"
                      />
                      <label for="features">Mapset Features</label>
                    </div>
                  </div>

                  <!-- Map Legend -->
                  <div class="map-legend">
                    <h6>Legend</h6>
                    <div class="legend-item">
                      <div class="legend-color" style="background: #47b2e4"></div>
                      <span>{{ mapset.topic }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Feature Information -->
              <div
                class="feature-info-section"
                data-aos="fade-up"
                data-aos-delay="200"
                v-if="selectedFeature"
              >
                <div class="section-title">
                  <h3><i class="bx bx-info-circle"></i> Informasi Feature</h3>
                </div>
                <div class="feature-info-content">
                  <div class="feature-header">
                    <h5>{{ getFeatureName(selectedFeature) }}</h5>
                    <span class="feature-type">{{ getFeatureType(selectedFeature) }}</span>
                  </div>
                  <div class="feature-properties">
                    <div class="row">
                      <div
                        v-for="(value, key) in getFilteredProperties(selectedFeature.properties)"
                        :key="key"
                        class="col-md-6 mb-2"
                      >
                        <strong>{{ formatPropertyKey(key) }}:</strong>
                        <span class="ms-1">{{ formatPropertyValue(value) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Description Modal -->
    <div
      v-if="showDescriptionModal && selectedFeature"
      class="modal-overlay"
      @click="showDescriptionModal = false"
    >
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h5>Detail Information - {{ getFeatureName(selectedFeature) }}</h5>
          <button @click="showDescriptionModal = false" class="btn-close">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <div class="modal-body">
          <div v-html="selectedFeature.properties.DESCRIPTION" class="description-content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix untuk Leaflet icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default {
  name: 'MapsetDetailView',
  props: ['identifier'],
  data() {
    return {
      // API Configuration
      apiUrl: 'http://127.0.0.1:8000/api/v1/',

      // Loading and Error States
      loading: false,
      error: null,

      // Data from API
      mapset: null,
      relatedMapsets: [
        {
          uuid: 'example-1',
          title: 'Data Infrastruktur Kota Ternate',
          topic: 'Infrastruktur',
          view_count: 245,
          thumbnail: null,
        },
        {
          uuid: 'example-2',
          title: 'Peta Kemiskinan Maluku Utara',
          topic: 'Kemiskinan',
          view_count: 189,
          thumbnail: null,
        },
      ],

      // Map related
      map: null,
      geoJsonLayer: null,
      selectedFeature: null,
      showLayerPanel: false,
      selectedBaseLayer: 'osm',
      showFeatures: true,
      baseLayers: {},
      showDescriptionModal: false,

      // Category mapping
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

  async mounted() {
    await this.fetchMapset()

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
      })
    }
  },

  beforeUnmount() {
    if (this.map) {
      this.map.remove()
    }
  },

  methods: {
    async fetchMapset() {
      this.loading = true
      this.error = null

      try {
        const identifier = this.$route?.params?.identifier || this.identifier

        if (!identifier) {
          throw new Error('Identifier parameter tidak ditemukan di URL')
        }

        console.log('Fetching mapset with identifier:', identifier)

        const response = await axios.get(`${this.apiUrl}mapsets/${identifier}`)

        if (response.data.success) {
          this.mapset = response.data.data.mapset
          console.log('Mapset loaded:', this.mapset)

          // Initialize map after data is loaded
          this.$nextTick(() => {
            setTimeout(() => {
              this.initMap()
            }, 500)
          })
        } else {
          throw new Error(response.data.message || 'Failed to fetch mapset')
        }
      } catch (error) {
        console.error('Error fetching mapset:', error)
        if (error.response?.status === 404) {
          this.error = 'Mapset tidak ditemukan atau tidak tersedia untuk publik'
        } else if (error.message.includes('Identifier parameter')) {
          this.error = 'Parameter URL tidak valid. Pastikan URL dalam format /mapset/{identifier}'
        } else {
          this.error = 'Gagal memuat mapset. Silakan coba lagi.'
        }
      } finally {
        this.loading = false
      }
    },

    initMap() {
      if (!this.mapset || !this.mapset.geojson || !this.mapset.geojson.features.length) {
        console.warn('No geographic data available for map initialization')
        return
      }

      try {
        // Create map
        this.map = L.map('mapset-map', {
          zoomControl: true,
          attributionControl: true,
        })

        // Base layers
        this.baseLayers = {
          osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
          }),
          satellite: L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
              attribution: '© Esri',
            }
          ),
          terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenTopoMap contributors',
          }),
        }

        // Add default base layer
        this.baseLayers.osm.addTo(this.map)

        // Add GeoJSON data
        this.addGeoJSONLayer()

        // Fit map to bounds
        this.fitMapToBounds()

        console.log('Map initialized successfully')
      } catch (error) {
        console.error('Error initializing map:', error)
      }
    },

    addGeoJSONLayer() {
      if (!this.mapset.geojson) return

      this.geoJsonLayer = L.geoJSON(this.mapset.geojson, {
        style: (feature) => {
          return {
            color: '#47b2e4',
            weight: 2,
            opacity: 0.8,
            fillColor: '#47b2e4',
            fillOpacity: 0.3,
          }
        },
        onEachFeature: (feature, layer) => {
          // Add popup
          const popupContent = this.createPopupContent(feature)
          layer.bindPopup(popupContent)

          // Add click event
          layer.on('click', () => {
            this.selectedFeature = feature
          })

          // Add hover effects
          layer.on('mouseover', () => {
            layer.setStyle({
              weight: 3,
              opacity: 1,
              fillOpacity: 0.5,
            })
          })

          layer.on('mouseout', () => {
            layer.setStyle({
              weight: 2,
              opacity: 0.8,
              fillOpacity: 0.3,
            })
          })
        },
      }).addTo(this.map)
    },

    createPopupContent(feature) {
      const props = feature.properties || {}
      const name = props.NAMA || props.nama || props.name || 'Unnamed Feature'

      let content = `<div class="popup-content">
        <h6>${name}</h6>
        <div class="popup-details">`

      // Add key properties
      const keyProps = ['NAMA', 'nama_usaha', 'komoditas', 'kegiatan', 'lokasi']
      keyProps.forEach((key) => {
        if (props[key] && props[key] !== name) {
          content += `<p><strong>${this.formatPropertyKey(key)}:</strong> ${props[key]}</p>`
        }
      })

      content += `</div></div>`
      return content
    },

    fitMapToBounds() {
      if (!this.mapset.bounds || !this.geoJsonLayer) return

      try {
        const bounds = L.latLngBounds(
          [parseFloat(this.mapset.bounds[0][0]), parseFloat(this.mapset.bounds[0][1])],
          [parseFloat(this.mapset.bounds[1][0]), parseFloat(this.mapset.bounds[1][1])]
        )

        this.map.fitBounds(bounds, { padding: [20, 20] })
      } catch (error) {
        console.error('Error fitting map to bounds:', error)
        // Fallback to Indonesia bounds
        this.map.setView([-2.5, 118], 5)
      }
    },

    resetMapView() {
      this.fitMapToBounds()
    },

    toggleLayerPanel() {
      this.showLayerPanel = !this.showLayerPanel
    },

    changeBaseLayer() {
      // Remove all base layers
      Object.values(this.baseLayers).forEach((layer) => {
        this.map.removeLayer(layer)
      })

      // Add selected base layer
      this.baseLayers[this.selectedBaseLayer].addTo(this.map)
    },

    toggleFeatures() {
      if (this.showFeatures && this.geoJsonLayer) {
        this.map.addLayer(this.geoJsonLayer)
      } else if (this.geoJsonLayer) {
        this.map.removeLayer(this.geoJsonLayer)
      }
    },

    toggleFullscreen() {
      const mapContainer = document.getElementById('mapset-map').parentElement
      if (!document.fullscreenElement) {
        mapContainer.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    },

    async downloadGeoJSON() {
      try {
        const identifier = this.$route?.params?.identifier || this.identifier
        const response = await axios.get(`${this.apiUrl}mapsets/${identifier}/geojson`)

        const dataStr = JSON.stringify(response.data, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/geo+json' })

        const link = document.createElement('a')
        link.href = URL.createObjectURL(dataBlob)
        link.download = `${this.mapset.slug || this.mapset.uuid}.geojson`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error('Error downloading GeoJSON:', error)
        alert('Gagal mengunduh file GeoJSON')
      }
    },

    shareMapset() {
      if (navigator.share) {
        navigator.share({
          title: this.mapset.title,
          text: this.mapset.description,
          url: window.location.href,
        })
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert('Link berhasil disalin ke clipboard!')
        })
      }
    },

    getCategoryClass(topic) {
      return this.topicClassMap[topic] || 'category-default'
    },

    getMapsetThumbnail(mapset) {
      return mapset.thumbnail || '/assets/img/map-placeholder.jpg'
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

    getFeatureName(feature) {
      const props = feature.properties || {}
      return props.NAMA || props.nama_usaha || props.name || 'Unnamed Feature'
    },

    getFeatureType(feature) {
      return feature.geometry?.type || 'Unknown'
    },

    getFilteredProperties(properties) {
      // Filter out unwanted properties
      const excluded = ['feature_id', 'DESCRIPTION', 'INPUT_TYPE', 'ORIGINAL_FILE']
      const filtered = {}

      Object.keys(properties).forEach((key) => {
        if (!excluded.includes(key) && properties[key] !== null && properties[key] !== '') {
          filtered[key] = properties[key]
        }
      })

      return filtered
    },

    formatPropertyKey(key) {
      return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    },

    formatPropertyValue(value) {
      if (typeof value === 'string' && value.length > 100) {
        return value.substring(0, 100) + '...'
      }
      return value
    },

    getGeometryIcon(type) {
      const icons = {
        Point: 'bi bi-geo-alt-fill',
        LineString: 'bi bi-vector-pen',
        Polygon: 'bi bi-bounding-box',
        MultiPoint: 'bi bi-geo-fill',
        MultiLineString: 'bi bi-bezier',
        MultiPolygon: 'bi bi-box',
      }
      return icons[type] || 'bi bi-question-circle'
    },

    calculateArea() {
      // Simple area calculation (approximate)
      if (!this.mapset.bounds) return 'N/A'

      try {
        const lat1 = parseFloat(this.mapset.bounds[0][0])
        const lng1 = parseFloat(this.mapset.bounds[0][1])
        const lat2 = parseFloat(this.mapset.bounds[1][0])
        const lng2 = parseFloat(this.mapset.bounds[1][1])

        const area = Math.abs((lat2 - lat1) * (lng2 - lng1)) * 111 * 111 // Rough km²
        return area > 1 ? `${area.toFixed(1)} km²` : `${(area * 1000000).toFixed(0)} m²`
      } catch (error) {
        return 'N/A'
      }
    },

    goToMapset(mapset) {
      this.$router.push(`/mapset/${mapset.uuid}`)
    },

    formatInputType(inputType) {
      const types = {
        kmz_import: 'KMZ Import',
        shapefile: 'Shapefile',
        manual_coordinates: 'Manual Coordinates',
        geojson: 'GeoJSON',
      }
      return types[inputType] || inputType
    },

    formatDateProperty(dateStr) {
      if (!dateStr) return 'N/A'

      // Handle different date formats
      if (dateStr.includes('/')) {
        // Format MM/DD/YYYY
        const parts = dateStr.split('/')
        if (parts.length === 3) {
          const date = new Date(parts[2], parts[0] - 1, parts[1])
          return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }
      }

      // Default date parsing
      try {
        const date = new Date(dateStr)
        return date.toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      } catch (error) {
        return dateStr
      }
    },

    isDescriptionHTML(description) {
      return description && description.includes('<html>')
    },

    truncateText(text, maxLength) {
      if (!text) return 'N/A'
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
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

.skeleton-map {
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
.mapset-hero {
  padding-top: 120px !important;
  background: linear-gradient(135deg, #040677 0%, #040677 100%);
  color: white;
}

.mapset-icon-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  backdrop-filter: blur(10px);
  display: inline-block;
}

.mapset-icon {
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
}

.mapset-title {
  color: #ffffff;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
}

.mapset-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.9;
}

.mapset-meta {
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

.map-section,
.feature-info-section {
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
  color: #47b2e4;
}

.map-controls {
  display: flex;
  gap: 10px;
}

/* Map Container */
.map-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.leaflet-map {
  height: 100vh;
  width: 100%;
  border-radius: 12px;
}

/* Layer Panel */
.layer-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  min-width: 200px;
}

.layer-panel h6 {
  font-size: 14px;
  font-weight: 600;
  color: #37517e;
  margin-bottom: 10px;
}

.layer-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}

.layer-item input[type='radio'],
.layer-item input[type='checkbox'] {
  margin: 0;
}

.layer-item label {
  margin: 0;
  cursor: pointer;
}

/* Map Legend */
.map-legend {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.map-legend h6 {
  font-size: 14px;
  font-weight: 600;
  color: #37517e;
  margin-bottom: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 2px;
}

/* Feature Information */
.feature-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef4;
}

.feature-header h5 {
  color: #37517e;
  font-weight: 700;
  margin: 0;
}

.feature-type {
  background: #47b2e4;
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
}

.feature-properties {
  font-size: 14px;
}

.feature-properties strong {
  color: #37517e;
}

/* Popup Content */
.popup-content {
  max-width: 300px;
}

.popup-content h6 {
  color: #37517e;
  font-weight: 700;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebeef4;
  padding-bottom: 5px;
}

.popup-details p {
  margin-bottom: 8px;
  font-size: 13px;
}

/* Sidebar */
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

/* Stats */
.stats-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.stat-box {
  text-align: center;
  padding: 15px;
  background: #f3f5fa;
  border-radius: 10px;
  border: 1px solid #ebeef4;
}

.stat-number {
  font-size: 20px;
  font-weight: 700;
  color: #37517e;
  display: block;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: #6c757d;
  text-transform: uppercase;
  font-weight: 600;
}

/* Geometry List */
.geometry-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.geometry-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #f3f5fa;
  border-radius: 8px;
  border: 1px solid #ebeef4;
}

.geometry-item i {
  color: #47b2e4;
  font-size: 16px;
  width: 20px;
}

/* Metadata Sections */
.metadata-section {
  margin-bottom: 20px;
}

.metadata-section-title {
  font-size: 14px;
  font-weight: 700;
  color: #37517e;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 2px solid #47b2e4;
}

.description-item {
  flex-direction: column;
  align-items: flex-start;
}

.description-item span {
  margin-top: 8px;
  line-height: 1.5;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  font-size: 12px;
}

.instruction-text {
  font-size: 13px;
  color: #6c757d;
  margin: 0;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #47b2e4;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #ebeef4;
  background: #f8f9fa;
}

.modal-header h5 {
  margin: 0;
  color: #37517e;
  font-weight: 700;
  font-size: 18px;
}

.btn-close {
  background: none;
  border: none;
  font-size: 20px;
  color: #6c757d;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s;
}

.btn-close:hover {
  background: #e9ecef;
  color: #37517e;
}

.modal-body {
  padding: 25px;
  overflow-y: auto;
  max-height: calc(80vh - 80px);
}

.description-content {
  font-size: 14px;
  line-height: 1.6;
}

.description-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  font-size: 12px;
}

.description-content td {
  padding: 8px;
  border: 1px solid #ddd;
  vertical-align: top;
}

.description-content td:first-child {
  font-weight: 600;
  background: #f8f9fa;
  width: 30%;
}

.description-content tr:nth-child(even) {
  background: #f9f9f9;
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
  background: #47b2e4;
  color: white;
  transform: translateY(-2px);
}

.download-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.format-name {
  font-weight: 600;
  font-size: 14px;
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
  border: 1px solid #ebeef4;
}

.related-item:hover {
  background: #ebeef4;
  transform: translateY(-2px);
}

.related-icon img {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
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

.related-content .topic {
  font-size: 12px;
  color: #47b2e4;
  font-weight: 600;
  display: block;
  margin-bottom: 2px;
}

.related-content .views {
  font-size: 11px;
  color: #6c757d;
}

/* Category Colors */
.category-ekonomi {
  background: rgba(255, 193, 7, 0.3);
}
.category-infrastruktur {
  background: rgba(111, 66, 193, 0.3);
}
.category-kemiskinan {
  background: rgba(220, 53, 69, 0.3);
}
.category-kependudukan {
  background: rgba(32, 201, 151, 0.3);
}
.category-kesehatan {
  background: rgba(71, 178, 228, 0.3);
}
.category-lingkungan {
  background: rgba(25, 135, 84, 0.3);
}
.category-pariwisata {
  background: rgba(253, 126, 20, 0.3);
}
.category-pemerintah {
  background: rgba(108, 117, 125, 0.3);
}
.category-pendidikan {
  background: rgba(13, 202, 240, 0.3);
}
.category-sosial {
  background: rgba(232, 62, 140, 0.3);
}
.category-default {
  background: rgba(55, 81, 126, 0.3);
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

/* Responsive Design */
@media (max-width: 768px) {
  .mapset-hero {
    padding: 60px 0 40px;
    text-align: center;
  }

  .mapset-title {
    font-size: 24px;
  }

  .mapset-description {
    font-size: 16px;
  }

  .mapset-meta {
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

  .map-section,
  .feature-info-section {
    padding: 20px;
  }

  .leaflet-map {
    height: 400px;
  }

  .layer-panel {
    position: relative;
    top: 0;
    right: 0;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .map-legend {
    position: relative;
    bottom: 0;
    left: 0;
    margin-top: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .map-controls {
    flex-direction: column;
    gap: 8px;
  }

  .section-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  .mapset-icon-container {
    display: none;
  }
}

@media (max-width: 576px) {
  .mapset-hero {
    padding: 40px 0 30px;
  }

  .mapset-title {
    font-size: 20px;
  }

  .download-panel .btn-download,
  .download-panel .btn-share,
  .download-panel .btn-fullscreen {
    padding: 10px 12px;
    font-size: 13px;
  }

  .leaflet-map {
    height: 250px;
  }

  .related-item {
    padding: 12px;
  }
  .mapset-icon-container {
    display: none;
  }

  .related-icon img {
    width: 40px;
    height: 40px;
  }
}

/* Print Styles */
@media print {
  .download-panel,
  .map-controls,
  .layer-panel {
    display: none;
  }

  .leaflet-map {
    height: 400px;
  }
}
</style>
