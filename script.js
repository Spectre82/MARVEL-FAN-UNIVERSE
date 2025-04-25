document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
    });

    // Navigation active state
    const navItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function setActiveNavItem() {
        const scrollPosition = window.scrollY + 100; // Offset for fixed header

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach((item) => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Smooth scrolling for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (link.classList.contains('nav-link')) {
                    navLinks?.classList.remove('active');
                }
            }
        });
    });

    // Update active nav item on scroll
    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem(); // Set initial active state

    // Card hover effects
    const cards = document.querySelectorAll('.hero-card, .faction-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Add click handlers for faction cards
    const factionCards = document.querySelectorAll('.faction-card');
    factionCards.forEach(card => {
        card.addEventListener('click', () => {
            const faction = card.getAttribute('data-faction');
            window.location.href = `factions/${faction}.html`;
        });
    });

    // Intro animation handler
    const introAnimation = document.getElementById('introAnimation');
    if (introAnimation) {
        setTimeout(() => {
            introAnimation.style.display = 'none';
        }, 3000);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Marvel data structure for search
    const marvelData = {
        heroes: [
            { name: 'Iron Man', category: 'Hero', type: 'Hero', link: 'heroes/iron-man.html' },
            { name: 'Thor', category: 'Hero', type: 'Hero', link: 'heroes/thor.html' },
            { name: 'Spider-Man', category: 'Hero', type: 'Hero', link: 'heroes/spider-man.html' },
            { name: 'Captain America', category: 'Hero', type: 'Hero', link: 'heroes/captain-america.html' },
            { name: 'Black Widow', category: 'Hero', type: 'Hero', link: 'heroes/black-widow.html' }
        ],
        teams: [
            { name: 'Avengers', category: 'Team', type: 'Team', link: 'factions/avengers.html' },
            { name: 'X-Men', category: 'Team', type: 'Team', link: 'factions/x-men.html' },
            { name: 'Fantastic Four', category: 'Team', type: 'Team', link: 'factions/fantastic-four.html' },
            { name: 'Guardians of the Galaxy', category: 'Team', type: 'Team', link: 'factions/guardians.html' }
        ],
        sections: [
            { name: 'FAQ', category: 'Section', type: 'Section', link: '#faq' },
            { name: 'Timeline', category: 'Section', type: 'Section', link: '#timeline' },
            { name: 'Contact', category: 'Section', type: 'Section', link: '#contact' },
            { name: 'Heroes', category: 'Section', type: 'Section', link: '#heroes' }
        ]
    };

    let searchTimeout;
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');

    function getSearchResults(query) {
        query = query.toLowerCase();
        const results = [];
        
        // Search through all categories
        for (const [category, items] of Object.entries(marvelData)) {
            for (const item of items) {
                if (item.name.toLowerCase().includes(query)) {
                    results.push({
                        ...item,
                        relevance: item.name.toLowerCase().indexOf(query)
                    });
                }
            }
        }
        
        // Sort by relevance (exact matches first, then by position of match)
        return results.sort((a, b) => a.relevance - b.relevance);
    }

    function createSuggestionItem(item) {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        
        // Choose icon based on type
        const iconClass = {
            'Hero': 'fas fa-mask',
            'Team': 'fas fa-users',
            'Section': 'fas fa-bookmark'
        }[item.type] || 'fas fa-star';
        
        div.innerHTML = `
            <i class="${iconClass}"></i>
            <span>${item.name}</span>
            <span class="suggestion-type">${item.category}</span>
        `;
        
        div.addEventListener('click', () => {
            if (item.link.startsWith('#')) {
                // For internal section links
                const targetSection = document.querySelector(item.link);
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                // For external page links
                window.location.href = item.link;
            }
            searchSuggestions.classList.remove('active');
            searchInput.value = '';
        });
        
        return div;
    }

    function updateSearchSuggestions(query) {
        if (!query) {
            searchSuggestions.classList.remove('active');
            return;
        }
        
        const results = getSearchResults(query);
        
        if (results.length === 0) {
            searchSuggestions.innerHTML = `
                <div class="no-results">
                    No results found for "${query}"
                </div>
            `;
            searchSuggestions.classList.add('active');
            return;
        }
        
        searchSuggestions.innerHTML = '';
        results.slice(0, 6).forEach(item => {
            searchSuggestions.appendChild(createSuggestionItem(item));
        });
        searchSuggestions.classList.add('active');
    }

    // Event listeners for search
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => updateSearchSuggestions(query), 300);
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.classList.remove('active');
        }
    });

    // Search Functionality
    const searchableElements = document.querySelectorAll('h2, h3, p');
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase();
        let found = false;

        searchableElements.forEach(element => {
            const content = element.textContent.toLowerCase();
            const parentSection = element.closest('section');
            
            if (parentSection) {
                if (content.includes(searchTerm)) {
                    parentSection.style.display = 'block';
                    found = true;
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.style.backgroundColor = '#ffe6e6';
                    setTimeout(() => {
                        element.style.backgroundColor = 'transparent';
                    }, 2000);
                } else {
                    parentSection.style.display = 'none';
                }
            }
        });

        if (!found && searchTerm !== '') {
            alert('No results found for: ' + searchTerm);
            // Reset visibility
            searchableElements.forEach(element => {
                const parentSection = element.closest('section');
                if (parentSection) {
                    parentSection.style.display = 'block';
                }
            });
        }
    });

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate email
        if (!isValidEmail(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});