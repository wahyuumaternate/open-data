<template>
  <!-- Dataset Hero Section -->
  <section class="dataset-hero section dark-background pt-5">
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-12 text-center" data-aos="fade-up">
          <h1 class="display-4 text-white mb-4">About</h1>
          <p class="lead text-white-50 mb-4">About</p>
        </div>
      </div>
    </div>
  </section>
  <div class="about">
    <div class="container p-4 mb-4 card">
      <h2>Dataset dengan DataTables</h2>

      <table id="datasetTable" class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Organisasi</th>
            <th>Format</th>
            <th>Downloads</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dataset in datasets" :key="dataset.id">
            <td>{{ dataset.id }}</td>
            <td>{{ dataset.title }}</td>
            <td>
              <span class="badge bg-primary">{{ getCategoryName(dataset.category_id) }}</span>
            </td>
            <td>{{ getOrganizationName(dataset.organization_id) }}</td>
            <td>
              <span v-for="format in dataset.formats" :key="format" class="badge bg-secondary me-1">
                {{ format.toUpperCase() }}
              </span>
            </td>
            <td>{{ dataset.downloads }}</td>
            <td>
              <button class="btn btn-sm btn-primary me-1" @click="viewDataset(dataset)">
                <i class="bi bi-eye"></i>
              </button>
              <button class="btn btn-sm btn-success" @click="downloadDataset(dataset)">
                <i class="bi bi-download"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import 'datatables.net-bs5'
export default {
  name: 'AboutView',
  data() {
    return {
      datasets: [
        {
          id: 1,
          title: 'Data Kependudukan Kota Ternate 2024',
          category_id: 'kependudukan',
          organization_id: 'disdukcapil',
          formats: ['csv', 'json'],
          downloads: 245,
        },
        {
          id: 2,
          title: 'Anggaran Pembangunan Infrastruktur 2024',
          category_id: 'infrastruktur',
          organization_id: 'bappeda',
          formats: ['pdf', 'excel'],
          downloads: 156,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
        {
          id: 3,
          title: 'Data Kesehatan Masyarakat Ternate',
          category_id: 'kesehatan',
          organization_id: 'dinkes',
          formats: ['csv'],
          downloads: 187,
        },
      ],
      categories: [
        { id: 'kependudukan', name: 'Kependudukan' },
        { id: 'infrastruktur', name: 'Infrastruktur' },
        { id: 'kesehatan', name: 'Kesehatan' },
      ],
      organizations: [
        { id: 'disdukcapil', name: 'Disdukcapil' },
        { id: 'bappeda', name: 'Bappeda' },
        { id: 'dinkes', name: 'Dinkes' },
      ],
    }
  },
  mounted() {
    this.$nextTick(() => {
      $('#datasetTable').DataTable({
        responsive: true,
        pageLength: 10,
        language: {
          search: 'Cari:',
          lengthMenu: 'Tampilkan _MENU_ data',
          info: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ data',
          paginate: {
            first: 'Pertama',
            last: 'Terakhir',
            next: 'Selanjutnya',
            previous: 'Sebelumnya',
          },
        },
        columnDefs: [
          { orderable: false, targets: [6] }, // Disable sorting untuk kolom Aksi
        ],
      })
    })
  },
  methods: {
    getCategoryName(categoryId) {
      const category = this.categories.find((cat) => cat.id === categoryId)
      return category ? category.name : categoryId
    },
    getOrganizationName(orgId) {
      const org = this.organizations.find((o) => o.id === orgId)
      return org ? org.name : orgId
    },
    viewDataset(dataset) {
      alert(`Melihat dataset: ${dataset.title}`)
    },
    downloadDataset(dataset) {
      alert(`Download dataset: ${dataset.title}`)
    },
  },
}
</script>

<style scoped>
.table {
  margin-top: 1rem;
}

.badge {
  font-size: 0.75rem;
}
</style>
