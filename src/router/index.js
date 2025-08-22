import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DatasetDetailView from '@/views/DatasetDetailView.vue'
import OraganizationsView from '@/views/OrganizationsView.vue'
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
      props: true, // Pass route params sebagai props ke component
      meta: {
        title: 'Detail Mapset - Open Data Kota Ternate',
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
    {
      path: '/organizations',
      name: 'organizations',
      component: OraganizationsView,
      meta: {
        title: 'organizations - Open Data Ternate',
        description: 'Informasi tentang portal Open Data Ternate dan kontak',
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
    // Catch all 404 - temporary simple version
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
      // Safe hash navigation
      try {
        const element = document.querySelector(to.hash)
        if (element) {
          return {
            el: to.hash,
            behavior: 'smooth',
            top: 80, // Account for fixed header
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
  // Update document title
  document.title = to.meta?.title || 'Open Data Ternate'

  // Update meta description
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
