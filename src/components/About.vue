<template>
  <!-- About Section -->
  <section id="about" class="about section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row align-items-xl-center gy-5">
        <div class="col-xl-5 content">
          <h3>Tentang</h3>
          <h2>Satu Data Kota Ternate</h2>
          <p>
            Portal Satu Data Kota Ternate menyediakan akses publik terhadap berbagai dataset
            pemerintahan untuk mendukung transparansi, inovasi, dan pembangunan berkelanjutan di
            Kota Ternate.
          </p>
        </div>

        <div class="col-xl-7">
          <div class="row gy-4 icon-boxes">
            <div
              v-for="(feature, index) in features"
              :key="feature.title"
              class="col-md-6"
              data-aos="fade-up"
              :data-aos-delay="200 + index * 100"
            >
              <div class="icon-box">
                <i :class="feature.icon"></i>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /About Section -->
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      features: [
        {
          icon: 'bi bi-buildings',
          title: 'Transparansi',
          description:
            'Akses terbuka terhadap data pemerintahan untuk mendukung transparansi publik.',
        },
        {
          icon: 'bi bi-clipboard-pulse',
          title: 'Real-time Data',
          description: 'Data yang selalu ter-update dan dapat diakses secara real-time.',
        },
        {
          icon: 'bi bi-database-check',
          title: 'Data Terbuka',
          description: 'Dataset publik yang dapat digunakan bebas oleh masyarakat.',
        },
        {
          icon: 'bi bi-graph-up-arrow',
          title: 'Analytics',
          description: 'Fitur analisis data untuk membantu pengambilan keputusan yang tepat.',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
