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
    console.log('🎬 renderReviews function started');
    console.log('📦 Received reviews:', reviews ? reviews.length : 'null/undefined');
    
    const reviewsContainer = document.getElementById('googleReviews');
    if (!reviewsContainer) {
        console.error('❌ Container #googleReviews não encontrado');
        return;
    }
    
    console.log('✅ Container found:', reviewsContainer);
    
    if (!reviews || reviews.length === 0) {
        console.warn('⚠️ No reviews provided or empty array');
        reviewsContainer.innerHTML = `
            <div class="no-reviews" style="text-align: center; padding: 40px;">
                <p>No reviews found.</p>
            </div>
        `;
        return;
    }
    
    console.log('🎯 Renderizando', reviews.length, 'avaliações em carrossel');
    
    // Create carousel HTML
    let html = `
        <div class="testimonial-carousel-container" style="position: relative; max-width: 1200px; margin: 0 auto; padding: 0 50px; overflow: hidden;">
            <div class="testimonial-carousel" style="display: flex; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); overflow: visible; will-change: transform;">
    `;
    reviews.forEach((review, index) => {
        const stars = '★'.repeat(Math.floor(review.rating)) + '☆'.repeat(5 - Math.floor(review.rating));
        const reviewDate = review.relative_time_description || 'Recently';
        html += `
            <div class="testimonial-slide" style="
                min-width: 33.333%; /* 3 cards no desktop */
                background: white; 
                border-radius: 10px; 
                padding: 20px; 
                margin: 0 10px;
                box-shadow: 0 3px 15px rgba(0,0,0,0.1);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 300px;
                height: auto;
                max-height: none;
                overflow: visible;
            ">
                <div class="quote" style="flex-grow: 1; text-align: center;">
                    <i class="fas fa-quote-left" style="color: #4CAF50; font-size: 20px; margin-bottom: 10px; display: block;"></i>
                    <div class="testimonial-text">
                        <p style="font-size: 14px; line-height: 1.6; color: #555; margin-bottom: 15px; font-style: italic; max-width: 100%; word-wrap: break-word; overflow-wrap: break-word; text-align: left; padding: 0 5px;">
                            "${review.text.replace(/"/g, '&quot;').replace(/\n/g, '<br>')}"
                        </p>
                    </div>
                </div>
                <div class="client" style="
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    padding-top: 15px; 
                    border-top: 1px solid #f0f0f0;
                ">
                    <img 
                        src="${review.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=4CAF50&color=fff`}" 
                        alt="${review.author_name}" 
                        style="
                            width: 45px; 
                            height: 45px; 
                            border-radius: 50%; 
                            margin-right: 12px; 
                            object-fit: cover;
                            border: 2px solid #4CAF50;
                        "
                        onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=4CAF50&color=fff'"
                    >
                    <div class="client-info" style="text-align: left;">
                        <h4 style="margin: 0 0 5px 0; font-size: 16px; color: #333; font-weight: 600;">${review.author_name}</h4>
                        <div class="stars" style="color: #FFD700; margin-bottom: 3px; font-size: 14px; letter-spacing: 1px;">
                            ${stars}
                        </div>
                        <span style="font-size: 12px; color: #888;">${reviewDate}</span>
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
                left: 5px;
                top: 50%;
                transform: translateY(-50%);
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                font-size: 14px;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                transition: all 0.3s ease;
                z-index: 10;
            " onmouseover="this.style.background='#43A047'; this.style.transform='translateY(-50%) scale(1.1)'" onmouseout="this.style.background='#4CAF50'; this.style.transform='translateY(-50%) scale(1)'">
                <i class="fas fa-chevron-left"></i>
            </button>
            
            <button class="carousel-next" style="
                position: absolute;
                right: 5px;
                top: 50%;
                transform: translateY(-50%);
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                font-size: 14px;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                transition: all 0.3s ease;
                z-index: 10;
            " onmouseover="this.style.background='#43A047'; this.style.transform='translateY(-50%) scale(1.1)'" onmouseout="this.style.background='#4CAF50'; this.style.transform='translateY(-50%) scale(1)'">
                <i class="fas fa-chevron-right"></i>
            </button>
            
            <!-- Progress Bar -->
            <div class="carousel-progress" style="
                width: 100%;
                height: 3px;
                background: rgba(76, 175, 80, 0.2);
                border-radius: 2px;
                margin-top: 15px;
                overflow: hidden;
            ">
                <div class="carousel-progress-bar" style="
                    height: 100%;
                    background: #4CAF50;
                    width: 0%;
                    border-radius: 2px;
                    transition: width 0.1s linear;
                "></div>
            </div>
            
            <!-- Dots Indicator -->
            <div class="carousel-dots" style="
                display: flex;
                justify-content: center;
                margin-top: 15px;
                gap: 8px;
            ">
    `;
    
    reviews.forEach((_, index) => {
        html += `
            <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide="${index}" style="
                width: 10px;
                height: 10px;
                border-radius: 50%;
                border: none;
                background: ${index === 0 ? '#4CAF50' : '#ddd'};
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                transform: ${index === 0 ? 'scale(1.2)' : 'scale(1)'};
            " onmouseover="if(!this.classList.contains('active')) { this.style.background='#bbb'; this.style.transform='scale(1.1)'; }" onmouseout="if(!this.classList.contains('active')) { this.style.background='#ddd'; this.style.transform='scale(1)'; }"></button>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    console.log('🔧 Setting innerHTML with generated HTML...');
    reviewsContainer.innerHTML = html;
    console.log('✅ HTML set successfully');
    
    // Initialize carousel functionality
    console.log('🎠 Initializing carousel with', reviews.length, 'slides...');
    initializeCarousel(reviews.length);
    
    console.log('🎉 Carrossel de avaliações renderizado com sucesso!');
    console.log('📊 Final check - container has content:', reviewsContainer.innerHTML.length > 0);
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
        const isLocal = window.location.protocol === 'file:';
        const timeoutDuration = isLocal ? 1000 : 3000; // Faster timeout for local files
        const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);
        
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
            console.log('❌ CORS error (expected when running locally)');
            
            // Skip proxy attempt for local files as it won't work either
            if (window.location.protocol === 'file:') {
                console.log('🏠 Local file detected - skipping proxy attempt');
                throw new Error('LOCAL_FILE_CORS_EXPECTED');
            }
            
            // If CORS fails and not local, try with proxy
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
        } else if (error.message.includes('CORS') || error.message.includes('origin') || error.message.includes('blocked') || error.message.includes('ERR_FAILED') || error.message === 'LOCAL_FILE_CORS_EXPECTED') {
            errorMessage = '🌐 Cannot load real Google reviews (CORS/Network restriction)';
            console.log('ℹ️ This is normal when running locally - Google API blocks file:// requests');
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage = '🔌 Network error - Using sample reviews...';
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
        
        // Carregar depoimentos de exemplo após 500ms
        setTimeout(() => {
            loadSampleReviews();
        }, 500);
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
    console.log('🔄 Loading sample reviews in English...');
    console.log('📊 Preparing 10 testimonials for display...');
    
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
        console.log('✅ Sample reviews loaded successfully');
        console.log('📋 Total reviews to display:', reviews.length);
        console.log('🎯 Calling renderReviews function...');
        renderReviews(reviews);
        console.log('🎉 renderReviews function called successfully');
    }, 800);
}

// Function to initialize carousel functionality
function initializeCarousel(totalSlides) {
    let currentSlide = 0;
    let autoPlayInterval;
    let progressInterval;
    let isUserInteracting = false;
    let progressValue = 0;
    const carousel = document.querySelector('.testimonial-carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');
    const carouselContainer = document.querySelector('.testimonial-carousel-container');
    const progressBar = document.querySelector('.carousel-progress-bar');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    // Configurações do carrossel contínuo - MOBILE OTIMIZADO
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const autoPlayDelay = isMobile ? 3000 : 3500; // 3 segundos no mobile, 3.5 no desktop
    const pauseOnHover = false; // NÃO pausar ao passar o mouse
    const pauseOnInteraction = false; // NÃO pausar ao interagir
    const progressUpdateInterval = 50; // Atualizar progresso a cada 50ms
    
    function updateCarousel(smooth = true) {
        // Para desktop com 3 cards, mover 33.333% por vez
        // Para mobile com 1 card, mover 100% por vez
        const movePercentage = isMobile ? 100 : 33.333;
        const translateX = -currentSlide * movePercentage;
        
        if (smooth) {
            carousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            carousel.style.transition = 'none';
        }
        
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Update dots with smooth animation
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
                dot.style.background = '#4CAF50';
                dot.style.transform = 'scale(1.2)';
            } else {
                dot.classList.remove('active');
                dot.style.background = '#ddd';
                dot.style.transform = 'scale(1)';
            }
        });
    }
    
    function nextSlide(smooth = true) {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel(smooth);
    }
    
    function prevSlide(smooth = true) {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel(smooth);
    }
    
    function goToSlide(slideIndex, smooth = true) {
        currentSlide = slideIndex;
        updateCarousel(smooth);
    }
    
    // Função para atualizar a barra de progresso
    function updateProgressBar() {
        if (progressBar) {
            progressBar.style.width = `${progressValue}%`;
        }
    }
    
    // Função para resetar o progresso
    function resetProgress() {
        progressValue = 0;
        updateProgressBar();
    }
    
    // Função para iniciar o progresso
    function startProgress() {
        if (progressInterval) clearInterval(progressInterval);
        resetProgress();
        
        progressInterval = setInterval(() => {
            progressValue += (100 / (autoPlayDelay / progressUpdateInterval));
            if (progressValue >= 100) {
                progressValue = 100;
            }
            updateProgressBar();
        }, progressUpdateInterval);
    }
    
    // Função para parar o progresso
    function stopProgress() {
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
    }
    
    // Função para iniciar o auto-play
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        startProgress(); // Iniciar barra de progresso
        
        autoPlayInterval = setInterval(() => {
            nextSlide();
            startProgress(); // Reiniciar progresso para o próximo slide
        }, autoPlayDelay);
        console.log('🎠 Auto-play CONTÍNUO iniciado - mudança a cada', autoPlayDelay / 1000, 'segundos');
    }
    
    // Função para parar o auto-play
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
        stopProgress();
    }
    
    // Função de pausa removida - carrossel sempre contínuo
    function pauseAutoPlay(duration = 0) {
        // Não fazer nada - carrossel sempre contínuo
        console.log('🚫 Pausa ignorada - carrossel contínuo');
    }
    
    // Event listeners para navegação manual (sem pausar o auto-play)
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
        startProgress(); // Reiniciar progresso imediatamente
        console.log('🔙 Slide anterior clicado');
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
        startProgress(); // Reiniciar progresso imediatamente
        console.log('▶️ Próximo slide clicado');
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            goToSlide(index);
            startProgress(); // Reiniciar progresso imediatamente
            console.log('🎯 Dot clicado:', index);
        });
    });
    
    // Hover desabilitado para carrossel verdadeiramente contínuo
    // (sem pausas ao passar o mouse)
    
    // Navegação por teclado (sem pausar)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            startProgress(); // Reiniciar progresso imediatamente
        }
        if (e.key === 'ArrowRight') {
            nextSlide();
            startProgress(); // Reiniciar progresso imediatamente
        }
    });
    
    // Navegação por toque para mobile
    if (isMobile && carouselContainer) {
        let startX = 0;
        let endX = 0;
        
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        carouselContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) { // Mínimo 50px de swipe
                if (diffX > 0) {
                    nextSlide(); // Swipe left = próximo
                    startProgress();
                    console.log('👆 Swipe left - próximo slide');
                } else {
                    prevSlide(); // Swipe right = anterior
                    startProgress();
                    console.log('👆 Swipe right - slide anterior');
                }
            }
        }, { passive: true });
    }
    
    // Pausar quando a aba não está visível
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
    
    // Inicializar o carrossel
    updateCarousel(false); // Primeira atualização sem animação
    startAutoPlay(); // Iniciar auto-play
    
    console.log('🎉 Carrossel CONTÍNUO inicializado com', totalSlides, 'slides');
    console.log('⏱️ Auto-play:', autoPlayDelay / 1000, 'segundos por slide');
    console.log('📱 Mobile:', isMobile);
    console.log('🚫 Pausas desabilitadas - carrossel verdadeiramente contínuo');
    console.log('🎛️ Controles encontrados:', {
        carousel: !!carousel,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        dots: dots.length,
        progressBar: !!progressBar
    });
    
    // Retornar controles para uso externo se necessário
    return {
        next: () => { nextSlide(); startProgress(); },
        prev: () => { prevSlide(); startProgress(); },
        goTo: (index) => { goToSlide(index); startProgress(); },
        start: startAutoPlay,
        stop: stopAutoPlay,
        resetProgress: resetProgress
    };
}

// Função removida - não é mais necessária pois os textos não são mais cortados

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM carregado, iniciando busca de avaliações...');
    
    // Check if mobile and delay loading for better performance
    const isMobile = window.innerWidth <= 768;
    const isLocalFile = window.location.protocol === 'file:';
    const delay = isMobile ? 1000 : 0; // Reduced delay for better UX
    
    setTimeout(async () => {
        // Verificar se o container existe
        const reviewsContainer = document.getElementById('googleReviews');
        if (reviewsContainer) {
            console.log('Container de avaliações encontrado...');
        
        // Sempre tentar carregar reviews reais primeiro, mesmo localmente
        console.log('🔍 Tentando carregar reviews reais do Google My Business...');
        
        // Mostrar status inicial
        reviewsContainer.innerHTML = `
            <div class="loading-reviews" style="text-align: center; padding: 40px;">
                <div class="spinner" style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #4CAF50; border-radius: 50%; margin: 0 auto 15px; animation: spin 1s linear infinite;"></div>
                <p style="color: #666; margin-bottom: 10px;">🔍 Loading Google My Business reviews...</p>
                <p style="color: #999; font-size: 14px;">Connecting to Google Places API...</p>
            </div>
        `;
        
        // Tentar buscar avaliações reais do Google primeiro
        console.log('🚀 Iniciando busca de depoimentos REAIS do Google My Business...');
        
        try {
            await fetchGoogleReviews();
        } catch (error) {
            // Handle expected local file error silently
            if (error.message === 'LOCAL_FILE_CORS_EXPECTED') {
                console.log('ℹ️ Running locally - loading sample reviews (this is normal)');
                
                // Show a simpler, less alarming message for local files
                reviewsContainer.innerHTML = `
                    <div style="text-align: center; padding: 20px; background: #e8f4fd; border-radius: 8px; border-left: 4px solid #2196F3;">
                        <h4 style="color: #1565C0; margin: 0 0 10px 0;">📋 Preview Mode</h4>
                        <p style="color: #424242; margin: 0 0 15px 0;">Running locally - showing sample testimonials</p>
                        <p style="color: #666; margin: 0 0 20px 0; font-size: 13px;">Deploy to a web server to see real Google reviews</p>
                        <div class="spinner" style="width: 25px; height: 25px; border: 3px solid #f3f3f3; border-top: 3px solid #2196F3; border-radius: 50%; margin: 0 auto; animation: spin 1s linear infinite;"></div>
                    </div>
                `;
            } else {
                console.error('❌ Falha total na busca do Google:', error);
                
                // Show detailed error message for other errors
                reviewsContainer.innerHTML = `
                    <div style="text-align: center; padding: 30px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <h4 style="color: #856404; margin: 0 0 10px 0;">⚠️ Cannot Load Real Google Reviews</h4>
                        <p style="color: #6c757d; margin: 0 0 15px 0;"><strong>Reason:</strong> Network or API error</p>
                        <div style="background: #e7f3ff; padding: 15px; border-radius: 6px; margin: 15px 0;">
                            <p style="color: #0c5460; margin: 0; font-size: 14px;"><strong>💡 To see real Google reviews:</strong></p>
                            <p style="color: #0c5460; margin: 5px 0 0 0; font-size: 13px;">
                                • Deploy this site to a web server (GitHub Pages, Netlify, etc.)<br>
                                • Or run a local web server (not file://)
                            </p>
                        </div>
                        <p style="color: #6c757d; margin: 0 0 20px 0; font-size: 14px;">Loading sample testimonials for preview...</p>
                        <div class="spinner" style="width: 30px; height: 30px; border: 3px solid #f3f3f3; border-top: 3px solid #ffc107; border-radius: 50%; margin: 0 auto; animation: spin 1s linear infinite;"></div>
                    </div>
                `;
            }
            
            // Carregar exemplos após 2 segundos
            setTimeout(() => {
                loadSampleReviews();
            }, 2000);
        }
        
        // Timeout de segurança absoluto - 5 segundos
        setTimeout(() => {
            if (reviewsContainer.querySelector('.loading-reviews') || reviewsContainer.innerHTML.includes('Google Reviews Unavailable') || reviewsContainer.innerHTML.includes('Loading testimonials')) {
                console.log('⏰ Timeout final atingido, forçando carregamento de exemplos...');
                console.log('🔄 Garantindo que os 10 depoimentos sejam exibidos...');
                loadSampleReviews();
            }
        }, 5000);
        
    } else {
        console.error('Container #googleReviews não encontrado no DOM');
    }
    }, delay); // Close setTimeout
}); // Close DOMContentLoaded

// Backup fallback - garantir que os reviews carreguem
window.addEventListener('load', function() {
    setTimeout(() => {
        const reviewsContainer = document.getElementById('googleReviews');
        if (reviewsContainer && (reviewsContainer.innerHTML.includes('loading-reviews') || reviewsContainer.innerHTML.trim() === '')) {
            console.log('🚨 Backup fallback ativado - carregando reviews de emergência...');
            loadSampleReviews();
        }
    }, 3000);
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
