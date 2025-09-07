document.addEventListener('DOMContentLoaded', function() {

    // Scroll Animasyonları
    const animatedSections = document.querySelectorAll('.animated-section');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedSections.forEach(section => {
            observer.observe(section);
        });
    } else {
        // IntersectionObserver desteklenmiyorsa, tüm animasyonları direkt göster
        animatedSections.forEach(section => {
            section.classList.add('is-visible');
        });
    }

    // Mobil Menü
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Menü linklerine tıklandığında menüyü kapat
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scroll için
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Randevu Formu
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basit doğrulama
            if (!data.name || !data.phone || !data.email || !data.service) {
                alert('Lütfen tüm zorunlu alanları doldurun.');
                return;
            }
            
            // Email doğrulama
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Lütfen geçerli bir email adresi girin.');
                return;
            }
            
            // Telefon doğrulama
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(data.phone)) {
                alert('Lütfen geçerli bir telefon numarası girin.');
                return;
            }
            
            // Başarılı gönderim simülasyonu
            showSuccessMessage('Randevu talebiniz başarıyla alındı! En kısa sürede sizinle iletişime geçeceğiz.');
            
            // Formu temizle
            this.reset();
        });
    }

    // İletişim Formu
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basit doğrulama
            if (!data.name || !data.phone || !data.email || !data.subject || !data.message) {
                alert('Lütfen tüm zorunlu alanları doldurun.');
                return;
            }
            
            // Email doğrulama
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Lütfen geçerli bir email adresi girin.');
                return;
            }
            
            // Telefon doğrulama
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(data.phone)) {
                alert('Lütfen geçerli bir telefon numarası girin.');
                return;
            }
            
            // Başarılı gönderim simülasyonu
            showSuccessMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
            
            // Formu temizle
            this.reset();
        });
    }

    // Başarı mesajı gösterme fonksiyonu
    function showSuccessMessage(message) {
        // Mevcut mesaj varsa kaldır
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Yeni mesaj oluştur
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()">Tamam</button>
            </div>
        `;
        
        // Stil ekle
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        successDiv.querySelector('.success-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        successDiv.querySelector('button').style.cssText = `
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 10px;
        `;
        
        // CSS animasyonu ekle
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(successDiv);
        
        // 5 saniye sonra otomatik kaldır
        setTimeout(() => {
            if (successDiv.parentElement) {
                successDiv.remove();
            }
        }, 5000);
    }

    // İstatistik sayaç animasyonu
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }, 20);
    }
    
    // İstatistikleri görünür olduğunda animasyonu başlat
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                animateCounter(statNumber, number);
                statsObserver.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Header scroll efekti
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // Testimonial kartları hover efekti
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Hizmet kartları hover efekti
    const serviceCards = document.querySelectorAll('.card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
        });
    });

    // Form input focus efektleri
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Lazy loading için Intersection Observer
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Sayfa yüklendiğinde hero animasyonunu başlat
    setTimeout(() => {
        document.body.classList.add('hero-loaded');
    }, 100);

});

console.log('Uzman Hukuk Bürosu web sitesi yüklendi.');
