// js/index-page.js

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music'); // Ambil elemen audio lagi di sini

    // Transisi selamat datang
    const goToPaymentButton = document.getElementById('go-to-payment');
    if (goToPaymentButton) {
        goToPaymentButton.addEventListener('click', function () {
            document.getElementById('welcome-message').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            // Unmute musik saat tombol PAYMENT diklik (interaksi pertama pengguna)
            if (audio && audio.muted) {
                audio.muted = false;
            }
            // Pastikan musik diputar dan visualizer aktif jika belum
            if (audio && audio.paused) {
                // initializeAudioVisualizer() dipanggil di shared-music.js saat load
                audio.play().then(() => {
                    // isPlaying = true; // isPlaying dikelola di shared-music.js
                    // drawVisualizers(); // drawVisualizers dikelola di shared-music.js
                    console.log('Music started from welcome screen.');
                }).catch(error => {
                    console.error("Gagal memutar musik dari layar selamat datang:", error);
                });
            }
        });
    }


    // Logika tombol kembali khusus untuk index.html
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Logika untuk kembali ke welcome message jika di index.html
            const mainContent = document.getElementById('main-content');
            const welcomeMessage = document.getElementById('welcome-message');
            if (mainContent && welcomeMessage) {
                if (mainContent.style.display === 'block') {
                    mainContent.style.display = 'none';
                    welcomeMessage.style.display = 'flex';
                } else {
                    // Jika tidak di main-content, biarkan fungsi goBack() di shared-music.js menangani history.back()
                    goBack(); // Panggil fungsi goBack dari shared-music.js
                }
            } else {
                goBack(); // Panggil fungsi goBack dari shared-music.js jika elemen tidak ditemukan
            }
        });
    }

    // Collapsible sections
    document.querySelectorAll(".collapsible").forEach(btn => {
        btn.addEventListener("click", function () {
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
        });
    });

    // Fungsi untuk menyalin teks ke clipboard
    window.copyToClipboard = function(buttonElement) { // Jadikan global agar bisa diakses dari HTML inline
        const accountNumber = buttonElement.dataset.accountNumber;
        const bankName = buttonElement.dataset.bankName;
        const tempInput = document.createElement('textarea');
        tempInput.value = accountNumber;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        const copyMessage = document.getElementById('copy-message');
        copyMessage.textContent = `Nomor rekening ${bankName} berhasil disalin!`;
        copyMessage.classList.add('show');
        setTimeout(() => {
            copyMessage.classList.remove('show');
        }, 2000);
    };

});
