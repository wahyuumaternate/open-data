<template>
  <div class="statistics">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">Statistik Kota Ternate</h1>
        <p class="text-gray-600">Dashboard statistik dan visualisasi data Kota Ternate</p>
      </div>

      <!-- Key Statistics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">
            {{ populationData.total.toLocaleString() }}
          </div>
          <div class="text-gray-600">Total Penduduk</div>
          <div class="text-sm text-green-600 mt-1">+2.3% dari tahun lalu</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-green-600 mb-2">{{ economicData.gdp }}</div>
          <div class="text-gray-600">PDRB (Miliar Rp)</div>
          <div class="text-sm text-green-600 mt-1">+4.2% dari tahun lalu</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-purple-600 mb-2">{{ educationData.schools }}</div>
          <div class="text-gray-600">Jumlah Sekolah</div>
          <div class="text-sm text-blue-600 mt-1">
            {{ educationData.students.toLocaleString() }} siswa
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-orange-600 mb-2">{{ healthData.facilities }}</div>
          <div class="text-gray-600">Fasilitas Kesehatan</div>
          <div class="text-sm text-blue-600 mt-1">
            Rasio 1:{{ Math.round(populationData.total / healthData.facilities) }}
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Population Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-semibold mb-4">Distribusi Penduduk per Kecamatan</h3>
          <div class="space-y-3">
            <div
              v-for="district in populationByDistrict"
              :key="district.name"
              class="flex items-center"
            >
              <div class="w-32 text-sm">{{ district.name }}</div>
              <div class="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                <div
                  class="bg-blue-600 h-4 rounded-full"
                  :style="{ width: (district.population / maxPopulation) * 100 + '%' }"
                ></div>
              </div>
              <div class="w-20 text-sm text-right">{{ district.population.toLocaleString() }}</div>
            </div>
          </div>
        </div>

        <!-- Age Distribution Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-semibold mb-4">Distribusi Usia Penduduk</h3>
          <div class="space-y-3">
            <div v-for="age in ageDistribution" :key="age.group" class="flex items-center">
              <div class="w-20 text-sm">{{ age.group }}</div>
              <div class="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                <div
                  class="bg-green-600 h-4 rounded-full"
                  :style="{ width: age.percentage + '%' }"
                ></div>
              </div>
              <div class="w-16 text-sm text-right">{{ age.percentage }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Economic Indicators -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h3 class="text-xl font-semibold mb-4">Indikator Ekonomi</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600 mb-2">
              {{ economicData.unemployment }}%
            </div>
            <div class="text-gray-600">Tingkat Pengangguran</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600 mb-2">{{ economicData.poverty }}%</div>
            <div class="text-gray-600">Tingkat Kemiskinan</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600 mb-2">{{ economicData.inflation }}%</div>
            <div class="text-gray-600">Inflasi Tahunan</div>
          </div>
        </div>
      </div>

      <!-- Sector Performance -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-xl font-semibold mb-4">Kontribusi Sektor Ekonomi terhadap PDRB</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-3">
            <div
              v-for="sector in economicSectors.slice(0, 5)"
              :key="sector.name"
              class="flex items-center"
            >
              <div class="w-40 text-sm">{{ sector.name }}</div>
              <div class="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                <div
                  class="bg-indigo-600 h-4 rounded-full"
                  :style="{ width: sector.contribution + '%' }"
                ></div>
              </div>
              <div class="w-16 text-sm text-right">{{ sector.contribution }}%</div>
            </div>
          </div>
          <div class="space-y-3">
            <div
              v-for="sector in economicSectors.slice(5)"
              :key="sector.name"
              class="flex items-center"
            >
              <div class="w-40 text-sm">{{ sector.name }}</div>
              <div class="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                <div
                  class="bg-indigo-600 h-4 rounded-full"
                  :style="{ width: sector.contribution + '%' }"
                ></div>
              </div>
              <div class="w-16 text-sm text-right">{{ sector.contribution }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const populationData = ref({
  total: 235847,
  male: 119234,
  female: 116613,
})

const economicData = ref({
  gdp: 4.2,
  unemployment: 6.8,
  poverty: 12.3,
  inflation: 3.2,
})

const educationData = ref({
  schools: 245,
  students: 62847,
})

const healthData = ref({
  facilities: 48,
})

const populationByDistrict = ref([
  { name: 'Ternate Selatan', population: 65432 },
  { name: 'Ternate Tengah', population: 58234 },
  { name: 'Ternate Utara', population: 47892 },
  { name: 'Ternate Timur', population: 38945 },
  { name: 'Moti', population: 12678 },
  { name: 'Pulau Batang Dua', population: 8934 },
  { name: 'Pulau Hiri', population: 3732 },
])

const maxPopulation = computed(() => {
  return Math.max(...populationByDistrict.value.map((d) => d.population))
})

const ageDistribution = ref([
  { group: '0-14', percentage: 28.5 },
  { group: '15-24', percentage: 18.2 },
  { group: '25-34', percentage: 22.1 },
  { group: '35-44', percentage: 16.8 },
  { group: '45-54', percentage: 10.3 },
  { group: '55-64', percentage: 6.7 },
  { group: '65+', percentage: 4.4 },
])

const economicSectors = ref([
  { name: 'Perdagangan', contribution: 18.5 },
  { name: 'Pertanian', contribution: 16.2 },
  { name: 'Industri Pengolahan', contribution: 14.8 },
  { name: 'Konstruksi', contribution: 12.3 },
  { name: 'Transportasi', contribution: 10.7 },
  { name: 'Jasa Lainnya', contribution: 9.2 },
  { name: 'Keuangan', contribution: 7.8 },
  { name: 'Pariwisata', contribution: 6.3 },
  { name: 'Komunikasi', contribution: 4.2 },
])
</script>
