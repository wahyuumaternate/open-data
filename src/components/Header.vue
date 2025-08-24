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
          <li>
            <router-link to="/topik" :class="{ active: $route.name === 'TopikView' }">
              Topik
            </router-link>
          </li>
          <li class="dropdown">
            <a
              href="#"
              @click.prevent
              :class="{
                active:
                  $route.name === 'datasets' ||
                  $route.name === 'mapsets' ||
                  $route.name === 'mapset-detail' ||
                  $route.name === 'dataset-detail',
              }"
            >
              <span>Koleksi Data</span>
              <i class="bi bi-chevron-down toggle-dropdown"></i>
            </a>
            <ul class="">
              <li>
                <router-link to="/datasets" :class="{ active: $route.name === 'datasets' }"
                  >Dataset</router-link
                >
              </li>
              <li>
                <router-link to="/mapsets" :class="{ active: $route.name === 'mapsets' }"
                  >Mapsets</router-link
                >
              </li>
            </ul>
          </li>

          <li>
            <router-link to="/visualisasi" :class="{ active: $route.name === 'visualisasi' }">
              Visualisasi
            </router-link>
          </li>
          <li>
            <router-link to="/infografis" :class="{ active: $route.name === 'infografis' }">
              Infografis
            </router-link>
          </li>
          <li>
            <router-link to="/organizations" :class="{ active: $route.name === 'organizations' }">
              Organisasi
            </router-link>
          </li>
          <li>
            <router-link to="/bantuan" :class="{ active: $route.name === 'bantuan' }">
              Bantuan <i class="bi bi-question-circle"></i>
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
      dropdownOpen: null, // simpan index dropdown yang sedang terbuka
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
    toggleDropdown(index) {
      // kalau dropdown yang sama diklik → tutup, kalau beda → ganti
      this.dropdownOpen = this.dropdownOpen === index ? null : index
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
