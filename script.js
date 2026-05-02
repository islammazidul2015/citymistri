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

    // --- Premium Hero Slider Logic (FIXED) ---
    const sliderWrapperPremium = document.querySelector(".hero-slider-premium"); 
    if (sliderWrapperPremium) {
        const slidesPremium = document.querySelectorAll(".slide-premium");
        const prevBtnPremium = document.querySelector(".prev-btn-premium");
        const nextBtnPremium = document.querySelector(".next-btn-premium");
        const dotsContainerPremium = document.querySelector(".slider-dots-premium");
        
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
    
    // --- 6. Portfolio Page Filter Logic ---
    const portfolioComponents = document.querySelectorAll(".portfolio-page-content, .homepage-portfolio-component"); 

    if (portfolioComponents.length > 0) {
        portfolioComponents.forEach(component => {
            const filterButtons = component.querySelectorAll(".filter-btn");
            const galleryItems = component.querySelectorAll(".gallery-item-card");

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
            threshold: 0.15 
        });

        hiddenSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
});

// --- 7. Portfolio Detail Modal (Lightbox) Logic ---
const modal = document.getElementById("projectModal");
const closeBtn = document.querySelector(".close-btn");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalWhatsappLink = document.getElementById("modalWhatsappLink");

const galleryCards = document.querySelectorAll(".portfolio-gallery-grid .gallery-item-card");

// CRITICAL NULL CHECK ADDED HERE
if (modal && closeBtn) { 
    if (galleryCards.length > 0) {
        galleryCards.forEach(card => {
            card.addEventListener("click", (e) => {
                if (e.target.closest('.gallery-item-card')) {
                    const imgSource = card.getAttribute("data-img");
                    const titleText = card.getAttribute("data-title");
                    const descriptionText = card.getAttribute("data-description");
                    
                    modalImage.src = imgSource;
                    modalImage.alt = titleText;
                    modalTitle.textContent = titleText;
                    modalDescription.textContent = descriptionText;

                    const whatsappBaseUrl = "https://wa.me/8801997426656?text=";
                    const encodedMessage = encodeURIComponent(`Hello, I am interested in the '${titleText}' design I saw on your portfolio. Can you share a quote?`);
                    modalWhatsappLink.href = whatsappBaseUrl + encodedMessage;

                    modal.style.display = "block";
                    document.body.style.overflow = "hidden"; 
                }
            });
        });
    }

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; 
    }

    closeBtn.onclick = closeModal;

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
}

// 1. Wait for the webpage to fully load
document.addEventListener("DOMContentLoaded", function() {
    
    // 2. Select all the quantity boxes on the page
    const qtyBoxes = document.querySelectorAll('.qty-box');

    // 3. Loop through each box to give its buttons instructions
    if (qtyBoxes.length > 0) { // Added Null Check
        qtyBoxes.forEach(box => {
            const decreaseBtn = box.querySelector('.fa-trash-alt'); 
            const increaseBtn = box.querySelector('.fa-plus');
            const quantitySpan = box.querySelector('span');

            // 4. Add a click event to the '+' button
            if (increaseBtn && quantitySpan) {
                increaseBtn.addEventListener('click', () => {
                    let currentQuantity = parseInt(quantitySpan.innerText);
                    quantitySpan.innerText = currentQuantity + 1;
                });
            }

            // 5. Add a click event to the decrease/trash button
            if (decreaseBtn && quantitySpan) {
                decreaseBtn.addEventListener('click', () => {
                    let currentQuantity = parseInt(quantitySpan.innerText);
                    // Only decrease if the number is greater than 1
                    if (currentQuantity > 1) {
                        quantitySpan.innerText = currentQuantity - 1;
                    }
                });
            }
        });
    }
});