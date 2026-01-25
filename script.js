(() => {
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const yearEl = document.getElementById("year");

    yearEl.textContent = new Date().getFullYear();

    // Theme
    const saved = localStorage.getItem("theme");
    const prefersLight = globalThis.matchMedia?.("(prefers-color-scheme: light)").matches;
    const initial = saved || (prefersLight ? "light" : "dark");
    setTheme(initial);

    function setTheme(mode) {
        if (mode === "light") {
            root.dataset.theme = "light";
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem("theme", "light");
        } else {
            delete root.dataset.theme;
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem("theme", "dark");
        }
    }

    themeToggle.addEventListener("click", () => {
        const isLight = root.dataset.theme === "light";
        setTheme(isLight ? "dark" : "light");
    });

    // Mobile menu
    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });

    mobileMenu.addEventListener("click", (e) => {
        if (e.target.classList.contains("mLink")) {
            mobileMenu.classList.remove("open");
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 820) mobileMenu.classList.remove("open");
    });
    
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const message = contactForm.querySelector("textarea").value.trim();

        if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
        }

        const subject = encodeURIComponent(`Portfolio Message from ${name}`);
        const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        globalThis.location.href = `mailto:l.shu.520536@umindanao.edu.ph?subject=${subject}&body=${body}`;
    });
    }

})();
