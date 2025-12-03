<template>
    <!-- Hero Section dengan Typing Animation -->
    <section id="hero" class="hero section dark-background pt-5">
        <!-- <img src="../assets/img/hero-bg-3.JPG" alt="" class="hero-bg" /> -->

        <div class="container mt-5">
            <div class="row gy-4 justify-content-between">
                <div class="col-lg-4 order-lg-last hero-img d-none d-lg-block" data-aos="zoom-out" data-aos-delay="100">
                    <img src="../assets/img/hero.png" class="img-fluid animated" alt="" />
                </div>

                <div class="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-in">
                    <h1 class="text-white">
                        Temukan Data tentang Kota Ternate untuk Mendukung
                        <!-- <br /> -->
                        <span class="typing-text text-primary">{{ currentText }}<span
                                class="typing-cursor">|</span></span>
                    </h1>
                    <p class="text-white">
                        <small>
                            Data resmi dari Pemerintah Kota Ternate untuk berbagai data terbuka dari pemerintah
                            untuk membantu Anda mengambil keputusan yang lebih baik untuk usaha, studi, riset,
                            maupun kebutuhan sehari-hari.
                        </small>
                    </p>

                    <!-- Enhanced Search Box -->
                    <div class="hero-search-container">
                        <div class="input-group hero-search-box">
                            <span class="input-group-text bg-white border-end-0">
                                <i class="bi bi-search text-muted"></i>
                            </span>
                            <input type="text" class="form-control border-start-0 border-end-0"
                                placeholder="Cari dataset, mapset, infografis, visualisasi..." aria-label="Search"
                                v-model="searchQuery" @keyup.enter="performSearch" @input="onSearchInput"
                                @focus="showSuggestions = true" @blur="hideSuggestions" />

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <svg class="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28 " preserveAspectRatio="none">
            <defs>
                <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z">
                </path>
            </defs>
            <g class="wave1">
                <use xlink:href="#wave-path" x="50" y="3"></use>
            </g>
            <g class="wave2">
                <use xlink:href="#wave-path" x="50" y="0"></use>
            </g>
            <g class="wave3">
                <use xlink:href="#wave-path" x="50" y="9"></use>
            </g>
        </svg>
    </section>
    <!-- /Hero Section -->
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'HeroSection',
        data() {
            return {
                // Typing animation
                currentText: '',
                currentWordIndex: 0,
                currentCharIndex: 0,
                isDeleting: false,
                isTyping: false,
                typingTimeout: null,
                typingWords: [
                    'Penelitian',
                    'Riset',
                    'Studi',
                    'Tugas',
                    'Inovasi',
                    'Kebijakan',
                    'Analisis',
                    'Perencanaan',
                    'Pembangunan',
                ],

                // Search functionality
                searchQuery: '',
                loading: false,
                suggestions: [],
                showSuggestions: false,
                searchTimeout: null,
                apiUrl: import.meta.env.VITE_API_URL,

                // Popular search terms
                popularTerms: ['ekonomi', 'kesehatan', 'pendidikan', 'infrastruktur', 'kependudukan'],
            }
        },

        mounted() {
            // Start typing animation after component is mounted
            this.startTyping()
        },

        beforeUnmount() {
            this.stopTyping()
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout)
            }
        },

        methods: {
            // Typing animation methods (unchanged)
            startTyping() {
                this.isTyping = true
                this.typeAnimation()
            },

            stopTyping() {
                this.isTyping = false
                if (this.typingTimeout) {
                    clearTimeout(this.typingTimeout)
                    this.typingTimeout = null
                }
            },

            typeAnimation() {
                if (!this.isTyping) return

                const currentWord = this.typingWords[this.currentWordIndex]

                if (this.isDeleting) {
                    // Delete characters
                    this.currentCharIndex--
                    this.currentText = currentWord.substring(0, this.currentCharIndex)

                    if (this.currentCharIndex === 0) {
                        this.isDeleting = false
                        this.currentWordIndex = (this.currentWordIndex + 1) % this.typingWords.length

                        // Pause before typing next word
                        this.typingTimeout = setTimeout(() => {
                            this.typeAnimation()
                        }, 500)
                        return
                    }

                    // Continue deleting
                    this.typingTimeout = setTimeout(() => {
                        this.typeAnimation()
                    }, 50)
                } else {
                    // Type characters
                    this.currentCharIndex++
                    this.currentText = currentWord.substring(0, this.currentCharIndex)

                    if (this.currentCharIndex === currentWord.length) {
                        // Word is complete, start deleting after a pause
                        this.isDeleting = true
                        this.typingTimeout = setTimeout(() => {
                            this.typeAnimation()
                        }, 2000)
                        return
                    }

                    // Continue typing
                    this.typingTimeout = setTimeout(() => {
                        this.typeAnimation()
                    }, 100)
                }
            },

            // Search methods
            performSearch() {
                if (this.searchQuery.trim()) {
                    // Navigate to search page with query
                    this.$router.push({
                        name: 'search',
                        query: {
                            q: this.searchQuery.trim()
                        },
                    })
                } else {
                    // Navigate to search page to show all data
                    this.$router.push({
                        name: 'search'
                    })
                }
            },

            quickSearch(term) {
                this.searchQuery = term
                this.performSearch()
            },

            async onSearchInput() {
                this.showSuggestions = false

                if (this.searchQuery.length < 2) {
                    this.suggestions = []
                    return
                }

                // Debounce search suggestions
                if (this.searchTimeout) {
                    clearTimeout(this.searchTimeout)
                }

                this.searchTimeout = setTimeout(async () => {
                    try {
                        const apiUrl = this.apiUrl.endsWith('/') ? this.apiUrl.slice(0, -1) : this
                            .apiUrl
                        const response = await axios.get(`${apiUrl}/search/autocomplete`, {
                            params: {
                                q: this.searchQuery
                            },
                        })

                        if (response.data.success) {
                            this.suggestions = response.data.data.slice(0, 5)
                            this.showSuggestions = this.suggestions.length > 0
                        }
                    } catch (error) {
                        console.error('Failed to get search suggestions:', error)
                        this.suggestions = []
                    }
                }, 300)
            },

            selectSuggestion(suggestion) {
                this.searchQuery = suggestion.title
                this.showSuggestions = false
                this.performSearch()
            },

            hideSuggestions() {
                // Delay hiding to allow click events on suggestions
                setTimeout(() => {
                    this.showSuggestions = false
                }, 200)
            },

            getTypeIcon(type) {
                const icons = {
                    dataset: 'bi bi-table',
                    mapset: 'bi bi-map',
                    infografis: 'bi bi-image',
                    visualisasi: 'bi bi-bar-chart',
                }
                return icons[type] || 'bi bi-file-text'
            },

            formatType(type) {
                const types = {
                    dataset: 'Dataset',
                    mapset: 'Mapset',
                    infografis: 'Infografis',
                    visualisasi: 'Visualisasi',
                }
                return types[type] || type
            },
        },
    }
</script>

<style scoped>
    .hero {
        padding: 150px 0 !important;
    }

    .typing-text {
        min-height: 1.2em;
        color: #fff !important;
        display: inline-block;
    }

    .typing-cursor {
        animation: typing-blink 1s infinite;
        font-weight: 100;
    }

    @keyframes typing-blink {

        0%,
        50% {
            opacity: 1;
        }

        51%,
        100% {
            opacity: 0;
        }
    }

    /* Hero Search Styles */
    .hero-search-container {
        position: relative;
        margin-top: 30px;
        max-width: 600px;
    }

    .hero-search-box {
        border-radius: 50px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        background: white;
    }

    .hero-search-box .input-group-text {
        background: white;
        border: none;
        padding: 15px 20px;
    }

    .hero-search-box .form-control {
        border: none;
        padding: 15px 20px;
        font-size: 16px;
        background: white;
    }

    .hero-search-box .form-control:focus {
        box-shadow: none;
        border: none;
    }

    .hero-search-box .btn-primary {
        padding: 15px 30px;
        border: none;
        background: linear-gradient(135deg, #47b2e4 0%, #209dd8 100%);
        font-weight: 600;
    }

    .hero-search-box .btn-primary:hover {
        background: linear-gradient(135deg, #209dd8 0%, #1a8bc7 100%);
    }

    /* Search Suggestions */
    .hero-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        margin-top: 8px;
        overflow: hidden;
        max-height: 300px;
        overflow-y: auto;
    }

    .suggestion-item {
        padding: 12px 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: background-color 0.2s;
        border-bottom: 1px solid #f8f9fa;
        color: #37517e;
    }

    .suggestion-item:hover {
        background-color: #f8f9fa;
    }

    .suggestion-item:last-child {
        border-bottom: none;
    }

    /* Popular Searches */
    .popular-searches {
        margin-top: 20px;
    }

    .popular-searches .btn-outline-light {
        border-color: rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.8);
        font-size: 13px;
        padding: 5px 12px;
    }

    .popular-searches .btn-outline-light:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
        color: white;
    }

    /* Responsive typography */
    @media (max-width: 768px) {
        .hero h1 {
            font-size: 1.8rem;
        }

        .hero-search-container {
            max-width: 100%;
        }

        .hero-search-box {
            border-radius: 25px;
        }

        .hero-search-box .input-group-text,
        .hero-search-box .form-control,
        .hero-search-box .btn-primary {
            padding: 12px 15px;
            font-size: 14px;
        }

        .popular-searches {
            text-align: center;
        }

        .popular-searches .btn-outline-light {
            font-size: 12px;
            padding: 4px 10px;
        }
    }

    @media (max-width: 576px) {
        .hero-search-box .btn-primary {
            padding: 12px 20px;
        }

        .suggestion-item {
            padding: 10px 15px;
            font-size: 14px;
        }
    }
</style>
