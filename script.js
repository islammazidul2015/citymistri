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
            updateCount();
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
    }

    // --- Homepage Slider Logic ---
    const sliderWrapper = document.querySelector(".slider-wrapper");
    if (sliderWrapper) { // Only run if the slider exists
        const slides = document.querySelectorAll(".slide");
        const prevBtn = document.querySelector(".prev-btn");
        const nextBtn = document.querySelector(".next-btn");
        const dotsContainer = document.querySelector(".slider-dots");
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        let slideInterval;

        // Create dots dynamically
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
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Event Listeners
        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener("click", () => {
            prevSlide();
            resetInterval();
        });

        // Start auto-slide
        startInterval();
    }

});