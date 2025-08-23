import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DatasetDetailView from '@/views/DatasetDetailView.vue'
import OrganizationsView from '@/views/OrganizationsView.vue' // Fixed typo: was "OraganizationsView"
import OrganizationDetailView from '@/views/OrganizationDetailView.vue' // Add this import
import DatasetsView from '@/views/DatasetsView.vue'
import MapsetsView from '@/views/MapsetsView.vue'
import MapsetDetailView from '@/views/MapsetDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Beranda - Open Data Ternate',
        description:
          'Portal data terbuka Pemerintah Kota Ternate untuk transparansi dan akuntabilitas',
      },
    },
    {
      path: '/datasets',
      name: 'datasets',
      component: DatasetsView,
      meta: {
        title: 'Dataset - Open Data Ternate',
        description: 'Jelajahi koleksi dataset terbuka Pemerintah Kota Ternate',
      },
    },
    {
      path: '/mapsets',
      name: 'mapsets',
      component: MapsetsView,
      meta: {
        title: 'Mapsets - Open Data Kota Ternate',
      },
    },
    {
      path: '/mapset/:identifier',
      name: 'mapset-detail',
      component: MapsetDetailView,
      props: true,
      meta: {
        title: 'Detail Mapset - Open Data Kota Ternate',
      },
    },
    {
      path: '/organizations',
      name: 'organizations',
      component: OrganizationsView, // Fixed component name
      meta: {
        title: 'Organisasi - Open Data Ternate',
        description:
          'Daftar Organisasi Perangkat Daerah yang berkontribusi dalam Open Data Ternate',
      },
    },
    {
      path: '/organization/:slug',
      name: 'organization-detail',
      component: OrganizationDetailView, // Fixed: was missing import and () =>
      props: true,
      meta: {
        title: 'Detail Organisasi - Open Data Ternate',
        description: 'Informasi detail organisasi dan konten yang dipublikasikan',
      },
    },
    {
      path: '/dataset/:slug',
      name: 'dataset-detail',
      component: DatasetDetailView,
      props: true,
      meta: {
        title: 'Detail Dataset - Open Data Ternate',
        description: 'Lihat detail informasi dataset di portal Open Data Ternate.',
      },
    },
    {
      path: '/visualisasi',
      name: 'visualisasi',
      component: () => import('@/views/VisualisasiView.vue'),
      meta: {
        title: 'Visualisasi Data - Open Data Ternate',
        description: 'Jelajahi berbagai visualisasi data interaktif di Kota Ternate',
      },
    },
    {
      path: '/visualisasi/:slug',
      name: 'visualisasi-detail',
      component: () => import('@/views/VisualisasiDetailView.vue'),
      props: true,
      meta: {
        title: 'Detail Visualisasi - Open Data Ternate',
        description: 'Detail visualisasi data interaktif',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'Tentang - Open Data Ternate',
        description: 'Informasi tentang portal Open Data Ternate dan kontak',
      },
    },
    // Catch all 404
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      try {
        const element = document.querySelector(to.hash)
        if (element) {
          return {
            el: to.hash,
            behavior: 'smooth',
            top: 80,
          }
        }
      } catch (e) {
        console.warn('Invalid hash selector:', to.hash)
      }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  document.title = to.meta?.title || 'Open Data Ternate'

  if (to.meta?.description) {
    let metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    } else {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      metaDescription.content = to.meta.description
      document.getElementsByTagName('head')[0].appendChild(metaDescription)
    }
  }

  next()
})

export default router
