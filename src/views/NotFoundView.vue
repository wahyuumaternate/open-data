<template>
  <div class="not-found-page">
    <!-- Hero Section with Gradient Background -->
    <section class="error-hero">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6 order-lg-2" data-aos="fade-left">
            <div class="error-illustration">
              <!-- 404 SVG Illustration -->

              <img src="@/assets/img/404.svg" alt="404 Illustration" />
            </div>
          </div>

          <div class="col-lg-6 order-lg-1" data-aos="fade-right">
            <div class="error-content">
              <div class="error-badge">
                <i class="bi bi-exclamation-triangle"></i>
                <span>Error 404</span>
              </div>

              <h1 class="error-title">
                Halaman Tidak
                <span class="gradient-text">Ditemukan</span>
              </h1>

              <p class="error-description">
                Oops! Sepertinya halaman yang Anda cari telah berpindah ke dimensi lain atau mungkin
                sedang bersembunyi dari kita. Jangan khawatir, mari kita bawa Anda kembali ke jalur
                yang benar.
              </p>

              <div class="error-stats">
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="bi bi-search"></i>
                  </div>
                  <div class="stat-content">
                    <span class="stat-number">0</span>
                    <span class="stat-label">Hasil Ditemukan</span>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="bi bi-clock"></i>
                  </div>
                  <div class="stat-content">
                    <span class="stat-number">404</span>
                    <span class="stat-label">Error Code</span>
                  </div>
                </div>
              </div>

              <div class="error-actions">
                <router-link to="/" class="btn btn-primary btn-lg">
                  <i class="bi bi-house-fill"></i>
                  <span>Kembali ke Beranda</span>
                </router-link>
                <router-link to="/datasets" class="btn btn-outline-primary btn-lg">
                  <i class="bi bi-database"></i>
                  <span>Lihat Dataset</span>
                </router-link>
              </div>

              <div class="help-links">
                <a href="#" class="help-link">
                  <i class="bi bi-question-circle"></i>
                  Butuh Bantuan?
                </a>
                <a href="#" class="help-link">
                  <i class="bi bi-envelope"></i>
                  Hubungi Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Background Elements -->
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  mounted() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
      })
    }

    // Add some interactive effects
    this.addInteractiveEffects()
  },

  methods: {
    addInteractiveEffects() {
      // Add mouse move parallax effect
      document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.floating-shapes .shape')
        const x = e.clientX / window.innerWidth
        const y = e.clientY / window.innerHeight

        shapes.forEach((shape, index) => {
          const speed = (index + 1) * 0.5
          const xPos = (x - 0.5) * speed * 50
          const yPos = (y - 0.5) * speed * 50

          shape.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${xPos * 0.1}deg)`
        })
      })
    },
  },
}
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

.error-hero {
  background: linear-gradient(135deg, #040677 0%, #1e40af 100%);
  color: white;
  padding: 120px 0 80px !important;
  position: relative;
  overflow: hidden;
}
.error-hero {
  position: relative;
  z-index: 2;
}

/* Error Content Styles */
.error-content {
  padding: 2rem 0;
}

.error-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.error-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(45deg, #3b82f6, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #64748b;
  margin-bottom: 2rem;
  max-width: 500px;
}

/* Stats Section */
.error-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 1rem 1.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e40af;
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  color: #64748b;
}

/* Action Buttons */
.error-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.btn-primary {
  background: linear-gradient(45deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
  color: white;
}

.btn-outline-primary {
  background: #ffffff;
  color: #3b82f6;
  border-color: #3b82f6;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.btn-outline-primary:hover {
  background: #3b82f6;
  transform: translateY(-2px);
  color: white;
  border-color: #3b82f6;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

/* Help Links */
.help-links {
  display: flex;
  gap: 2rem;
}

.help-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.help-link:hover {
  color: #3b82f6;
  transform: translateX(5px);
}

/* SVG Illustration */
.error-illustration {
  position: relative;
}

.error-svg {
  width: 100%;
  height: auto;
  max-width: 600px;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
}

/* Floating Background Shapes */
.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.shape {
  position: absolute;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(29, 78, 216, 0.1));
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 60px;
  height: 60px;
  top: 20%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 15%;
  animation-delay: 4s;
}

.shape-4 {
  width: 40px;
  height: 40px;
  bottom: 10%;
  right: 20%;
  animation-delay: 1s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .error-title {
    font-size: 2.5rem;
  }

  .error-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .stat-item {
    padding: 0.75rem 1rem;
  }

  .error-actions {
    flex-direction: column;
  }

  .btn {
    justify-content: center;
    width: 100%;
  }

  .help-links {
    flex-direction: column;
    gap: 1rem;
  }

  .error-svg {
    max-width: 400px;
  }

  .floating-shapes .shape {
    display: none;
  }
}

@media (max-width: 576px) {
  .error-title {
    font-size: 2rem;
  }

  .error-description {
    font-size: 1rem;
  }

  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Dark mode compatibility */
@media (prefers-color-scheme: dark) {
  .not-found-page {
    background: #0f172a;
  }

  .error-title {
    color: #f1f5f9;
  }

  .error-description {
    color: #94a3b8;
  }

  .stat-item {
    background: #1e293b;
    border-color: #334155;
  }

  .stat-number {
    color: #f1f5f9;
  }

  .stat-label {
    color: #94a3b8;
  }

  .help-link {
    color: #94a3b8;
  }

  .help-link:hover {
    color: #3b82f6;
  }

  .btn-outline-primary {
    background: #1e293b;
    border-color: #3b82f6;
  }
}
</style>
