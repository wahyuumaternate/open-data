<template>
  <div class="home-view">
    <Hero />
    <Stats />
    <About />
    <Features @category-selected="handleCategorySelected" />
    <FAQ />
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import Stats from '../components/Stats.vue'
import About from '../components/About.vue'
import Features from '../components/Features.vue'
import FAQ from '../components/FAQ.vue'

export default {
  name: 'HomeView',
  components: {
    Hero,
    Stats,
    About,
    Features,
    FAQ,
  },
  methods: {
    handleCategorySelected(category) {
      console.log('Kategori dipilih di HomeView:', category)
      this.$router.push({
        name: 'datasets',
        query: { topic: category.toLowerCase() },
      })
    },
  },
}
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
