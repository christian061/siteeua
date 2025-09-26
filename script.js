// Main JavaScript file for Magic CleanDom

document.addEventListener('DOMContentLoaded', function() {
    // Garantir que o modal está fechado ao carregar a página
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Check for image loading errors
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.error('Failed to load image:', this.src);
            // Optionally add a placeholder or hide the image
            this.style.display = 'none';
        });
    });
    
    // Hero cleaning effect
    setupHeroCleaningEffect();
    
    // Modal do Vídeo de Experiência
    function setupExperienceVideo() {
        const modal = document.getElementById('experienceVideoModal');
        const experienceBtn = document.querySelector('.feature.experience-feature'); // Seleciona o botão de experiência
        const closeBtn = modal?.querySelector('.close');
        const videoIframe = document.getElementById('experienceVideo');
        const videoUrl = 'https://player.vimeo.com/video/1121414581?autoplay=1&color=ffffff&title=0&byline=0&portrait=0';
        
        console.log('Modal:', modal);
        console.log('Experience Button:', experienceBtn);
        
        if (!modal) {
            console.error('Modal de vídeo não encontrado');
            return;
        }
        
        if (!experienceBtn) {
            console.error('Botão de experiência não encontrado');
            return;
        }
        
        // Abrir modal ao clicar no botão de experiência
        experienceBtn.style.cursor = 'pointer';
        experienceBtn.addEventListener('click', function(e) {
            console.log('Botão de experiência clicado');
            e.preventDefault();
            e.stopPropagation();
            
            // Salva a posição de rolagem atual
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            // Abre o modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Ajusta a posição do modal para a visão atual
            modal.scrollTop = 0;
            
            // Define o src do iframe ao abrir o modal
            videoIframe.src = videoUrl;
            
            // Restaura a posição de rolagem se necessário
            if (window.innerWidth <= 768) {
                window.scrollTo(0, 0);
            } else {
                window.scrollTo(0, scrollPosition);
            }
            
            console.log('Modal aberto e vídeo iniciado');
        });
        
        // Fechar modal ao clicar no X
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
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
    
    // Função para configurar o modal de certificados
    function setupCertificateModal() {
        const modal = document.getElementById('certificateModal');
        const certificateBtn = document.querySelector('.feature .fa-certificate')?.closest('.feature');
        const closeBtn = modal?.querySelector('.close'); // Seleciona apenas o botão close do modal de certificados
        
        if (!modal) return;
        
        // Elementos do carrossel
        const slides = document.querySelectorAll('.carousel-slide');
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        const indicators = document.querySelectorAll('.indicator');
        let currentSlide = 0;
        let zoomLevel = 1;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let translateX = 0;
        let translateY = 0;
        
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
                e.stopPropagation();
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                // Mostra o primeiro slide ao abrir o modal
                showSlide(0);
                // Mostrar instrução de zoom
                showZoomInstruction();
                console.log('Modal de certificados aberto');
            });
        }
        
        // Função para mostrar instrução de zoom
        function showZoomInstruction() {
            const existingInstruction = modal.querySelector('.zoom-instruction');
            if (existingInstruction) {
                existingInstruction.remove();
            }
            
            const instruction = document.createElement('div');
            instruction.className = 'zoom-instruction';
            instruction.innerHTML = '🔍 Desktop: Scroll para zoom • Arraste para mover<br>📱 Mobile: Pinça para zoom • Toque duplo para resetar';
            modal.appendChild(instruction);
            
            // Remove a instrução após 4 segundos
            setTimeout(() => {
                if (instruction.parentNode) {
                    instruction.remove();
                }
            }, 4000);
        }
        
        // Fechar modal ao clicar no X
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                resetZoom(); // Reset zoom ao fechar
            });
        }
        
        // Fechar modal ao clicar fora do conteúdo
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                resetZoom(); // Reset zoom ao fechar
            }
        });
        
        // Função para resetar o zoom
        function resetZoom() {
            zoomLevel = 1;
            translateX = 0;
            translateY = 0;
            const activeSlide = document.querySelector('.carousel-slide.active img');
            if (activeSlide) {
                activeSlide.style.transform = 'scale(1) translate(0px, 0px)';
                activeSlide.style.cursor = 'zoom-in';
            }
        }
        
        // Função para aplicar zoom
        function applyZoom(img) {
            const transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
            img.style.transform = transform;
            img.style.cursor = zoomLevel > 1 ? 'zoom-out' : 'zoom-in';
        }
        
        // Adicionar funcionalidade de zoom com scroll nas imagens
        function setupImageZoom() {
            slides.forEach(slide => {
                const img = slide.querySelector('img');
                if (!img) return;
                
                // Reset initial state
                img.style.transition = 'transform 0.3s ease';
                img.style.cursor = 'zoom-in';
                img.style.transformOrigin = 'center center';
                
                // Zoom com scroll do mouse
                img.addEventListener('wheel', function(e) {
                    e.preventDefault();
                    
                    const rect = img.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Calcular posição relativa (0-1)
                    const xPercent = x / rect.width;
                    const yPercent = y / rect.height;
                    
                    const zoomFactor = 0.1;
                    const oldZoom = zoomLevel;
                    
                    if (e.deltaY < 0) {
                        // Zoom in
                        zoomLevel = Math.min(zoomLevel + zoomFactor, 3);
                    } else {
                        // Zoom out
                        zoomLevel = Math.max(zoomLevel - zoomFactor, 1);
                    }
                    
                    // Se voltou ao zoom 1, resetar posição
                    if (zoomLevel === 1) {
                        translateX = 0;
                        translateY = 0;
                    } else {
                        // Ajustar posição para manter o ponto do mouse no centro do zoom
                        const zoomChange = zoomLevel - oldZoom;
                        translateX -= (xPercent - 0.5) * rect.width * zoomChange / zoomLevel;
                        translateY -= (yPercent - 0.5) * rect.height * zoomChange / zoomLevel;
                    }
                    
                    applyZoom(img);
                });
                
                // Arrastar quando com zoom
                img.addEventListener('mousedown', function(e) {
                    if (zoomLevel <= 1) return;
                    
                    isDragging = true;
                    startX = e.clientX - translateX;
                    startY = e.clientY - translateY;
                    img.style.cursor = 'grabbing';
                    img.style.transition = 'none';
                    e.preventDefault();
                });
                
                document.addEventListener('mousemove', function(e) {
                    if (!isDragging || zoomLevel <= 1) return;
                    
                    translateX = e.clientX - startX;
                    translateY = e.clientY - startY;
                    
                    // Limitar o arrasto para não sair muito da imagem
                    const maxTranslate = 100 * zoomLevel;
                    translateX = Math.max(-maxTranslate, Math.min(maxTranslate, translateX));
                    translateY = Math.max(-maxTranslate, Math.min(maxTranslate, translateY));
                    
                    const activeImg = document.querySelector('.carousel-slide.active img');
                    if (activeImg) {
                        applyZoom(activeImg);
                    }
                });
                
                document.addEventListener('mouseup', function() {
                    if (isDragging) {
                        isDragging = false;
                        const activeImg = document.querySelector('.carousel-slide.active img');
                        if (activeImg) {
                            activeImg.style.transition = 'transform 0.3s ease';
                            activeImg.style.cursor = zoomLevel > 1 ? 'zoom-out' : 'zoom-in';
                        }
                    }
                });
                
                // Clique duplo para resetar zoom
                img.addEventListener('dblclick', function() {
                    zoomLevel = 1;
                    translateX = 0;
                    translateY = 0;
                    applyZoom(img);
                });
                
                // Suporte para touch/mobile
                let touchStartDistance = 0;
                let touchStartZoom = 1;
                let touchStartX = 0;
                let touchStartY = 0;
                let touchStartTranslateX = 0;
                let touchStartTranslateY = 0;
                
                img.addEventListener('touchstart', function(e) {
                    if (e.touches.length === 2) {
                        // Pinch to zoom
                        e.preventDefault();
                        const touch1 = e.touches[0];
                        const touch2 = e.touches[1];
                        touchStartDistance = Math.hypot(
                            touch2.clientX - touch1.clientX,
                            touch2.clientY - touch1.clientY
                        );
                        touchStartZoom = zoomLevel;
                    } else if (e.touches.length === 1 && zoomLevel > 1) {
                        // Single touch drag when zoomed
                        e.preventDefault();
                        const touch = e.touches[0];
                        touchStartX = touch.clientX;
                        touchStartY = touch.clientY;
                        touchStartTranslateX = translateX;
                        touchStartTranslateY = translateY;
                        img.style.transition = 'none';
                    }
                });
                
                img.addEventListener('touchmove', function(e) {
                    if (e.touches.length === 2) {
                        // Pinch to zoom
                        e.preventDefault();
                        const touch1 = e.touches[0];
                        const touch2 = e.touches[1];
                        const currentDistance = Math.hypot(
                            touch2.clientX - touch1.clientX,
                            touch2.clientY - touch1.clientY
                        );
                        
                        const scale = currentDistance / touchStartDistance;
                        zoomLevel = Math.max(1, Math.min(3, touchStartZoom * scale));
                        
                        if (zoomLevel === 1) {
                            translateX = 0;
                            translateY = 0;
                        }
                        
                        applyZoom(img);
                    } else if (e.touches.length === 1 && zoomLevel > 1) {
                        // Single touch drag when zoomed
                        e.preventDefault();
                        const touch = e.touches[0];
                        translateX = touchStartTranslateX + (touch.clientX - touchStartX);
                        translateY = touchStartTranslateY + (touch.clientY - touchStartY);
                        
                        // Limitar o arrasto
                        const maxTranslate = 100 * zoomLevel;
                        translateX = Math.max(-maxTranslate, Math.min(maxTranslate, translateX));
                        translateY = Math.max(-maxTranslate, Math.min(maxTranslate, translateY));
                        
                        applyZoom(img);
                    }
                });
                
                img.addEventListener('touchend', function(e) {
                    img.style.transition = 'transform 0.3s ease';
                });
            });
        }
        
        // Inicializar zoom nas imagens
        setupImageZoom();
        
        // Reset zoom quando trocar de slide
        const originalShowSlide = showSlide;
        showSlide = function(index) {
            resetZoom();
            originalShowSlide(index);
        };
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
    
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Disable cleaning effect on mobile to improve performance and prevent scroll issues
    if (isMobile) {
        console.log('🧹 Cleaning effect disabled on mobile for better performance');
        return;
    }
    
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
    
    // Touch events for mobile - allow scroll but enable cleaning effect
    let touchStartY = 0;
    let touchStartX = 0;
    let isHorizontalMove = false;
    
    hero.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        isHorizontalMove = false;
    });
    
    hero.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const deltaY = Math.abs(touch.clientY - touchStartY);
        const deltaX = Math.abs(touch.clientX - touchStartX);
        
        // Determine if this is primarily a vertical scroll
        if (deltaY > deltaX && deltaY > 10) {
            // This is a vertical scroll - allow it and don't trigger cleaning
            return;
        } else if (deltaX > 10 || deltaY > 10) {
            // This is horizontal movement or intentional cleaning gesture
            isHorizontalMove = true;
            e.preventDefault(); // Only prevent default for cleaning gestures
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            hero.dispatchEvent(mouseEvent);
        }
    });
    
    hero.addEventListener('touchend', (e) => {
        if (isHorizontalMove) {
            e.preventDefault();
        }
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
