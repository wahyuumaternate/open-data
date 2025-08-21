<template>
  <div class="not-found-view">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 text-center py-5">
          <div class="error-content" data-aos="fade-up">
            <h1 class="display-1 text-primary mb-4">404</h1>
            <h2 class="mb-3">Halaman Tidak Ditemukan</h2>
            <p class="text-muted mb-4">
              Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman mungkin telah dipindahkan
              atau tidak tersedia.
            </p>
            <div class="d-flex gap-2 justify-content-center">
              <router-link to="/" class="btn btn-primary">
                <i class="bi bi-house"></i> Kembali ke Beranda
              </router-link>
              <router-link to="/datasets" class="btn btn-outline-primary">
                <i class="bi bi-database"></i> Lihat Dataset
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  mounted() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
      })
    }
  },
}
</script>

<style scoped>
.not-found-view {
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.error-content {
  padding: 2rem;
}

.display-1 {
  font-weight: 700;
  font-size: 6rem;
}

@media (max-width: 768px) {
  .display-1 {
    font-size: 4rem;
  }
}
</style>
