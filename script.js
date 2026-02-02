// Copy code to clipboard
function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        showToast('Copied: ' + code);
    }).catch(() => {
        // Fallback
        const el = document.createElement('textarea');
        el.value = code;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        showToast('Copied: ' + code);
    });
}

// Minimal toast
function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: #22c55e;
        color: #09090b;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        z-index: 9999;
        animation: toast-in 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// Add toast animation
const style = document.createElement('style');
style.textContent = `
    @keyframes toast-in {
        from { opacity: 0; transform: translateX(-50%) translateY(10px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(style);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            const offset = document.querySelector('.navbar').offsetHeight + 20;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});
