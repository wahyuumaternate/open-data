<template>
    <footer id="footer" class="footer dark-background">
        <div class="container footer-top">
            <div class="row gy-4">
                <div class="col-lg-4 col-md-6 footer-about">
                    <a href="/" class="logo d-flex align-items-center">
                        <span class="sitename">Satu Data Ternate</span>
                    </a>
                    <div class="footer-contact pt-3">
                        <p>Kantor Walikota Ternate Lt. 3</p>
                        <p>Jl. Pahlawan Revolusi, Kota Ternate, Maluku Utara</p>
                        <p class="mt-3"><strong>Phone:</strong> <span>+62 852-9953-5544</span></p>
                        <p>
                            <strong>Email:</strong>
                            <span> kominfo@mailopd.ternatekota.go.id</span>
                        </p>
                    </div>
                    <div class="social-links d-flex mt-4">
                        <a href="#" @click.prevent><i class="bi bi-twitter-x"></i></a>
                        <a href="#" @click.prevent><i class="bi bi-facebook"></i></a>
                        <a href="#" @click.prevent><i class="bi bi-instagram"></i></a>
                        <a href="#" @click.prevent><i class="bi bi-linkedin"></i></a>
                    </div>
                </div>

                <div class="col-lg-2 col-md-3 footer-links">
                    <h4>Satu Data Ternate</h4>
                    <ul>
                        <li><a href="#" @click.prevent>Tentang</a></li>
                        <li><a href="#" @click.prevent>Ketentuan Penggunaan</a></li>
                        <li><a href="#" @click.prevent>Kebijakan Privasi</a></li>
                        <li><a href="#" @click.prevent>Telusuri Sumber Data</a></li>
                    </ul>
                </div>

                <div class="col-lg-2 col-md-3 footer-links">
                    <h4>Jelajahi</h4>
                    <ul>
                        <li><a href="#" @click.prevent>Satu Data Ternate</a></li>
                        <li><a href="#" @click.prevent>Peta Ternate</a></li>
                        <li><a href="#" @click.prevent>Dashboard Ternate</a></li>
                        <li><a href="https://ternatekota.bps.go.id/id" target="_blank">BPS Ternate</a></li>
                        <li>
                            <a href="https://data.go.id/" target="_blank">Satu Data Indonesia</a>
                        </li>
                    </ul>
                </div>

                <div class="col-lg-4 col-md-12 footer-newsletter">
                    <img src="/assets/img/logo city branding.png" class="img-fluid w-100" alt="Logo City Branding" />
                </div>
            </div>
        </div>

        <div class="container copyright text-center mt-4">
            <p>
                © <span>2025</span>
                <strong class="px-1 sitename">DISKOMSANDI KOTA TERNATE</strong>
                <span>Seluruh Hak Cipta Dilindungi</span>
            </p>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'Footer',
    }
</script>

<style scoped></style>
