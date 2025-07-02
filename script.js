
// Theme Color Palettes
const themes = {
    dark: {
        // Background gradients
        bgPrimary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        bgSecondary: 'rgba(255, 255, 255, 0.1)',
        bgCard: 'rgba(255, 255, 255, 0.15)',
        
        // Text colors
        textPrimary: '#ffffff',
        textSecondary: 'rgba(255, 255, 255, 0.8)',
        textMuted: 'rgba(255, 255, 255, 0.6)',
        
        // Accent colors
        accentPrimary: '#00d4ff',
        accentSecondary: '#ff6b6b',
        
        // Glass effects
        glassBg: 'rgba(255, 255, 255, 0.1)',
        glassBorder: 'rgba(255, 255, 255, 0.2)',
        
        // Shadows
        shadowPrimary: '0 8px 32px rgba(31, 38, 135, 0.37)',
        shadowHover: '0 15px 35px rgba(31, 38, 135, 0.5)'
    },
    light: {
        // Background gradients
        bgPrimary: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        bgSecondary: 'rgba(0, 0, 0, 0.05)',
        bgCard: 'rgba(0, 0, 0, 0.1)',
        
        // Text colors
        textPrimary: '#2d3748',
        textSecondary: '#4a5568',
        textMuted: '#718096',
        
        // Accent colors (same as dark for consistency)
        accentPrimary: '#00d4ff',
        accentSecondary: '#ff6b6b',
        
        // Glass effects
        glassBg: 'rgba(255, 255, 255, 0.7)',
        glassBorder: 'rgba(0, 0, 0, 0.1)',
        
        // Shadows
        shadowPrimary: '0 8px 32px rgba(0, 0, 0, 0.1)',
        shadowHover: '0 15px 35px rgba(0, 0, 0, 0.15)'
    }
};

// Apply theme colors to CSS variables
function applyThemeColors(theme) {
    const root = document.documentElement;
    const colors = themes[theme];
    
    // Set CSS custom properties
    root.style.setProperty('--bg-primary', colors.bgPrimary);
    root.style.setProperty('--bg-secondary', colors.bgSecondary);
    root.style.setProperty('--bg-card', colors.bgCard);
    root.style.setProperty('--text-primary', colors.textPrimary);
    root.style.setProperty('--text-secondary', colors.textSecondary);
    root.style.setProperty('--text-muted', colors.textMuted);
    root.style.setProperty('--accent-primary', colors.accentPrimary);
    root.style.setProperty('--accent-secondary', colors.accentSecondary);
    root.style.setProperty('--glass-bg', colors.glassBg);
    root.style.setProperty('--glass-border', colors.glassBorder);
    root.style.setProperty('--shadow-primary', colors.shadowPrimary);
    root.style.setProperty('--shadow-hover', colors.shadowHover);
}

// Theme Management
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
applyThemeColors(savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    applyThemeColors(newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Smooth Scrolling Navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for navbar height
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Typewriter Animation
const typewriterElement = document.getElementById('typewriter');
const phrases = [
    'fast, clean & professional.',
    'responsive & mobile-first.',
    'SEO optimized & lightning fast.',
    'modern & user-friendly.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    // Add cursor
    typewriterElement.classList.add('typewriter');
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Start typewriter animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// Copy to Clipboard Functionality
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary feedback
        const copyBtn = element.parentNode.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#4CAF50';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        const copyBtn = element.parentNode.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#4CAF50';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    });
}

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple form validation
    if (!name || !email || !message) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Show success message (in a real app, you'd send this to a server)
    alert(`Thanks ${name}! I'll get back to you soon at ${email}. 🚀`);
    
    // Reset form
    this.reset();
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.service-card, .work-card, .pricing-card, .testimonial-card');
    
    [...sections, ...cards].forEach(el => {
        observer.observe(el);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Add some interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('button, .cta-button, .contact-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button, .cta-button, .contact-button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Console greeting
console.log(`
🚀 Hey there! 
This site was built by Manan Verma
Want a website like this? 
💬 WhatsApp: +91 99111 15470
📧 Email: manan.verma0511@gmail.com
`);
