// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initModal();
    initFAQ();
    initForms();
    initAnimations();
});

// 平滑滚动函数
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// 导航功能初始化
function initNavigation() {
    // 移动端菜单切换
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
        });
    }
    
    // 导航链接平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // 关闭移动端菜单
                if (navMenu) {
                    navMenu.classList.remove('mobile-active');
                }
            }
        });
    });
}

// 弹窗功能初始化
function initModal() {
    const modal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal');
    
    if (!modal || !closeModal) return;
    
    // 获取所有打开弹窗的按钮
    const contactBtn = document.getElementById('contactBtn');
    const heroContactBtn = document.getElementById('heroContactBtn');
    const certCardLinks = document.querySelectorAll('.cert-card-link');
    
    // 打开弹窗的函数
    function openModal(e) {
        e.preventDefault();
        modal.style.display = 'flex';
    }
    
    // 为悬浮按钮添加事件
    if (contactBtn) {
        contactBtn.addEventListener('click', openModal);
    }
    
    // 为英雄区按钮添加事件
    if (heroContactBtn) {
        heroContactBtn.addEventListener('click', openModal);
    }
    
    // 为证书卡片添加事件
    certCardLinks.forEach(link => {
        link.addEventListener('click', openModal);
    });
    
    // 关闭弹窗
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // 点击背景关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// FAQ折叠功能
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // 关闭所有其他项
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // 切换当前项
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// 表单功能初始化
function initForms() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里可以添加实际的表单提交逻辑
            alert('感谢您的咨询！我们的顾问将在24小时内与您联系。');
            this.reset();
        });
    }
}

// 动画功能初始化
function initAnimations() {
    // 数字滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // 触发数字动画
                if (entry.target.classList.contains('stats')) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        if (!counter.classList.contains('animated')) {
                            counter.classList.add('animated');
                            animateCounter(counter);
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    // 为需要动画的元素添加初始样式和观察
    const animatedElements = document.querySelectorAll('.service-card-horizontal, .advantage-card, .cert-card-new, .testimonial-card, .timeline-item-h, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 观察统计数据区域
    const stats = document.querySelector('.stats');
    if (stats) {
        observer.observe(stats);
    }
}

// 数字滚动动画
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}


// ========== 动态效果增强 ==========

// 滚动进度条（优化版）
function initScrollProgress() {
    // 创建进度条元素
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    let ticking = false;
    
    // 更新进度条
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                progressBar.style.width = scrolled + '%';
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// 视差滚动效果（优化版 - 修复重叠问题）
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    let ticking = false;
    const heroHeight = hero.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                
                // 只在英雄区可见时应用视差效果
                if (scrolled < heroHeight) {
                    const parallaxValue = scrolled * 0.3;
                    const opacityValue = 1 - (scrolled / heroHeight) * 0.3;
                    
                    hero.style.transform = `translate3d(0, ${parallaxValue}px, 0)`;
                    hero.style.opacity = opacityValue;
                } else {
                    // 滚动超出英雄区后，重置transform避免重叠
                    hero.style.transform = 'translate3d(0, 0, 0)';
                    hero.style.opacity = '1';
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// 鼠标跟随效果（优化版 - 仅在桌面端启用）
function initMouseFollow() {
    // 移动端不启用
    if (window.innerWidth < 768) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let ballX = 0;
    let ballY = 0;
    const speed = 0.15;
    
    // 创建跟随光标
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(102, 126, 234, 0.3);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        will-change: transform;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });
    
    function animate() {
        const distX = mouseX - ballX;
        const distY = mouseY - ballY;
        
        ballX += distX * speed;
        ballY += distY * speed;
        
        cursor.style.transform = `translate(${ballX}px, ${ballY}px)`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 悬停在可点击元素上时放大
    const clickables = document.querySelectorAll('a, button, .cert-card-link');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${ballX}px, ${ballY}px) scale(2)`;
            cursor.style.background = 'rgba(102, 126, 234, 0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${ballX}px, ${ballY}px) scale(1)`;
            cursor.style.background = 'rgba(102, 126, 234, 0.3)';
        });
    });
}

// 卡片倾斜效果（优化版 - 仅桌面端）
function initCardTilt() {
    // 移动端不启用
    if (window.innerWidth < 768) return;
    
    const cards = document.querySelectorAll('.service-card-horizontal, .advantage-card, .cert-card-new');
    
    cards.forEach(card => {
        let ticking = false;
        
        card.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// 文字打字机效果
function initTypewriter() {
    const title = document.querySelector('.hero h1');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';
    
    let index = 0;
    function type() {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    // 延迟开始打字效果
    setTimeout(type, 500);
}

// 滚动触发动画
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // 添加闪光效果
                if (entry.target.classList.contains('advantage-card') || 
                    entry.target.classList.contains('cert-card-new')) {
                    entry.target.style.animation = 'shimmer 1.5s ease-in-out';
                }
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const elements = document.querySelectorAll('.service-card-horizontal, .advantage-card, .cert-card-new, .testimonial-card, .faq-item');
    elements.forEach(el => observer.observe(el));
}

// 数字递增动画增强
function enhanceCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
                // 完成后添加脉冲效果
                counter.style.animation = 'pulse 0.5s ease-in-out';
            }
        };
        
        // 当元素进入视口时开始动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    updateCounter();
                }
            });
        });
        
        observer.observe(counter);
    });
}

// 按钮波纹效果
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn, .btn-cert, .contact-method-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // 添加波纹动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// 平滑滚动增强
function enhanceSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // 导航栏高度
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 初始化所有动态效果
document.addEventListener('DOMContentLoaded', function() {
    // 原有功能
    initNavigation();
    initModal();
    initFAQ();
    initForms();
    initAnimations();
    
    // 新增动态效果
    initScrollProgress();
    initParallax();
    initMouseFollow();
    initCardTilt();
    // initTypewriter(); // 可选：打字机效果
    initScrollReveal();
    enhanceCounterAnimation();
    initButtonRipple();
    enhanceSmoothScroll();
    
    console.log('🎉 所有动态效果已加载！');
});


// ========== 性能优化工具 ==========

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 检测设备性能
function detectPerformance() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    return {
        isMobile,
        isLowEnd,
        shouldReduceAnimations: isMobile || isLowEnd
    };
}

// 根据性能调整动画
function optimizeAnimations() {
    const performance = detectPerformance();
    
    if (performance.shouldReduceAnimations) {
        console.log('🔧 检测到低性能设备，优化动画效果');
        
        // 禁用复杂动画
        document.body.classList.add('reduce-animations');
        
        // 添加优化样式
        const style = document.createElement('style');
        style.textContent = `
            .reduce-animations * {
                animation-duration: 0.3s !important;
                transition-duration: 0.2s !important;
            }
            .reduce-animations .hero::before,
            .reduce-animations .hero::after {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// 懒加载图片（如果有的话）
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 优化滚动性能
function optimizeScroll() {
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 检测滚动方向
        if (scrollTop > lastScrollTop) {
            // 向下滚动
            document.body.classList.add('scrolling-down');
            document.body.classList.remove('scrolling-up');
        } else {
            // 向上滚动
            document.body.classList.add('scrolling-up');
            document.body.classList.remove('scrolling-down');
        }
        
        lastScrollTop = scrollTop;
        
        // 滚动停止后移除类
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('scrolling-down', 'scrolling-up');
        }, 150);
    }, 100), { passive: true });
}

// 预加载关键资源
function preloadResources() {
    // 预连接到外部资源
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect);
}

// 监控性能
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log(`📊 页面加载时间: ${pageLoadTime}ms`);
            
            if (pageLoadTime > 3000) {
                console.warn('⚠️ 页面加载较慢，建议优化');
            }
        });
    }
}

// 初始化性能优化
function initPerformanceOptimizations() {
    optimizeAnimations();
    lazyLoadImages();
    optimizeScroll();
    preloadResources();
    monitorPerformance();
    
    console.log('⚡ 性能优化已启用');
}

// 更新主初始化函数
document.addEventListener('DOMContentLoaded', function() {
    // 性能优化（最先执行）
    initPerformanceOptimizations();
    
    // 原有功能
    initNavigation();
    initModal();
    initFAQ();
    initForms();
    initAnimations();
    
    // 动态效果（根据性能决定是否启用）
    const performance = detectPerformance();
    
    initScrollProgress();
    
    if (!performance.shouldReduceAnimations) {
        initParallax();
        initMouseFollow();
        initCardTilt();
    }
    
    initScrollReveal();
    enhanceCounterAnimation();
    initButtonRipple();
    enhanceSmoothScroll();
    
    console.log('🎉 所有功能已加载！');
});


// ========== 移动端优化 ==========

// 检测设备类型
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 检测触摸设备
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// 移动端菜单优化
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    // 点击菜单按钮
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('mobile-active');
        
        // 切换图标
        mobileMenuBtn.textContent = navMenu.classList.contains('mobile-active') ? '✕' : '☰';
    });
    
    // 点击菜单项关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-active');
            mobileMenuBtn.textContent = '☰';
        });
    });
    
    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('mobile-active');
            mobileMenuBtn.textContent = '☰';
        }
    });
}

// 移动端滚动优化
function optimizeMobileScroll() {
    if (!isMobileDevice()) return;
    
    // 禁用某些复杂动画
    const statsTrack = document.querySelector('.stats-track');
    const servicesScroll = document.querySelector('.services-scroll');
    
    // 移动端减慢滚动速度
    if (statsTrack) {
        statsTrack.style.animationDuration = '30s';
    }
    if (servicesScroll) {
        servicesScroll.style.animationDuration = '40s';
    }
}

// 移动端触摸滑动
function initTouchSwipe() {
    if (!isTouchDevice()) return;
    
    const servicesContainer = document.querySelector('.services-scroll-container');
    if (!servicesContainer) return;
    
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;
    
    servicesContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - servicesContainer.offsetLeft;
        scrollLeft = servicesContainer.scrollLeft;
    }, { passive: true });
    
    servicesContainer.addEventListener('touchend', () => {
        isDown = false;
    });
    
    servicesContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - servicesContainer.offsetLeft;
        const walk = (x - startX) * 2;
        servicesContainer.scrollLeft = scrollLeft - walk;
    });
}

// 移动端视口高度修复（解决地址栏问题）
function fixMobileViewportHeight() {
    if (!isMobileDevice()) return;
    
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', debounce(setVH, 100));
}

// 移动端图片懒加载优化
function optimizeMobileImages() {
    if (!isMobileDevice()) return;
    
    // 如果有图片，可以在这里添加懒加载逻辑
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// 移动端表单优化
function optimizeMobileForm() {
    if (!isMobileDevice()) return;
    
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // 聚焦时滚动到视图
        input.addEventListener('focus', () => {
            setTimeout(() => {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
}

// 移动端性能监控
function monitorMobilePerformance() {
    if (!isMobileDevice()) return;
    
    // 检测低端设备
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    if (isLowEnd) {
        console.log('🔧 检测到低端设备，应用性能优化');
        
        // 禁用复杂动画
        document.body.classList.add('low-performance');
        
        const style = document.createElement('style');
        style.textContent = `
            .low-performance .stats-track,
            .low-performance .services-scroll {
                animation-duration: 60s !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// 移动端手势支持
function initMobileGestures() {
    if (!isTouchDevice()) return;
    
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleGesture();
    }, { passive: true });
    
    function handleGesture() {
        const swipeDistance = touchStartY - touchEndY;
        
        // 向上滑动超过50px
        if (swipeDistance > 50) {
            // 可以添加向上滑动的处理
        }
        
        // 向下滑动超过50px
        if (swipeDistance < -50) {
            // 可以添加向下滑动的处理
        }
    }
}

// 移动端初始化
function initMobileOptimizations() {
    if (!isMobileDevice()) return;
    
    console.log('📱 移动端优化已启用');
    
    initMobileMenu();
    optimizeMobileScroll();
    initTouchSwipe();
    fixMobileViewportHeight();
    optimizeMobileImages();
    optimizeMobileForm();
    monitorMobilePerformance();
    initMobileGestures();
}

// 更新主初始化函数
document.addEventListener('DOMContentLoaded', function() {
    // 性能优化
    initPerformanceOptimizations();
    
    // 基础功能
    initNavigation();
    initModal();
    initFAQ();
    initForms();
    initAnimations();
    
    // 动态效果
    const performance = detectPerformance();
    
    initScrollProgress();
    
    if (!performance.shouldReduceAnimations) {
        initParallax();
        if (!isMobileDevice()) {
            initMouseFollow();
            initCardTilt();
        }
    }
    
    initScrollReveal();
    enhanceCounterAnimation();
    initButtonRipple();
    enhanceSmoothScroll();
    
    // 移动端优化
    initMobileOptimizations();
    
    console.log('🎉 所有功能已加载！');
    console.log('📱 设备类型:', isMobileDevice() ? '移动设备' : '桌面设备');
    console.log('👆 触摸支持:', isTouchDevice() ? '是' : '否');
});

// 窗口大小改变时重新检测
window.addEventListener('resize', debounce(() => {
    if (isMobileDevice()) {
        optimizeMobileScroll();
    }
}, 250));
