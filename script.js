/* =========================
   CUSTOM CURSOR
========================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const cursorText = document.querySelector(".cursor-text");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

document.addEventListener("mousemove", function (event) {

    mouseX = event.clientX;
    mouseY = event.clientY;

    if (cursorDot) {
        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";
    }

    if (cursorText) {
        cursorText.style.left = mouseX + "px";
        cursorText.style.top = mouseY + "px";
    }

});


function animateCursor() {

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursorRing) {
        cursorRing.style.left = ringX + "px";
        cursorRing.style.top = ringY + "px";
    }

    requestAnimationFrame(animateCursor);

}

animateCursor();


/* =========================
   INTERACTIVE CURSOR
========================= */

const interactiveElements = document.querySelectorAll(
    "[data-cursor], .project, .skill-row, .project-link, .button, .nav-resume, .resume-button, .contact-email, .contact-links a"
);

interactiveElements.forEach(function (element) {

    element.addEventListener("mouseenter", function () {

        document.body.classList.add("cursor-active");

        const cursorValue = element.getAttribute("data-cursor");

        if (cursorText) {

            cursorText.textContent =
                cursorValue ? cursorValue : "OPEN";

        }

    });


    element.addEventListener("mouseleave", function () {

        document.body.classList.remove("cursor-active");

        if (cursorText) {
            cursorText.textContent = "VIEW";
        }

    });

});


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (!navbar) {
        return;
    }

    if (window.scrollY > 50) {

        navbar.classList.add("nav-scrolled");

    } else {

        navbar.classList.remove("nav-scrolled");

    }

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-grid, .skill-row, .project, .resume-section, .contact-grid"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add("revealed");

    });

}


/* =========================
   PROJECT IMAGE FALLBACK
========================= */

const projectImages = document.querySelectorAll(".project-image img");

projectImages.forEach(function (image) {

    image.addEventListener("error", function () {

        image.style.display = "none";

        const projectImage = image.closest(".project-image");

        if (!projectImage) {
            return;
        }

        projectImage.classList.add("image-missing");

        if (!projectImage.querySelector(".image-placeholder")) {

            const placeholder = document.createElement("div");

            placeholder.className = "image-placeholder";

            placeholder.innerHTML = `
                <span>DASHBOARD</span>
                <strong>PROJECT VISUAL</strong>
                <small>Add project screenshot here</small>
            `;

            projectImage.appendChild(placeholder);

        }

    });

});


/* =========================
   SMOOTH ANCHOR SCROLL
========================= */

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================
   PROJECT IMAGE PARALLAX
========================= */

const projects = document.querySelectorAll(".project");

projects.forEach(function (project) {

    const image = project.querySelector(".project-image img");

    if (!image) {
        return;
    }


    project.addEventListener("mousemove", function (event) {

        const rect = project.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) / 35;
        const moveY = (y - centerY) / 35;

        image.style.transform =
            `scale(1.05) translate(${moveX}px, ${moveY}px)`;

    });


    project.addEventListener("mouseleave", function () {

        image.style.transform =
            "scale(1) translate(0, 0)";

    });

});


/* =========================
   SKILL ROW HOVER
========================= */

const skillRows = document.querySelectorAll(".skill-row");

skillRows.forEach(function (row) {

    row.addEventListener("mouseenter", function () {

        row.classList.add("skill-active");

    });


    row.addEventListener("mouseleave", function () {

        row.classList.remove("skill-active");

    });

});


/* =========================
   CURRENT YEAR
========================= */

const footerYear = document.querySelector(".footer-right");

if (footerYear) {

    footerYear.textContent =
        "© " + new Date().getFullYear();

}


/* =========================
   PAGE READY
========================= */

window.addEventListener("load", function () {

    document.body.classList.add("page-loaded");

});
