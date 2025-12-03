<template>
    <div class="visualisasi-page">
        <!-- Hero Section -->
        <section class="visualisasi-hero">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-8">
                        <div class="hero-content" data-aos="fade-up">
                            <h1 class="hero-title">Visualisasi Data</h1>
                            <p class="hero-description">
                                Jelajahi berbagai visualisasi data interaktif yang memberikan wawasan mendalam
                                tentang berbagai aspek kehidupan di Kota Ternate melalui grafik dan chart yang mudah
                                dipahami.
                            </p>
                            <div class="hero-stats" v-if="!loading && stats.total_visualizations">
                                <div class="stat-item">
                                    <i class="bi bi-bar-chart-fill"></i>
                                    <span>{{ stats . total_visualizations . toLocaleString('id-ID') }} Visualisasi</span>
                                </div>
                                <div class="stat-item">
                                    <i class="bi bi-eye-fill"></i>
                                    <span>{{ stats . total_views . toLocaleString('id-ID') }} Total Views</span>
                                </div>
                                <div class="stat-item" v-if="stats.visualizations_this_month">
                                    <i class="bi bi-calendar-plus"></i>
                                    <span>{{ stats . visualizations_this_month . toLocaleString('id-ID') }} Bulan Ini</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="hero-image mt-2" data-aos="fade-left" data-aos-delay="200">
                            <img src="../assets/img/visualisasi.svg" alt="Mapsets" class="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="container py-5">
            <!-- Search and Filter Section -->
            <div class="search-filter-section mb-4">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <div class="search-box">
                            <div class="input-group">
                                <span class="input-group-text bg-white border-end-0">
                                    <i class="bi bi-search text-muted"></i>
                                </span>
                                <input type="text" class="form-control border-start-0"
                                    placeholder="Cari visualisasi..." v-model="searchQuery"
                                    @input="filterVisualisasi" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" v-model="selectedTopic" @change="filterVisualisasi">
                            <option value="">Semua Topik</option>
                            <option v-for="(count, topic) in stats.by_topic" :key="topic"
                                :value="topic">
                                {{ topic }} ({{ count }})
                            </option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" v-model="selectedType" @change="filterVisualisasi">
                            <option value="">Semua Tipe</option>
                            <option v-for="(count, type) in stats.by_type" :key="type"
                                :value="type">
                                {{ formatChartType(type) }} ({{ count }})
                            </option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="result-count">
                                <strong>{{ filteredVisualisasi . length }}</strong> hasil
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading State with Skeleton -->
            <div v-if="loading" class="visualisasi-list">
                <div class="list-item skeleton-item" v-for="n in 6" :key="n">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <div class="skeleton skeleton-chart-icon"></div>
                        </div>
                        <div class="col-md-8">
                            <div class="skeleton skeleton-title mb-2"></div>
                            <div class="skeleton skeleton-description mb-2"></div>
                            <div class="skeleton skeleton-meta mb-2"></div>
                            <div class="skeleton skeleton-author"></div>
                        </div>
                        <div class="col-md-2">
                            <div class="skeleton skeleton-stats mb-2"></div>
                            <div class="skeleton skeleton-button"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-if="error" class="alert alert-danger" role="alert">
                <i class="bi bi-exclamation-triangle me-2"></i>
                {{ error }}
                <button @click="fetchVisualisasi" class="btn btn-outline-danger btn-sm ms-2">
                    Coba Lagi
                </button>
            </div>

            <!-- Visualisasi List -->
            <div v-if="!loading && !error" class="visualisasi-list">
                <div class="list-item" v-for="visualisasi in paginatedVisualisasi" :key="visualisasi.id">
                    <div class="row align-items-center">
                        <!-- Chart Icon -->
                        <div class="col-md-2">
                            <div class="chart-icon-container">
                                <div class="chart-icon" :class="visualisasi.tipe">
                                    <i :class="getChartIcon(visualisasi.tipe)"></i>
                                </div>
                                <div class="chart-type-label">
                                    {{ formatChartType(visualisasi . tipe) }}
                                </div>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="col-md-8">
                            <h5 class="item-title">
                                <a href="#" @click.prevent="viewVisualisasi(visualisasi)">
                                    {{ visualisasi . nama }}
                                </a>
                            </h5>
                            <p class="item-description">{{ visualisasi . deskripsi || 'Tidak ada deskripsi' }}</p>

                            <!-- Meta Info -->
                            <div class="item-meta mb-2">
                                <span class="badge bg-primary me-2">{{ visualisasi . topic }}</span>
                                <span class="badge bg-secondary me-2">{{ formatChartType(visualisasi . tipe) }}</span>
                                <span class="badge bg-info me-2"
                                    v-if="visualisasi.data_source">{{ visualisasi . data_source }}</span>
                                <span class="badge bg-success" v-if="visualisasi.has_data">Data Tersedia</span>
                            </div>

                            <!-- Author and Date -->
                            <div class="item-author">
                                <!-- <small class="text-muted me-3">
                  <i class="bi bi-person me-1"></i>{{ visualisasi . user . name }}
                </small> -->
                                <small class="text-muted me-3"
                                    v-if="
                    visualisasi.organization_name ||
                    (visualisasi.user.organization && visualisasi.user.organization.name)
                  ">
                                    <i
                                        class="bi bi-building me-1"></i>{{ visualisasi . organization_name || visualisasi . user . organization . name }}
                                </small>
                                <small class="text-muted me-3">
                                    <i class="bi bi-calendar me-1"></i>{{ formatDate(visualisasi . updated_at) }}
                                </small>
                                <!-- <small class="text-muted" v-if="visualisasi.uuid">
                  <i class="bi bi-hash me-1"></i>{{ visualisasi . uuid . substring(0, 8) }}...
                </small> -->
                            </div>
                        </div>

                        <!-- Stats and Action -->
                        <div class="col-md-2 text-end">
                            <div class="item-stats mb-3">
                                <div class="stat-row">
                                    <i class="bi bi-eye text-primary"></i>
                                    <span>{{ visualisasi . views || 0 }} views</span>
                                </div>
                                <div class="stat-row" v-if="visualisasi.is_public">
                                    <i class="bi bi-globe text-success"></i>
                                    <span>Publik</span>
                                </div>
                                <div class="stat-row" v-if="visualisasi.is_active">
                                    <i class="bi bi-check-circle text-info"></i>
                                    <span>Aktif</span>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-sm" @click="viewVisualisasi(visualisasi)">
                                <i class="bi bi-eye me-1"></i>Lihat Detail
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="filteredVisualisasi.length === 0" class="text-center py-5">
                    <i class="bi bi-graph-up display-4 text-muted"></i>
                    <h5 class="mt-3">Visualisasi tidak ditemukan</h5>
                    <p class="text-muted">Coba ubah filter atau kata kunci pencarian Anda</p>
                    <button class="btn btn-primary" @click="clearFilters">Reset Filter</button>
                </div>

                <!-- Pagination -->
                <nav v-if="totalPages > 1" class="mt-5">
                    <ul class="pagination justify-content-center">
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
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'VisualisasiPage',
        data() {
            return {
                // API Configuration
                apiUrl: import.meta.env.VITE_API_URL,

                // States
                loading: false,
                error: null,
                searchQuery: '',
                selectedTopic: '',
                selectedType: '',
                currentPage: 1,
                itemsPerPage: 10,

                // Data
                visualisasi: [],
                stats: {},
                pagination: {},
                filters: {},
            }
        },

        computed: {
            filteredVisualisasi() {
                let filtered = this.visualisasi

                // Search filter
                if (this.searchQuery.trim()) {
                    const query = this.searchQuery.toLowerCase()
                    filtered = filtered.filter(
                        (item) =>
                        item.nama.toLowerCase().includes(query) ||
                        item.deskripsi.toLowerCase().includes(query) ||
                        item.topic.toLowerCase().includes(query)
                    )
                }

                // Topic filter
                if (this.selectedTopic) {
                    filtered = filtered.filter((item) => item.topic === this.selectedTopic)
                }

                // Type filter
                if (this.selectedType) {
                    filtered = filtered.filter((item) => item.tipe === this.selectedType)
                }

                return filtered
            },

            totalPages() {
                return Math.ceil(this.filteredVisualisasi.length / this.itemsPerPage)
            },

            paginatedVisualisasi() {
                const start = (this.currentPage - 1) * this.itemsPerPage
                const end = start + this.itemsPerPage
                return this.filteredVisualisasi.slice(start, end)
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
            await this.fetchVisualisasi()

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
            async fetchVisualisasi() {
                this.loading = true
                this.error = null

                try {
                    const apiUrl = this.apiUrl.endsWith('/') ? this.apiUrl.slice(0, -1) : this.apiUrl
                    const response = await axios.get(`${apiUrl}/visualisasi`)

                    if (response.data.success) {
                        this.visualisasi = response.data.data.visualisasi
                        this.stats = response.data.data.stats || {}
                        this.pagination = response.data.data.pagination || {}
                        this.filters = response.data.data.filters || {}
                    } else {
                        throw new Error(response.data.message || 'Failed to fetch visualisasi')
                    }
                } catch (error) {
                    console.error('Error fetching visualisasi:', error)
                    this.error = 'Gagal memuat visualisasi. Silakan coba lagi.'
                    this.visualisasi = []
                } finally {
                    this.loading = false
                }
            },

            filterVisualisasi() {
                this.currentPage = 1
            },

            clearFilters() {
                this.searchQuery = ''
                this.selectedTopic = ''
                this.selectedType = ''
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

            viewVisualisasi(visualisasi) {
                // Navigate to visualisasi detail page
                if (visualisasi.slug && this.$router) {
                    this.$router.push(`/visualisasi/${visualisasi.slug}`)
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

            formatChartType(type) {
                const types = {
                    pie_chart: 'Pie Chart',
                    bar_chart: 'Bar Chart',
                    line_chart: 'Line Chart',
                    area_chart: 'Area Chart',
                    scatter_chart: 'Scatter Chart',
                    donut_chart: 'Donut Chart',
                }
                return types[type] || type
            },

            getChartIcon(type) {
                const icons = {
                    pie_chart: 'bi bi-pie-chart-fill',
                    bar_chart: 'bi bi-bar-chart-fill',
                    line_chart: 'bi bi-graph-up',
                    area_chart: 'bi bi-area-chart',
                    scatter_chart: 'bi bi-scatter-chart',
                    donut_chart: 'bi bi-circle',
                }
                return icons[type] || 'bi bi-graph-up'
            },

            getPieSliceStyle(index) {
                const colors = ['#0d6efd', '#198754', '#ffc107', '#dc3545']
                const startAngle = (index - 1) * 90
                return {
                    backgroundColor: colors[index - 1] || '#6c757d',
                    transform: `rotate(${startAngle}deg)`,
                }
            },

            getBarStyle(index) {
                const heights = [60, 80, 45, 70, 55]
                const colors = ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1']
                return {
                    height: `${heights[index - 1]}%`,
                    backgroundColor: colors[index - 1] || '#6c757d',
                }
            },
        },
    }
</script>

<style scoped>
    .visualisasi-page {
        background-color: #f8f9fa;
        min-height: 100vh;
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

    .hero-image {
        text-align: center;
    }

    /* Search and Filter */
    .search-filter-section {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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

    /* Visualisasi List */
    .visualisasi-list {
        margin-top: 2rem;
    }

    .list-item {
        background: white;
        border: 1px solid #e9ecef;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
    }

    .list-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        /* border-color: #0d6efd;
   */
    }

    .chart-icon-container {
        text-align: center;
    }

    .chart-icon {
        width: 80px;
        height: 80px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 8px;
        font-size: 2rem;
    }

    .chart-icon.pie_chart {
        background: linear-gradient(135deg, #b197fc, #d0bfff);
        /* ungu pastel */
        color: #fff;
    }

    .chart-icon.bar_chart {
        background: linear-gradient(135deg, #74c0fc, #a5d8ff);
        /* biru pastel */
        color: #fff;
    }

    .chart-icon.line_chart {
        background: linear-gradient(135deg, #63e6be, #96f2d7);
        /* hijau pastel */
        color: #fff;
    }

    .chart-icon.area_chart {
        background: linear-gradient(135deg, #ffe066, #ffd43b);
        /* kuning pastel */
        color: #fff;
    }

    .chart-type-label {
        font-size: 0.8rem;
        font-weight: 600;
        color: #6c757d;
        text-align: center;
    }

    .item-title {
        margin-bottom: 0.5rem;
        line-height: 1.3;
    }

    .item-title a {
        color: #212529;
        text-decoration: none;
        font-weight: 600;
    }

    .item-title a:hover {
        color: #0d6efd;
        text-decoration: underline;
    }

    .item-description {
        color: #6c757d;
        margin-bottom: 0.75rem;
        line-height: 1.5;
    }

    .item-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .item-author {
        color: #6c757d;
        font-size: 0.9rem;
    }

    .item-stats {
        text-align: right;
    }

    .stat-row {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 0.85rem;
        color: #6c757d;
    }

    .stat-row i {
        font-size: 0.9rem;
    }

    /* Skeleton Loading */
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

    .skeleton-item {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        pointer-events: none;
    }

    .skeleton-chart-icon {
        width: 80px;
        height: 80px;
        border-radius: 12px;
        margin: 0 auto;
    }

    .skeleton-title {
        height: 20px;
        width: 80%;
    }

    .skeleton-description {
        height: 16px;
        width: 100%;
    }

    .skeleton-meta {
        height: 14px;
        width: 60%;
    }

    .skeleton-button {
        height: 32px;
        width: 100px;
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
        .visualisasi-hero {
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
            gap: 20px;
        }

        .search-filter-section {
            padding: 1rem;
        }

        .search-filter-section .row>div {
            margin-bottom: 1rem;
        }

        .search-filter-section .row>div:last-child {
            margin-bottom: 0;
        }

        .list-item .row>div {
            margin-bottom: 1rem;
        }

        .list-item .row>div:last-child {
            margin-bottom: 0;
            text-align: center !important;
        }

        .item-stats {
            text-align: center !important;
            margin-bottom: 1rem;
        }

        .stat-row {
            justify-content: center;
        }

        .chart-icon {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
        }
    }

    @media (max-width: 576px) {
        .hero-title {
            font-size: 24px;
        }

        .visualisasi-list {
            margin-top: 1rem;
        }

        .list-item {
            padding: 1rem;
        }
    }

    /* Hero Section */
    .visualisasi-hero {
        background: #1581BF;
        color: white;
        padding-top: 120px !important;
        position: relative;
        overflow: hidden;
    }

    .visualisasi-hero::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 100%;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
        opacity: 0.3;
    }
</style>
