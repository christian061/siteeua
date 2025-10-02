// Função para zoom mobile (touch)
function setupMobileZoom() {
    console.log('🔧 Configurando zoom mobile...');
    
    // Configurações iniciais
    const modal = document.getElementById('certificateModal');
    if (!modal) {
        console.error('Modal de certificado não encontrado');
        return;
    }
    
    const container = modal.querySelector('.carousel-container');
    const slides = modal.querySelectorAll('.carousel-slide');
    
    // Variáveis de estado
    let touchStartDistance = 0;
    let touchStartZoom = 1;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTranslateX = 0;
    let touchStartTranslateY = 0;
    let lastTap = 0;
    let isModalOpen = false;
    let isDragging = false;
    
    // Função auxiliar para obter o estado do zoom
    function getZoomState(img) {
        if (!img._zoomState) {
            img._zoomState = {
                zoomLevel: 1,
                translateX: 0,
                translateY: 0
            };
        }
        return img._zoomState;
    }
    
    // Garante que os eventos de toque não sejam bloqueados
    modal.style.touchAction = 'pan-x pan-y';
    if (container) {
        container.style.touchAction = 'pan-x pan-y';
    }
    
    // Configura os estilos iniciais dos slides
    slides.forEach(slide => {
        slide.style.touchAction = 'pan-x pan-y';
        const img = slide.querySelector('img');
        if (img) {
            img.style.touchAction = 'pan-x pan-y';
            img.style.webkitUserSelect = 'auto';
            img.style.userSelect = 'auto';
        }
    });
    
    // Adiciona estilos para melhorar a experiência de toque
    const style = document.createElement('style');
    style.textContent = `
        #certificateModal * {
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            -webkit-touch-callout: none;
        }
        #certificateModal img {
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-drag: none;
            touch-action: pan-x pan-y;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
        }
        #certificateModal .carousel-slide {
            touch-action: pan-x pan-y;
        }
        #certificateModal .carousel-container {
            overflow: auto;
            -webkit-overflow-scrolling: touch;
        }
        #certificateModal .carousel-slide.zoomed {
            cursor: move;
        }
    `;
    document.head.appendChild(style);
    
    // Função para aplicar o zoom
    function applyZoom(img, zoomLevel, x = null, y = null) {
        const state = getZoomState(img);
        state.zoomLevel = zoomLevel;
        
        if (x !== null && y !== null) {
            const rect = img.getBoundingClientRect();
            const imgCenterX = rect.width / 2;
            const imgCenterY = rect.height / 2;
            
            state.translateX = (imgCenterX - x) * (zoomLevel - 1) / zoomLevel;
            state.translateY = (imgCenterY - y) * (zoomLevel - 1) / zoomLevel;
            
            // Limitar o deslocamento
            const containerRect = img.parentElement.getBoundingClientRect();
            const maxTranslateX = Math.max(0, (rect.width * zoomLevel - containerRect.width) / 2);
            const maxTranslateY = Math.max(0, (rect.height * zoomLevel - containerRect.height) / 2);
            
            state.translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, state.translateX));
            state.translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, state.translateY));
        } else if (zoomLevel === 1) {
            state.translateX = 0;
            state.translateY = 0;
        }
        
        img.style.transform = `scale(${zoomLevel}) translate(${state.translateX}px, ${state.translateY}px)`;
        
        // Atualiza o container para permitir rolagem quando necessário
        const container = img.closest('.carousel-container');
        if (container) {
            container.style.overflow = zoomLevel > 1 ? 'auto' : 'hidden';
        }
        
        // Adiciona/remove classe de zoom
        if (zoomLevel > 1) {
            img.classList.add('zoomed');
        } else {
            img.classList.remove('zoomed');
        }
    }
    
    // Função para lidar com duplo toque
    function handleDoubleTap(touch, img) {
        const state = getZoomState(img);
        
        if (state.zoomLevel > 1) {
            // Se já estiver com zoom, volta ao normal
            applyZoom(img, 1);
        } else {
            // Se estiver normal, faz zoom no ponto tocado
            const rect = img.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            applyZoom(img, 2.5, x, y);
        }
    }
    
    // Observar mudanças no modal para detectar quando abre/fecha
    const modalObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                isModalOpen = modal.style.display === 'flex' || modal.style.display === 'block';
                console.log('📱 Modal status:', isModalOpen ? 'ABERTO' : 'FECHADO');
                
                // Reseta o zoom quando o modal é fechado
                if (!isModalOpen) {
                    const activeImg = document.querySelector('.carousel-slide.active img');
                    if (activeImg) {
                        applyZoom(activeImg, 1);
                    }
                }
            }
        });
    });
    
    // Inicia a observação do modal
    modalObserver.observe(modal, { attributes: true });
    
    // Evento de toque inicial
    container.addEventListener('touchstart', function(e) {
        if (!isModalOpen) return;
        
        // Evita conflitos com rolagem da página
        e.stopPropagation();
        
        const activeImg = document.querySelector('.carousel-slide.active img');
        if (!activeImg) return;
        
        const state = getZoomState(activeImg);
        
        // Permite rolagem apenas se não estiver com zoom
        if (container) {
            container.style.overflow = state.zoomLevel <= 1 ? 'auto' : 'hidden';
        }
        
        if (e.touches.length === 2) {
            // Previne o comportamento padrão para permitir zoom
            e.preventDefault();
            
            // Configura o estado inicial do zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            touchStartDistance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            touchStartZoom = state.zoomLevel || 1;
            
            // Define a origem do zoom para o ponto médio entre os dedos
            const rect = activeImg.getBoundingClientRect();
            const midX = ((touch1.clientX + touch2.clientX) / 2) - rect.left;
            const midY = ((touch1.clientY + touch2.clientY) / 2) - rect.top;
            activeImg.style.transformOrigin = `${midX}px ${midY}px`;
            
            // Desativa transições durante o zoom
            activeImg.style.transition = 'none';
        } else if (e.touches.length === 1) {
            if (state.zoomLevel > 1) {
                // Single touch drag quando com zoom
                e.preventDefault();
                isDragging = true;
                const touch = e.touches[0];
                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
                touchStartTranslateX = state.translateX;
                touchStartTranslateY = state.translateY;
                activeImg.style.transition = 'none';
                activeImg.classList.add('zoomed');
            }
            
            // Detectar duplo toque
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 300 && tapLength > 0) {
                e.preventDefault();
                handleDoubleTap(e.touches[0], activeImg);
            }
            lastTap = currentTime;
        }
    }, { passive: false, capture: true });
    
    // Evento de movimento do toque
    container.addEventListener('touchmove', function(e) {
        if (!isModalOpen) return;
        
        const activeImg = document.querySelector('.carousel-slide.active img');
        if (!activeImg) return;
        
        const state = getZoomState(activeImg);
        
        if (e.touches.length === 2) {
            // Previne o comportamento padrão para permitir zoom
            e.preventDefault();
            
            // Calcula a distância atual entre os dedos
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const currentDistance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            
            // Se for o primeiro movimento, inicializa a distância
            if (touchStartDistance === 0) {
                touchStartDistance = currentDistance;
                touchStartZoom = state.zoomLevel || 1;
                return;
            }
            
            // Calcula o fator de zoom
            const scale = currentDistance / touchStartDistance;
            let newZoomLevel = Math.max(1, Math.min(5, touchStartZoom * scale));
            
            // Aplica o zoom
            applyZoom(activeImg, newZoomLevel);
            
        } else if (e.touches.length === 1 && isDragging && state.zoomLevel > 1) {
            // Single touch drag quando com zoom
            e.preventDefault();
            const touch = e.touches[0];
            
            // Calcular nova posição baseada no movimento do dedo
            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;
            
            state.translateX = touchStartTranslateX + deltaX;
            state.translateY = touchStartTranslateY + deltaY;
            
            // Limitar o arrasto para não sair muito da área visível
            const rect = activeImg.getBoundingClientRect();
            const containerRect = activeImg.parentElement.getBoundingClientRect();
            const maxTranslateX = Math.max(0, (rect.width * state.zoomLevel - containerRect.width) / 2);
            const maxTranslateY = Math.max(0, (rect.height * state.zoomLevel - containerRect.height) / 2);
            
            state.translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, state.translateX));
            state.translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, state.translateY));
            
            activeImg.style.transform = `scale(${state.zoomLevel}) translate(${state.translateX}px, ${state.translateY}px)`;
        }
    }, { passive: false, capture: true });
    
    // Evento de término do toque
    container.addEventListener('touchend', function(e) {
        if (!isModalOpen) return;
        
        const activeImg = document.querySelector('.carousel-slide.active img');
        if (activeImg) {
            touchStartDistance = 0;
            isDragging = false;
            activeImg.style.transition = 'transform 0.3s ease';
            
            // Forçar repintura para garantir que a transição funcione
            void activeImg.offsetWidth;
        }
    }, { passive: false, capture: true });
    
    // Prevenir zoom da página com gestos de pinça
    document.addEventListener('touchmove', function(e) {
        if (isModalOpen && e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    console.log('✅ Zoom mobile configurado com sucesso');
}
