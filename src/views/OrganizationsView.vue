<template>
  <div class="organizations">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">Organisasi Penyedia Data</h1>
        <p class="text-gray-600">Daftar instansi dan organisasi yang menyediakan data terbuka</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="org in organizations"
          :key="org.id"
          class="bg-white rounded-lg shadow hover:shadow-lg transition"
        >
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold">{{ org.name }}</h3>
                <p class="text-sm text-gray-600">{{ org.type }}</p>
              </div>
            </div>

            <p class="text-gray-600 text-sm mb-4">{{ org.description }}</p>

            <div class="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <div class="font-medium text-blue-600">{{ org.datasets }}</div>
                <div class="text-gray-600">Dataset</div>
              </div>
              <div>
                <div class="font-medium text-green-600">{{ org.lastUpdate }}</div>
                <div class="text-gray-600">Update Terakhir</div>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Lihat Dataset
              </button>
              <div class="flex space-x-2">
                <button v-if="org.website" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                    ></path>
                  </svg>
                </button>
                <button v-if="org.email" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const organizations = ref([
  {
    id: 1,
    name: 'Dinas Kependudukan dan Pencatatan Sipil',
    type: 'Dinas Kota',
    description:
      'Mengelola data kependudukan, akta kelahiran, KTP, dan dokumen kependudukan lainnya',
    datasets: 12,
    lastUpdate: '2 hari lalu',
    website: 'https://dukcapil.ternatekota.go.id',
    email: 'dispar@ternatekota.go.id',
  },
  {
    id: 7,
    name: 'Dinas Koperasi dan UMKM',
    type: 'Dinas Kota',
    description: 'Data koperasi, usaha mikro kecil menengah, dan ekonomi kreatif',
    datasets: 6,
    lastUpdate: '1 minggu lalu',
    website: 'https://diskopumkm.ternatekota.go.id',
    email: 'diskopumkm@ternatekota.go.id',
  },
  {
    id: 8,
    name: 'Badan Pusat Statistik Ternate',
    type: 'Badan Nasional',
    description: 'Data statistik resmi, sensus, survei, dan indikator pembangunan',
    datasets: 25,
    lastUpdate: '2 hari lalu',
    website: 'https://ternatekota.bps.go.id',
    email: 'bps8271@bps.go.id',
  },
  {
    id: 9,
    name: 'Dinas Lingkungan Hidup',
    type: 'Dinas Kota',
    description: 'Data kualitas udara, air, pengelolaan sampah, dan konservasi lingkungan',
    datasets: 8,
    lastUpdate: '6 hari lalu',
    website: 'https://dlh.ternatekota.go.id',
    email: 'dlh@ternatekota.go.id',
  },
])
</script>
