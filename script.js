// =========================================================
// PORTFOLIO JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {


    // =====================================================
    // ELEMENTS
    // =====================================================

    const navbar =
        document.querySelector(".navbar");

    const menuBtn =
        document.getElementById("menuBtn");

    const navMenu =
        document.querySelector(".nav-menu");

    const themeBtn =
        document.getElementById("themeBtn");

    const revealElements =
        document.querySelectorAll(".reveal");

    const counters =
        document.querySelectorAll(".counter");

    const filters =
        document.querySelectorAll(".filter");

    const projectCards =
        document.querySelectorAll(".project-card");

    const typingText =
        document.querySelector(".typing-text");

    const navLinks =
        document.querySelectorAll(".nav-menu a");

    const sections =
        document.querySelectorAll("section[id]");


    // =====================================================
    // MOBILE MENU
    // =====================================================

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            if (navMenu.classList.contains("open")) {

                menuBtn.textContent = "✕";

            } else {

                menuBtn.textContent = "☰";

            }

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuBtn.textContent = "☰";

            });

        });

    }


    // =====================================================
    // NAVBAR SCROLL
    // =====================================================

    function handleNavbar() {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleNavbar
    );

    handleNavbar();


    // =====================================================
    // SCROLL REVEAL
    // =====================================================

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    // =====================================================
    // COUNTER ANIMATION
    // =====================================================

    function animateCounter(counter) {

        const target =
            Number(counter.dataset.target);

        const duration = 1200;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );


            const easeOut =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const current =
                Math.floor(
                    target * easeOut
                );


            counter.textContent = current;


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    const counterObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(
                            entry.target
                        );

                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.7
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    // =====================================================
    // PROJECT FILTERS
    // =====================================================

    filters.forEach(filter => {

        filter.addEventListener("click", () => {


            // Remove active class

            filters.forEach(button => {

                button.classList.remove(
                    "active"
                );

            });


            // Add active class

            filter.classList.add("active");


            // Get selected category

            const selectedCategory =
                filter.dataset.filter;


            // Show / hide projects

            projectCards.forEach(card => {

                const category =
                    card.dataset.category;


                if (
                    selectedCategory === "all" ||
                    category === selectedCategory
                ) {

                    card.style.display = "block";

                    setTimeout(() => {

                        card.style.opacity = "1";

                        card.style.transform =
                            "translateY(0)";

                    }, 50);

                } else {

                    card.style.opacity = "0";

                    card.style.transform =
                        "translateY(15px)";


                    setTimeout(() => {

                        card.style.display = "none";

                    }, 250);

                }

            });

        });

    });


    // =====================================================
    // TYPING EFFECT
    // =====================================================

    if (typingText) {


        const words = [
            "Data Analyst",
            "SQL Developer",
            "BI Enthusiast",
            "Data Explorer"
        ];


        let wordIndex = 0;

        let letterIndex = 0;

        let deleting = false;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {


                typingText.textContent =
                    currentWord.substring(
                        0,
                        letterIndex + 1
                    );


                letterIndex++;


                if (
                    letterIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1500
                    );

                    return;

                }

            } else {


                typingText.textContent =
                    currentWord.substring(
                        0,
                        letterIndex - 1
                    );


                letterIndex--;


                if (letterIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (
                            wordIndex + 1
                        ) %
                        words.length;

                }

            }


            const speed =
                deleting
                    ? 45
                    : 80;


            setTimeout(
                typeEffect,
                speed
            );

        }


        typingText.textContent = "";

        typeEffect();

    }


    // =====================================================
    // ACTIVE NAVIGATION
    // =====================================================

    function updateActiveNav() {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    // =====================================================
    // THEME BUTTON
    // =====================================================

    if (themeBtn) {

        themeBtn.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light-mode"
                );


                if (
                    document.body.classList.contains(
                        "light-mode"
                    )
                ) {

                    themeBtn.textContent = "☀";

                } else {

                    themeBtn.textContent = "☾";

                }

            }
        );

    }


    // =====================================================
    // PROJECT CARD MOUSE EFFECT
    // =====================================================

    projectCards.forEach(card => {


        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    (
                        (y / rect.height) -
                        0.5
                    ) * -3;


                const rotateY =
                    (
                        (x / rect.width) -
                        0.5
                    ) * 3;


                card.style.transform =
                    `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    `
                    perspective(800px)
                    rotateX(0)
                    rotateY(0)
                    translateY(0)
                    `;

            }
        );

    });


    // =====================================================
    // ESC KEY
    // =====================================================

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (navMenu) {

                    navMenu.classList.remove(
                        "open"
                    );

                }

                if (menuBtn) {

                    menuBtn.textContent = "☰";

                }

            }

        }
    );


    // =====================================================
    // DEFAULT PROJECT VIEW
    // =====================================================

    projectCards.forEach(card => {

        card.style.display = "block";

        card.style.opacity = "1";

        card.style.transform =
            "translateY(0)";

    });


    // =====================================================
    // CONSOLE MESSAGE
    // =====================================================

    console.log(
        "Malik Ali Portfolio Loaded Successfully 🚀"
    );

});
