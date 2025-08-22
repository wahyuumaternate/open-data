<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div
      class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between"
    >
      <router-link to="/" class="logo d-flex align-items-center">
        <!-- ✅ Fixed path - gunakan public folder -->
        <img src="../assets/img/logo.png" alt="Logo Portal Data Ternate" />
      </router-link>

      <nav id="navmenu" class="navmenu">
        <ul>
          <li>
            <router-link
              to="/"
              :class="{ active: $route.name === 'home' }"
              @click="scrollToSection('hero')"
            >
              Beranda
            </router-link>
          </li>
          <!-- ✅ Dropdown Koleksi Data -->
          <li class="dropdown">
            <a href="#" @click.prevent>
              <span>Koleksi Data</span>
              <i class="bi bi-chevron-down"></i>
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/datasets">Dataset</router-link>
              </li>
              <li><router-link to="/mapsets">Mapsets</router-link></li>
            </ul>
          </li>
          <li>
            <router-link to="/organizations" :class="{ active: $route.name === 'organizations' }">
              Organisasi
            </router-link>
          </li>
          <li>
            <router-link to="/statistics" :class="{ active: $route.name === 'statistics' }">
              Visualisasi
            </router-link>
          </li>
          <li><a href="#" @click.prevent>Infografis</a></li>
          <li><a href="#" @click.prevent>Topik</a></li>
          <li>
            <router-link to="/about" :class="{ active: $route.name === 'about' }">
              Bantuan
            </router-link>
          </li>
        </ul>

        <i class="mobile-nav-toggle d-xl-none bi bi-list" @click="toggleMobileMenu"></i>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      mobileMenuOpen: false,
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
      const navmenu = document.querySelector('.navmenu ul')
      if (navmenu) {
        navmenu.classList.toggle('mobile-menu-active')
      }
    },
    scrollToSection(sectionId) {
      // Only scroll if we're on the home page
      if (this.$route.name === 'home') {
        this.$nextTick(() => {
          const element = document.getElementById(sectionId)
          if (element) {
            const headerHeight = 80 // Adjust based on your header height
            const elementPosition = element.offsetTop - headerHeight
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth',
            })
          }
        })
      }
    },
  },
}
</script>

<style scoped></style>
