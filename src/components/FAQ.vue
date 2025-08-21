<template>
  <!-- FAQ Section -->
  <section id="faq" class="faq section light-background">
    <div class="container-fluid">
      <div class="row gy-4">
        <div class="col-lg-7 d-flex flex-column justify-content-center order-2 order-lg-1">
          <div class="content px-xl-5" data-aos="fade-up" data-aos-delay="100">
            <h3><span>Mengapa menggunakan </span><strong>Open Data Ternate?</strong></h3>
            <p>
              Temukan alasan mengapa Open Data Ternate menjadi pilihan terbaik untuk kebutuhan data
              pemerintahan Anda.
            </p>
          </div>

          <div class="faq-container px-xl-5" data-aos="fade-up" data-aos-delay="200">
            <div
              v-for="(benefit, index) in benefits"
              :key="index"
              :class="['faq-item', { 'faq-active': activeFaq === index }]"
              @click="toggleFaq(index)"
            >
              <i class="faq-icon bi bi-question-circle"></i>
              <h3>
                {{ benefit.title }}
                <i class="faq-toggle bi bi-chevron-right"></i>
              </h3>
              <div class="faq-content">
                <p>{{ benefit.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-5 order-1 order-lg-2">
          <img
            src="/assets/img/think.svg"
            class="img-fluid"
            alt=""
            data-aos="zoom-in"
            data-aos-delay="100"
          />
        </div>
      </div>
    </div>
  </section>
  <!-- /FAQ Section -->
</template>

<script>
export default {
  name: 'FAQ',
  data() {
    return {
      activeFaq: 0,
      benefits: [
        {
          title: 'Temukan data dengan mudah',
          description: 'Cari data dari Pemerintah Kota Ternate dalam beberapa klik saja',
        },
        {
          title: 'Dapatkan data dengan cepat',
          description: 'Nikmati proses akses data tanpa proses birokrasi panjang',
        },
        {
          title: 'Data akurat dan mutakhir',
          description:
            'Dapatkan data lengkap dan terkini resmi dari Organisasi Perangkat Daerah terkait',
        },
        {
          title: 'Ragam data tersedia',
          description:
            'Ada dataset, visualisasi, infografik, artikel, dan mapset yang bisa digunakan sesuai kebutuhan',
        },
      ],
    }
  },
  methods: {
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? -1 : index
    },
  },
}
</script>

<style scoped>
/* Style untuk gambar FAQ */
img {
  border-radius: 12px !important;
  /* box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15); */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.faq img:hover {
  transform: translateY(-5px);
  /* box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2); */
}
</style>
