// 1. Animasi Navbar Saat Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 5%';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.padding = '15px 5%';
        header.style.background = 'white';
    }
});

// 2. Animasi Muncul Otomatis (Fade In)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .gallery-item, .info-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Penambahan class show lewat JS
window.addEventListener('scroll', () => {
    document.querySelectorAll('.card, .gallery-item, .info-box').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycby9EsvmFycz9B9l4P6IcSJ3OqS8IyNNSRuY9ZNZDQQkhEVA9ki3kcYtygTgDka1ULlnbQ/exec' // <-- TEMPEL LINK /exec DI SINI
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById('msg-status')

form.addEventListener('submit', e => {
  e.preventDefault()
  msg.innerHTML = "Sedang mengirim pesan... ⏳"
  msg.style.color = "#007bff"
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Pesan Berhasil Terkirim! ✅"
        msg.style.color = "#28a745"
        form.reset()
        setTimeout(() => { msg.innerHTML = "" }, 5000)
    })
    .catch(error => {
        msg.innerHTML = "Gagal mengirim pesan. ❌ Coba lagi nanti."
        msg.style.color = "#ff4d4d"
        console.error('Error!', error.message)
    })
})