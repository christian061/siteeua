// Variáveis globais para controle do carrossel
let currentSlide = 0;
let slideInterval;
let totalSlides = 0;

// Função para buscar depoimentos do Google Meu Negócio
async function fetchGoogleReviews() {
    const reviewsContainer = document.getElementById('googleReviews');
    if (!reviewsContainer) return;

    // Mostrar estado de carregamento
    reviewsContainer.innerHTML = `
        <div class="loading-reviews">
            <div class="spinner"></div>
            <p>Carregando depoimentos...</p>
        </div>
    `;

    try {
        // Chave de API (em um ambiente real, use variáveis de ambiente ou um backend seguro)
        const apiKey = 'AIzaSyB32DWthl67HhmROWotpAWVYKgeEG7CyFI';
        // Place ID do Google Meu Negócio (apenas o ID, sem quebras de linha ou endereço)
        const placeId = 'EigxMDg4IFppb24gRHIsIEhhaW5lcyBDaXR5LCBGTCAzMzg0NCwgVVNBIjESLwoUChIJ_8o-CV5x3YgRUV_LyJpE7J4QwAgqFAoSCVEFOQlecd2IEZ_peWDZFt-f';
        
        // URL da API do Google Places para buscar avaliações
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,user_ratings_total,rating&key=${apiKey}`;

        console.log('URL da API:', url); // Log para depuração

        // Fazer a requisição para a API do Google Places
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Resposta da API:', data); // Log da resposta completa

        if (data.status === 'OK' && data.result) {
            console.log('Status: OK');
            console.log('Número de avaliações encontradas:', data.result.reviews ? data.result.reviews.length : 0);

            if (!data.result.reviews || data.result.reviews.length === 0) {
                console.warn('Nenhuma avaliação encontrada. Verifique se as avaliações estão ativadas no Google Meu Negócio.');
                showNoReviewsMessage(placeId);
                return;
                `;
                return [];
            }
            // Mapear os dados da API para o formato esperado
            const reviews = data.result.reviews.map(review => ({
                author_name: review.author_name,
                rating: review.rating,
                text: review.text,
                relative_time_description: review.relative_time_description,
                profile_photo_url: review.profile_photo_url || 'https://via.placeholder.com/50/4CAF50/FFFFFF?text=' + (review.author_name ? review.author_name.charAt(0).toUpperCase() : 'U'),
                time: review.time || Date.now()
            }));
            
            // Ordenar por data (mais recentes primeiro)
            reviews.sort((a, b) => b.time - a.time);
            
            return reviews;
            
            // Inicializar o carrossel
            initTestimonialSlider();
        } else {
            throw new Error('Não foi possível carregar os depoimentos. Por favor, tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
        
        // Se houver erro, mostrar mensagem amigável e botão para ver no Google
        reviewsContainer.innerHTML = `
            <div class="error-loading" style="text-align: center; padding: 30px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 40px; color: #ff9800; margin-bottom: 15px;"></i>
                <p>Não foi possível carregar os depoimentos no momento.</p>
                <p>Você pode ver nossos depoimentos diretamente no Google:</p>
                <a href="https://search.google.com/local/reviews?placeid=SEU_PLACE_ID" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="btn btn-primary"
                   style="margin-top: 15px;">
                    Ver Depoimentos no Google
                </a>
            </div>
        `;
    }
}

function showErrorMessage(message) {
    const reviewsContainer = document.getElementById('googleReviews');
    if (!reviewsContainer) return;
    
    reviewsContainer.innerHTML = `
        <div class="error-message" style="text-align: center; padding: 20px; color: #721c24; background-color: #f8d7da; border-radius: 5px; margin: 10px 0;">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            <p><small>Se o problema persistir, entre em contato com o suporte.</small></p>
        </div>
    `;
}

// Função para renderizar os depoimentos
function renderReviews(reviews) {
    const reviewsContainer = document.getElementById('googleReviews');
    if (!reviews || reviews.length === 0) {
        reviewsContainer.innerHTML = `
            <div class="no-reviews" style="text-align: center; padding: 30px;">
                <p>No reviews found. Be the first to review!</p>
                <a href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID" 
                   target="_blank" 
                   rel="noopener" 
                   class="btn btn-primary">
                    Leave a Review
                </a>
            </div>
        `;
        return;
    }

    // Limpar container
    reviewsContainer.innerHTML = '';

    // Criar container do slider
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'testimonial-container';

    // Criar track do carrossel
    const track = document.createElement('div');
    track.className = 'testimonial-track';
    track.id = 'testimonialTrack';

    // Adicionar depoimentos ao track
    reviews.forEach((review, index) => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        
        const testimonial = document.createElement('div');
        testimonial.className = `testimonial ${index === 0 ? 'active' : ''}`;
        testimonial.style.background = 'white';
        testimonial.style.borderRadius = '12px';
        testimonial.style.padding = '25px';
        testimonial.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        testimonial.style.margin = '0 15px';
        testimonial.style.minWidth = '300px';
        testimonial.style.flex = '0 0 calc(100% - 30px)';
        
        testimonial.innerHTML = `
            <div class="quote">
                <i class="fas fa-quote-left" style="color: #4CAF50; font-size: 24px; margin-bottom: 15px; display: block;"></i>
                <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 20px;">${review.text}</p>
            </div>
            <div class="client" style="display: flex; align-items: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee;">
                <img src="${review.profile_photo_url}" alt="${review.author_name}" 
                     style="width: 50px; height: 50px; border-radius: 50%; margin-right: 15px; object-fit: cover;">
                <div class="client-info">
                    <h4 style="margin: 0 0 5px 0; font-size: 18px; color: #333;">${review.author_name}</h4>
                    <div class="stars" style="color: #FFD700; margin-bottom: 5px; font-size: 14px;">
                        ${stars}
                    </div>
                    <span style="font-size: 13px; color: #888;">${review.relative_time_description}</span>
                </div>
            </div>
        `;
        
        track.appendChild(testimonial);
    });

    // Adicionar navegação
    const nav = document.createElement('div');
    nav.className = 'testimonial-nav';
    nav.innerHTML = `
        <button id="prevTestimonial" aria-label="Depoimento anterior">
            <i class="fas fa-chevron-left"></i>
        </button>
        <button id="nextTestimonial" aria-label="Próximo depoimento">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    // Adicionar dots de navegação
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    
    // Adicionar botões de navegação
    sliderContainer.appendChild(track);
    sliderContainer.appendChild(nav);
    
    // Adicionar tudo ao container principal
    reviewsContainer.appendChild(sliderContainer);
    reviewsContainer.appendChild(dotsContainer);

    // Atualizar total de slides
    totalSlides = reviews.length;
    
    // Inicializar o carrossel
    initTestimonialSlider();
}

// Função para atualizar os dots de navegação
function updateDots() {
    const dotsContainer = document.querySelector('.testimonial-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${i === currentSlide ? 'active' : ''}`;
        dot.setAttribute('data-slide', i);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Função para ir para um slide específico
function goToSlide(index) {
    const track = document.getElementById('testimonialTrack');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (!track || !testimonials.length) return;
    
    // Atualizar índice atual
    currentSlide = (index + totalSlides) % totalSlides;
    
    // Atualizar posição do track
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Atualizar classes ativas
    testimonials.forEach((testimonial, i) => {
        if (i === currentSlide) {
            testimonial.classList.add('active');
        } else {
            testimonial.classList.remove('active');
        }
    });
    
    // Atualizar dots
    updateDots();
    
    // Reiniciar o intervalo
    resetInterval();
}

// Função para ir para o próximo slide
function nextSlide() {
    goToSlide(currentSlide + 1);
}

// Função para ir para o slide anterior
function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Função para reiniciar o intervalo automático
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000); // Muda a cada 4 segundos
}

// Inicializar o carrossel de depoimentos
function initTestimonialSlider() {
    // Adicionar event listeners para os botões de navegação
    document.getElementById('nextTestimonial')?.addEventListener('click', nextSlide);
    document.getElementById('prevTestimonial')?.addEventListener('click', prevSlide);
    
    // Iniciar o carrossel automático
    resetInterval();
    
    // Pausar o carrossel quando o mouse estiver sobre ele
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', resetInterval);
    }
    
    // Atualizar dots iniciais
    updateDots();
}

// Video Modal Functionality
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close-modal');
    const videoIframe = document.getElementById('youtubeVideo');
    const videoUrl = 'https://www.youtube.com/embed/4WZ1PHYdecQ?autoplay=1';

    // Function to open the modal
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        videoIframe.src = videoUrl; // Set the video source when opening
    }

    // Function to close the modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
        videoIframe.src = ''; // Stop the video when closing
    }

    // Add click event to all elements with class 'experience-feature'
    document.querySelectorAll('.experience-feature').forEach(item => {
        item.addEventListener('click', openModal);
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize video modal
    initVideoModal();
    
    // Carrega as avaliações do Google Meu Negócio
    fetchGoogleReviews();
    
    // Cursor personalizado de vassoura - apenas na hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-broom';
        document.body.appendChild(cursor);
        cursor.style.display = 'none'; // Inicialmente escondido

        // Mostra/oculta o cursor personalizado ao entrar/sair da hero
        heroSection.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
            document.body.style.cursor = 'none';
        });

        heroSection.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
            document.body.style.cursor = 'auto';
        });

        // Atualiza a posição do cursor personalizado
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Adiciona uma leve rotação ao mover o mouse
            const rotation = Math.sin(Date.now() / 100) * 5 - 15; // -15° a +5°
            cursor.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        });
    }
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

    // Hero Cleaning Effect (mouse/touch follows to reveal clean area)
    const hero = document.querySelector('.hero');
    if (hero) {
        let pending = false;
        let targetX = -200;
        let targetY = -200;
        // Canvas-based cleaning trail
        const canvas = document.createElement('canvas');
        canvas.className = 'clean-canvas';
        const ctx = canvas.getContext('2d');
        hero.appendChild(canvas);

        // Brush and fade configuration
        const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        const BRUSH_RADIUS = 92; // larger trail size
        const BRUSH_SOFTNESS = 0.7; // 0..1, edge feather
        const FADE_BACK = 0.0; // 0 = permanent trail (no re-fog)

        let cw = 0, ch = 0; // canvas size in CSS pixels
        let lastX = null, lastY = null;
        let fading = true;

        const resizeCanvas = () => {
            const rect = hero.getBoundingClientRect();
            cw = Math.max(1, Math.floor(rect.width));
            ch = Math.max(1, Math.floor(rect.height));
            canvas.width = Math.floor(cw * DPR);
            canvas.height = Math.floor(ch * DPR);
            canvas.style.width = cw + 'px';
            canvas.style.height = ch + 'px';
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

            // Reset fog paint
            paintFog(true);
        };

        const paintFog = (full = false) => {
            // Draw a subtle fog layer; use low alpha when not full to accumulate fade-back
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = full ? 'rgba(255,255,255,0.16)' : `rgba(255,255,255,${FADE_BACK})`;
            ctx.fillRect(0, 0, cw, ch);
            // Optional fine texture lines
            if (full) {
                ctx.save();
                ctx.globalAlpha = 0.05;
                const step = 16;
                ctx.strokeStyle = 'rgba(0,0,0,0.12)';
                ctx.lineWidth = 1;
                for (let y = 0; y < ch; y += step) {
                    ctx.beginPath();
                    ctx.moveTo(0, y + 0.5);
                    ctx.lineTo(cw, y + 0.5);
                    ctx.stroke();
                }
                ctx.restore();
            }
        };

        const eraseDot = (x, y, radius) => {
            // Erase with a soft radial brush
            const r = Math.max(1, radius);
            const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
            // Center fully erase, edge feather
            grd.addColorStop(0, 'rgba(0,0,0,1)');
            grd.addColorStop(Math.max(0, 1 - BRUSH_SOFTNESS), 'rgba(0,0,0,1)');
            grd.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        };

        const eraseLine = (x0, y0, x1, y1) => {
            const dx = x1 - x0;
            const dy = y1 - y0;
            const dist = Math.hypot(dx, dy);
            const step = Math.max(4, BRUSH_RADIUS * 0.5);
            const steps = Math.max(1, Math.floor(dist / step));
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                eraseDot(x0 + dx * t, y0 + dy * t, BRUSH_RADIUS);
            }
        };

        const loop = () => {
            // Gradually reapply fog to fade the trail
            if (fading) paintFog(false);
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);

        const setVars = () => {
            hero.style.setProperty('--mx', `${targetX}px`);
            hero.style.setProperty('--my', `${targetY}px`);
            pending = false;
        };

        const updatePos = (clientX, clientY) => {
            const rect = hero.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
            targetX = x;
            targetY = y;
            if (lastX == null) lastX = x;
            if (lastY == null) lastY = y;
            eraseLine(lastX, lastY, x, y);
            lastX = x; lastY = y;
            if (!pending) {
                pending = true;
                requestAnimationFrame(setVars);
            }
        };

        const onEnter = (clientX, clientY) => {
            hero.classList.add('cleaning-active');
            // initial erase dot on enter
            const rect = hero.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
            lastX = x; lastY = y;
            eraseDot(x, y, BRUSH_RADIUS);
            updatePos(clientX, clientY);
        };

        const onLeave = () => {
            hero.classList.remove('cleaning-active');
            targetX = -200; // move hole off-screen
            targetY = -200;
            setVars();
            lastX = null; lastY = null;
        };

        // Mouse events
        hero.addEventListener('mousemove', (e) => updatePos(e.clientX, e.clientY));
        hero.addEventListener('mouseenter', (e) => onEnter(e.clientX, e.clientY));
        hero.addEventListener('mouseleave', onLeave);

        // Touch events
        hero.addEventListener('touchstart', (e) => {
            // Não bloquear o scroll em mobile
            const touch = e.touches[0];
            onEnter(touch.clientX, touch.clientY);
        });

        hero.addEventListener('touchmove', (e) => {
            // Não bloquear o scroll em mobile
            const touch = e.touches[0];
            updatePos(touch.clientX, touch.clientY);
        });

        hero.addEventListener('touchend', onLeave);

        // Use a small timeout to ensure layout is stable before measuring rect
        setTimeout(() => {
            resizeCanvas();
            
            // Handle window resize
            window.addEventListener('resize', () => {
                resizeCanvas();
                paintFog(true);
            });
        }, 100);
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                // Here you would typically send the email to your server
                console.log('Newsletter subscription:', emailInput.value);
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Testimonial Slider (Simple Version)
    const slider = document.querySelector('.testimonial-slider');
    let testimonials = Array.from(document.querySelectorAll('.testimonial'));
    if (slider && testimonials.length > 0) {
        // Build marquee track
        let track = slider.querySelector('.testimonial-track');
        if (!track) {
            track = document.createElement('div');
            track.className = 'testimonial-track';
            // move current testimonial cards into track
            const cards = Array.from(slider.querySelectorAll('.testimonial'));
            cards.forEach(card => track.appendChild(card));
            slider.appendChild(track);
        }

        // Helper to (re)build duplicated content for seamless scroll
        const rebuildDuplication = () => {
            // remove old clones
            track.querySelectorAll('.clone').forEach(n => n.remove());
            const originals = Array.from(track.children).filter(n => !n.classList.contains('clone'));
            // duplicate originals once
            originals.forEach(orig => {
                const clone = orig.cloneNode(true);
                clone.classList.add('clone');
                track.appendChild(clone);
            });
            // start animation
            track.classList.add('autoscroll');
        };

        rebuildDuplication();

        // Pause on hover/focus for accessibility
        const setPlayState = (paused) => {
            track.style.animationPlayState = paused ? 'paused' : 'running';
        };
        slider.addEventListener('mouseenter', () => setPlayState(true));
        slider.addEventListener('mouseleave', () => setPlayState(false));
        slider.addEventListener('focusin', () => setPlayState(true));
        slider.addEventListener('focusout', () => setPlayState(false));

        // Load testimonials from Firestore if available, else from localStorage
        const hasFirestore = typeof window !== 'undefined' && window.db && window.firebase;
        if (hasFirestore) {
            try {
                const col = window.db.collection('testimonials');
                col.orderBy('createdAt', 'desc').limit(30).onSnapshot((snap) => {
                    // Remove previously injected user testimonials (originals only)
                    track.querySelectorAll('.testimonial.user-gen').forEach(n => n.remove());
                    snap.forEach(doc => {
                        const d = doc.data() || {};
                        if (!d.name || !d.message) return;
                        addTestimonialCard({
                            name: d.name,
                            message: d.message,
                            rating: Math.max(1, Math.min(5, parseInt(d.rating || 5, 10)))
                        }, false, 'firestore');
                    });
                    testimonials = Array.from(track.querySelectorAll('.testimonial'));
                    rebuildDuplication();
                }, (err) => {
                    console.warn('Firestore onSnapshot error:', err);
                });
            } catch (e) {
                console.warn('Firestore load failed, falling back to localStorage');
                try {
                    const stored = JSON.parse(localStorage.getItem('userTestimonials') || '[]');
                    stored.forEach(addTestimonialCard);
                } catch (e) {}
            }
        } else {
            try {
                const stored = JSON.parse(localStorage.getItem('userTestimonials') || '[]');
                stored.forEach(addTestimonialCard);
            } catch (e) {}
        }

        testimonials = Array.from(track.querySelectorAll('.testimonial'));

        // Handle testimonial form submissions
        const tForm = document.getElementById('userTestimonialForm');
        if (tForm) {
            tForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = tForm.querySelector('[name="name"]').value.trim();
                const rating = parseInt((tForm.querySelector('[name="rating"]:checked')?.value || '5'), 10);
                const message = tForm.querySelector('[name="message"]').value.trim();
                if (!name || !message) return;

                const entry = { name, rating: Math.max(1, Math.min(5, rating)), message, date: new Date().toISOString() };

                if (hasFirestore) {
                    try {
                        const col = window.db.collection('testimonials');
                        col.add({
                            name: entry.name,
                            message: entry.message,
                            rating: entry.rating,
                            createdAt: window.firebase.firestore.FieldValue.serverTimestamp()
                        }).then(() => {
                            // onSnapshot will render it; add a quick visual feedback
                            tForm.reset();
                            const star5 = tForm.querySelector('#star5'); if (star5) star5.checked = true;
                            alert('Thank you! Your review has been submitted.');
                        }).catch((err) => {
                            console.warn('Firestore add error:', err);
                            fallbackLocal(entry);
                        });
                    } catch (err) {
                        console.warn('Firestore not available, falling back to localStorage');
                        fallbackLocal(entry);
                    }
                } else {
                    fallbackLocal(entry);
                }
            });
        }

        function addTestimonialCard(entry, highlight = false, source = 'local') {
            const t = document.createElement('div');
            t.className = 'testimonial user-gen';
            if (highlight) t.style.outline = '2px solid rgba(74,144,226,0.3)';
            t.innerHTML = `
                <div class="quote">
                    <i class="fas fa-quote-left"></i>
                    <p>${escapeHtml(entry.message)}</p>
                </div>
                <div class="client">
                    <div class="client-info">
                        <h4>${escapeHtml(entry.name)}</h4>
                        <div class="stars">${'★'.repeat(entry.rating)}${'☆'.repeat(5-entry.rating)}</div>
                    </div>
                </div>`;
            track.appendChild(t);
            testimonials = Array.from(track.querySelectorAll('.testimonial'));
            rebuildDuplication();
        }

        function escapeHtml(str) {
            return str.replace(/[&<>\"]+/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
        }

        function fallbackLocal(entry) {
            try {
                const list = JSON.parse(localStorage.getItem('userTestimonials') || '[]');
                list.unshift(entry);
                localStorage.setItem('userTestimonials', JSON.stringify(list.slice(0, 30)));
            } catch (e) {}
            addTestimonialCard(entry, true, 'local');
            tForm && tForm.reset();
            const star5 = tForm && tForm.querySelector('#star5'); if (star5) star5.checked = true;
            alert('Thank you! Your review has been added.');
        }
    }
    
    // Animate on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature, .about-image, .contact-method');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('.feature, .about-image, .contact-method');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
        
        // Initial check in case elements are already in view
        animateOnScroll();
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);

    // Reveal animation for service cards with staggered delays using IntersectionObserver
    const serviceCards = document.querySelectorAll('.services-grid .service-card');
    if (serviceCards.length) {
        // Ensure base reveal class applied
        serviceCards.forEach((card, idx) => {
            card.classList.add('reveal');
            // Create a pleasant stagger: columns first, then rows
            const col = idx % 3; // assumes up to 3 columns, safe on wrap
            const row = Math.floor(idx / 3);
            const delay = col * 0.08 + row * 0.06; // seconds
            card.style.transitionDelay = `${delay}s`;
        });

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target); // reveal once
                }
            });
        }, { threshold: 0.15 });

        serviceCards.forEach(card => io.observe(card));
    }

    // 3D Tilt effect for service cards (desktop/fine pointer only)
    const prefersNoHover = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!prefersNoHover && serviceCards.length) {
        const maxTilt = 8; // degrees
        const maxPop = 14; // px translateZ

        serviceCards.forEach(card => {
            let rafId = null;
            let targetRx = 0, targetRy = 0, targetTz = 0;

            const apply = () => {
                card.style.setProperty('--rx', targetRx.toFixed(2) + 'deg');
                card.style.setProperty('--ry', targetRy.toFixed(2) + 'deg');
                card.style.setProperty('--tz', targetTz.toFixed(0) + 'px');
                rafId = null;
            };

            const schedule = () => {
                if (rafId === null) rafId = requestAnimationFrame(apply);
            };

            const onMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;   // 0..1
                const y = (e.clientY - rect.top) / rect.height;   // 0..1
                // Centered coordinates -0.5..0.5
                const dx = x - 0.5;
                const dy = y - 0.5;
                // Non-linear sensitivity: softer near center, stronger near edges
                // Use smoothstep on normalized radius
                const r = Math.min(1, Math.hypot(dx, dy) / 0.5);
                const ease = r * r * (3 - 2 * r); // smoothstep
                // rotateY tilts left/right, rotateX tilts up/down
                targetRy = dx * (maxTilt * 2) * ease;
                targetRx = -dy * (maxTilt * 2) * ease;
                targetTz = maxPop * (0.65 + 0.35 * ease); // a bit less pop at center
                schedule();
            };

            const onEnter = () => {
                card.style.willChange = 'transform';
            };

            const onLeave = () => {
                targetRx = 0; targetRy = 0; targetTz = 0;
                schedule();
                card.style.willChange = 'auto';
            };

            card.addEventListener('mouseenter', onEnter);
            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);
        });
    }
});
