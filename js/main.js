const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mainNavigation = document.getElementById("main-navigation");
const dropdownButtons = document.querySelectorAll(".nav-dropdown-button");
const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmail = document.getElementById("newsletter-email");
const newsletterFeedback = document.getElementById("newsletter-feedback");

if (mobileMenuToggle && mainNavigation) {
  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = mainNavigation.classList.toggle("is-open");

    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu"
    );

    if (!isOpen) {
      document.querySelectorAll(".has-dropdown.open").forEach((item) => {
        item.classList.remove("open");

        const button = item.querySelector(".nav-dropdown-button");

        if (button) {
          button.setAttribute("aria-expanded", "false");
        }
      });
    }
  });
}

dropdownButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const parent = button.closest(".has-dropdown");

    if (!parent) {
      return;
    }

    if (window.innerWidth <= 760) {
      event.preventDefault();

      const isOpen = parent.classList.contains("open");

      document.querySelectorAll(".has-dropdown.open").forEach((item) => {
        if (item !== parent) {
          item.classList.remove("open");

          const otherButton = item.querySelector(".nav-dropdown-button");

          if (otherButton) {
            otherButton.setAttribute("aria-expanded", "false");
          }
        }
      });

      parent.classList.toggle("open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
    }
  });

  button.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const parent = button.closest(".has-dropdown");

      if (parent) {
        parent.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        button.focus();
      }
    }
  });
});

document.addEventListener("click", (event) => {
  if (window.innerWidth > 760) {
    return;
  }

  const clickedInsideNavigation = mainNavigation?.contains(event.target);
  const clickedToggle = mobileMenuToggle?.contains(event.target);

  if (!clickedInsideNavigation && !clickedToggle) {
    mainNavigation?.classList.remove("is-open");

    mobileMenuToggle?.setAttribute("aria-expanded", "false");
    mobileMenuToggle?.setAttribute("aria-label", "Abrir menu");

    document.querySelectorAll(".has-dropdown.open").forEach((item) => {
      item.classList.remove("open");

      const button = item.querySelector(".nav-dropdown-button");

      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    mainNavigation?.classList.remove("is-open");
    mobileMenuToggle?.setAttribute("aria-expanded", "false");
    mobileMenuToggle?.setAttribute("aria-label", "Abrir menu");

    document.querySelectorAll(".has-dropdown.open").forEach((item) => {
      item.classList.remove("open");

      const button = item.querySelector(".nav-dropdown-button");

      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
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
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start"
    });

    if (window.innerWidth <= 760) {
      mainNavigation?.classList.remove("is-open");
      mobileMenuToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

if (newsletterForm && newsletterEmail && newsletterFeedback) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = newsletterEmail.value.trim();

    if (!email) {
      newsletterFeedback.textContent =
        "Digite seu e-mail antes de continuar.";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      newsletterFeedback.textContent =
        "Digite um endereço de e-mail válido.";
      return;
    }

    newsletterFeedback.textContent =
      "Cadastro demonstrativo. Integração de newsletter será configurada posteriormente.";

    newsletterForm.reset();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  document.querySelectorAll(".has-dropdown.open").forEach((item) => {
    item.classList.remove("open");

    const button = item.querySelector(".nav-dropdown-button");

    if (button) {
      button.setAttribute("aria-expanded", "false");
    }
  });

  if (window.innerWidth <= 760) {
    mainNavigation?.classList.remove("is-open");
    mobileMenuToggle?.setAttribute("aria-expanded", "false");
    mobileMenuToggle?.setAttribute("aria-label", "Abrir menu");
  }
});