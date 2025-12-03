<template>
    <div class="datasets-view">
        <!-- Dataset Hero Section -->
        <section class="dataset-hero section pt-5">
            <div class="container mt-5">
                <div class="row">
                    <div class="col-lg-12 text-center" data-aos="fade-up">
                        <h1 class="display-4 text-white mb-4">Dataset Kota Ternate</h1>
                        <p class="lead text-white mb-4">
                            Temukan berbagai dataset pemerintahan Kota Ternate untuk kebutuhan penelitian,
                            analisis, dan pengembangan aplikasi
                        </p>

                        <!-- Search Bar -->
                        <div class="search-container mb-4">
                            <div class="input-group input-group-lg">
                                <input type="text" class="form-control" placeholder="Cari dataset..."
                                    v-model="searchQuery" @input="searchDatasets" />
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
        <div class="container py-4 py-md-5">
            <!-- Loading State with Skeleton -->
            <div v-if="loading">
                <!-- Skeleton for filters -->
                <div class="top-filters mb-4">
                    <div class="row align-items-center">
                        <div class="col-12 col-lg-8 mb-3 mb-lg-0">
                            <div class="filter-dropdowns d-flex flex-column flex-md-row gap-3">
                                <div class="skeleton skeleton-select"></div>
                                <div class="skeleton skeleton-select"></div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-4">
                            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                <div class="skeleton skeleton-text-small"></div>
                                <div class="skeleton skeleton-select-small"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Skeleton for dataset cards -->
                <div class="row g-3 g-md-4">
                    <div class="col-12" v-for="n in 8" :key="n">
                        <div class="skeleton-card">
                            <div class="skeleton-card-body">
                                <div class="d-flex mb-3">
                                    <div class="flex-shrink-0 me-3">
                                        <div class="skeleton skeleton-image-mobile"></div>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="skeleton skeleton-badge mb-2"></div>
                                        <div class="skeleton skeleton-title mb-2"></div>
                                        <div class="skeleton skeleton-text-small mb-1"></div>
                                    </div>
                                </div>
                                <div class="skeleton skeleton-desc-line mb-1"></div>
                                <div class="skeleton skeleton-desc-line-short mb-3"></div>
                                <div class="d-flex justify-content-between">
                                    <div class="skeleton skeleton-format-badge"></div>
                                    <div class="skeleton skeleton-text-small"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-if="error" class="alert alert-danger" role="alert">
                <i class="bi bi-exclamation-triangle me-2"></i>
                {{ error }}
                <button @click="fetchDatasets" class="btn btn-outline-danger btn-sm ms-2">Coba Lagi</button>
            </div>

            <!-- Main Content - Only show when not loading -->
            <div v-if="!loading">
                <div class="top-filters mb-4">
                    <div class="row align-items-center">
                        <div class="col-12 col-lg-8 mb-3 mb-lg-0">
                            <div class="filter-dropdowns d-flex flex-column flex-md-row gap-3">
                                <!-- Organization Filter -->
                                <select class="form-select filter-select" v-model="selectedOrganization"
                                    @change="filterDatasets">
                                    <option value="">Pilih Organisasi</option>
                                    <option v-for="org in organizations" :key="org.id" :value="org.name">
                                        {{ org . name }}
                                    </option>
                                </select>

                                <!-- Topic Filter -->
                                <select class="form-select filter-select" v-model="selectedTopic"
                                    @change="filterDatasets">
                                    <option value="">Pilih Topik</option>
                                    <option v-for="category in categories" :key="category.id"
                                        :value="category.name">
                                        {{ category . name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12 col-lg-4">
                            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                <div>
                                    <span class="dataset-count">{{ filteredDatasets . length . toLocaleString() }}
                                        Dataset</span>
                                </div>
                                <div class="sort-container d-flex align-items-center">
                                    <label class="sort-label me-2 mb-0">Urutkan:</label>
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
                        <div class="row g-3 g-md-4">
                            <div class="col-12" v-for="dataset in paginatedDatasets" :key="dataset.id">
                                <div class="dataset-card card" data-aos="fade-up">
                                    <div class="card-body p-3 p-md-4">
                                        <!-- Mobile Layout -->
                                        <div class="mobile-layout">
                                            <div class="d-flex mb-3">
                                                <!-- Dataset Image -->
                                                <div class="flex-shrink-0 me-3">
                                                    <div class="dataset-image-container-mobile">
                                                        <img :src="getCategoryImage(dataset.category_id)"
                                                            :alt="getCategoryName(dataset.category_id)"
                                                            class="category-icon-mobile" />
                                                    </div>
                                                </div>

                                                <!-- Dataset Content -->
                                                <div class="flex-grow-1 min-width-0">
                                                    <!-- Category Badge -->
                                                    <div class="mb-2">
                                                        <span
                                                            class="badge-primary category-badge-mobile">{{ getCategoryName(dataset . category_id) }}</span>
                                                    </div>

                                                    <!-- Title -->
                                                    <h6 class="dataset-title-mobile mb-2">
                                                        <a href="#" @click.prevent="viewDataset(dataset)"
                                                            class="text-decoration-none text-break">
                                                            {{ dataset . title }}
                                                        </a>
                                                    </h6>

                                                    <!-- Meta Info -->
                                                    <div class="dataset-meta-mobile">
                                                        <small class="text-muted d-block mb-1">
                                                            <i class="bi bi-building me-1"></i>
                                                            {{ getOrganizationName(dataset . organization_id) }}
                                                        </small>
                                                        <small class="text-muted d-block">
                                                            <i class="bi bi-calendar me-1"></i>
                                                            {{ formatDate(dataset . updated_at) }}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>



                                            <!-- Tags -->
                                            <div class="dataset-tags-mobile mb-3"
                                                v-if="dataset.tags && dataset.tags.length > 0">
                                                <span v-for="tag in dataset.tags.slice(0, 3)" :key="tag"
                                                    class="badge bg-secondary me-1 mb-1">
                                                    {{ tag }}
                                                </span>
                                                <span v-if="dataset.tags.length > 3" class="badge bg-secondary">
                                                    +{{ dataset . tags . length - 3 }}
                                                </span>
                                            </div>

                                            <!-- Bottom Info Row -->
                                            <div class="row g-2 mb-3">
                                                <!-- Formats and Size -->
                                                <div class="col-6">
                                                    <div class="dataset-formats-mobile">
                                                        <span v-for="format in dataset.formats" :key="format"
                                                            class="format-badge-mobile me-1 mb-1">
                                                            {{ format . toUpperCase() }}
                                                        </span>
                                                        <small class="text-muted d-block mt-1">
                                                            <i
                                                                class="bi bi-file-earmark me-1"></i>{{ dataset . file_size_formatted }}
                                                        </small>
                                                    </div>
                                                </div>

                                                <!-- Stats -->
                                                <div class="col-6">
                                                    <div class="dataset-stats-mobile text-end">
                                                        <small class="text-muted d-block mb-1">
                                                            <i
                                                                class="bi bi-download me-1"></i>{{ dataset . downloads || 0 }}
                                                        </small>
                                                        <small class="text-muted d-block">
                                                            <i class="bi bi-eye me-1"></i>{{ dataset . views || 0 }}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Action Button -->
                                            <div>
                                                <button class="btn btn-primary btn-sm w-100"
                                                    @click="viewDataset(dataset)">
                                                    <i class="bi bi-eye me-1"></i>Lihat Detail
                                                </button>
                                            </div>
                                        </div>

                                        <!-- Desktop Layout -->
                                        <div class="desktop-layout">
                                            <div class="row align-items-center">
                                                <!-- Dataset Image -->
                                                <div class="col-xl-1 col-lg-1 col-md-1">
                                                    <div class="dataset-image-container">
                                                        <img :src="getCategoryImage(dataset.category_id)"
                                                            :alt="getCategoryName(dataset.category_id)"
                                                            class="category-icon" />
                                                    </div>
                                                </div>

                                                <!-- Dataset Content -->
                                                <div class="col-xl-8 col-lg-7 col-md-7">
                                                    <div class="dataset-content">
                                                        <!-- Category Badge and Date -->
                                                        <div class="d-flex align-items-center mb-2">
                                                            <span
                                                                class="badge-primary category-badge me-2">{{ getCategoryName(dataset . category_id) }}</span>
                                                            <small
                                                                class="text-muted">{{ formatDate(dataset . updated_at) }}</small>
                                                        </div>

                                                        <!-- Title -->
                                                        <h5 class="dataset-title mb-2">
                                                            <a href="#" @click.prevent="viewDataset(dataset)"
                                                                class="text-decoration-none">
                                                                {{ dataset . title }}
                                                            </a>
                                                        </h5>

                                                        <!-- Organization -->
                                                        <div class="dataset-meta">
                                                            <small class="text-muted">
                                                                <i class="bi bi-building me-1"></i>
                                                                {{ getOrganizationName(dataset . organization_id) }}
                                                            </small>
                                                        </div>

                                                        <!-- Tags -->
                                                        <div class="dataset-tags mt-2"
                                                            v-if="dataset.tags && dataset.tags.length > 0">
                                                            <span v-for="tag in dataset.tags" :key="tag"
                                                                class="badge bg-secondary me-1"
                                                                style="font-size: 0.7rem">
                                                                {{ tag }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Dataset Formats and Stats -->
                                                <div class="col-xl-1 col-lg-2 col-md-2">
                                                    <div class="dataset-formats mb-2">
                                                        <span v-for="format in dataset.formats" :key="format"
                                                            class="format-badge me-1 mb-1">
                                                            {{ format . toUpperCase() }}
                                                        </span>
                                                    </div>
                                                    <div class="dataset-size">
                                                        <small class="text-muted">
                                                            <i
                                                                class="bi bi-file-earmark me-1"></i>{{ dataset . file_size_formatted }}
                                                        </small>
                                                    </div>
                                                </div>

                                                <!-- Dataset Stats and Actions -->
                                                <div class="col-xl-2 col-lg-2 col-md-2">
                                                    <div class="dataset-stats text-end mb-3">
                                                        <div class="mb-1">
                                                            <small class="text-muted">
                                                                <i
                                                                    class="bi bi-download me-1"></i>{{ dataset . downloads || 0 }}
                                                                unduhan
                                                            </small>
                                                        </div>
                                                        <div>
                                                            <small class="text-muted">
                                                                <i
                                                                    class="bi bi-eye me-1"></i>{{ dataset . views || 0 }}
                                                                dilihat
                                                            </small>
                                                        </div>
                                                    </div>

                                                    <!-- Action Buttons -->
                                                    <div class="dataset-actions text-end">
                                                        <button class="btn btn-primary btn-sm mb-1 w-100"
                                                            @click="viewDataset(dataset)">
                                                            <i class="bi bi-eye me-1"></i>Lihat Detail
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Pagination -->
                        <nav aria-label="Dataset pagination" class="mt-4 mt-md-5" v-if="totalPages > 1">
                            <ul class="pagination justify-content-center flex-wrap">
                                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                    <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                                        <i class="bi bi-chevron-left"></i>
                                    </a>
                                </li>

                                <li class="page-item" v-for="page in visiblePages" :key="page"
                                    :class="{ active: page === currentPage }">
                                    <a class="page-link" href="#"
                                        @click.prevent="changePage(page)">{{ page }}</a>
                                </li>

                                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                                        <i class="bi bi-chevron-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <!-- Empty State -->
                        <div v-if="!loading && filteredDatasets.length === 0" class="text-center py-5">
                            <i class="bi bi-search display-1 text-muted"></i>
                            <h4 class="mt-3">Dataset tidak ditemukan</h4>
                            <p class="text-muted">Coba ubah filter atau kata kunci pencarian Anda</p>
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
        name: 'DatasetsView',
        data() {
            return {
                // API Configuration
                apiUrl: import.meta.env.VITE_API_URL,

                // Loading and Error States
                loading: false,
                error: null,

                // Filter States
                searchQuery: '',
                selectedCategories: [],
                selectedOrganization: '',
                selectedFormats: [],
                selectedTopic: '',
                selectedFileType: '',
                sortBy: 'newest',
                currentPage: 1,
                itemsPerPage: 12,

                // Data from API
                datasets: [],
                pagination: {},

                // Static data maintained for existing functionality
                categories: [{
                        id: 'ekonomi',
                        name: 'Ekonomi',
                        count: 1,
                        image: 'data-ekonomi.svg'
                    },
                    {
                        id: 'infrastruktur',
                        name: 'Infrastruktur',
                        count: 1,
                        image: 'data-infrastruktur.svg'
                    },
                    {
                        id: 'kemiskinan',
                        name: 'Kemiskinan',
                        count: 0,
                        image: 'data-kemiskinan.svg'
                    },
                    {
                        id: 'kependudukan',
                        name: 'Kependudukan',
                        count: 1,
                        image: 'data-kependudukan.svg'
                    },
                    {
                        id: 'kesehatan',
                        name: 'Kesehatan',
                        count: 1,
                        image: 'data-kesehatan.svg'
                    },
                    {
                        id: 'lingkungan',
                        name: 'Lingkungan Hidup',
                        count: 0,
                        image: 'data-lingkungan.svg'
                    },
                    {
                        id: 'pariwisata',
                        name: 'Pariwisata & Kebudayaan',
                        count: 1,
                        image: 'data-pariwisata.svg',
                    },
                    {
                        id: 'pemerintah',
                        name: 'Pemerintah & Desa',
                        count: 0,
                        image: 'data-pemerintah.svg'
                    },
                    {
                        id: 'pendidikan',
                        name: 'Pendidikan',
                        count: 1,
                        image: 'data-pendidikan.svg'
                    },
                    {
                        id: 'sosial',
                        name: 'Sosial',
                        count: 0,
                        image: 'data-sosial.svg'
                    },
                ],

                organizations: [],
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
                        dataset.description.toLowerCase().includes(this.searchQuery.toLowerCase())
                    )
                }

                // Category filter
                if (this.selectedCategories.length > 0) {
                    filtered = filtered.filter((dataset) =>
                        this.selectedCategories.includes(this.getCategoryIdFromTopic(dataset.topic))
                    )
                }

                // Topic filter
                if (this.selectedTopic) {
                    filtered = filtered.filter((dataset) => dataset.topic === this.selectedTopic)
                }

                // Organization filter
                if (this.selectedOrganization) {
                    filtered = filtered.filter(
                        (dataset) => dataset.organization_name === this.selectedOrganization
                    )
                }

                // Format filter
                if (this.selectedFormats.length > 0) {
                    filtered = filtered.filter((dataset) => this.selectedFormats.includes(dataset.file_type))
                }

                // File type filter (single selection)
                if (this.selectedFileType) {
                    filtered = filtered.filter((dataset) => dataset.file_type === this.selectedFileType)
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
                        return sorted.sort((a, b) => (b.download_count || 0) - (a.download_count || 0))
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

        async mounted() {
            await this.fetchDatasets()

            // Check for category filter from query params
            if (this.$route.query.category) {
                const categoryId = this.categories.find(
                    (cat) => cat.name.toLowerCase() === this.$route.query.category.toLowerCase()
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
            async fetchDatasets() {
                this.loading = true
                this.error = null

                try {
                    const response = await axios.get(`${this.apiUrl}datasets`)

                    if (response.data.success) {
                        this.datasets = response.data.data.datasets.map((dataset) => ({
                            ...dataset,
                            formats: [dataset
                                .file_type
                            ], // Convert file_type to formats array for compatibility
                            category_id: this.getCategoryIdFromTopic(dataset.topic),
                            organization_id: this.getOrganizationId(dataset.organization_name),
                            downloads: dataset.download_count,
                            views: dataset.view_count,
                        }))

                        // Extract unique organizations from API data
                        this.organizations = [...new Set(this.datasets.map((d) => d.organization_name))].map(
                            (name) => ({
                                id: this.getOrganizationId(name),
                                name: name,
                            })
                        )
                    } else {
                        throw new Error(response.data.message || 'Failed to fetch datasets')
                    }
                } catch (error) {
                    this.error = 'Gagal memuat dataset. Silakan coba lagi.'
                    this.datasets = []
                } finally {
                    this.loading = false
                }
            },

            getCategoryIdFromTopic(topic) {
                const topicMap = {
                    Ekonomi: 'ekonomi',
                    Infrastruktur: 'infrastruktur',
                    Kemiskinan: 'kemiskinan',
                    Kependudukan: 'kependudukan',
                    Kesehatan: 'kesehatan',
                    'Lingkungan Hidup': 'lingkungan',
                    'Pariwisata & Kebudayaan': 'pariwisata',
                    Pariwisata: 'pariwisata',
                    'Pemerintah & Desa': 'pemerintah',
                    Pemerintahan: 'pemerintah',
                    Pendidikan: 'pendidikan',
                    Sosial: 'sosial',
                }
                return topicMap[topic] || 'sosial'
            },

            getOrganizationId(name) {
                return name ? name.toLowerCase().replace(/\s+/g, '-') : ''
            },

            truncateDescription(text, maxLength) {
                if (text && text.length > maxLength) {
                    return text.substring(0, maxLength) + '...'
                }
                return text
            },

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
                this.selectedTopic = ''
                this.selectedFileType = ''
                this.searchQuery = ''
                this.currentPage = 1
            },

            changePage(page) {
                if (page >= 1 && page <= this.totalPages) {
                    this.currentPage = page
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                }
            },

            getCategoryName(categoryId) {
                const category = this.categories.find((cat) => cat.id === categoryId)
                return category ? category.name : categoryId
            },

            getCategoryImage(categoryId) {
                const category = this.categories.find((cat) => cat.id === categoryId)
                return category ? `/assets/img/${category.image}` : '/assets/img/data-sosial.svg'
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
                this.$router.push(`/dataset/${dataset.slug}`)
            },

            downloadDataset(dataset) {
                console.log('Download dataset:', dataset)
                // Handle download
            },
        },
    }
</script>

<style scoped>
    /* ========== RESPONSIVE UTILITIES ========== */
    .min-width-0 {
        min-width: 0;
    }

    .text-break {
        word-wrap: break-word;
        word-break: break-word;
    }

    /* ========== SKELETON LOADING STYLES ========== */
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

    /* Skeleton Card Structure */
    .skeleton-card {
        border: 1px solid #e9ecef;
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 1rem;
        background: #fff;
    }

    .skeleton-card-body {
        padding: 1rem;
    }

    /* Skeleton Elements */
    .skeleton-select {
        height: 42px;
        width: 100%;
        border-radius: 8px;
    }

    .skeleton-select-small {
        height: 35px;
        width: 120px;
        border-radius: 6px;
    }

    .skeleton-text-small {
        height: 16px;
        width: 100px;
    }

    .skeleton-image-mobile {
        height: 60px;
        width: 60px;
        border-radius: 12px;
    }

    .skeleton-badge {
        height: 20px;
        width: 80px;
        border-radius: 20px;
    }

    .skeleton-title {
        height: 20px;
        width: 100%;
    }

    .skeleton-desc-line {
        height: 16px;
        width: 100%;
    }

    .skeleton-desc-line-short {
        height: 16px;
        width: 75%;
    }

    .skeleton-format-badge {
        height: 20px;
        width: 50px;
        border-radius: 6px;
        display: inline-block;
    }

    /* ========== HERO SECTION ========== */
    .dataset-hero {
        background: #1581bf;
        color: white;
        padding: 80px 0 60px !important;
        position: relative;
        overflow: hidden;
    }

    .dataset-hero::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 100%;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
        opacity: 0.3;
    }

    .dataset-hero .display-4 {
        font-size: 2rem;
        font-weight: 700;
    }

    .dataset-hero .lead {
        font-size: 1rem;
    }

    /* ========== SEARCH CONTAINER ========== */
    .search-container {
        max-width: 600px;
        margin: 0 auto;
    }

    .search-container .form-control {
        border-radius: 8px 0 0 8px;
        border: none;
        padding: 0.75rem 1rem;
    }

    .search-container .btn {
        border-radius: 0 8px 8px 0;
        padding: 0.75rem 1.5rem;
    }

    /* ========== FILTERS ========== */
    .top-filters {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        border: 1px solid #e9ecef;
    }

    .filter-select {
        min-width: 0;
        flex: 1;
        border-radius: 8px;
    }

    .sort-select {
        min-width: 120px;
        max-width: 150px;
        border-radius: 6px;
        font-size: 0.875rem;
    }

    .sort-label {
        font-size: 0.875rem;
        white-space: nowrap;
    }

    .dataset-count {
        font-weight: 600;
        color: #333;
        font-size: 0.9rem;
    }

    /* ========== DATASET CARDS ========== */
    .dataset-card {
        transition: all 0.3s ease;
        border: 1px solid #e9ecef;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        border-radius: 12px;
        overflow: hidden;
    }

    .dataset-card:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        transform: translateY(-2px);
    }

    /* Mobile Layout - Show by default */
    .mobile-layout {
        display: block;
    }

    /* Desktop Layout - Hidden by default */
    .desktop-layout {
        display: none;
    }

    /* ========== MOBILE SPECIFIC STYLES ========== */
    .dataset-image-container-mobile {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        border-radius: 12px;
        padding: 0.5rem;
    }

    .category-icon-mobile {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .category-badge-mobile {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        background: #e3f2fd;
        color: #1976d2;
        border-radius: 20px;
        font-size: 0.7rem;
        font-weight: 600;
        white-space: nowrap;
    }

    .dataset-title-mobile {
        font-size: 0.95rem;
        font-weight: 600;
        line-height: 1.4;
        margin: 0;
    }

    .dataset-title-mobile a {
        color: #333;
    }

    .dataset-title-mobile a:hover {
        color: #1581bf;
    }

    .dataset-meta-mobile {
        font-size: 0.75rem;
        line-height: 1.5;
    }

    .dataset-description-mobile {
        font-size: 0.85rem;
        line-height: 1.5;
        margin: 0;
    }

    .dataset-tags-mobile .badge {
        font-size: 0.65rem;
        padding: 0.25rem 0.5rem;
    }

    .format-badge-mobile {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        font-size: 0.7rem;
        font-weight: 600;
        color: #495057;
    }

    .dataset-formats-mobile small,
    .dataset-stats-mobile small {
        font-size: 0.75rem;
    }

    /* ========== DESKTOP SPECIFIC STYLES ========== */
    .dataset-image-container {
        width: 100%;
        max-width: 80px;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        border-radius: 12px;
        padding: 0.75rem;
        margin: 0 auto;
    }

    .category-icon {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .badge-primary {
        background: #e3f2fd;
        color: #1976d2;
        padding: 0.35rem 0.85rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .category-badge {
        background: #e3f2fd;
        color: #1976d2;
        padding: 0.35rem 0.85rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .dataset-title {
        font-size: 1.1rem;
        font-weight: 600;
        line-height: 1.4;
    }

    .dataset-title a {
        color: #333;
        transition: color 0.2s;
    }

    .dataset-title a:hover {
        color: #1581bf;
    }

    .dataset-description {
        font-size: 0.9rem;
        line-height: 1.6;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .format-badge {
        display: inline-block;
        padding: 0.3rem 0.6rem;
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        font-size: 0.7rem;
        font-weight: 600;
        color: #495057;
    }

    /* ========== PAGINATION ========== */
    .pagination {
        gap: 0.25rem;
    }

    .page-link {
        border-radius: 8px;
        border: 1px solid #dee2e6;
        color: #495057;
        padding: 0.5rem 0.75rem;
        min-width: 40px;
        text-align: center;
    }

    .page-item.active .page-link {
        background-color: #1581bf;
        border-color: #1581bf;
    }

    .page-link:hover {
        background-color: #e9ecef;
        border-color: #dee2e6;
        color: #1581bf;
    }

    /* ========== RESPONSIVE BREAKPOINTS ========== */
    /* Tablet and up (768px+) */
    @media (min-width: 768px) {
        .dataset-hero {
            padding: 100px 0 70px !important;
        }

        .dataset-hero .display-4 {
            font-size: 2.5rem;
        }

        .dataset-hero .lead {
            font-size: 1.15rem;
        }

        .top-filters {
            padding: 1.5rem;
        }

        .dataset-image-container-mobile {
            width: 70px;
            height: 70px;
        }

        .dataset-title-mobile {
            font-size: 1.05rem;
        }

        .dataset-description-mobile {
            font-size: 0.9rem;
        }
    }

    /* Desktop and up (992px+) */
    @media (min-width: 992px) {

        /* Switch to desktop layout */
        .mobile-layout {
            display: none;
        }

        .desktop-layout {
            display: block;
        }

        .dataset-hero {
            padding: 120px 0 80px !important;
        }

        .dataset-hero .display-4 {
            font-size: 3rem;
        }

        .dataset-hero .lead {
            font-size: 1.25rem;
        }
    }

    /* Large desktop (1200px+) */
    @media (min-width: 1200px) {
        .dataset-hero .display-4 {
            font-size: 3.5rem;
        }
    }

    /* ========== PRINT STYLES ========== */
    @media print {

        .dataset-hero,
        .top-filters,
        .pagination,
        .btn {
            display: none !important;
        }

        .dataset-card {
            break-inside: avoid;
            box-shadow: none;
            border: 1px solid #dee2e6;
        }
    }

    /* ========== ACCESSIBILITY ========== */
    @media (prefers-reduced-motion: reduce) {
        .dataset-card {
            transition: none;
        }

        .skeleton {
            animation: none;
        }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
        .dataset-card {
            border: 2px solid #000;
        }

        .badge-primary,
        .category-badge,
        .category-badge-mobile {
            border: 1px solid currentColor;
        }
    }
</style>
