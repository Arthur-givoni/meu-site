const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const themeBtn = document.getElementById("themeBtn");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const icon = themeBtn.querySelector("i");
    if (document.body.classList.contains("dark")) {
      icon.className = "fa-solid fa-sun";
    } else {
      icon.className = "fa-solid fa-moon";
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.88;

  revealElements.forEach((element) => {
    const top = element.getBoundingClientRect().top;
    if (top < trigger) {
      element.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const skillBars = document.querySelectorAll(".skill-bar span");
let skillsAnimated = false;

const animateSkills = () => {
  const skillsSection = document.getElementById("habilidades");
  if (!skillsSection || skillsAnimated) return;

  const top = skillsSection.getBoundingClientRect().top;
  if (top < window.innerHeight * 0.85) {
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width;
    });
    skillsAnimated = true;
  }
};

window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);

const counters = document.querySelectorAll(".counter");
let countersStarted = false;

const animateCounters = () => {
  const statsSection = document.querySelector(".stats");
  if (!statsSection || countersStarted) return;

  const top = statsSection.getBoundingClientRect().top;
  if (top < window.innerHeight * 0.88) {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);
      const duration = 1200;
      const stepTime = Math.max(20, Math.floor(duration / target));
      let current = 0;

      const timer = setInterval(() => {
        current += 1;
        counter.textContent = current;

        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        }
      }, stepTime);
    });

    countersStarted = true;
  }
};

window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters);

const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".skills-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabPanels.forEach((panel) => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target).classList.add("active");

    const visibleBars = document.querySelectorAll(`#${target} .skill-bar span`);
    visibleBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width;
    });
  });
});

const typingText = document.getElementById("typingText");

if (typingText) {
  const words = [
    "Monitoramento de redes",
    "Suporte técnico",
    "Desenvolvimento Front-End",
    "Infraestrutura",
    "Desenvolvimento web"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    const currentText = currentWord.substring(0, charIndex);

    typingText.textContent = currentText;

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(typeEffect, 90);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 45);
    } else {
      isDeleting = !isDeleting;

      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }

      setTimeout(typeEffect, isDeleting ? 1000 : 250);
    }
  }

  typeEffect();

}
