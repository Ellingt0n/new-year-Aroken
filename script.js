// Создание снежинок
function createSnowflakes() {
    const snowContainer = document.querySelector('.snow-container');
    const snowflakeCount = 60;
    const snowflakeChars = ['❄', '❅', '❆'];

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];

        const leftPosition = Math.random() * 100;
        const animationDuration = 8 + Math.random() * 15;
        const animationDelay = Math.random() * 8;
        const fontSize = 0.5 + Math.random() * 1.2;
        const opacity = 0.3 + Math.random() * 0.5;

        snowflake.style.left = `${leftPosition}%`;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.animationDelay = `${animationDelay}s`;
        snowflake.style.fontSize = `${fontSize}em`;
        snowflake.style.opacity = opacity;

        snowContainer.appendChild(snowflake);
    }
}

// Плавная анимация появления элементов
function animateOnScroll() {
    const elements = document.querySelectorAll('.section, .gift-item, .conclusion');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(element);
    });
}

// Частицы при клике на подарки
function addGiftClickEffect() {
    const gifts = document.querySelectorAll('.gift-item');

    gifts.forEach(gift => {
        gift.addEventListener('click', function(e) {
            const rect = gift.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createParticles(x, y);

            // Небольшая вибрация
            gift.style.animation = 'shake 0.5s';
            setTimeout(() => {
                gift.style.animation = '';
            }, 500);
        });
    });
}

// Анимация вибрации
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-4px) rotate(-2deg); }
        75% { transform: translateY(-4px) rotate(2deg); }
    }
`;
document.head.appendChild(style);

function createParticles(x, y) {
    const colors = ['#667eea', '#764ba2', '#fbbf24', '#60a5fa', '#f472b6'];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 80 + Math.random() * 120;
        const spread = 0.8 + Math.random() * 0.4;

        const animation = particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * velocity * spread}px, ${Math.sin(angle) * velocity * spread}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800 + Math.random() * 400,
            easing: 'cubic-bezier(0.4, 0, 0.6, 1)'
        });

        animation.onfinish = () => particle.remove();
    }
}

// Parallax эффект для фона
function addParallax() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.header');

                parallaxElements.forEach(el => {
                    el.style.transform = `translateY(${scrolled * 0.5}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

// Эффект мерцания для звезд в хедере
function addStarTwinkle() {
    const header = document.querySelector('.header');

    setInterval(() => {
        const starX = Math.random() * 100;
        const starY = Math.random() * 100;

        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = `${starX}%`;
        star.style.top = `${starY}%`;
        star.style.width = '3px';
        star.style.height = '3px';
        star.style.borderRadius = '50%';
        star.style.background = '#fff';
        star.style.boxShadow = '0 0 6px #fff';
        star.style.animation = 'twinkleStar 1.5s ease-out';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '10';

        header.appendChild(star);

        setTimeout(() => star.remove(), 1500);
    }, 300);
}

const twinkleStyle = document.createElement('style');
twinkleStyle.textContent = `
    @keyframes twinkleStar {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(twinkleStyle);

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    animateOnScroll();
    addGiftClickEffect();
    // addParallax(); // Отключено, чтобы заголовок не двигался
    addStarTwinkle();
});
