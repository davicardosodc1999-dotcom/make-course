/* LUME — Progresso, menu, FAQ, scroll, reveals */

(function () {
  "use strict";

  const LESSONS = [
    "lesson-01",
    "lesson-02",
    "lesson-03",
    "lesson-04",
    "lesson-05",
    "lesson-06"
  ];

  const STORAGE_KEY = "lume_progress_v1";

  function getProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { completed: [], current: null };
    } catch {
      return { completed: [], current: null };
    }
  }

  function saveProgress(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function markLessonComplete(id) {
    const data = getProgress();
    if (!data.completed.includes(id)) {
      data.completed.push(id);
    }
    data.current = id;
    saveProgress(data);
    updateUI();
  }

  function isComplete(id) {
    return getProgress().completed.includes(id);
  }

  function percent() {
    return Math.round((getProgress().completed.length / LESSONS.length) * 100);
  }

  function updateUI() {
    const data = getProgress();
    const count = data.completed.length;
    const pct = percent();

    document.querySelectorAll("[data-progress-count]").forEach((el) => {
      el.textContent = count + " de 6 aulas concluídas";
    });
    document.querySelectorAll("[data-progress-percent]").forEach((el) => {
      el.textContent = pct + "%";
    });
    document.querySelectorAll("[data-progress-fill]").forEach((el) => {
      el.style.width = pct + "%";
    });

    document.querySelectorAll("[data-lesson-id]").forEach((card) => {
      const id = card.getAttribute("data-lesson-id");
      const dot = card.querySelector(".progress-dot");
      if (dot) {
        dot.classList.toggle("done", isComplete(id));
      }
    });

    const markBtn = document.querySelector("[data-mark-complete]");
    if (markBtn) {
      const id = markBtn.getAttribute("data-mark-complete");
      if (isComplete(id)) {
        markBtn.textContent = "Aula concluída ✓";
        markBtn.disabled = true;
        markBtn.classList.add("done");
      }
    }
  }

  function initScrollProgress() {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + "%";
    }, { passive: true });
  }

  function initHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const drawer = document.querySelector(".nav-mobile");
    const closeBtn = document.querySelector(".nav-mobile-close");
    if (!toggle || !drawer) return;

    function open() {
      drawer.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function close() {
      drawer.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    toggle.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  function initFAQ() {
    document.querySelectorAll(".faq-question").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const answer = item.querySelector(".faq-answer");
        const isOpen = item.classList.contains("open");

        document.querySelectorAll(".faq-item.open").forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove("open");
            openItem.querySelector(".faq-answer").style.maxHeight = null;
            openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          }
        });

        if (isOpen) {
          item.classList.remove("open");
          answer.style.maxHeight = null;
          btn.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("open");
          answer.style.maxHeight = answer.scrollHeight + "px";
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  function initMarkComplete() {
    const btn = document.querySelector("[data-mark-complete]");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-mark-complete");
      markLessonComplete(id);
    });
  }

  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id === "#") return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initScrollProgress();
    initHeader();
    initMobileMenu();
    initFAQ();
    initReveal();
    initMarkComplete();
    initAnchors();
    updateUI();
  });

  window.LumeProgress = { getProgress, markLessonComplete, isComplete, percent };
})();
