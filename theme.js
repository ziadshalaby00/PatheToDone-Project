document.addEventListener("DOMContentLoaded", () => {
    const button = document.createElement("button");

    button.id = "themeToggle";

    button.innerHTML = `
        <span class="material-symbols-outlined"></span>
    `;

    const icon = button.querySelector(".material-symbols-outlined");


    /* =========================
       Button Styles
       ========================= */

    button.style.position = "fixed";
    button.style.left = "15px";
    button.style.bottom = "15px";

    button.style.width = "45px";
    button.style.height = "45px";

    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";

    button.style.border = "none";
    button.style.borderRadius = "50%";

    button.style.backgroundColor = "#ffffff";
    button.style.color = "#334155";

    button.style.cursor = "pointer";

    button.style.boxShadow = "0 3px 8px rgba(0, 0, 0, 0.3)";

    button.style.zIndex = "9999";

    button.style.transition =
        "transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease";


    /* =========================
       Theme
       ========================= */

    function updateTheme() {

        const isDark = document.body.classList.contains("dark");

        icon.textContent = isDark
            ? "light_mode"
            : "dark_mode";

        button.style.backgroundColor = isDark
            ? "#1e293b"
            : "#ffffff";

        button.style.color = isDark
            ? "#facc15"
            : "#334155";
    }


    /* =========================
       Hover
       ========================= */

    button.addEventListener("mouseenter", () => {
        button.style.transform = "scale(1.08)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "scale(1)";
    });


    /* =========================
       Load Saved Theme
       ========================= */

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    updateTheme();


    /* =========================
       Toggle Theme
       ========================= */

    button.addEventListener("click", () => {

        const isDark = document.body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        updateTheme();
    });


    document.body.appendChild(button);
});