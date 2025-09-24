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
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to render reviews
function renderReviews(reviews) {
    const reviewsContainer = document.getElementById('googleReviews');
    if (!reviewsContainer) return;
    
    if (!reviews || reviews.length === 0) {
        reviewsContainer.innerHTML = `
            <div class="no-reviews" style="text-align: center; padding: 40px;">
                <p>Nenhum depoimento encontrado.</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="testimonial-track" style="display: flex; transition: transform 0.3s ease;">
    `;
    
    reviews.forEach((review, index) => {
        const isActive = index === 0 ? 'active' : '';
        const stars = createStarRating(review.rating);
        const reviewDate = formatReviewDate(review.time);
        
        html += `
            <div class="testimonial ${isActive}" style="min-width: 100%; padding: 20px; box-sizing: border-box;">
                <div class="google-review">
                    <div class="review-header">
                        <div>
                            <h4 class="review-author">${review.author_name}</h4>
                            ${stars}
                            <div class="review-date">${reviewDate}</div>
                        </div>
                    </div>
                    <p class="review-text">${review.text}</p>
                </div>
            </div>
        `;
    });
    
    html += `
        </div>
        <div class="testimonial-dots" style="text-align: center; margin-top: 20px;">
            ${reviews.map((_, i) => 
                `<span class="testimonial-dot ${i === 0 ? 'active' : ''}" 
                      data-index="${i}" 
                      style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: #ddd; margin: 0 5px; cursor: pointer;"></span>`
            ).join('')}
        </div>
    `;
    
    reviewsContainer.innerHTML = html;
    
    // Initialize carousel
    initTestimonialCarousel();
}

// Initialize testimonial carousel
function initTestimonialCarousel() {
    const track = document.querySelector('.testimonial-track');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentIndex = 0;
    
    if (!track) return;
    
    // Update slide position
    function updateSlide() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.style.background = '#4CAF50';
            } else {
                dot.style.background = '#ddd';
            }
        });
    }
    
    // Dot click event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlide();
        });
    });
    
    // Auto-rotate slides
    setInterval(() => {
        currentIndex = (currentIndex + 1) % dots.length;
        updateSlide();
    }, 5000);
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
            <p style="color: #666;">Carregando depoimentos...</p>
        </div>
    `;

    try {
        // Google Places API credentials
        const apiKey = 'AIzaSyBdMFOSAlHPljt54uGAvyFRh2cIxH_lZ8g';
        const placeId = 'ChIJVTLH0y7uVUERjS7dceLoJhM';
        
        console.log('Fetching reviews for Place ID:', placeId);
        
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
        
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?` +
            `place_id=${encodeURIComponent(placeId)}` +
            `&fields=${encodeURIComponent(fields)}` +
            `&reviews_sort=newest` +
            `&key=${apiKey}`;
        const url = proxyUrl + apiUrl;
        
        console.log('URL da API com proxy:', url);
        
        // Fazer a requisição para a API do Google Places com timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos de timeout
        
        console.log('Fetching from URL:', url);
        
        const response = await fetch(url, { 
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache'
        });
        
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
            
            // Log detalhado do resultado
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
                
                // Verificar se há avaliações totais, mas nenhuma retornada
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
            
            // Mapear os dados da API para o formato esperado
            const reviews = data.result.reviews.map((review, index) => ({
                id: review.author_url ? review.author_url.split('/').pop() || `review-${index}` : `review-${index}`,
                author_name: review.author_name || 'Cliente Anônimo',
                rating: review.rating || 5,
                text: review.text ? review.text.replace(/\n/g, '<br>') : 'Sem texto disponível.',
                relative_time_description: review.relative_time_description || 'Recentemente',
                profile_photo_url: review.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name || 'U')}&background=4CAF50&color=fff`,
                time: review.time || Date.now(),
                language: review.language || 'pt-BR',
                author_url: review.author_url || `https://www.google.com/maps/contrib/${review.author_url ? review.author_url.split('/').pop() : ''}`
            }));
            
            // Ordenar por data (mais recentes primeiro)
            reviews.sort((a, b) => b.time - a.time);
            
            // Renderizar os depoimentos
            renderReviews(reviews);
            
            // Inicializar o carrossel após um pequeno atraso
            setTimeout(() => {
                if (typeof initTestimonialSlider === 'function') {
                    initTestimonialSlider();
                } else if (typeof $ !== 'undefined' && typeof $.fn.slick === 'function') {
                    // Se estiver usando Slick Carousel
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
            
            return; // Importante para sair da função após o processamento
            
        } else {
            throw new Error(data.error_message || 'Não foi possível carregar os depoimentos. Status: ' + data.status);
        }
    } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
        
        // Mensagens de erro mais detalhadas
        let errorMessage = 'Erro ao carregar avaliações. ';
        
        if (error.name === 'AbortError') {
            errorMessage = 'Tempo limite excedido ao carregar avaliações. Verifique sua conexão e tente novamente.';
            console.warn('A requisição foi cancelada por timeout');
        } else if (error.message.includes('API key not valid')) {
            errorMessage = 'Chave de API inválida. Por favor, verifique as configurações.';
            console.error('Erro de autenticação: Chave de API inválida ou expirada');
        } else if (error.message.includes('quota')) {
            errorMessage = 'Limite de cota da API excedido. Por favor, tente novamente mais tarde.';
            console.error('Erro de cota da API excedida');
        } else if (error.message.includes('PERMISSAO_NEGADA')) {
            errorMessage = 'Permissão negada: A chave de API não tem acesso à API do Google Places.';
            console.error('Erro de permissão:', error.message);
            
            // Adicionar instruções detalhadas no console
            console.error('\n=== COMO RESOLVER O ERRO DE PERMISSÃO ===');
            console.error('1. Acesse o Google Cloud Console: https://console.cloud.google.com/');
            console.error('2. Selecione seu projeto');
            console.error('3. Vá em "APIs e Serviços" > "Biblioteca"');
            console.error('4. Pesquise por "Places API" e clique em "Ativar"');
            console.error('5. Aguarde alguns minutos e tente novamente\n');
            
        } else if (error.message.includes('403') || error.message.includes('CORS') || error.message.includes('origin')) {
            errorMessage = 'Não foi possível carregar as avaliações no momento. Exibindo avaliações de exemplo...';
            console.error('Erro de CORS ou permissão negada:', error.message);
        } else if (error.message.includes('invalid json')) {
            errorMessage = 'Resposta inválida do servidor. Exibindo avaliações de exemplo...';
            console.error('Resposta inválida do servidor:', error.message);
        }
        
        showErrorMessage(errorMessage);
        
        // Carregar depoimentos de exemplo após um curto atraso
        setTimeout(() => {
            console.log('Carregando depoimentos de exemplo...');
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
            <p><small>Se o problema persistir, entre em contato com o suporte.</small></p>
        </div>
    `;
}

// Função para renderizar as avaliações
// Função para renderizar os depoimentos
function renderReviews(reviews) {
    const reviewsContainer = document.getElementById('googleReviews');
    if (!reviewsContainer) return;
    
    if (!reviews || reviews.length === 0) {
        showNoReviewsMessage('');
        return;
    }
    
    // Limitar a 5 depoimentos
    const limitedReviews = reviews.slice(0, 5);
    
    let html = '<div class="testimonial-slider" style="max-width: 100%;">';
    
    limitedReviews.forEach((review) => {
        const stars = '★'.repeat(Math.floor(review.rating)) + '☆'.repeat(5 - Math.floor(review.rating));
        
        html += `
            <div class="testimonial" style="
                background: white; 
                border-radius: 12px; 
                padding: 25px; 
                margin: 10px; 
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                height: 100%;
                display: flex;
                flex-direction: column;
            ">
                <div class="quote" style="flex-grow: 1;">
                    <i class="fas fa-quote-left" style="color: #4CAF50; font-size: 24px; margin-bottom: 15px; display: block;"></i>
                    <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 20px; min-height: 100px;">
                        "${review.text.replace(/"/g, '&quot;')}"
                    </p>
                </div>
                <div class="client" style="
                    display: flex; 
                    align-items: center; 
                    margin-top: auto; 
                    padding-top: 15px; 
                    border-top: 1px solid #eee;
                ">
                    <img 
                        src="${review.profile_photo_url}" 
                        alt="${review.author_name}" 
                        style="
                            width: 50px; 
                            height: 50px; 
                            border-radius: 50%; 
                            margin-right: 15px; 
                            object-fit: cover;
                            border: 2px solid #4CAF50;
                        "
                        onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=4CAF50&color=fff'"
                    >
                    <div class="client-info">
                        <h4 style="margin: 0 0 5px 0; font-size: 18px; color: #333;">${review.author_name}</h4>
                        <div class="stars" style="color: #FFD700; margin-bottom: 5px; font-size: 14px; letter-spacing: 2px;">
                            ${stars}
                        </div>
                        <span style="font-size: 13px; color: #888;">${review.relative_time_description}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    reviewsContainer.innerHTML = html;
    
    // Adicionar estilos CSS inline para o carrossel
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .slick-slide { padding: 0 10px; }
        .slick-dots { position: static; margin-top: 20px; }
        .slick-dots li button:before { font-size: 12px; }
        .slick-prev:before, .slick-next:before { color: #4CAF50; }
    `;
    document.head.appendChild(style);
}

// Função para carregar depoimentos de exemplo (fallback)
function loadSampleReviews() {
    console.log('Carregando depoimentos de exemplo...');
    
    const reviews = [
        {
            id: 'sample-1',
            author_name: 'Maria Silva',
            rating: 5,
            text: 'Excelente serviço! Minha casa nunca esteve tão limpa. A equipe é muito profissional e atenciosa. Recomendo muito!',
            relative_time_description: 'Há 1 semana',
            profile_photo_url: 'https://randomuser.me/api/portraits/women/44.jpg',
            author_url: 'https://www.google.com/maps/contrib/123456789',
            language: 'pt-BR'
        },
        {
            id: 'sample-2',
            author_name: 'João Santos',
            rating: 5,
            text: 'Contratei para limpar meu escritório e fiquei impressionado com a qualidade do serviço. Pontualidade e comprometimento com a limpeza. Recomendo!',
            relative_time_description: 'Há 2 semanas',
            profile_photo_url: 'https://randomuser.me/api/portraits/men/32.jpg',
            author_url: 'https://www.google.com/maps/contrib/987654321',
            language: 'pt-BR'
        },
        {
            id: 'sample-3',
            author_name: 'Ana Oliveira',
            rating: 4,
            text: 'Ótimo atendimento e limpeza impecável. A equipe foi muito cuidadosa com meus móveis e objetos pessoais. Voltarei a contratar com certeza!',
            relative_time_description: 'Há 3 semanas',
            profile_photo_url: 'https://randomuser.me/api/portraits/women/68.jpg',
            author_url: 'https://www.google.com/maps/contrib/456789123',
            language: 'pt-BR'
        },
        {
            id: 'sample-4',
            author_name: 'Carlos Eduardo',
            rating: 5,
            text: 'Serviço de primeira! Contratei para a limpeza pós-obra e ficou perfeito. A equipe foi muito profissional e caprichosa em todos os detalhes.',
            relative_time_description: 'Há 1 mês',
            profile_photo_url: 'https://randomuser.me/api/portraits/men/45.jpg',
            author_url: 'https://www.google.com/maps/contrib/321654987',
            language: 'pt-BR'
        },
        {
            id: 'sample-5',
            author_name: 'Fernanda Costa',
            rating: 5,
            text: 'Melhor serviço de limpeza que já contratei! A casa fica impecável, com cheirinho de limpo. A equipe é muito educada e atenciosa. Super recomendo!',
            relative_time_description: 'Há 2 meses',
            profile_photo_url: 'https://randomuser.me/api/portraits/women/22.jpg',
            author_url: 'https://www.google.com/maps/contrib/789456123',
            language: 'pt-BR'
        }
    ];
    
    // Simular um pequeno atraso para parecer uma requisição real
    setTimeout(() => {
        console.log('Depoimentos de exemplo carregados com sucesso');
        renderReviews(reviews);
    }, 800);
}

// Função para mostrar mensagem de erro
function showErrorMessage(message) {
    const reviewsContainer = document.getElementById('googleReviews');
    if (!reviewsContainer) return;
    
    reviewsContainer.innerHTML = `
        <div class="error-message" style="
            text-align: center; 
            padding: 30px; 
            background-color: #ffebee; 
            border-left: 4px solid #f44336;
            border-radius: 4px;
            margin: 20px 0;
        ">
            <i class="fas fa-exclamation-triangle" style="color: #f44336; font-size: 24px; margin-bottom: 15px; display: block;"></i>
            <h3 style="color: #d32f2f; margin: 0 0 10px 0;">Erro ao carregar avaliações</h3>
            <p style="color: #5f2120; margin: 0 0 15px 0;">${message}</p>
            <button onclick="fetchGoogleReviews()" style="
                background: #4CAF50;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: background 0.3s;
            ">
                <i class="fas fa-sync-alt"></i> Tentar novamente
            </button>
        </div>
    `;
    
    // Carregar depoimentos de exemplo após 3 segundos
    setTimeout(loadSampleReviews, 3000);
}

// Adicionar estilos CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .google-review {
        background: white;
        border-radius: 10px;
        padding: 25px;
        margin: 15px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .google-review:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }
    
    .review-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    
    .review-author {
        font-weight: 600;
        color: #333;
        margin: 0;
    }
    
    .review-rating {
        color: #FFC107;
        margin: 5px 0;
        font-size: 18px;
    }
    
    .review-date {
        color: #888;
        font-size: 14px;
        margin-top: 5px;
    }
    
    .review-text {
        color: #555;
        line-height: 1.6;
        font-style: italic;
    }
`;
document.head.appendChild(style);

// Load sample reviews if API fails
function loadSampleReviews() {
    const sampleReviews = [
        {
            author_name: 'Cliente Satisfeito',
            rating: 5,
            text: 'Excelente serviço de limpeza! Minha casa nunca esteve tão limpa. A equipe é muito profissional e atenciosa.',
            time: Math.floor(Date.now() / 1000) - 86400 // 1 day ago
        },
        {
            author_name: 'Maria Silva',
            rating: 5,
            text: 'Serviço impecável! Recomendo a todos que buscam qualidade e comprometimento.',
            time: Math.floor(Date.now() / 1000) - 172800 // 2 days ago
        },
        {
            author_name: 'João Santos',
            rating: 5,
            text: 'Profissionais muito competentes e educados. Minha casa ficou brilhando!',
            time: Math.floor(Date.now() / 1000) - 259200 // 3 days ago
        }
    ];
    
    renderReviews(sampleReviews);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const reviewsContainer = document.getElementById('googleReviews');
    
    if (reviewsContainer) {
        // First try to fetch real reviews
        fetchGoogleReviews().catch(error => {
            console.error('Error fetching Google reviews:', error);
            // If there's an error, show sample reviews
            loadSampleReviews();
        });
        
        // If loading takes too long, show a message
        const loadingTimeout = setTimeout(() => {
            if (reviewsContainer.querySelector('.loading-reviews')) {
                console.log('Still loading reviews...');
            }
        }, 5000);
        
        // Clean up timeout when component unmounts
        return () => {
            clearTimeout(loadingTimeout);
        };
    }
});

// Adicionar estilos CSS para o carregamento
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    @keyframes spin {
{{ ... }}
        100% { transform: rotate(360deg); }
    }
    
    .loading-reviews {
        text-align: center;
        padding: 40px;
        font-size: 16px;
        color: #666;
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #4CAF50;
        border-radius: 50%;
        margin: 0 auto 15px;
        animation: spin 1s linear infinite;
    }
    
    .no-reviews {
        text-align: center;
        padding: 30px;
        background: #f8f9fa;
        border-radius: 8px;
        margin: 20px 0;
    }
    
    .no-reviews i {
        font-size: 40px;
        color: #6c757d;
        margin-bottom: 15px;
        display: block;
    }
`;
document.head.appendChild(loadingStyles);
