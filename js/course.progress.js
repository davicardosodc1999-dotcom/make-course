const COURSE_PROGRESS_KEY = "belezaEmFocoCourseProgress";

function getCourseProgress() {
  try {
    const raw = localStorage.getItem(COURSE_PROGRESS_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Não foi possível ler o progresso do curso.", error);
    return [];
  }
}

function saveCourseProgress(progress) {
  try {
    localStorage.setItem(
      COURSE_PROGRESS_KEY,
      JSON.stringify(progress)
    );
  } catch (error) {
    console.warn("Não foi possível salvar o progresso do curso.", error);
  }
}

function isLessonCompleted(lessonId) {
  return getCourseProgress().includes(lessonId);
}

function setLessonCompleted(lessonId, completed = true) {
  if (!lessonId) {
    return;
  }

  const progress = getCourseProgress();
  const index = progress.indexOf(lessonId);

  if (completed && index === -1) {
    progress.push(lessonId);
  }

  if (!completed && index !== -1) {
    progress.splice(index, 1);
  }

  saveCourseProgress(progress);
  updateCourseProgressUI();
}

function toggleLessonCompleted(lessonId) {
  const completed = isLessonCompleted(lessonId);

  setLessonCompleted(
    lessonId,
    !completed
  );
}

function updateCourseProgressUI() {
  const progress = getCourseProgress();

  const totalLessons = 6;
  const completedCount = progress.length;

  const percentage = Math.round(
    (completedCount / totalLessons) * 100
  );

  const percentageElement =
    document.getElementById("course-progress-percentage");

  const progressFill =
    document.getElementById("course-progress-fill");

  const completedCountElement =
    document.getElementById("completed-lessons-count");

  if (percentageElement) {
    percentageElement.textContent =
      `${percentage}%`;
  }

  if (progressFill) {
    progressFill.style.width =
      `${percentage}%`;
  }

  if (completedCountElement) {
    completedCountElement.textContent =
      String(completedCount);
  }

  document
    .querySelectorAll(".lesson-card[data-lesson-id]")
    .forEach((card) => {
      const lessonId =
        card.dataset.lessonId;

      card.classList.toggle(
        "completed",
        progress.includes(lessonId)
      );
    });

  document
    .querySelectorAll(".course-lesson-link[data-lesson-id]")
    .forEach((link) => {
      const lessonId =
        link.dataset.lessonId;

      link.classList.toggle(
        "completed",
        progress.includes(lessonId)
      );
    });

  document
    .querySelectorAll("[data-mark-complete]")
    .forEach((button) => {
      const lessonId =
        button.dataset.markComplete;

      const completed =
        progress.includes(lessonId);

      button.classList.toggle(
        "completed",
        completed
      );

      button.textContent =
        completed
          ? "✓ Aula concluída"
          : "Marcar aula como concluída";

      button.setAttribute(
        "aria-pressed",
        completed ? "true" : "false"
      );

      const message =
        button
          .closest(".mark-complete")
          ?.querySelector(".lesson-complete-message");

      if (message) {
        message.textContent =
          completed
            ? "Seu progresso foi salvo neste navegador."
            : "";
      }
    });

  document
    .querySelectorAll(".course-sidebar-progress-fill")
    .forEach((fill) => {
      fill.style.width =
        `${percentage}%`;
    });

  document
    .querySelectorAll(".course-sidebar-progress-percentage")
    .forEach((element) => {
      element.textContent =
        `${percentage}%`;
    });
}

document.addEventListener("click", (event) => {
  const button =
    event.target.closest("[data-mark-complete]");

  if (!button) {
    return;
  }

  event.preventDefault();

  const lessonId =
    button.dataset.markComplete;

  if (!lessonId) {
    return;
  }

  toggleLessonCompleted(lessonId);
});

document.addEventListener(
  "DOMContentLoaded",
  updateCourseProgressUI
);

window.addEventListener("storage", (event) => {
  if (event.key === COURSE_PROGRESS_KEY) {
    updateCourseProgressUI();
  }
});