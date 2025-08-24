<template>
  <!-- Features Section -->
  <section id="features" class="features section bg-light py-5">
    <div class="container">
      <!-- Judul -->
      <div class="section-header text-center mb-5">
        <h2 class="fw-bold">Revolusi pencarian data<br />di lingkungan pemerintahan</h2>
        <p class="text-muted">
          Mulai jelajahi 10 kategori data pemerintahan untuk bantu kebutuhanmu setiap saat
        </p>
      </div>

      <!-- Grid Kategori -->
      <div class="row g-4 justify-content-center mb-4">
        <!-- Baris Pertama - 5 kategori -->
        <div
          v-for="category in firstRowCategories"
          :key="category.name"
          class="col-lg-2 col-md-3 col-6 text-center colom-fitur"
        >
          <a href="#" @click.prevent="selectCategory(category)">
            <img
              :src="`/assets/img/${category.image}`"
              :alt="category.name"
              class="img-fluid rounded shadow-sm mb-2"
            />
            <p>{{ category.name }}</p>
          </a>
        </div>
      </div>

      <div class="row g-4 justify-content-center">
        <!-- Baris Kedua - 5 kategori -->
        <div
          v-for="category in secondRowCategories"
          :key="category.name"
          class="col-lg-2 col-md-3 col-6 text-center colom-fitur"
        >
          <a href="#" @click.prevent="selectCategory(category)">
            <img
              :src="`/assets/img/${category.image}`"
              :alt="category.name"
              class="img-fluid rounded shadow-sm mb-2"
            />
            <p>{{ category.name }}</p>
          </a>
        </div>
      </div>
    </div>
  </section>
  <!-- /Features Section -->
</template>

<script>
export default {
  name: 'Features',
  data() {
    return {
      categories: [
        { name: 'Ekonomi', image: 'data-ekonomi.svg' },
        { name: 'Infrastruktur', image: 'data-infrastruktur.svg' },
        { name: 'Kemiskinan', image: 'data-kemiskinan.svg' },
        { name: 'Kependudukan', image: 'data-kependudukan.svg' },
        { name: 'Kesehatan', image: 'data-kesehatan.svg' },
        { name: 'Lingkungan Hidup', image: 'data-lingkungan.svg' },
        { name: 'Pariwisata & Kebudayaan', image: 'data-pariwisata.svg' },
        { name: 'Pemerintah & Desa', image: 'data-pemerintah.svg' },
        { name: 'Pendidikan', image: 'data-pendidikan.svg' },
        { name: 'Sosial', image: 'data-sosial.svg' },
      ],
    }
  },
  computed: {
    firstRowCategories() {
      return this.categories.slice(0, 5)
    },
    secondRowCategories() {
      return this.categories.slice(5, 10)
    },
  },
  methods: {
    selectCategory(category) {
      // Navigate to datasets page with category filter
      this.$router.push({
        name: 'datasets',
        query: { topic: category.name.toLowerCase() },
      })
    },
  },
}
</script>

<style scoped></style>
