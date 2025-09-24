// Main JavaScript file for Magic CleanDom

document.addEventListener('DOMContentLoaded', function() {
    // Modal do Vídeo de Experiência
    function setupExperienceVideo() {
        const modal = document.getElementById('experienceVideoModal');
        const experienceBtn = document.querySelector('.experience-feature');
        const closeBtn = modal?.querySelector('.close');
        const videoIframe = document.getElementById('experienceVideo');
        const videoUrl = 'https://player.vimeo.com/video/1121414581?autoplay=1&color=ffffff&title=0&byline=0&portrait=0';
        
        if (!modal || !experienceBtn) return;
        
        // Abrir modal ao clicar no botão de experiência
        experienceBtn.style.cursor = 'pointer';
        experienceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            // Define o src do iframe ao abrir o modal
            videoIframe.src = videoUrl;
        });
        
        // Fechar modal ao clicar no X
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                // Pausa o vídeo ao fechar o modal
                videoIframe.src = '';
            });
        }
        
        // Fechar modal ao clicar fora do conteúdo
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                // Pausa o vídeo ao fechar o modal
                videoIframe.src = '';
            }
        });
        
        // Fechar com a tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                // Pausa o vídeo ao fechar o modal
                videoIframe.src = '';
            }
        });
    }
    
    // Inicializar o modal do vídeo de experiência
    setupExperienceVideo();
    
    // Modal e Carrossel de Certificados
    function setupCertificateModal() {
        const modal = document.getElementById('certificateModal');
        const certificateBtn = document.querySelector('.feature .fa-certificate')?.closest('.feature');
        const closeBtn = document.querySelector('.close');
        
        if (!modal) return;
        
        // Elementos do carrossel
        const slides = document.querySelectorAll('.carousel-slide');
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        const indicators = document.querySelectorAll('.indicator');
        let currentSlide = 0;
        
        // Função para mostrar um slide específico
        function showSlide(index) {
            // Esconde todos os slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Atualiza indicadores
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            // Mostra o slide atual
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            
            currentSlide = index;
        }
        
        // Próximo slide
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }
        
        // Slide anterior
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }
        
        // Event Listeners para os botões de navegação
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        
        // Event Listeners para os indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });
        
        // Navegação por teclado
        document.addEventListener('keydown', function(e) {
            if (modal.style.display !== 'block') return;
            
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Abrir modal ao clicar no botão de certificado
        if (certificateBtn) {
            certificateBtn.style.cursor = 'pointer';
            certificateBtn.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                // Mostra o primeiro slide ao abrir o modal
                showSlide(0);
            });
        }
        
        // Fechar modal ao clicar no X
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Fechar modal ao clicar fora do conteúdo
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Inicializar o modal de certificados
    setupCertificateModal();
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            }
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize Google Reviews
    if (typeof fetchGoogleReviews === 'function') {
        fetchGoogleReviews();
    }
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = this.querySelector('#name').value.trim();
        const email = this.querySelector('#email').value.trim();
        const phone = this.querySelector('#phone').value.trim();
        const message = this.querySelector('#message').value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
        }
        
        // If Firebase is available, use it to save the form data
        if (window.db) {
            db.collection('contacts').add({
                name: name,
                email: email,
                phone: phone,
                message: message,
                service: this.querySelector('#service').value,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            })
            .catch((error) => {
                console.error('Error saving contact form:', error);
                alert('There was an error sending your message. Please try again later.');
            });
        } else {
            // Fallback if Firebase is not available
            console.log('Form data:', { name, email, phone, message });
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        }
    });
}

// Inicialização do AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true
    });
}
