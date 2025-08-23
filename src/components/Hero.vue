<template>
  <!-- Hero Section dengan Typing Animation -->
  <section id="hero" class="hero section dark-background pt-5">
    <!-- <img src="../assets/img/hero-bg-3.JPG" alt="" class="hero-bg" /> -->

    <div class="container mt-5">
      <div class="row gy-4 justify-content-between">
        <div
          class="col-lg-4 order-lg-last hero-img d-none d-lg-block"
          data-aos="zoom-out"
          data-aos-delay="100"
        >
          <img src="../assets/img/hero.png" class="img-fluid animated" alt="" />
        </div>

        <div class="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-in">
          <h1>
            Temukan Data tentang Kota Ternate untuk
            <br />
            <span class="typing-text text-primary"
              >{{ currentText }}<span class="typing-cursor">|</span></span
            >
          </h1>
          <p>
            <small>
              Data resmi dari Pemerintah Kota Ternate untuk berbagai data terbuka dari pemerintah
              untuk membantu Anda mengambil keputusan yang lebih baik untuk usaha, studi, riset,
              maupun kebutuhan sehari-hari.
            </small>
          </p>
          <!-- <div class="d-flex align-items-center position-relative">
            <input
              type="text"
              class="form-control"
              placeholder="Cari Dataset..."
              aria-label="Search"
              name="q"
              v-model="searchQuery"
              style="padding-left: 2rem"
            />
            <i class="bi bi-search position-absolute ms-2"></i>
          </div> -->
        </div>
      </div>
    </div>

    <svg
      class="hero-waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28 "
      preserveAspectRatio="none"
    >
      <defs>
        <path
          id="wave-path"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        ></path>
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
export default {
  name: 'HeroSection',
  data() {
    return {
      currentText: '',
      currentWordIndex: 0,
      currentCharIndex: 0,
      isDeleting: false,
      isTyping: false,
      typingTimeout: null,
      searchQuery: '',
      typingWords: [
        'Penelitian',
        'Bisnis',
        'Pendidikan',
        'Kesehatan',
        'Transportasi',
        'Ekonomi',
        'Pariwisata',
        'Investasi',
        'Inovasi',
        'Kebijakan',
        'Analisis',
        'Perencanaan',
        'Pembangunan',
        'Transparansi',
      ],
    }
  },
  mounted() {
    // Start typing animation after component is mounted
    this.startTyping()
  },
  beforeUnmount() {
    this.stopTyping()
  },
  methods: {
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
  },
}
</script>

<style>
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

/* Responsive typography */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 1.8rem;
  }
}
</style>
