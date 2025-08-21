
<template>
  <div class="datasets-view">
    <!-- Dataset Hero Section -->
    <section class="dataset-hero section dark-background pt-5">
      <div class="container mt-5">
        <div class="row">
          <div class="col-lg-12 text-center" data-aos="fade-up">
            <h1 class="display-4 text-white mb-4">Dataset Kota Ternate</h1>
            <p class="lead text-white-50 mb-4">
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
      <div class="top-filters mb-4">
        <div class="row align-items-center">
          <div class="col-lg-8 col-12">
            <div class="filter-dropdowns d-flex flex-wrap gap-3">
              <!-- Wilayah Filter -->
              <select
                class="form-select filter-select"
                v-model="selectedWilayah"
                @change="filterDatasets"
              >
                <option value="">Pilih Wilayah</option>
                <option v-for="wilayah in wilayahList" :key="wilayah.id" :value="wilayah.id">
                  {{ wilayah.name }}
                </option>
              </select>

              <!-- Organization Filter -->
              <select
                class="form-select filter-select"
                v-model="selectedOrganization"
                @change="filterDatasets"
              >
                <option value="">Pilih Organisasi</option>
                <option v-for="org in organizations" :key="org.id" :value="org.id">
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
                <option v-for="category in categories" :key="category.id" :value="category.id">
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
                          <span class="badge category-badge me-2">{{
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
                        <p class="dataset-description text-muted mb-2">{{ dataset.description }}</p>

                        <!-- Organization -->
                        <div class="dataset-meta">
                          <small class="text-muted">
                            <i class="bi bi-building me-1"></i>
                            {{ getOrganizationName(dataset.organization_id) }}
                          </small>
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
                    </div>

                    <!-- Dataset Stats and Actions -->
                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-6">
                      <div class="dataset-stats text-end mb-3">
                        <div class="mb-1">
                          <small class="text-muted">
                            <i class="bi bi-download me-1"></i>{{ dataset.downloads || 0 }} unduhan
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
                        <!-- <button
                          class="btn btn-outline-primary btn-sm w-100"
                          @click="downloadDataset(dataset)"
                        >
                          <i class="bi bi-download me-1"></i>Download
                        </button> -->
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
          <div v-if="filteredDatasets.length === 0" class="text-center py-5">
            <i class="bi bi-search display-1 text-muted"></i>
            <h4 class="mt-3">Dataset tidak ditemukan</h4>
            <p class="text-muted">Coba ubah filter atau kata kunci pencarian Anda</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatasetsView',
  data() {
    return {
      searchQuery: '',
      selectedCategories: [],
      selectedOrganization: '',
      selectedFormats: [],
      selectedWilayah: '',
      selectedTopic: '',
      sortBy: 'newest',
      currentPage: 1,
      itemsPerPage: 12,

      // Sample data - replace with API calls
      datasets: [
        {
          id: 1,
          title: 'Data Kependudukan Kota Ternate 2024',
          description:
            'Data lengkap kependudukan Kota Ternate tahun 2024 meliputi jumlah penduduk per kecamatan, usia, dan jenis kelamin.',
          category_id: 'kependudukan',
          organization_id: 'disdukcapil',
          formats: ['csv', 'json', 'excel'],
          updated_at: '2024-01-15',
          downloads: 245,
          views: 1204,
        },
        {
          id: 2,
          title: 'Anggaran Pembangunan Infrastruktur 2024',
          description:
            'Detail anggaran pembangunan infrastruktur Kota Ternate tahun 2024 per sektor dan wilayah.',
          category_id: 'infrastruktur',
          organization_id: 'bappeda',
          formats: ['pdf', 'excel'],
          updated_at: '2024-01-10',
          downloads: 156,
          views: 892,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          description:
            'Statistik kesehatan masyarakat meliputi data puskesmas, rumah sakit, dan program kesehatan.',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv', 'json'],
          updated_at: '2024-01-08',
          downloads: 187,
          views: 1056,
        },
        {
          id: 4,
          title: 'Produk Domestik Regional Bruto (PDRB)',
          description: 'Data PDRB Kota Ternate berdasarkan lapangan usaha dan komponen penggunaan.',
          category_id: 'ekonomi',
          organization_id: 'bps',
          formats: ['excel', 'pdf'],
          updated_at: '2024-01-05',
          downloads: 324,
          views: 1543,
        },
        {
          id: 5,
          title: 'Data Sekolah dan Siswa Kota Ternate',
          description:
            'Informasi lengkap sekolah dari tingkat SD hingga SMA/SMK termasuk jumlah siswa dan guru.',
          category_id: 'pendidikan',
          organization_id: 'dindik',
          formats: ['csv', 'excel'],
          updated_at: '2024-01-03',
          downloads: 278,
          views: 1167,
        },
        {
          id: 6,
          title: 'Wisata dan Objek Pariwisata',
          description:
            'Daftar dan informasi objek wisata di Kota Ternate beserta fasilitas penunjangnya.',
          category_id: 'pariwisata',
          organization_id: 'dinpar',
          formats: ['json', 'csv'],
          updated_at: '2023-12-28',
          downloads: 198,
          views: 876,
        },
      ],

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

      wilayahList: [
        { id: 'ternate-utara', name: 'Ternate Utara' },
        { id: 'ternate-selatan', name: 'Ternate Selatan' },
        { id: 'ternate-tengah', name: 'Ternate Tengah' },
        { id: 'moti', name: 'Moti' },
        { id: 'pulau-batang-dua', name: 'Pulau Batang Dua' },
        { id: 'pulau-hiri', name: 'Pulau Hiri' },
        { id: 'pulau-ternate', name: 'Pulau Ternate' },
      ],

      organizations: [
        { id: 'disdukcapil', name: 'Dinas Kependudukan dan Pencatatan Sipil' },
        { id: 'bappeda', name: 'Bappeda Kota Ternate' },
        { id: 'dinkes', name: 'Dinas Kesehatan' },
        { id: 'bps', name: 'BPS Kota Ternate' },
        { id: 'dindik', name: 'Dinas Pendidikan' },
        { id: 'dinpar', name: 'Dinas Pariwisata' },
      ],

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
            dataset.description.toLowerCase().includes(this.searchQuery.toLowerCase()),
        )
      }

      // Category filter
      if (this.selectedCategories.length > 0) {
        filtered = filtered.filter((dataset) =>
          this.selectedCategories.includes(dataset.category_id),
        )
      }

      // Topic filter
      if (this.selectedTopic) {
        filtered = filtered.filter((dataset) => dataset.category_id === this.selectedTopic)
      }

      // Wilayah filter
      if (this.selectedWilayah) {
        filtered = filtered.filter((dataset) => dataset.wilayah_id === this.selectedWilayah)
      }

      // Organization filter
      if (this.selectedOrganization) {
        filtered = filtered.filter(
          (dataset) => dataset.organization_id === this.selectedOrganization,
        )
      }

      // Format filter
      if (this.selectedFormats.length > 0) {
        filtered = filtered.filter((dataset) =>
          dataset.formats.some((format) => this.selectedFormats.includes(format)),
        )
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
          return sorted.sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
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

  mounted() {
    // Check for category filter from query params
    if (this.$route.query.category) {
      const categoryId = this.categories.find(
        (cat) => cat.name.toLowerCase() === this.$route.query.category.toLowerCase(),
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
      this.selectedWilayah = ''
      this.selectedTopic = ''
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
      return category ? `/assets/img/${category.image}` : '/assets/img/default-dataset.svg'
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
  this.$router.push(`/dataset/${dataset.id}`)
},

    downloadDataset(dataset) {
      console.log('Download dataset:', dataset)
      // Handle download
    },
  },
}
</script>

<style scoped>
.dataset-hero {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #040677 0%, #040677 100%);
}

.dataset-hero .container {
  position: relative;
  z-index: 2;
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
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

.filter-select {
  min-width: 180px;
  max-width: 220px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  color: #6c757d;
  background-color: #fff;
  transition: all 0.2s ease;
}

.filter-select:focus {
  border-color: #4ecdc4;
  box-shadow: 0 0 0 0.2rem rgba(78, 205, 196, 0.15);
  outline: none;
}

.filter-select option {
  padding: 0.5rem;
}

.dataset-count {
  font-size: 0.95rem;
  color: #495057;
  font-weight: 600;
}

.sort-container {
  display: flex;
  align-items: center;
}

.sort-label {
  font-size: 0.9rem;
  color: #495057;
  font-weight: 500;
  margin-bottom: 0;
}

.sort-select {
  min-width: 120px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  background-color: #fff;
  transition: all 0.2s ease;
}

.sort-select:focus {
  border-color: #4ecdc4;
  box-shadow: 0 0 0 0.2rem rgba(78, 205, 196, 0.15);
  outline: none;
}

.dataset-card {
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
}

.dataset-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #4ecdc4;
}

.dataset-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  padding: 0.5rem;
  min-height: 100px;
}

.category-icon {
  width: 100px;
  height: 100px;
  object-fit: contain;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 16px;
  padding: 15px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  max-width: 100%;
  max-height: 100%;
  margin-right: 50px;
}
.category-icon {
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  max-width: 100%;
  max-height: 100%;
}

.dataset-card:hover .category-icon {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #4ecdc4;
}

.dataset-content {
  padding-left: 1rem;
}

.dataset-title a {
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  line-height: 1.3;
}

.dataset-title a:hover {
  color: #4ecdc4;
}

.dataset-description {
  font-size: 0.9rem;
  line-height: 1.4;
  max-height: 2.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.category-badge {
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  border: none;
}

.format-badge {
  background-color: #f8f9fa;
  color: #495057;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  display: inline-block;
  text-transform: uppercase;
}

.dataset-stats {
  font-size: 0.85rem;
}

.dataset-actions .btn {
  font-size: 0.85rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
}

.dataset-actions .btn-primary {
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  border: none;
  transition: all 0.3s ease;
}

.dataset-actions .btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
}

.dataset-actions .btn-outline-primary {
  border: 2px solid #4ecdc4;
  color: #4ecdc4;
  transition: all 0.3s ease;
}

.dataset-actions .btn-outline-primary:hover {
  background-color: #4ecdc4;
  border-color: #4ecdc4;
  transform: translateY(-1px);
}

.pagination .page-link {
  color: #4ecdc4;
  border-color: #dee2e6;
}

.pagination .page-item.active .page-link {
  background-color: #4ecdc4;
  border-color: #4ecdc4;
}

.pagination .page-link:hover {
  color: #3ba99c;
  background-color: #f8f9fa;
}

@media (max-width: 992px) {
  .filters-sidebar {
    position: static;
    margin-bottom: 2rem;
  }

  .dataset-hero {
    min-height: 300px;
  }

  .category-icon {
    width: 56px;
    height: 56px;
  }

  .filters-sidebar {
    padding: 1.5rem;
    border-radius: 12px;
  }

  .filter-group {
    padding: 1rem;
  }
  .category-icon {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 576px) {
  .category-icon {
    width: 100px;
    height: 100px;
  }
}
</style>
