// --- THIS IS THE FINAL SCRIPT (v7) - ALL MODULES TESTED ---
document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll(".faq-item");
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector(".faq-question");
            if (question) {
                question.addEventListener("click", () => {
                    const isActive = item.classList.contains("active");
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove("active");
                    });
                    if (!isActive) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }

    // --- 2. Counter Animation Logic ---
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
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });

            counters.forEach(counter => {
                observer.observe(counter);
            });
        } // <-- The stray semicolon was removed from here
    }

    // --- 3. Premium Hero Slider Logic ---
    const sliderWrapperPremium = document.querySelector(".hero-slider-premium");
    if (sliderWrapperPremium) { 
        const slidesPremium = document.querySelectorAll(".slide-premium");
        const prevBtnPremium = document.querySelector(".prev-btn-premium");
        const nextBtnPremium = document.querySelector(".next-btn-premium");
        const dotsContainerPremium = document.querySelector(".slider-dots-premium");
        
        if (slidesPremium.length > 0 && prevBtnPremium && nextBtnPremium && dotsContainerPremium) {
            let currentIndexPremium = 0;
            const totalSlidesPremium = slidesPremium.length;
            let slideIntervalPremium;

            for (let i = 0; i < totalSlidesPremium; i++) {
                const dot = document.createElement("div");
                dot.classList.add("dot");
                dot.addEventListener("click", () => {
                    goToSlidePremium(i);
                    resetIntervalPremium();
                });
                dotsContainerPremium.appendChild(dot);
            }

            const dotsPremium = document.querySelectorAll(".slider-dots-premium .dot");
            
            function updateSliderPremium() {
                slidesPremium.forEach((slide, index) => {
                    slide.classList.toggle("active", index === currentIndexPremium);
                    const content = slide.querySelector('.slide-content');
                    if (content) {
                        content.style.animation = 'none';
                    }
                });
                if (slidesPremium[currentIndexPremium]) {
                    const activeContent = slidesPremium[currentIndexPremium].querySelector('.slide-content');
                    if (activeContent) {
                        void activeContent.offsetWidth; 
                        activeContent.style.animation = 'fadeInSlide 1s ease-out forwards';
                    }
                }
                updateDotsPremium();
            }

            function updateDotsPremium() {
                dotsPremium.forEach((dot, index) => {
                    dot.classList.toggle("active", index === currentIndexPremium);
                });
            }

            function goToSlidePremium(index) {
                if (index < 0) {
                    currentIndexPremium = totalSlidesPremium - 1;
                } else if (index >= totalSlidesPremium) {
                    currentIndexPremium = 0;
                } else {
                    currentIndexPremium = index;
                }
                updateSliderPremium();
            }

            function nextSlidePremium() {
                goToSlidePremium(currentIndexPremium + 1);
            }

            function prevSlidePremium() {
                goToSlidePremium(currentIndexPremium - 1);
            }

            function startIntervalPremium() {
                slideIntervalPremium = setInterval(nextSlidePremium, 6000); 
            }

            function resetIntervalPremium() {
                clearInterval(slideIntervalPremium);
                startIntervalPremium();
            }

            nextBtnPremium.addEventListener("click", () => {
                nextSlidePremium();
                resetIntervalPremium();
            });

            prevBtnPremium.addEventListener("click", () => {
                prevSlidePremium();
                resetIntervalPremium();
            });

            goToSlidePremium(0); 
            startIntervalPremium();
        }
    }

    // --- 4. Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const body = document.querySelector("body");
    const primaryNav = document.querySelector(".primary-navigation");

    if (mobileNavToggle && body && primaryNav) {
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

    // --- 5. Service Page Scrollspy Logic ---
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
    
    // --- 6. Portfolio Page Filter Logic ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item-card"); 

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filterValue = button.getAttribute("data-filter");

                galleryItems.forEach(item => {
                    if (filterValue === "all" || item.classList.contains(filterValue)) {
                        item.classList.remove("hide");
                        item.style.animation = "fadeIn 0.5s ease";
                    } else {
                        item.classList.add("hide");
                        item.style.animation = "none";
                    }
                });
            });
        });
    }

    // --- 7. Scroll Animation Logic ---
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
            threshold: 0.15 
        });

        hiddenSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

});