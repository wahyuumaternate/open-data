<template>
  <div id="app">
    <Header />
    <main class="main">
      <router-view />
    </main>
    <Footer />

    <!-- Scroll Top -->
    <a
      href="#"
      @click.prevent="scrollToTop"
      v-show="showScrollTop"
      :class="[
        'scroll-top',
        'd-flex',
        'align-items-center',
        'justify-content-center',
        { active: showScrollTop },
      ]"
    >
      <i class="bi bi-arrow-up-short"></i>
    </a>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      showScrollTop: false,
    }
  },
  mounted() {
    // Add scroll listener for scroll-to-top button
    window.addEventListener('scroll', this.handleScroll)

    // Initialize external libraries
    this.initializeLibraries()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    initializeLibraries() {
      setTimeout(() => {
        // Initialize AOS
        if (typeof AOS !== 'undefined') {
          AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
          })
        }

        // Initialize PureCounter
        if (typeof PureCounter !== 'undefined') {
          new PureCounter()
        }

        // Initialize GLightbox
        if (typeof GLightbox !== 'undefined') {
          GLightbox({
            selector: '.glightbox',
          })
        }
      }, 500)
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    handleScroll() {
      try {
        this.showScrollTop = window.pageYOffset > 100
        // Add any other scroll logic here safely
      } catch (error) {
        console.warn('Scroll error handled:', error.message)
      }
    },
    // Helper method untuk scroll yang aman
    safeScrollTo(elementId) {
      if (!elementId || elementId === '!' || elementId === '') {
        return
      }

      const targetId = elementId.startsWith('#') ? elementId : `#${elementId}`

      try {
        const element = document.querySelector(targetId)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      } catch (error) {
        console.warn('Error scrolling to element:', error.message)
      }
    },
  },
}
</script>

<style>
/* Global styles */
body {
  font-family:
    'Roboto',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

/* About section styles */
.about .content h3 {
  color: #4ecdc4;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.about .content h2 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.about .read-more {
  color: #4ecdc4;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.about .read-more:hover {
  color: #3ba99c;
}

.icon-box {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.icon-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.icon-box i {
  font-size: 3rem;
  color: #4ecdc4;
  margin-bottom: 1rem;
}

.icon-box h3 {
  color: #2c3e50;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

/* Features section styles */
.features .section-header h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.colom-fitur {
  transition: transform 0.3s ease;
}

.colom-fitur:hover {
  transform: scale(1.05);
}

.colom-fitur a {
  text-decoration: none;
  color: #2c3e50;
  display: block;
}

.colom-fitur img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.colom-fitur p {
  margin: 0.5rem 0 0 0;
  font-weight: 500;
  font-size: 0.9rem;
}

/* Scroll Top Button */
.scroll-top {
  position: fixed;
  visibility: hidden;
  opacity: 0;
  right: 15px;
  bottom: 15px;
  z-index: 996;
  background: #4ecdc4;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  transition: all 0.4s;
}

.scroll-top i {
  font-size: 24px;
  color: #fff;
  line-height: 0;
}

.scroll-top:hover {
  background: #3ba99c;
  color: #fff;
}

.scroll-top.active {
  visibility: visible;
  opacity: 1;
}
</style>
