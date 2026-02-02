// Copy coupon code to clipboard
function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        // Find the button that was clicked
        const buttons = document.querySelectorAll('.copy-btn');
        buttons.forEach(btn => {
            if (btn.onclick.toString().includes(code)) {
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.style.background = '#059669';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 2000);
            }
        });
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Copied: ' + code);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Track affiliate clicks (placeholder for analytics)
document.querySelectorAll('.deal-btn, .table-deal').forEach(link => {
    link.addEventListener('click', function(e) {
        const firmName = this.closest('.deal-card')?.querySelector('h3')?.textContent 
                      || this.closest('tr')?.querySelector('td')?.textContent
                      || 'Unknown';
        console.log('Affiliate click:', firmName);
        // Here you would send to your analytics
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to cards
document.querySelectorAll('.deal-card, .guide-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});
