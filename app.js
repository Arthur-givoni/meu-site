'use strict';

document.addEventListener("DOMContentLoaded", function () {

    const switcher = document.querySelector(".btn");

    // ===== TEMA SALVO =====
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo) {
        document.body.className = temaSalvo;
    }

    // ===== ÍCONE INICIAL =====
    if (document.body.classList.contains("dark-theme")) {
        switcher.textContent = "☀️";
    } else {
        switcher.textContent = "🌙";
    }

    // ===== BOTÃO DE TEMA =====
    switcher.addEventListener("click", function () {
        if (document.body.classList.contains("light-theme")) {
            document.body.classList.replace("light-theme", "dark-theme");
            this.textContent = "☀️";
            localStorage.setItem("tema", "dark-theme");
        } else {
            document.body.classList.replace("dark-theme", "light-theme");
            this.textContent = "🌙";
            localStorage.setItem("tema", "light-theme");
        }
    });

    // ===== ANIMAÇÃO AO CARREGAR =====
    document.body.classList.add("fade-in");

});

// ===== NAVEGAÇÃO ENTRE PÁGINAS =====
function goToPage(url) {
    window.location.href = url;
}
