document.addEventListener("DOMContentLoaded", function() {
    
    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll(".faq-item");
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector(".faq-question");

            question.addEventListener("click", () => {
                const isActive = item.classList.contains("active");
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove("active");
                });
                if (!isActive) {
                    item.classList.add("active");
                }
            });
        });
    }

    // --- Counter Animation Logic ---
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const speed = 200; 

        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            let count = 0;

            const updateCount = () => {
                const increment = target / speed;
                count += increment;

                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // --- Homepage Slider Logic ---
    const sliderWrapper = document.querySelector(".slider-wrapper");
    if (sliderWrapper) { 
        const slides = document.querySelectorAll(".slide");
        const prevBtn = document.querySelector(".prev-btn");
        const nextBtn = document.querySelector(".next-btn");
        const dotsContainer = document.querySelector(".slider-dots");
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        let slideInterval;

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dot.addEventListener("click", () => {
                goToSlide(i);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll(".dot");
        if (dots.length > 0) {
            dots[0].classList.add("active");
        }

        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === currentIndex);
            });
        }

        function goToSlide(index) {
            if (index < 0) {
                currentIndex = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            sliderWrapper.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;
            updateDots();
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000); 
        }
        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }
        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetInterval();
        });
        prevBtn.addEventListener("click", () => {
            prevSlide();
            resetInterval();
        });
        startInterval();
    }

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const body = document.querySelector("body");
    const primaryNav = document.querySelector(".primary-navigation");

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener("click", () => {
            body.classList.toggle("nav-open");
            const isExpanded = body.classList.contains("nav-open");
            mobileNavToggle.setAttribute("aria-expanded", isExpanded);
        });
        document.addEventListener('click', function(e) {
            if (body.classList.contains('nav-open') && !primaryNav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                body.classList.remove("nav-open");
                mobileNavToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // --- Service Page Scrollspy Logic ---
    const sections = document.querySelectorAll(".service-detail-box");
    const navLinks = document.querySelectorAll(".service-nav a");

    if (sections.length > 0 && navLinks.length > 0) {
        const onScroll = () => {
            let currentSection = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    currentSection = section.getAttribute("id");
                }
            });
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + currentSection) {
                    link.classList.add("active");
                }
            });
        };
        window.addEventListener("scroll", onScroll);
    }

    // --- NEW: Scroll Animation Logic ---
    const hiddenSections = document.querySelectorAll(".hidden-section");
    if (hiddenSections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show-section");
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15 // 15% of the section must be visible
        });

        hiddenSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

});