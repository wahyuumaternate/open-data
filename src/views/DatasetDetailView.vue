<template>
    <div class="dataset-detail">
        <!-- Loading State with Skeleton -->
        <div v-if="loading">
            <!-- Skeleton Hero Section -->
            <section class="dataset-hero">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-2 text-center">
                            <div class="dataset-icon-container">
                                <div class="skeleton skeleton-icon"></div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="dataset-info">
                                <div class="skeleton skeleton-badge mb-3"></div>
                                <div class="skeleton skeleton-title mb-3"></div>
                                <div class="skeleton skeleton-description mb-4"></div>
                                <div class="skeleton skeleton-description-short mb-4"></div>

                                <div class="dataset-meta">
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
                        <div class="col-lg-12">
                            <!-- Skeleton Description Section -->
                            <div class="dataset-section">
                                <div class="section-title">
                                    <div class="skeleton skeleton-section-title mb-4"></div>
                                </div>
                                <div class="description-content">
                                    <div class="skeleton skeleton-text mb-3"></div>
                                    <div class="skeleton skeleton-text mb-3"></div>
                                    <div class="skeleton skeleton-text-short mb-4"></div>

                                    <div class="skeleton skeleton-subtitle mb-3"></div>
                                    <div class="skeleton skeleton-list-item mb-2"></div>
                                    <div class="skeleton skeleton-list-item mb-2"></div>
                                    <div class="skeleton skeleton-list-item mb-2"></div>
                                    <div class="skeleton skeleton-list-item"></div>
                                </div>
                            </div>

                            <!-- Skeleton Data Preview Section -->
                            <div class="dataset-section">
                                <div class="section-title">
                                    <div class="skeleton skeleton-section-title mb-4"></div>
                                </div>
                                <div class="table-container">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <div class="skeleton skeleton-table-header"></div>
                                                    </th>
                                                    <th>
                                                        <div class="skeleton skeleton-table-header"></div>
                                                    </th>
                                                    <th>
                                                        <div class="skeleton skeleton-table-header"></div>
                                                    </th>
                                                    <th>
                                                        <div class="skeleton skeleton-table-header"></div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="n in 5" :key="n">
                                                    <td>
                                                        <div class="skeleton skeleton-table-cell"></div>
                                                    </td>
                                                    <td>
                                                        <div class="skeleton skeleton-table-cell"></div>
                                                    </td>
                                                    <td>
                                                        <div class="skeleton skeleton-table-cell"></div>
                                                    </td>
                                                    <td>
                                                        <div class="skeleton skeleton-table-cell"></div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="table-note">
                                        <div class="skeleton skeleton-note"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <!-- Skeleton Related Datasets -->
                            <div class="sidebar-widget">
                                <div class="skeleton skeleton-widget-title mb-4"></div>
                                <div class="related-list">
                                    <div v-for="n in 3" :key="n" class="related-item">
                                        <div class="related-icon">
                                            <div class="skeleton skeleton-related-icon"></div>
                                        </div>
                                        <div class="related-content">
                                            <div class="skeleton skeleton-related-title mb-2"></div>
                                            <div class="skeleton skeleton-related-downloads"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
            <button @click="fetchDataset" class="btn btn-outline-danger btn-sm mt-2">Coba Lagi</button>
        </div>

        <!-- Main Content -->
        <div v-if="!loading && !error && dataset">
            <!-- Dataset Hero Section -->
            <section id="dataset-hero" class="dataset-hero">
                <div class="container" data-aos="fade-up">
                    <div class="row align-items-center">
                        <div class="col-lg-2 text-center">
                            <div class="dataset-icon-container">
                                <img :src="getCategoryImage(dataset.topic)" :alt="dataset.title"
                                    class="dataset-icon" />
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="dataset-info">
                                <div class="category-label mt-3" :class="getCategoryClass(dataset.topic)">
                                    {{ dataset . topic }}
                                </div>
                                <h1 class="dataset-title">{{ dataset . title }}</h1>
                                <p class="dataset-description">{{ dataset . description }}</p>

                                <div class="dataset-meta">
                                    <div class="meta-item">
                                        <i class="bx bx-building"></i>
                                        <span>{{ dataset . organization_name || 'Unknown Organization' }}</span>
                                    </div>
                                    <div class="meta-item">
                                        <i class="bx bx-calendar"></i>
                                        <span>Diperbarui {{ formatDate(dataset . updated_at) }}</span>
                                    </div>
                                    <div class="meta-item">
                                        <i class="bx bx-download"></i>
                                        <span>{{ (dataset . download_count || 0) . toLocaleString() }} downloads</span>
                                    </div>
                                    <div class="meta-item">
                                        <i class="bx bx-show"></i>
                                        <span>{{ (dataset . view_count || 0) . toLocaleString() }} views</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 text-center">
                            <button @click="downloadDataset" class="btn-download-csv">
                                <i class="bx bx-download"></i>
                                Download Dataset
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Main Content -->
            <section class="section-bg">
                <div class="container">
                    <div class="row">
                        <!-- Main Content Area -->
                        <div class="col-lg-12">
                            <!-- Tabs Navigation -->
                            <div class="dataset-tabs" data-aos="fade-up">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" :class="{ active: activeTab === 'preview' }"
                                            @click="switchToPreview" type="button" role="tab">
                                            <i class="bx bx-table"></i>
                                            Preview Data
                                        </button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" :class="{ active: activeTab === 'metadata' }"
                                            @click="activeTab = 'metadata'" type="button" role="tab">
                                            <i class="bx bx-info-circle"></i>
                                            Metadata
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <!-- Tab Contents -->
                            <div class="tab-content">
                                <!-- Data Preview Tab -->
                                <div v-if="activeTab === 'preview'" class="tab-pane active">
                                    <div class="dataset-section">
                                        <div v-if="hasPreviewData" class="table-container">
                                            <table id="datasetPreviewTable" class="table table-striped table-bordered"
                                                style="width: 100%">
                                                <thead>
                                                    <tr>
                                                        <th v-for="(value, key) in getDataHeaders"
                                                            :key="key">
                                                            {{ key }}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(row, index) in getPreviewData" :key="index">
                                                        <td v-for="(value, key) in row" :key="key">
                                                            {{ formatCellValue(value) }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="table-note mt-3">
                                                <small>
                                                    <i class="bx bx-info-circle"></i>
                                                    Dataset lengkap memiliki
                                                    {{ (dataset . total_rows || 0) . toLocaleString() }} baris
                                                    dan {{ (dataset . total_columns || 0) . toLocaleString() }} kolom
                                                </small>
                                            </div>
                                        </div>
                                        <div v-else class="no-data-message">
                                            <i class="bx bx-data"></i>
                                            <p>Tidak ada data preview tersedia untuk dataset ini.</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Metadata Tab -->
                                <div v-if="activeTab === 'metadata'" class="tab-pane active">
                                    <div class="dataset-section">
                                        <div class="metadata-content">
                                            <div class="metadata-grid">
                                                <!-- Basic Information -->
                                                <div class="metadata-group">
                                                    <h5><i class="bx bx-info-circle"></i> Informasi Dasar</h5>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Judul Dataset:</span>
                                                        <span class="metadata-value">{{ dataset . title }}</span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Organisasi:</span>
                                                        <span
                                                            class="metadata-value">{{ dataset . organization_name || dataset . organization }}</span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Topik:</span>
                                                        <span class="metadata-value">{{ dataset . topic }}</span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Sektor:</span>
                                                        <span class="metadata-value">{{ dataset . sector }}</span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Penanggung Jawab:</span>
                                                        <span
                                                            class="metadata-value">{{ dataset . responsible_person }}</span>
                                                    </div>
                                                </div>

                                                <!-- Data Information -->
                                                <div class="metadata-group">
                                                    <h5><i class="bx bx-data"></i> Informasi Data</h5>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Jumlah Baris:</span>
                                                        <span
                                                            class="metadata-value">{{ (dataset . total_rows || 0) . toLocaleString() }}</span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Jumlah Kolom:</span>
                                                        <span
                                                            class="metadata-value">{{ (dataset . total_columns || 0) . toLocaleString() }}</span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Ukuran File:</span>
                                                        <span
                                                            class="metadata-value">{{ dataset . file_size_formatted }}</span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Tipe File:</span>
                                                        <span class="metadata-value">{{ dataset . file_type }}</span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Nama File:</span>
                                                        <span
                                                            class="metadata-value">{{ dataset . original_filename }}</span>
                                                    </div>
                                                </div>

                                                <!-- Temporal Information -->
                                                <div class="metadata-group">
                                                    <h5><i class="bx bx-calendar"></i> Informasi Temporal</h5>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Periode Data:</span>
                                                        <span
                                                            class="metadata-value">{{ dataset . data_period || '-' }}</span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Frekuensi Update:</span>
                                                        <span
                                                            class="metadata-value">{{ formatUpdateFrequency(dataset . update_frequency) }}</span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Dibuat:</span>
                                                        <span
                                                            class="metadata-value">{{ formatDate(dataset . created_at) }}</span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Diperbarui:</span>
                                                        <span
                                                            class="metadata-value">{{ formatDate(dataset . updated_at) }}</span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Dipublikasikan:</span>
                                                        <span
                                                            class="metadata-value">{{ formatDate(dataset . published_at) }}</span>
                                                    </div>
                                                </div>

                                                <!-- Geographic & Classification -->
                                                <div class="metadata-group">
                                                    <h5><i class="bx bx-map"></i> Cakupan & Klasifikasi</h5>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Cakupan Geografis:</span>
                                                        <span
                                                            class="metadata-value">{{ dataset . geographic_coverage || '-' }}</span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Klasifikasi:</span>
                                                        <span class="metadata-value">
                                                            <span class="classification-badge"
                                                                :class="'classification-' + dataset.classification">
                                                                {{ dataset . classification }}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Status:</span>
                                                        <span class="metadata-value">
                                                            <span class="status-badge"
                                                                :class="'status-' + dataset.status">
                                                                {{ dataset . status }}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div class="metadata-row">
                                                        <span class="metadata-label">Lisensi:</span>
                                                        <span
                                                            class="metadata-value">{{ formatLicense(dataset . license) }}</span>
                                                    </div>
                                                </div>


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
    </div>
</template>

<script>
    // ==================================================================
    // REPLACE YOUR ENTIRE <script> SECTION WITH THIS
    // ==================================================================

    import axios from 'axios'
    import $ from 'jquery'
    import 'datatables.net-bs5'
    import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'

    export default {
        name: 'DatasetDetailView',
        props: ['id'],
        data() {
            return {
                apiUrl: import.meta.env.VITE_API_URL,
                loading: false,
                error: null,
                activeTab: 'preview',
                dataset: null,
                dataTableInstance: null, // Store DataTable instance
                dataTableInitialized: false, // Track initialization state

                relatedDatasets: [{
                        id: 2,
                        title: 'Data Kesehatan Masyarakat 2024',
                        category_id: 'kesehatan',
                        downloads: 876
                    },
                    {
                        id: 3,
                        title: 'Data Pendidikan Kota Ternate',
                        category_id: 'pendidikan',
                        downloads: 654
                    },
                    {
                        id: 4,
                        title: 'Data Ekonomi Regional 2024',
                        category_id: 'ekonomi',
                        downloads: 1023
                    },
                ],

                topicImageMap: {
                    Ekonomi: 'data-ekonomi.svg',
                    Infrastruktur: 'data-infrastruktur.svg',
                    Kemiskinan: 'data-kemiskinan.svg',
                    Kependudukan: 'data-kependudukan.svg',
                    Kesehatan: 'data-kesehatan.svg',
                    'Lingkungan Hidup': 'data-lingkungan.svg',
                    'Pariwisata & Kebudayaan': 'data-pariwisata.svg',
                    Pariwisata: 'data-pariwisata.svg',
                    'Pemerintah & Desa': 'data-pemerintah.svg',
                    Pemerintahan: 'data-pemerintah.svg',
                    Pendidikan: 'data-pendidikan.svg',
                    Sosial: 'data-sosial.svg',
                },

                categories: [{
                        id: 'kependudukan',
                        name: 'Kependudukan'
                    },
                    {
                        id: 'kesehatan',
                        name: 'Kesehatan'
                    },
                    {
                        id: 'pendidikan',
                        name: 'Pendidikan'
                    },
                    {
                        id: 'ekonomi',
                        name: 'Ekonomi'
                    },
                    {
                        id: 'sosial',
                        name: 'Sosial'
                    },
                ],
                organizations: [{
                        id: 'disdukcapil',
                        name: 'Dinas Kependudukan dan Pencatatan Sipil'
                    },
                    {
                        id: 'dinkes',
                        name: 'Dinas Kesehatan'
                    },
                    {
                        id: 'dindik',
                        name: 'Dinas Pendidikan'
                    },
                ],
            }
        },

        computed: {
            hasPreviewData() {
                return this.dataset && this.dataset.data && this.dataset.data.length > 0
            },

            hasDataFields() {
                return this.hasPreviewData && this.getDataFields.length > 0
            },

            getDataHeaders() {
                if (!this.hasPreviewData) return {}
                return this.dataset.data[0] || {}
            },

            getPreviewData() {
                if (!this.hasPreviewData) return []
                return this.dataset.data || []
            },

            getDataFields() {
                if (!this.hasPreviewData) return []
                return Object.keys(this.dataset.data[0] || {})
            },
        },

        async mounted() {
            await this.fetchDataset()

            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                })
            }
        },

        methods: {
            async fetchDataset() {
                this.loading = true
                this.error = null

                try {
                    const slug =
                        this.$route?.params?.slug ||
                        this.$route?.params?.id ||
                        window.location.pathname.split('/').pop()

                    if (!slug) {
                        throw new Error('Slug parameter tidak ditemukan di URL')
                    }

                    const response = await axios.get(`${this.apiUrl}datasets/${slug}`)

                    if (response.data.success) {
                        this.dataset = response.data.data.dataset
                        document.title = `${this.dataset.title} - Satu Data Ternate`

                        // Initialize DataTable if preview tab is active
                        if (this.activeTab === 'preview' && this.hasPreviewData) {
                            this.$nextTick(() => {
                                setTimeout(() => {
                                    this.initDataTable()
                                }, 600)
                            })
                        }
                    } else {
                        throw new Error(response.data.message || 'Failed to fetch dataset')
                    }
                } catch (error) {

                    if (error.response?.status === 404) {
                        this.$router.push({
                            name: 'NotFound'
                        })
                    } else if (error.message.includes('Slug parameter')) {
                        this.error = 'Parameter URL tidak valid. Pastikan URL dalam format /dataset/{slug}'
                    } else {
                        this.error = 'Gagal memuat dataset. Silakan coba lagi.'
                    }
                } finally {
                    this.loading = false
                }
            },

            switchToPreview() {
                this.activeTab = 'preview'

                // Wait for tab content to render
                this.$nextTick(() => {
                    // Destroy existing instance first
                    this.destroyDataTable()

                    // Initialize with longer delay
                    setTimeout(() => {
                        this.initDataTable()
                    }, 400)
                })
            },

            /**
             * Destroy DataTable instance safely
             */
            destroyDataTable() {
                try {
                    if (this.dataTableInstance) {

                        this.dataTableInstance.destroy()
                        this.dataTableInstance = null
                        this.dataTableInitialized = false
                    } else if ($.fn.DataTable.isDataTable('#datasetPreviewTable')) {

                        $('#datasetPreviewTable').DataTable().destroy()
                        this.dataTableInitialized = false
                    }
                } catch (error) {

                    // Force reset
                    this.dataTableInstance = null
                    this.dataTableInitialized = false
                }
            },

            /**
             * Initialize DataTable with comprehensive checks
             */
            initDataTable() {
                // Prevent double initialization
                if (this.dataTableInitialized) {

                    return
                }

                // Check if we have data
                if (!this.hasPreviewData || this.getPreviewData.length === 0) {

                    return
                }

                // Check if table element exists
                const tableElement = document.getElementById('datasetPreviewTable')
                if (!tableElement) {

                    return
                }

                // Check if tbody is rendered with data
                const tbody = tableElement.querySelector('tbody')
                const rows = tbody ? tbody.querySelectorAll('tr') : []

                if (!tbody || rows.length === 0) {

                    setTimeout(() => this.initDataTable(), 300)
                    return
                }



                try {
                    // Double-check no existing instance
                    this.destroyDataTable()

                    // Initialize DataTable
                    this.dataTableInstance = $('#datasetPreviewTable').DataTable({
                        responsive: true,
                        pageLength: 10,
                        lengthMenu: [
                            [5, 10, 25, 50, -1],
                            [5, 10, 25, 50, 'Semua'],
                        ],
                        language: {
                            search: 'Cari:',
                            lengthMenu: 'Tampilkan _MENU_ data per halaman',
                            info: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ data',
                            infoEmpty: 'Tidak ada data tersedia',
                            infoFiltered: '(difilter dari _MAX_ total data)',
                            zeroRecords: 'Data tidak ditemukan',
                            paginate: {
                                next: 'Selanjutnya',
                                previous: 'Sebelumnya',
                            },
                        },
                        columnDefs: [{
                            targets: '_all',
                            render: function(data, type, row) {
                                if (type === 'display' && data != null) {
                                    if (typeof data === 'string' && data.length > 50) {
                                        const escaped = String(data).replace(/"/g, '&quot;')
                                        return '<span title="' + escaped + '">' +
                                            data.substring(0, 50) + '...</span>'
                                    }
                                }
                                return data || '-'
                            },
                            className: 'align-middle',
                        }],
                        dom: '<"d-flex justify-content-between align-items-center mb-3"<"d-flex align-items-center"l><"d-flex align-items-center"f>>' +
                            '<"table-responsive"t>' +
                            '<"d-flex justify-content-between align-items-center mt-3"<"datatable-info"i><"datatable-pagination"p>>',
                        scrollX: true,
                        autoWidth: false,
                        processing: false,
                        deferRender: true,
                        drawCallback: function() {
                            $('.dataTables_wrapper').addClass('modern-datatable')
                        },
                    })

                    this.dataTableInitialized = true


                } catch (error) {

                    this.dataTableInitialized = false
                    this.dataTableInstance = null
                }
            },

            async downloadDataset(event) {
                if (!this.dataset) {
                    alert('Dataset tidak tersedia')
                    return
                }

                try {
                    const button = event.target.closest('button')
                    const originalText = button.innerHTML
                    button.disabled = true
                    button.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Mengunduh...'

                    const response = await axios.get(
                        `${this.apiUrl}datasets/${this.dataset.slug}/download`, {
                            responseType: 'blob'
                        }
                    )

                    const blob = new Blob([response.data])
                    const url = window.URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `${this.dataset.slug}.xlsx`
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                    window.URL.revokeObjectURL(url)

                    if (this.dataset.download_count !== undefined) {
                        this.dataset.download_count++
                    }

                    button.disabled = false
                    button.innerHTML = originalText

                } catch (error) {


                    const button = event.target.closest('button')
                    if (button) {
                        button.disabled = false
                        button.innerHTML = '<i class="bx bx-download"></i> Download Dataset'
                    }

                    if (error.response?.status === 404) {
                        alert('Data tidak tersedia untuk diunduh')
                    } else {
                        alert('Gagal mengunduh file. Silakan coba lagi.')
                    }
                }
            },

            getCategoryName(categoryId) {
                const category = this.categories.find((cat) => cat.id === categoryId)
                return category ? category.name : categoryId
            },

            getCategoryClass(topic) {
                const classMap = {
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
                }
                return classMap[topic] || 'category-default'
            },

            getCategoryImage(categoryIdOrTopic) {
                let imageName
                if (typeof categoryIdOrTopic === 'string') {
                    imageName = this.topicImageMap[categoryIdOrTopic] ||
                        `data-${categoryIdOrTopic.toLowerCase()}.svg`
                } else {
                    imageName = `data-${categoryIdOrTopic}.svg`
                }
                return `/assets/img/${imageName}`
            },

            getOrganizationName(orgId) {
                const org = this.organizations.find((o) => o.id === orgId)
                return org ? org.name : orgId
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

            formatCellValue(value) {
                if (value === null || value === undefined) {
                    return '-'
                }
                if (typeof value === 'string' && value.length > 50) {
                    return value.substring(0, 50) + '...'
                }
                return value
            },

            formatUpdateFrequency(frequency) {
                const frequencyMap = {
                    'harian': 'Harian',
                    'mingguan': 'Mingguan',
                    'bulanan': 'Bulanan',
                    'tahunan': 'Tahunan',
                    'real-time': 'Real-time',
                    'tidak-teratur': 'Tidak Teratur'
                }
                return frequencyMap[frequency] || frequency || '-'
            },

            formatLicense(license) {
                const licenseMap = {
                    'cc-by': 'Creative Commons Attribution (CC BY)',
                    'cc-by-sa': 'Creative Commons Attribution-ShareAlike (CC BY-SA)',
                    'cc0': 'Creative Commons Zero (CC0)',
                    'odc-by': 'Open Data Commons Attribution License',
                    'pddl': 'Public Domain Dedication and License'
                }
                return licenseMap[license] || license || '-'
            },
        },

        watch: {
            // Watch for dataset data changes
            'dataset.data': {
                handler(newData, oldData) {
                    if (newData && newData.length > 0 &&
                        this.activeTab === 'preview' &&
                        !this.dataTableInitialized) {

                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.initDataTable()
                            }, 400)
                        })
                    }
                },
                deep: true
            }
        },

        beforeUnmount() {

            this.destroyDataTable()
        },
    }
</script>

<style scoped>
    /* [All the existing styles remain the same - I'm keeping them as is from your document] */
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

    .skeleton-section-title {
        width: 200px;
        height: 24px;
    }

    .skeleton-text {
        width: 100%;
        height: 16px;
    }

    .skeleton-text-short {
        width: 75%;
        height: 16px;
    }

    .skeleton-subtitle {
        width: 150px;
        height: 18px;
    }

    .skeleton-list-item {
        width: 90%;
        height: 14px;
    }

    .skeleton-table-header {
        width: 100%;
        height: 16px;
    }

    .skeleton-table-cell {
        width: 100%;
        height: 14px;
    }

    .skeleton-note {
        width: 300px;
        height: 12px;
        margin: 0 auto;
    }

    .skeleton-widget-title {
        width: 150px;
        height: 20px;
    }

    .skeleton-related-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
    }

    .skeleton-related-title {
        width: 200px;
        height: 14px;
    }

    .skeleton-related-downloads {
        width: 100px;
        height: 12px;
    }

    /* Dataset Hero Section */
    .dataset-hero {
        padding-top: 120px !important;
        background: #1581BF;
        color: white;
    }

    .dataset-icon-container {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 20px;
        backdrop-filter: blur(10px);
        display: inline-block;
    }

    .dataset-icon {
        width: 100px;
        height: 100px;
        object-fit: contain;
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
    }

    .category-kependudukan {
        background: rgba(255, 255, 255, 0.2);
    }

    .category-kesehatan {
        background: rgba(71, 178, 228, 0.3);
    }

    .category-pendidikan {
        background: rgba(67, 233, 123, 0.3);
    }

    .category-ekonomi {
        background: rgba(255, 236, 210, 0.3);
    }

    .category-sosial {
        background: rgba(255, 255, 255, 0.2);
    }

    .dataset-title {
        color: #ffffff;
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 20px;
        line-height: 1.2;
    }

    .dataset-description {
        font-size: 18px;
        line-height: 1.6;
        margin-bottom: 30px;
        opacity: 0.9;
    }

    .dataset-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
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

    /* Download CSV Button */
    .btn-download-csv {
        display: block;
        width: 100%;
        padding: 15px 20px;
        background: #1acc8d;
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s;
        cursor: pointer;
        font-size: 14px;
    }

    .btn-download-csv:hover:not(:disabled) {
        background: #1ff4a9ff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(26, 204, 141, 0.3);
    }

    .btn-download-csv:disabled {
        background: #ccc;
        cursor: not-allowed;
        opacity: 0.6;
    }

    .btn-download-csv i {
        margin-right: 8px;
    }

    /* Main Content */
    .section-bg {
        background-color: #f3f5fa;
        padding: 80px 0;
    }

    /* Tabs Styling */
    .dataset-tabs {
        background: white;
        border-radius: 10px 10px 0 0;
        box-shadow: 0 0 29px 0 rgba(68, 88, 144, 0.12);
        overflow: hidden;
    }

    .dataset-tabs .nav-tabs {
        border-bottom: 2px solid #e5e7eb;
        padding: 0;
        margin: 0;
    }

    .dataset-tabs .nav-item {
        margin-bottom: 0;
    }

    .dataset-tabs .nav-link {
        border: none;
        border-bottom: 3px solid transparent;
        color: #6b7280;
        padding: 18px 30px;
        font-weight: 600;
        font-size: 15px;
        transition: all 0.3s ease;
        background: transparent;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .dataset-tabs .nav-link i {
        font-size: 20px;
    }

    .dataset-tabs .nav-link:hover {
        color: #1581BF;
        background: #f8fafc;
    }

    .dataset-tabs .nav-link.active {
        color: #1581BF;
        border-bottom-color: #1581BF;
        background: white;
    }

    /* Tab Content */
    .tab-content {
        background: white;
        border-radius: 0 0 10px 10px;
        box-shadow: 0 0 29px 0 rgba(68, 88, 144, 0.12);
        min-height: 400px;
    }

    .tab-pane {
        display: none;
    }

    .tab-pane.active {
        display: block;
        animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .dataset-section {
        padding: 40px;
        margin-bottom: 0;
        box-shadow: none;
    }

    .section-title h3 {
        font-size: 24px;
        font-weight: 700;
        color: #37517e;
        margin-bottom: 30px;
    }

    .section-title i {
        margin-right: 10px;
        color: #1acc8d;
    }

    /* Description Content */
    .description-content p {
        color: #444444;
        line-height: 1.8;
        margin-bottom: 30px;
        font-size: 15px;
    }

    .description-content h5 {
        color: #37517e;
        font-weight: 600;
        margin-bottom: 15px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .description-content h5 i {
        color: #1581BF;
        font-size: 20px;
    }

    .info-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .info-list li {
        padding: 12px;
        border-bottom: 1px solid #e5e7eb;
        color: #444444;
        font-size: 14px;
    }

    .info-list li:last-child {
        border-bottom: none;
    }

    .info-list li strong {
        color: #37517e;
        font-weight: 600;
        margin-right: 8px;
    }

    /* Tags */
    .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .tag-badge {
        background: #e0f2fe;
        color: #0369a1;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        border: 1px solid #bae6fd;
    }

    /* Metadata Content */
    .metadata-content {
        color: #444444;
    }

    .metadata-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 30px;
    }

    .metadata-group {
        background: #f8fafc;
        padding: 25px;
        border-radius: 10px;
        border: 1px solid #e5e7eb;
    }

    .metadata-group h5 {
        color: #37517e;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 2px solid #1581BF;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .metadata-group h5 i {
        color: #1581BF;
        font-size: 20px;
    }

    .metadata-row {
        display: flex;
        padding: 12px 0;
        border-bottom: 1px solid #e5e7eb;
    }

    .metadata-row:last-child {
        border-bottom: none;
    }

    .metadata-label {
        font-weight: 600;
        color: #6b7280;
        min-width: 180px;
        font-size: 14px;
    }

    .metadata-value {
        color: #374151;
        flex: 1;
        font-size: 14px;
    }

    /* Status Badges */
    .classification-badge,
    .status-badge,
    .approval-badge {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
    }

    .classification-publik {
        background: #dcfce7;
        color: #166534;
    }

    .classification-terbatas {
        background: #fef3c7;
        color: #92400e;
    }

    .status-sementara {
        background: #dbeafe;
        color: #1e40af;
    }

    .status-final {
        background: #dcfce7;
        color: #166534;
    }

    .approval-badge.approved {
        background: #dcfce7;
        color: #166534;
    }

    /* No Data Message */
    .no-data-message {
        text-align: center;
        padding: 60px 20px;
        color: #6b7280;
    }

    .no-data-message i {
        font-size: 64px;
        color: #d1d5db;
        margin-bottom: 20px;
    }

    .no-data-message p {
        font-size: 16px;
        margin: 0;
    }

    /* Table Container */
    .table-container {
        margin-top: 0;
        border-radius: 12px;
        overflow: hidden;
        background: white;
    }

    /* DataTable Wrapper Styling */
    .table-container .dataTables_wrapper {
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
    }

    /* DataTable Header Styling */
    .table-container .table thead th {
        background: #1581BF;
        border: none;
        color: white;
        font-weight: 600;
        font-size: 14px;
        padding: 15px 12px;
        text-align: center;
        position: relative;
        vertical-align: top;
        border-bottom: 3px solid #1581BF;
    }

    /* Table Body Styling */
    .table-container .table tbody td {
        padding: 14px 12px;
        border-bottom: 1px solid #e5e7eb;
        color: #374151;
        font-size: 14px;
        vertical-align: middle;
        background: white;
        transition: all 0.3s ease;
    }

    /* Striped Rows */
    .table-container .table tbody tr:nth-child(even) td {
        background-color: #f8fafc;
    }

    /* Hover Effects */
    .table-container .table tbody tr:hover td {
        background-color: #dbeafe !important;
        transform: scale(1.01);
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
    }

    /* Table Borders */
    .table-container .table {
        margin-bottom: 0;
        border-collapse: separate;
        border-spacing: 0;
        border-radius: 12px;
        overflow: hidden;
    }

    /* DataTable Controls Styling */
    .table-container .dataTables_length,
    .table-container .dataTables_filter {
        margin-bottom: 1.5rem;
    }

    .table-container .dataTables_length label,
    .table-container .dataTables_filter label {
        font-weight: 600;
        color: #374151;
        margin-bottom: 0;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
    }

    .table-container .dataTables_length select {
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        padding: 8px 12px;
        font-size: 14px;
        background: white;
        color: #374151;
        transition: all 0.3s ease;
        min-width: 80px;
    }

    .table-container .dataTables_length select:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        outline: none;
    }

    .table-container .dataTables_filter input {
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        padding: 8px 15px;
        font-size: 14px;
        background: white;
        color: #374151;
        transition: all 0.3s ease;
        margin-left: 10px;
        min-width: 250px;
    }

    .table-container .dataTables_filter input:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        outline: none;
    }

    /* Info and Pagination */
    .table-container .dataTables_info {
        color: #6b7280;
        font-size: 14px;
        font-weight: 500;
        margin-top: 1.5rem;
    }

    .table-container .dataTables_paginate {
        margin-top: 1.5rem;
    }

    /* Pagination Buttons */
    .table-container .dataTables_paginate .paginate_button {
        border: 2px solid #e5e7eb;
        color: #374151 !important;
        background: white;
        padding: 8px 16px;
        margin: 0 3px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 40px;
    }

    .table-container .dataTables_paginate .paginate_button:hover {
        background: #3b82f6 !important;
        color: white !important;
        border-color: #3b82f6;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .table-container .dataTables_paginate .paginate_button.current {
        background: #3b82f6 !important;
        color: white !important;
        border-color: #3b82f6;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .table-container .dataTables_paginate .paginate_button.disabled {
        color: #9ca3af !important;
        background: #f3f4f6;
        border-color: #e5e7eb;
        cursor: not-allowed;
        opacity: 0.6;
    }

    .table-container .dataTables_paginate .paginate_button.disabled:hover {
        background: #f3f4f6 !important;
        color: #9ca3af !important;
        transform: none;
        box-shadow: none;
    }

    /* Sidebar */
    .sidebar-widget {
        background: white;
        border-radius: 10px;
        padding: 30px;
        margin-top: 30px;
        box-shadow: 0 0 29px 0 rgba(68, 88, 144, 0.12);
    }

    .sidebar-widget h4 {
        font-size: 20px;
        font-weight: 700;
        color: #37517e;
        margin-bottom: 25px;
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
    }

    .related-item:hover {
        background: #ebeef4;
        transform: translateY(-2px);
    }

    .related-icon img {
        width: 40px;
        height: 40px;
        border-radius: 8px;
    }

    .related-content h6 {
        font-size: 14px;
        font-weight: 600;
        color: #37517e;
        margin-bottom: 5px;
    }

    .related-content .downloads {
        font-size: 12px;
        color: #6c757d;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .dataset-hero {
            padding: 40px 0;
            text-align: center;
        }

        .dataset-title {
            font-size: 24px;
        }

        .dataset-description {
            font-size: 16px;
        }

        .dataset-meta {
            justify-content: center;
            gap: 20px;
        }

        .btn-download-csv {
            margin-top: 20px;
        }

        .section-bg {
            padding: 40px 0;
        }

        .dataset-section {
            padding: 20px;
        }

        .dataset-tabs .nav-link {
            padding: 15px 20px;
            font-size: 14px;
        }

        .metadata-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .metadata-label {
            min-width: 140px;
            font-size: 13px;
        }

        .metadata-value {
            font-size: 13px;
        }

        .sidebar-widget {
            padding: 20px;
        }

        /* Mobile skeleton adjustments */
        .skeleton-icon {
            width: 80px;
            height: 80px;
        }

        .skeleton-title {
            width: 90%;
        }

        .dataset-meta {
            flex-direction: column;
            gap: 15px;
        }

        .table-container .dataTables_wrapper {
            padding: 1rem;
        }

        .table-container .dataTables_filter input {
            margin-left: 0;
            min-width: 200px;
        }
    }

    /* Loading spinner animation */
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    .bx-spin {
        animation: spin 1s linear infinite;
    }
</style>
