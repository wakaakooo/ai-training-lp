document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Mobile Menu Toggle
       ========================================= */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const headerNav = document.querySelector('.header-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('is-open');
            headerNav.classList.toggle('is-open');

            // Prevent scrolling when menu is open
            if (headerNav.classList.contains('is-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('is-open');
                headerNav.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }

    /* =========================================
       FAQ Accordion
       ========================================= */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');

            // Close other items (optional - uncomment if you want only one open at a time)
            /*
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            */

            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    /* =========================================
       Scroll Animations (Intersection Observer)
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    /* =========================================
       Copy to Clipboard
       ========================================= */
    const copyBtn = document.getElementById('copy-btn');
    const promptText = document.getElementById('prompt-text');

    if (copyBtn && promptText) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = promptText.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span class="icon-copy">✅</span> コピーしました！';
                copyBtn.style.background = 'rgba(16, 185, 129, 0.2)';
                copyBtn.style.borderColor = 'rgba(16, 185, 129, 0.5)';

                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.background = '';
                    copyBtn.style.borderColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                alert('コピーに失敗しました。');
            });
        });
    }

    /* =========================================
       Smooth Scroll for Anchor Links
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
