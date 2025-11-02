// --- THIS IS A FINAL FIX v4 ---
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

    // --- Counter Animation Logic (FIXED & CORRECTED) ---
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const speed = 200; // The lower the speed, the faster the count

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
            updateCount(); // Start the animation
        };

        // Intersection Observer to start counter when visible
        // This observer is now correctly defined at this scope
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target); // Stop observing after it has animated
                }
            });
        }, {
            threshold: 0.5 // Start when 50% of the element is visible
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    // (The animateCounter function was previously trapped inside another observer's scope. It is now fixed.)

    // --- Premium Hero Slider Logic (UPDATED) ---
    const sliderWrapperPremium = document.querySelector(".slider-wrapper-premium");
    if (sliderWrapperPremium) {
        const slidesPremium = document.querySelectorAll(".slide-premium");
        const prevBtnPremium = document.querySelector(".prev-btn-premium");
        const nextBtnPremium = document.querySelector(".next-btn-premium");
        const dotsContainerPremium = document.querySelector(".slider-dots-premium");
        
        let currentIndexPremium = 0;
        const totalSlidesPremium = slidesPremium.length;
        let slideIntervalPremium;

        // Create dots dynamically
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
        if (dotsPremium.length > 0) {
            dotsPremium[0].classList.add("active");
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
            sliderWrapperPremium.style.transform = `translateX(-${currentIndexPremium * 100 / totalSlidesPremium}%)`;
            updateDotsPremium();
            // Reapply animation for content
            slidesPremium.forEach(slide => {
                const content = slide.querySelector('.slide-content');
                if (content) {
                    content.style.animation = 'none'; // Reset animation
                    void content.offsetWidth; // Trigger reflow
                    content.style.animation = ''; // Reapply animation
                }
            });
        }

        function nextSlidePremium() {
            goToSlidePremium(currentIndexPremium + 1);
        }

        function prevSlidePremium() {
            goToSlidePremium(currentIndexPremium - 1);
        }

        function startIntervalPremium() {
            slideIntervalPremium = setInterval(nextSlidePremium, 6000); // Change slide every 6 seconds
        }

        function resetIntervalPremium() {
            clearInterval(slideIntervalPremium);
            startIntervalPremium();
        }

        // Event Listeners
        nextBtnPremium.addEventListener("click", () => {
            nextSlidePremium();
            resetIntervalPremium();
        });

        prevBtnPremium.addEventListener("click", () => {
            prevSlidePremium();
            resetIntervalPremium();
        });

        // Start auto-slide
        startIntervalPremium();
    }

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const body = document.querySelector("body");
    const primaryNav = document.querySelector(".primary-navigation");

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener("click", () => {
            // মেন্যু খোলা বা বন্ধ করা
            body.classList.toggle("nav-open");
            const isExpanded = body.classList.contains("nav-open");
            mobileNavToggle.setAttribute("aria-expanded", isExpanded);
        });

        // মেন্যুর বাইরে ক্লিক করলে মেন্যু বন্ধ করা
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
                if (window.scrollY >= sectionTop - 150) { // 150px offset for header
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
    
    // --- Portfolio Page Filter Logic ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item-card"); // Changed from .gallery-item

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Set active class on button
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filterValue = button.getAttribute("data-filter");

                galleryItems.forEach(item => {
                    // Show/hide items based on filter
                    if (filterValue === "all" || item.classList.contains(filterValue)) {
                        item.classList.remove("hide");
                        item.style.animation = "fadeIn 0.5s ease"; // Re-apply animation
                    } else {
                        item.classList.add("hide");
                        item.style.animation = "none";
                    }
                });
            });
        });
    }

    // --- Scroll Animation Logic ---
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