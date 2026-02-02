// FundedTraderDeals - Interactive Scripts

// Copy coupon code with visual feedback
function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        // Find the button that triggered this
        const buttons = document.querySelectorAll('.copy-btn');
        buttons.forEach(btn => {
            if (btn.onclick.toString().includes(code)) {
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.style.background = 'var(--primary)';
                btn.style.color = 'var(--bg-dark)';
                btn.style.borderColor = 'var(--primary)';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.style.borderColor = '';
                }, 2000);
            }
        });
        
        // Show toast notification
        showToast(`Copied: ${code}`);
    }).catch(err => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied: ${code}`);
    });
}

// Toast notification
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <span style="margin-right: 8px;">✓</span>
        ${message}
    `;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%) translateY(100px)',
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'var(--bg-dark)',
        padding: '14px 28px',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '0.95rem',
        boxShadow: '0 10px 40px rgba(0, 217, 165, 0.4)',
        zIndex: '9999',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center'
    });
    
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add subtle parallax effect to hero
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.deal-card, .guide-card, .faq-item, .coupon-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        fadeInObserver.observe(el);
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 15, 28, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 15, 28, 0.85)';
        navbar.style.boxShadow = 'none';
    }
});

// Add click tracking for affiliate links (for analytics)
document.querySelectorAll('a[rel*="nofollow"]').forEach(link => {
    link.addEventListener('click', function() {
        const firmName = this.closest('.deal-card')?.querySelector('h3')?.textContent || 
                         this.closest('tr')?.querySelector('td strong')?.textContent || 
                         'Unknown';
        console.log(`Affiliate click: ${firmName}`);
        
        // You can add analytics tracking here
        // e.g., gtag('event', 'affiliate_click', { firm: firmName });
    });
});
