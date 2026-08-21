// =====================================================
// PORTFOLIO JAVASCRIPT
// =====================================================


// ================= NAVBAR SCROLL EFFECT =================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.style.background = "rgba(11, 11, 11, 0.97)";
        navbar.style.borderBottomColor = "#333";
    } else {
        navbar.style.background = "rgba(11, 11, 11, 0.88)";
        navbar.style.borderBottomColor = "#242424";
    }

});


// ================= SCROLL REVEAL =================

const revealElements = document.querySelectorAll(
    ".section-heading, .about-text, .education-card, .skill-card, .project-card, .contact-info, .contact-box"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


// ================= PROJECT CARD STAGGER =================

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 0.08}s`;

});


// ================= SKILL CARD STAGGER =================

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 0.08}s`;

});


// ================= ACTIVE NAVIGATION =================

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


// ================= SMOOTH NAVIGATION =================

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ================= EMAIL BUTTON =================

const emailButtons =
    document.querySelectorAll(
        'a[href^="mailto:"]'
    );

emailButtons.forEach((button) => {

    button.addEventListener("click", () => {

        console.log(
            "Opening email client..."
        );

    });

});


// ================= PHONE LINK =================

const phoneLink =
    document.querySelector(
        'a[href^="tel:"]'
    );

if (phoneLink) {

    phoneLink.addEventListener(
        "click",
        () => {

            console.log(
                "Opening phone application..."
            );

        }
    );

}


// ================= CURRENT YEAR =================

const footer =
    document.querySelector("footer");

if (footer) {

    const year =
        new Date().getFullYear();

    const footerText =
        footer.querySelector("p");

    if (footerText) {

        footerText.innerHTML =
            `© ${year} Malik Muhammad Ali Aslam. All Rights Reserved.`;

    }

}