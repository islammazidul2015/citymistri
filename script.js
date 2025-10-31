document.addEventListener("DOMContentLoaded", function() {
    
    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
            // Check if this item is already active
            const isActive = item.classList.contains("active");

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove("active");
            });

            // If it was not active, open it
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });

    // --- Counter Animation Logic ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the speed, the faster the count

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;

        const updateCount = () => {
            const increment = target / speed;
            count += increment;

            if (count < target) {
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 15); // Adjust timing for smoothness
            } else {
                counter.innerText = target + "+"; // Add '+' after reaching target
            }
        };

        updateCount();
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

});