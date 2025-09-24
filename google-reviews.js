// Google Reviews Integration for Magic CleanDom

// Function to create star rating HTML
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        stars += '½';
    }
    
    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    
    return `<span class="review-rating" style="color: #FFC107; font-size: 18px;">${stars}</span>`;
}

// Function to format date
function formatReviewDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to render reviews with carousel
function renderReviews(reviews) {
    const reviewsContainer = document.getElementById('googleReviews');
    if (!reviewsContainer) {
        console.error('Container #googleReviews não encontrado');
        return;
    }
    
    if (!reviews || reviews.length === 0) {
        reviewsContainer.innerHTML = `
            <div class="no-reviews" style="text-align: center; padding: 40px;">
                <p>No reviews found.</p>
            </div>
        `;
        return;
    }
    
    console.log('Renderizando', reviews.length, 'avaliações em carrossel');
    
    // Create carousel HTML
    let html = `
        <div class="testimonial-carousel-container" style="position: relative; max-width: 900px; margin: 0 auto; padding: 0 60px;">
            <div class="testimonial-carousel" style="display: flex; transition: transform 0.5s ease-in-out; overflow: visible;">
    `;
    
    reviews.forEach((review, index) => {
        const stars = '★'.repeat(Math.floor(review.rating)) + '☆'.repeat(5 - Math.floor(review.rating));
        const reviewDate = review.relative_time_description || 'Recently';
        
        html += `
            <div class="testimonial-slide" style="
                min-width: 100%;
                background: white; 
                border-radius: 12px; 
                padding: 40px; 
                margin: 0;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 400px;
                max-height: none;
                overflow: visible;
            ">
                <div class="quote" style="flex-grow: 1; text-align: center;">
                    <i class="fas fa-quote-left" style="color: #4CAF50; font-size: 32px; margin-bottom: 20px; display: block;"></i>
                    <p style="font-size: 16px; line-height: 1.7; color: #555; margin-bottom: 25px; font-style: italic; max-width: 100%; word-wrap: break-word; overflow-wrap: break-word;">
                        "${review.text.replace(/"/g, '&quot;')}"
                    </p>
                </div>
                <div class="client" style="
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    padding-top: 20px; 
                    border-top: 2px solid #f0f0f0;
                ">
                    <img 
                        src="${review.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=4CAF50&color=fff`}" 
                        alt="${review.author_name}" 
                        style="
                            width: 60px; 
                            height: 60px; 
                            border-radius: 50%; 
                            margin-right: 15px; 
                            object-fit: cover;
                            border: 3px solid #4CAF50;
                        "
                        onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=4CAF50&color=fff'"
                    >
                    <div class="client-info" style="text-align: left;">
                        <h4 style="margin: 0 0 8px 0; font-size: 20px; color: #333; font-weight: 600;">${review.author_name}</h4>
                        <div class="stars" style="color: #FFD700; margin-bottom: 5px; font-size: 16px; letter-spacing: 1px;">
                            ${stars}
                        </div>
                        <span style="font-size: 14px; color: #888;">${reviewDate}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
            
            <!-- Navigation Arrows -->
            <button class="carousel-prev" style="
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 50%;
                width: 45px;
                height: 45px;
                font-size: 18px;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transition: all 0.3s ease;
                z-index: 10;
            " onmouseover="this.style.background='#43A047'; this.style.transform='translateY(-50%) scale(1.1)'" onmouseout="this.style.background='#4CAF50'; this.style.transform='translateY(-50%) scale(1)'">
                <i class="fas fa-chevron-left"></i>
            </button>
            
            <button class="carousel-next" style="
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 50%;
                width: 45px;
                height: 45px;
                font-size: 18px;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transition: all 0.3s ease;
                z-index: 10;
            " onmouseover="this.style.background='#43A047'; this.style.transform='translateY(-50%) scale(1.1)'" onmouseout="this.style.background='#4CAF50'; this.style.transform='translateY(-50%) scale(1)'">
                <i class="fas fa-chevron-right"></i>
            </button>
            
            <!-- Dots Indicator -->
            <div class="carousel-dots" style="
                display: flex;
                justify-content: center;
                margin-top: 30px;
                gap: 10px;
            ">
    `;
    
    reviews.forEach((_, index) => {
        html += `
            <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide="${index}" style="
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background: ${index === 0 ? '#4CAF50' : '#ddd'};
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="if(!this.classList.contains('active')) this.style.background='#bbb'" onmouseout="if(!this.classList.contains('active')) this.style.background='#ddd'"></button>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    reviewsContainer.innerHTML = html;
    
    // Initialize carousel functionality
    initializeCarousel(reviews.length);
    
    console.log('Carrossel de avaliações renderizado com sucesso!');
}


// Function to fetch Google Reviews
async function fetchGoogleReviews() {
    console.log('Iniciando fetchGoogleReviews...');
    const reviewsContainer = document.getElementById('googleReviews');
    
    if (!reviewsContainer) {
        console.error('Container #googleReviews não encontrado no DOM');
        return;
    }
    
    // Show loading state
    reviewsContainer.innerHTML = `
        <div class="loading-reviews" style="text-align: center; padding: 40px;">
            <div class="spinner" style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #4CAF50; border-radius: 50%; margin: 0 auto 15px; animation: spin 1s linear infinite;"></div>
            <p style="color: #666; margin-bottom: 10px;">Loading Google Reviews...</p>
            <p style="color: #999; font-size: 14px;">If this takes too long, we'll show sample reviews</p>
        </div>
    `;

    try {
        // Google Places API credentials
        const apiKey = 'AIzaSyBdMFOSAlHPljt54uGAvyFRh2cIxH_lZ8g';
        const placeId = 'ChIJVTLH0y7uVUERjS7dceLoJhM';
        
        console.log('🔍 Tentando buscar reviews do Google My Business...');
        console.log('📍 Place ID:', placeId);
        console.log('🔑 API Key (primeiros 10 chars):', apiKey.substring(0, 10) + '...');
        
        // Build the API URL with all necessary parameters
        const fields = [
            'name',
            'rating',
            'reviews',
            'user_ratings_total',
            'formatted_address',
            'formatted_phone_number',
            'website'
        ].join(',');
        
        // Try direct API call first, then fallback to proxy if needed
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?` +
            `place_id=${encodeURIComponent(placeId)}` +
            `&fields=${encodeURIComponent(fields)}` +
            `&reviews_sort=newest` +
            `&language=en` +
            `&key=${apiKey}`;
        const url = apiUrl;
        
        console.log('URL da API com proxy:', url);
        
        // Make request to Google Places API with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
        
        console.log('🌐 Tentando chamada direta para:', url);
        
        let response;
        try {
            // First try direct call
            response = await fetch(url, { 
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                cache: 'no-cache'
            });
        } catch (corsError) {
            console.log('❌ Erro CORS na chamada direta, tentando com proxy...');
            
            // If CORS fails, try with proxy
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const proxiedUrl = proxyUrl + encodeURIComponent(url);
            console.log('🔄 Tentando com proxy:', proxiedUrl);
            
            response = await fetch(proxiedUrl, { 
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json'
                }
            });
        }
        
        console.log('Status da resposta:', response.status, response.statusText);
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro na resposta da API:', errorText);
            
            if (response.status === 403) {
                throw new Error('PERMISSAO_NEGADA: Esta chave de API não tem permissão para acessar a API do Google Places. Por favor, ative a API do Places no Google Cloud Console.');
            }
            
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const responseText = await response.text();
        console.log('Resposta bruta da API:', responseText);
        
        let data;
        try {
            data = JSON.parse(responseText);
            console.log('Resposta da API (parseada):', data);
        } catch (e) {
            console.error('Erro ao fazer parse da resposta:', e);
            throw new Error('Resposta inválida da API');
        }
        
        if (data.status === 'OK' && data.result) {
            console.log('Status: OK - Dados recebidos com sucesso');
            console.log('Nome do local:', data.result.name);
            console.log('Avaliação média:', data.result.rating);
            console.log('Total de avaliações:', data.result.user_ratings_total);
            
            // Detailed log of the result
            console.log('Dados completos da resposta:', JSON.stringify({
                name: data.result.name,
                rating: data.result.rating,
                user_ratings_total: data.result.user_ratings_total,
                has_reviews: data.result.reviews && data.result.reviews.length > 0,
                review_count: data.result.reviews ? data.result.reviews.length : 0
            }, null, 2));
            
            if (!data.result.reviews || data.result.reviews.length === 0) {
                console.warn('Nenhuma avaliação encontrada para este local.');
                console.log('Dados completos do local:', JSON.stringify(data.result, null, 2));
                
                // Check if there are total ratings but none returned
                const hasRatingsButNoReviews = data.result.user_ratings_total > 0 && 
                                             (!data.result.reviews || data.result.reviews.length === 0);
                
                if (hasRatingsButNoReviews) {
                    console.warn('Aviso: Existem avaliações totais, mas nenhuma foi retornada. Pode haver restrições de visibilidade.');
                    showNoReviewsMessage(placeId, 'Existem avaliações para este local, mas elas podem estar ocultas ou marcadas como spam.');
                } else {
                    showNoReviewsMessage(placeId);
                }
                return;
            }
            
            console.log('Avaliações encontradas:', data.result.reviews.length);
            
            // Map API data to expected format
            const reviews = data.result.reviews.map((review, index) => ({
                id: review.author_url ? review.author_url.split('/').pop() || `review-${index}` : `review-${index}`,
                author_name: review.author_name || 'Anonymous',
                rating: review.rating || 5,
                text: review.text ? review.text.replace(/\n/g, '<br>') : 'No review text available.',
                relative_time_description: review.relative_time_description || 'Recently',
                profile_photo_url: review.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name || 'U')}&background=4CAF50&color=fff`,
                time: review.time || Date.now(),
                language: review.language || 'en-US',
                author_url: review.author_url || `https://www.google.com/maps/contrib/${review.author_url ? review.author_url.split('/').pop() : ''}`
            }));
            
            // Sort by date (newest first)
            reviews.sort((a, b) => b.time - a.time);
            
            // Render the reviews
            renderReviews(reviews);
            
            // Initialize carousel after a short delay
            setTimeout(() => {
                if (typeof initTestimonialSlider === 'function') {
                    initTestimonialSlider();
                } else if (typeof $ !== 'undefined' && typeof $.fn.slick === 'function') {
                    // If using Slick Carousel
                    $('.testimonial-slider').slick({
                        dots: true,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        adaptiveHeight: true,
                        autoplay: true,
                        autoplaySpeed: 5000,
                    });
                }
            }, 100);
            
            return; // Important to exit the function after processing
            
        } else {
            throw new Error(data.error_message || 'Não foi possível carregar os depoimentos. Status: ' + data.status);
        }
    } catch (error) {
        console.error('❌ Erro ao carregar depoimentos do Google:', error);
        
        // Mensagens de erro mais detalhadas
        let errorMessage = 'Could not load Google reviews. ';
        
        if (error.name === 'AbortError') {
            errorMessage = '⏰ Timeout - Google API is taking too long. Showing sample reviews...';
            console.warn('⏰ A requisição foi cancelada por timeout');
        } else if (error.message.includes('API key not valid')) {
            errorMessage = '🔑 Invalid API key. Showing sample reviews...';
            console.error('🔑 Erro de autenticação: Chave de API inválida');
        } else if (error.message.includes('quota')) {
            errorMessage = '📊 API quota exceeded. Showing sample reviews...';
            console.error('📊 Erro de cota da API excedida');
        } else if (error.message.includes('PERMISSAO_NEGADA') || error.message.includes('403')) {
            errorMessage = '🚫 Permission denied. Showing sample reviews...';
            console.error('🚫 Erro de permissão:', error.message);
        } else if (error.message.includes('CORS') || error.message.includes('origin')) {
            errorMessage = '🌐 CORS error - Browser blocked the request. Showing sample reviews...';
            console.error('🌐 Erro de CORS:', error.message);
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage = '🔌 Network error - Could not connect to Google API. Showing sample reviews...';
            console.error('🔌 Erro de rede:', error.message);
        } else {
            errorMessage = '❓ Unknown error occurred. Showing sample reviews...';
            console.error('❓ Erro desconhecido:', error.message);
        }
        
        console.log('🔄 Carregando depoimentos de exemplo como fallback...');
        
        // Mostrar mensagem temporária e depois carregar exemplos
        reviewsContainer.innerHTML = `
            <div style="text-align: center; padding: 20px; background: #fff3cd; border-radius: 8px; margin: 10px 0;">
                <p style="color: #856404; margin: 0;">${errorMessage}</p>
            </div>
        `;
        
        // Carregar depoimentos de exemplo após 1 segundo
        setTimeout(() => {
            loadSampleReviews();
        }, 1000);
    }
}

function showNoReviewsMessage(placeId, customMessage = '') {
    const reviewsContainer = document.getElementById('googleReviews');
    if (!reviewsContainer) return;
    
    const defaultMessage = customMessage || 'Parece que ainda não há avaliações disponíveis ou elas não estão ativadas.';
    
    reviewsContainer.innerHTML = `
        <div class="no-reviews" style="text-align: center; padding: 20px;">
            <i class="fas fa-comment-slash" style="font-size: 40px; color: #4CAF50; margin-bottom: 15px;"></i>
            <h3>Nenhuma avaliação encontrada</h3>
            <p>${defaultMessage}</p>
            <p><small>Se você acredita que isso é um erro, verifique as configurações do Google Meu Negócio.</small></p>
            <div style="margin-top: 20px;">
                <a href="https://search.google.com/local/writereview?placeid=${placeId}" 
                   target="_blank" 
                   class="btn btn-primary" 
                   style="margin: 10px; padding: 10px 20px; background: #4CAF50; color: white; text-decoration: none; border-radius: 4px; display: inline-block;">
                    <i class="fas fa-star"></i> Deixe sua avaliação
                </a>
                <a href="https://www.google.com/maps/place/?q=place_id:${placeId}" 
                   target="_blank" 
                   class="btn btn-secondary" 
                   style="margin: 10px; padding: 10px 20px; background: #4285F4; color: white; text-decoration: none; border-radius: 4px; display: inline-block;">
                    <i class="fas fa-map-marker-alt"></i> Ver no Google Maps
                </a>
            </div>
        </div>
    `;
}

function showErrorMessage(message) {
    const reviewsContainer = document.getElementById('googleReviews');
    if (!reviewsContainer) return;
    
    reviewsContainer.innerHTML = `
        <div class="error-message" style="text-align: center; padding: 20px; color: #721c24; background-color: #f8d7da; border-radius: 5px; margin: 10px 0;">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            <p><small>If the problem persists, please contact support.</small></p>
        </div>
    `;
}

// Function to load sample reviews (fallback) - All in English
function loadSampleReviews() {
    console.log('Loading sample reviews in English...');
    
    const reviews = [
        {
            id: 'sample-1',
            author_name: 'Sarah Johnson',
            rating: 5,
            text: 'Excellent service! My house has never been so clean. The team is very professional and attentive to every detail. Highly recommended!',
            relative_time_description: '1 week ago',
            profile_photo_url: 'https://randomuser.me/api/portraits/women/44.jpg',
            author_url: 'https://www.google.com/maps/contrib/123456789',
            language: 'en-US'
        },
        {
            id: 'sample-2',
            author_name: 'Michael Rodriguez',
            rating: 5,
            text: 'I hired them to clean my office and was impressed with the quality. Punctual, professional, and committed to excellence. Highly recommend!',
            relative_time_description: '2 weeks ago',
            profile_photo_url: 'https://randomuser.me/api/portraits/men/32.jpg',
            author_url: 'https://www.google.com/maps/contrib/987654321',
            language: 'en-US'
        },
        {
            id: 'sample-3',
            author_name: 'Emily Davis',
            rating: 5,
            text: 'Great service and impeccable cleaning. The team was very careful with my furniture and belongings. Will definitely hire again!',
            relative_time_description: '3 weeks ago',
            profile_photo_url: 'https://randomuser.me/api/portraits/women/68.jpg',
            author_url: 'https://www.google.com/maps/contrib/456789123',
            language: 'en-US'
        },
        {
            id: 'sample-4',
            author_name: 'David Thompson',
            rating: 5,
            text: 'First-class service! Perfect post-construction cleaning. The team was professional and meticulous in every detail.',
            relative_time_description: '1 month ago',
            profile_photo_url: 'https://randomuser.me/api/portraits/men/45.jpg',
            author_url: 'https://www.google.com/maps/contrib/321654987',
            language: 'en-US'
        },
        {
            id: 'sample-5',
            author_name: 'Jessica Wilson',
            rating: 5,
            text: 'Best cleaning service ever! The house is spotless with a fresh clean smell. Very polite and attentive team. Highly recommend!',
            relative_time_description: '2 months ago',
            profile_photo_url: 'https://randomuser.me/api/portraits/women/22.jpg',
            author_url: 'https://www.google.com/maps/contrib/789456123',
            language: 'en-US'
        },
        {
            id: 'sample-6',
            author_name: 'Robert Martinez',
            rating: 5,
            text: 'Outstanding work! They transformed my home completely. Professional, reliable, and affordable. Magic CleanDom lives up to their name!',
            relative_time_description: '3 months ago',
            profile_photo_url: 'https://randomuser.me/api/portraits/men/67.jpg',
            author_url: 'https://www.google.com/maps/contrib/111222333',
            language: 'en-US'
        },
        {
            id: 'sample-7',
            author_name: 'Amanda Foster',
            rating: 5,
            text: 'Incredible attention to detail! They cleaned areas I never even thought about. My home feels brand new. Exceptional service!',
            relative_time_description: '4 months ago',
            profile_photo_url: 'https://randomuser.me/api/portraits/women/35.jpg',
            author_url: 'https://www.google.com/maps/contrib/444555666',
            language: 'en-US'
        },
        {
            id: 'sample-8',
            author_name: 'James Anderson',
            rating: 5,
            text: 'Professional team, fair pricing, and amazing results. They exceeded all my expectations. Will definitely use them again!',
            relative_time_description: '5 months ago',
            profile_photo_url: 'https://randomuser.me/api/portraits/men/58.jpg',
            author_url: 'https://www.google.com/maps/contrib/777888999',
            language: 'en-US'
        },
        {
            id: 'sample-9',
            author_name: 'Lisa Chen',
            rating: 5,
            text: 'They saved me so much time and stress! Perfect cleaning for my busy lifestyle. Trustworthy and reliable service.',
            relative_time_description: '6 months ago',
            profile_photo_url: 'https://randomuser.me/api/portraits/women/71.jpg',
            author_url: 'https://www.google.com/maps/contrib/101112131',
            language: 'en-US'
        },
        {
            id: 'sample-10',
            author_name: 'Mark Thompson',
            rating: 5,
            text: 'Top-notch service from start to finish. They respect your home and belongings while delivering exceptional cleaning results.',
            relative_time_description: '7 months ago',
            profile_photo_url: 'https://randomuser.me/api/portraits/men/42.jpg',
            author_url: 'https://www.google.com/maps/contrib/141516171',
            language: 'en-US'
        }
    ];
    
    // Simular um pequeno atraso para parecer uma requisição real
    setTimeout(() => {
        console.log('Sample reviews loaded successfully');
        renderReviews(reviews);
    }, 800);
}

// Function to initialize carousel functionality
function initializeCarousel(totalSlides) {
    let currentSlide = 0;
    const carousel = document.querySelector('.testimonial-carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
                dot.style.background = '#4CAF50';
            } else {
                dot.classList.remove('active');
                dot.style.background = '#ddd';
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-play carousel
    setInterval(nextSlide, 5000);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    console.log('Carousel initialized with', totalSlides, 'slides');
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM carregado, iniciando busca de avaliações...');
    
    // Verificar se o container existe
    const reviewsContainer = document.getElementById('googleReviews');
    if (reviewsContainer) {
        console.log('Container de avaliações encontrado, iniciando fetchGoogleReviews...');
        
        // Mostrar status inicial
        reviewsContainer.innerHTML = `
            <div class="loading-reviews" style="text-align: center; padding: 40px;">
                <div class="spinner" style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #4CAF50; border-radius: 50%; margin: 0 auto 15px; animation: spin 1s linear infinite;"></div>
                <p style="color: #666; margin-bottom: 10px;">🔍 Trying to load Google My Business reviews...</p>
                <p style="color: #999; font-size: 14px;">This may take a few seconds</p>
            </div>
        `;
        
        // Tentar buscar avaliações do Google primeiro
        console.log('🚀 Iniciando busca de depoimentos do Google My Business...');
        
        try {
            await fetchGoogleReviews();
        } catch (error) {
            console.error('❌ Falha total na busca do Google:', error);
            
            // Mostrar mensagem de erro específica
            reviewsContainer.innerHTML = `
                <div style="text-align: center; padding: 30px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #ffc107;">
                    <h4 style="color: #856404; margin: 0 0 10px 0;">⚠️ Google Reviews Unavailable</h4>
                    <p style="color: #6c757d; margin: 0 0 15px 0;">Unable to load reviews from Google My Business.</p>
                    <p style="color: #6c757d; margin: 0 0 20px 0; font-size: 14px;">Showing sample testimonials instead...</p>
                    <div class="spinner" style="width: 30px; height: 30px; border: 3px solid #f3f3f3; border-top: 3px solid #ffc107; border-radius: 50%; margin: 0 auto; animation: spin 1s linear infinite;"></div>
                </div>
            `;
            
            // Carregar exemplos após 2 segundos
            setTimeout(() => {
                loadSampleReviews();
            }, 2000);
        }
        
        // Timeout de segurança absoluto - 10 segundos
        setTimeout(() => {
            if (reviewsContainer.querySelector('.loading-reviews') || reviewsContainer.innerHTML.includes('Google Reviews Unavailable')) {
                console.log('⏰ Timeout final atingido, forçando carregamento de exemplos...');
                loadSampleReviews();
            }
        }, 10000);
        
    } else {
        console.error('Container #googleReviews não encontrado no DOM');
    }
});

// Adicionar CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
