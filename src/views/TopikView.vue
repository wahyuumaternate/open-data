<template>
  <!-- Hero Section -->
  <section class="topik-hero section pt-5">
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-12 text-center" data-aos="fade-up">
          <h1 class="display-4 text-white mb-4">Topik Open Data Kota Ternate</h1>
          <p class="lead text-white-50 mb-4">
            Jelajahi berbagai topik data yang tersedia di portal Open Data Ternate untuk kebutuhan
            informasi dan analisis Anda.
          </p>
        </div>
      </div>
    </div>
  </section>

  <Features />
</template>

<script>
import Features from '../components/Features.vue'

export default {
  name: 'TopikView',
  components: {
    Features,
  },
}
</script>

<style scoped>
/* Hero Section */
.topik-hero {
  background: linear-gradient(135deg, #040677 0%, #1e40af 100%);
  color: white;
  padding: 120px 0 80px !important;
  position: relative;
  overflow: hidden;
}

.topik-hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>')
    repeat;
  opacity: 0.3;
}
</style>
