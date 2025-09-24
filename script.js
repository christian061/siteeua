// Main JavaScript file for Magic CleanDom

document.addEventListener('DOMContentLoaded', function() {
    // Hero cleaning effect
    setupHeroCleaningEffect();
    
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

// Hero cleaning effect function - Glass cleaning simulation
function setupHeroCleaningEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create canvas for cleaning trail
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Setup canvas
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2';
    canvas.style.mixBlendMode = 'multiply';
    
    // Create a sponge cursor directly
    function createSpongeCursor() {
        console.log('🧽 Creating sponge cursor...');
        
        // Create a detailed sponge cursor with SVG
        const spongeCursor = `data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='shadow'%3E%3CfeDropShadow dx='1' dy='1' stdDeviation='1' flood-opacity='0.3'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23shadow)'%3E%3Crect x='4' y='6' width='24' height='18' rx='4' ry='4' fill='%23ffeb3b' stroke='%23f57f17' stroke-width='2'/%3E%3Ccircle cx='8' cy='10' r='1.5' fill='%23f57f17' opacity='0.7'/%3E%3Ccircle cx='13' cy='12' r='1' fill='%23f57f17' opacity='0.6'/%3E%3Ccircle cx='18' cy='9' r='1.5' fill='%23f57f17' opacity='0.8'/%3E%3Ccircle cx='10' cy='16' r='1' fill='%23f57f17' opacity='0.5'/%3E%3Ccircle cx='16' cy='18' r='1.5' fill='%23f57f17' opacity='0.7'/%3E%3Ccircle cx='22' cy='14' r='1' fill='%23f57f17' opacity='0.6'/%3E%3Ccircle cx='24' cy='20' r='1.5' fill='%23f57f17' opacity='0.8'/%3E%3Ccircle cx='6' cy='20' r='1' fill='%23f57f17' opacity='0.5'/%3E%3Cpath d='M6 25 Q16 27 26 25' stroke='%232196f3' stroke-width='2.5' fill='none' opacity='0.8'/%3E%3Cpath d='M8 26 Q14 28 20 26' stroke='%2364b5f6' stroke-width='1.5' fill='none' opacity='0.6'/%3E%3C/g%3E%3C/svg%3E`;
        
        hero.style.cursor = `url("${spongeCursor}") 16 16, crosshair`;
        console.log('🧽 Sponge cursor applied successfully');
    }
    
    // Initialize sponge cursor
    createSpongeCursor();
    
    // Add hover effect to ensure cursor stays
    hero.addEventListener('mouseenter', function() {
        if (!hero.style.cursor.includes('url(')) {
            createSpongeCursor();
        }
    });
    
    hero.appendChild(canvas);
    
    // Resize canvas to match hero
    function resizeCanvas() {
        const rect = hero.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Fill canvas with much more visible "dirt" overlay
        ctx.fillStyle = 'rgba(150, 150, 150, 0.6)'; // Much more opaque
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add heavy texture/dirt spots for very visible dirt
        for (let i = 0; i < 3000; i++) {
            ctx.fillStyle = `rgba(120, 120, 120, ${Math.random() * 0.4 + 0.2})`; // Darker and more opaque
            ctx.fillRect(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 8 + 2, // Larger dirt spots
                Math.random() * 8 + 2
            );
        }
        
        // Add some larger dirt patches
        for (let i = 0; i < 50; i++) {
            ctx.fillStyle = `rgba(100, 100, 100, ${Math.random() * 0.3 + 0.1})`;
            ctx.beginPath();
            ctx.arc(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 20 + 10, // Large circular dirt patches
                0, Math.PI * 2
            );
            ctx.fill();
        }
    }
    
    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let lastX = 0;
    let lastY = 0;
    let isActive = false;
    
    // Mouse movement tracking for automatic cleaning
    function cleaning(e) {
        const rect = hero.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        
        // Activate cleaning effect
        if (!isActive) {
            hero.classList.add('cleaning-active');
            isActive = true;
        }
        
        // Update shine position
        const xPercent = (currentX / rect.width) * 100;
        const yPercent = (currentY / rect.height) * 100;
        hero.style.setProperty('--mx', xPercent + '%');
        hero.style.setProperty('--my', yPercent + '%');
        
        // Clear dirt in a much larger circular area
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(currentX, currentY, 120, 0, Math.PI * 2); // Much larger cleaning area (120px radius = 240px diameter)
        ctx.fill();
        
        // Add intense sparkle effect in the center
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // Much more visible
        ctx.beginPath();
        ctx.arc(currentX, currentY, 60, 0, Math.PI * 2); // Larger sparkle area
        ctx.fill();
        
        // Add medium sparkle ring
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(currentX, currentY, 90, 0, Math.PI * 2);
        ctx.fill();
        
        // Add many more sparkles around the main area
        for (let i = 0; i < 8; i++) {
            const offsetX = (Math.random() - 0.5) * 150;
            const offsetY = (Math.random() - 0.5) * 150;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
            ctx.beginPath();
            ctx.arc(currentX + offsetX, currentY + offsetY, Math.random() * 15 + 8, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add some bright flash points
        for (let i = 0; i < 5; i++) {
            const offsetX = (Math.random() - 0.5) * 100;
            const offsetY = (Math.random() - 0.5) * 100;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath();
            ctx.arc(currentX + offsetX, currentY + offsetY, Math.random() * 5 + 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        lastX = currentX;
        lastY = currentY;
    }
    
    function stopCleaning() {
        isActive = false;
        setTimeout(() => {
            hero.classList.remove('cleaning-active');
        }, 1000);
    }
    
    // Mouse events - only mousemove and mouseleave needed
    hero.addEventListener('mousemove', cleaning);
    hero.addEventListener('mouseleave', stopCleaning);
    
    // Touch events for mobile - simplified for hover-like behavior
    hero.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        hero.dispatchEvent(mouseEvent);
    });
    
    hero.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopCleaning();
    });
    
    // Initialize CSS custom properties
    hero.style.setProperty('--mx', '50%');
    hero.style.setProperty('--my', '50%');
    
    // Add cleaning instructions - more prominent
    const instructions = document.createElement('div');
    instructions.innerHTML = '🧽✨ USE THE SPONGE TO CLEAN THE DIRTY GLASS! ✨🧽';
    instructions.style.cssText = `
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
        background-size: 300% 300%;
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        z-index: 10;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        animation: instructionPulse 3s infinite, gradientShift 4s ease infinite;
        border: 2px solid rgba(255,255,255,0.3);
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    `;
    hero.appendChild(instructions);
    
    // Add enhanced animations for instructions
    const enhancedStyle = document.createElement('style');
    enhancedStyle.textContent = `
        @keyframes instructionPulse {
            0%, 100% { 
                transform: translateX(-50%) scale(1); 
                opacity: 0.9; 
            }
            50% { 
                transform: translateX(-50%) scale(1.1); 
                opacity: 1; 
                box-shadow: 0 6px 25px rgba(0,0,0,0.4);
            }
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(enhancedStyle);
    
    // Hide instructions after 8 seconds with fade effect
    setTimeout(() => {
        instructions.style.transition = 'all 1s ease-out';
        instructions.style.opacity = '0';
        instructions.style.transform = 'translateX(-50%) scale(0.8)';
        setTimeout(() => instructions.remove(), 1000);
    }, 8000);
    
    console.log('🧹 Interactive glass cleaning effect initialized');
    console.log('🧽 Custom sponge cursor applied to hero section');
}
