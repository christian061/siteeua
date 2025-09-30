// Main JavaScript file for Magic CleanDom

document.addEventListener('DOMContentLoaded', function() {
    // Mobile performance optimization - detect mobile devices
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
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
        
        // Optimize image loading for mobile
        if (isMobile) {
            img.loading = 'lazy';
            img.decoding = 'async';
        }
    });
    
    // Hero cleaning effect - only on desktop for performance
    if (!isMobile) {
        setupHeroCleaningEffect();
    } else {
        // Simplified mobile hero
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.cursor = 'default';
            // Remove any complex effects
            hero.classList.remove('cleaning-active');
        }
    }
    
    // Mobile Service Areas optimization
    if (isMobile) {
        const serviceArea = document.querySelector('.service-area');
        const cities = document.querySelectorAll('.cities .city');
        
        if (serviceArea) {
            // Disable complex effects on mobile
            serviceArea.style.willChange = 'auto';
            serviceArea.style.transform = 'none';
        }
        
        cities.forEach(city => {
            // Disable hover effects and complex animations on mobile
            city.style.willChange = 'auto';
            city.style.transform = 'none';
            city.style.transition = 'none';
            
            // Remove any existing event listeners that might cause performance issues
            const cityBg = city.querySelector('.city-bg');
            if (cityBg) {
                cityBg.style.willChange = 'auto';
                cityBg.style.transform = 'none';
                cityBg.style.transition = 'none';
                cityBg.style.filter = 'none';
            }
            
            // Simplify city name display for mobile
            const cityName = city.querySelector('.city-name');
            if (!cityName) {
                const name = city.getAttribute('data-city') || city.getAttribute('aria-label');
                if (name) {
                    const nameElement = document.createElement('div');
                    nameElement.className = 'city-name';
                    nameElement.textContent = name;
                    city.appendChild(nameElement);
                }
            }
        });
    }
    
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
            // Remove event listeners antigos para evitar duplicação
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            
            // Adiciona o novo event listener
            newCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                // Pausa o vídeo ao fechar o modal
                if (videoIframe) {
                    videoIframe.src = '';
                }
                // Restaura a posição de rolagem no mobile
                if (window.innerWidth <= 768) {
                    window.scrollTo(0, 0);
                }
            });
            
            // Adiciona estilos para garantir que o botão seja clicável
            newCloseBtn.style.zIndex = '1001';
            newCloseBtn.style.position = 'relative';
        }
        
        // Fechar ao clicar fora do conteúdo
        const handleOutsideClick = function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                // Pausa o vídeo ao fechar o modal
                if (videoIframe) {
                    videoIframe.src = '';
                }
                // Remove o event listener para evitar múltiplas instâncias
                window.removeEventListener('click', handleOutsideClick);
                // Restaura a posição de rolagem no mobile
                if (window.innerWidth <= 768) {
                    window.scrollTo(0, 0);
                }
            }
        };
        
        // Adiciona o event listener para clique fora do modal
        window.addEventListener('click', handleOutsideClick);
        
        // Fechar com a tecla ESC
        const handleKeyDown = function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                // Pausa o vídeo ao fechar o modal
                if (videoIframe) {
                    videoIframe.src = '';
                }
                // Remove o event listener para evitar múltiplas instâncias
                document.removeEventListener('keydown', handleKeyDown);
                // Restaura a posição de rolagem no mobile
                if (window.innerWidth <= 768) {
                    window.scrollTo(0, 0);
                }
            }
        };
        
        // Adiciona o event listener para a tecla ESC
        document.addEventListener('keydown', handleKeyDown);
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
            } else if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                // Restaura a posição de rolagem ao fechar
                if (window.innerWidth <= 768) {
                    window.scrollTo(0, 0);
                }
            }
        });
        
        // Abrir modal ao clicar no botão de certificado
        if (certificateBtn) {
            certificateBtn.style.cursor = 'pointer';
            certificateBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Salva a posição de rolagem atual
                const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                
                // Abre o modal
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Ajusta a posição do modal para a visão atual
                modal.scrollTop = 0;
                
                // Mostra o primeiro slide ao abrir o modal
                showSlide(0);
                
                // Ajusta a posição na tela
                if (window.innerWidth <= 768) {
                    window.scrollTo(0, 0);
                } else {
                    window.scrollTo(0, scrollPosition);
                }
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
                // Restaura a posição de rolagem ao fechar
                if (window.innerWidth <= 768) {
                    window.scrollTo(0, 0);
                }
            });
        }
        
        // Fechar modal ao clicar fora do conteúdo
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                resetZoom(); // Reset zoom ao fechar
                // Restaura a posição de rolagem ao fechar
                if (window.innerWidth <= 768) {
                    window.scrollTo(0, 0);
                }
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
            if (zoomLevel > 1) {
                // Aplica zoom e permite arrastar
                const transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
                img.style.transform = transform;
                img.style.cursor = 'zoom-out';
                img.classList.add('zoomed');
            } else {
                // Reset ao zoom normal
                zoomLevel = 1;
                translateX = 0;
                translateY = 0;
                img.style.transform = 'scale(1)';
                img.style.cursor = 'zoom-in';
                img.classList.remove('zoomed');
            }
        }
        
        // Adicionar funcionalidade de zoom com scroll nas imagens
        function setupImageZoom() {
            slides.forEach(slide => {
                const img = slide.querySelector('img');
                if (!img) return;
                
                // Reset initial state
                let initialDistance = 0;
                let initialZoom = 1;
                img.style.transition = 'transform 0.3s ease';
                img.style.cursor = 'zoom-in';
                img.style.transformOrigin = 'center center';
                
                // Zoom com scroll do mouse
                img.addEventListener('wheel', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Determinar a direção do zoom (in/out)
                    if (e.deltaY < 0) {
                        // Zoom in
                        zoomLevel = Math.min(zoomLevel + 0.1, 3);
                        
                        // Se estiver fazendo zoom in e ainda não tiver zoom, centraliza no ponto clicado
                        if (zoomLevel > 1 && Math.abs(zoomLevel - 1.1) < 0.01) {
                            const rect = img.getBoundingClientRect();
                            const containerRect = img.parentElement.getBoundingClientRect();
                            
                            // Calcula a posição do clique em relação ao centro da imagem
                            const clickX = e.clientX - rect.left;
                            const clickY = e.clientY - rect.top;
                            
                            // Calcula o deslocamento necessário para centralizar no ponto clicado
                            translateX = (rect.width / 2 - clickX) * (zoomLevel - 1);
                            translateY = (rect.height / 2 - clickY) * (zoomLevel - 1);
                            
                            // Limita o deslocamento para não sair muito da área visível
                            const maxTranslateX = (rect.width * zoomLevel - containerRect.width) / 2;
                            const maxTranslateY = (rect.height * zoomLevel - containerRect.height) / 2;
                            
                            translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
                            translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));
                        }
                    } else {
                        // Zoom out
                        zoomLevel = Math.max(zoomLevel - 0.1, 1);
                        
                        // Se chegou ao zoom 1, reseta a posição
                        if (zoomLevel <= 1) {
                            zoomLevel = 1;
                            translateX = 0;
                            translateY = 0;
                        }
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
                    
                    const rect = img.getBoundingClientRect();
                    const containerRect = img.parentElement.getBoundingClientRect();
                    
                    // Calcular a nova posição
                    translateX = e.clientX - startX;
                    translateY = e.clientY - startY;
                    
                    // Limitar o arrasto para não sair muito da imagem
                    const maxTranslateX = Math.max(0, (rect.width * zoomLevel - containerRect.width) / 2);
                    const maxTranslateY = Math.max(0, (rect.height * zoomLevel - containerRect.height) / 2);
                    
                    // Aplicar limites de deslocamento
                    if (rect.width * zoomLevel > containerRect.width) {
                        translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
                    } else {
                        translateX = 0;
                    }
                    
                    if (rect.height * zoomLevel > containerRect.height) {
                        translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));
                    } else {
                        translateY = 0;
                    }
                    
                    // Aplicar a transformação diretamente para melhor performance
                    img.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
                });
                
                // Variáveis para controle de touch
                let touchStartDistance = 0;
                let touchStartZoom = 1;
                let touchStartX = 0;
                let touchStartY = 0;
                let touchStartTranslateX = 0;
                let touchStartTranslateY = 0;
                let lastTap = 0;
                
                // Eventos para dispositivos móveis - versão otimizada
                img.addEventListener('touchstart', function(e) {
                    if (e.touches.length === 2) {
                        // Pinch to zoom - início
                        e.preventDefault();
                        const touch1 = e.touches[0];
                        const touch2 = e.touches[1];
                        touchStartDistance = Math.hypot(
                            touch2.clientX - touch1.clientX,
                            touch2.clientY - touch1.clientY
                        );
                        touchStartZoom = zoomLevel;
                        img.style.transition = 'none';
                    } else if (e.touches.length === 1) {
                        if (zoomLevel > 1) {
                            // Single touch drag quando com zoom
                            e.preventDefault();
                            isDragging = true;
                            const touch = e.touches[0];
                            touchStartX = touch.clientX;
                            touchStartY = touch.clientY;
                            touchStartTranslateX = translateX;
                            touchStartTranslateY = translateY;
                            img.style.transition = 'none';
                            img.classList.add('dragging');
                        }
                        
                        // Detectar duplo toque
                        const currentTime = new Date().getTime();
                        const tapLength = currentTime - lastTap;
                        if (tapLength < 300 && tapLength > 0) {
                            // Duplo toque detectado
                            e.preventDefault();
                            handleDoubleTap(e.touches[0], img);
                        }
                        lastTap = currentTime;
                    }
                }, { passive: false });
                
                img.addEventListener('touchmove', function(e) {
                    if (e.touches.length === 2) {
                        // Pinch to zoom - movimento
                        e.preventDefault();
                        const touch1 = e.touches[0];
                        const touch2 = e.touches[1];
                        const currentDistance = Math.hypot(
                            touch2.clientX - touch1.clientX,
                            touch2.clientY - touch1.clientY
                        );
                        
                        if (touchStartDistance > 0) {
                            const scale = currentDistance / touchStartDistance;
                            const newZoomLevel = Math.max(1, Math.min(3, touchStartZoom * scale));
                            
                            // Calcular o ponto médio entre os dedos
                            const rect = img.getBoundingClientRect();
                            const midX = (touch1.clientX + touch2.clientX) / 2 - rect.left;
                            const midY = (touch1.clientY + touch2.clientY) / 2 - rect.top;
                            
                            // Ajustar posição para manter o zoom centrado no ponto médio
                            if (newZoomLevel > 1) {
                                const containerRect = img.parentElement.getBoundingClientRect();
                                const imgCenterX = rect.width / 2;
                                const imgCenterY = rect.height / 2;
                                
                                translateX = (imgCenterX - midX) * (newZoomLevel - 1) / newZoomLevel;
                                translateY = (imgCenterY - midY) * (newZoomLevel - 1) / newZoomLevel;
                                
                                // Limitar o deslocamento
                                const maxTranslateX = Math.max(0, (rect.width * newZoomLevel - containerRect.width) / 2);
                                const maxTranslateY = Math.max(0, (rect.height * newZoomLevel - containerRect.height) / 2);
                                
                                translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
                                translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));
                            } else {
                                translateX = 0;
                                translateY = 0;
                            }
                            
                            zoomLevel = newZoomLevel;
                            applyZoom(img);
                        }
                    } else if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
                        // Single touch drag quando com zoom
                        e.preventDefault();
                        const touch = e.touches[0];
                        
                        const rect = img.getBoundingClientRect();
                        const containerRect = img.parentElement.getBoundingClientRect();
                        
                        // Calcular nova posição baseada no movimento do dedo
                        const deltaX = touch.clientX - touchStartX;
                        const deltaY = touch.clientY - touchStartY;
                        
                        translateX = touchStartTranslateX + deltaX;
                        translateY = touchStartTranslateY + deltaY;
                        
                        // Limitar o arrasto para não sair muito da área visível
                        const maxTranslateX = Math.max(0, (rect.width * zoomLevel - containerRect.width) / 2);
                        const maxTranslateY = Math.max(0, (rect.height * zoomLevel - containerRect.height) / 2);
                        
                        translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
                        translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));
                        
                        img.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
                    }
                }, { passive: false });
                
                img.addEventListener('touchend', function(e) {
                    touchStartDistance = 0;
                    isDragging = false;
                    img.style.transition = 'transform 0.3s ease';
                    img.classList.remove('dragging');
                }, { passive: false });
                
                // Função para lidar com duplo toque
                function handleDoubleTap(touch, img) {
                    if (zoomLevel > 1) {
                        // Se já estiver com zoom, volta ao normal
                        zoomLevel = 1;
                        translateX = 0;
                        translateY = 0;
                    } else {
                        // Se estiver normal, faz zoom no ponto tocado
                        const rect = img.getBoundingClientRect();
                        const containerRect = img.parentElement.getBoundingClientRect();
                        const x = touch.clientX - rect.left;
                        const y = touch.clientY - rect.top;
                        
                        zoomLevel = 2.5; // Nível de zoom para duplo toque
                        
                        // Ajustar posição para centralizar no ponto tocado
                        const imgCenterX = rect.width / 2;
                        const imgCenterY = rect.height / 2;
                        
                        translateX = (imgCenterX - x) * (zoomLevel - 1) / zoomLevel;
                        translateY = (imgCenterY - y) * (zoomLevel - 1) / zoomLevel;
                        
                        // Limitar o deslocamento
                        const maxTranslateX = Math.max(0, (rect.width * zoomLevel - containerRect.width) / 2);
                        const maxTranslateY = Math.max(0, (rect.height * zoomLevel - containerRect.height) / 2);
                        
                        translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
                        translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));
                    }
                    
                    applyZoom(img);
                }
                
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
                img.addEventListener('dblclick', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Animação suave ao resetar o zoom
                    img.style.transition = 'transform 0.3s ease';
                    
                    // Resetar zoom e posição
                    zoomLevel = 1;
                    translateX = 0;
                    translateY = 0;
                    
                    applyZoom(img);
                    
                    // Remover a transição após a animação para não interferir com o zoom manual
                    setTimeout(() => {
                        img.style.transition = 'none';
                    }, 300);
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

// EmailJS Configuration - usando arquivo de configuração separado
function initializeEmailJS() {
    console.log('Checking EmailJS initialization...');
    console.log('EMAILJS_CONFIG available:', typeof EMAILJS_CONFIG !== 'undefined');
    console.log('emailjs library available:', typeof emailjs !== 'undefined');
    
    if (typeof EMAILJS_CONFIG !== 'undefined') {
        console.log('EmailJS Config:', EMAILJS_CONFIG);
    }
    
    if (typeof EMAILJS_CONFIG !== 'undefined' && typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('EmailJS initialized successfully with key:', EMAILJS_CONFIG.PUBLIC_KEY);
    } else {
        console.warn('EmailJS configuration not found. Please configure emailjs-config.js');
        console.warn('EMAILJS_CONFIG:', typeof EMAILJS_CONFIG);
        console.warn('emailjs:', typeof emailjs);
    }
}

// Inicializar EmailJS quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que todos os scripts foram carregados
    setTimeout(initializeEmailJS, 100);
});

// Form submission handling with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const phone = formData.get('phone').trim();
        const message = formData.get('message').trim();
        const service = formData.get('service');
        
        // Basic form validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Prepare email parameters - alinhado com o template
        const templateParams = {
            // Variáveis que o template espera
            user_email: email,           // {{user_email}} no template
            name: name,                  // {{name}} no template  
            message: message,            // {{message}} no template
            phone: phone,                // {{phone}} no template
            service: service,            // {{service}} no template
            
            // Variáveis adicionais
            from_name: name,             // Compatibilidade
            from_email: email,           // Compatibilidade
            to_email: 'info@magiccleandom.com',
            reply_to: email,
            date: new Date().toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        
        // Send email using EmailJS
        const emailPromise = (typeof EMAILJS_CONFIG !== 'undefined') 
            ? emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
            : Promise.reject(new Error('EmailJS configuration not found'));
            
        emailPromise
            .then(() => {
                showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
                this.reset();
            })
            .catch((error) => {
                console.error('EmailJS Error Details:', error);
                console.error('Error status:', error.status);
                console.error('Error text:', error.text);
                console.error('Template params:', templateParams);
                console.error('EmailJS Config:', EMAILJS_CONFIG);
                showFormMessage('There was an error sending your message. Please try again later.', 'error');
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        
        // Also save to Firebase if available (backup)
        if (window.db) {
            db.collection('contacts').add({
                name: name,
                email: email,
                phone: phone,
                message: message,
                service: service,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).catch((error) => {
                console.error('Firebase Error:', error);
            });
        }
    });
}

// Function to show form messages
function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Insert message before the form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
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
