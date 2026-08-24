const FAVORITES_KEY = "belezaEmFocoFavorites";

function getFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Não foi possível ler os favoritos.", error);
    return [];
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.warn("Não foi possível salvar os favoritos.", error);
  }
}

function updateFavoritesCounter() {
  const counter = document.getElementById("favorites-count");

  if (!counter) {
    return;
  }

  const favorites = getFavorites();
  counter.textContent = String(favorites.length);
}

function updateFavoriteButtons() {
  const favorites = getFavorites();

  document.querySelectorAll(".favorite-toggle").forEach((button) => {
    const articleId = button.dataset.favoriteId;

    if (!articleId) {
      return;
    }

    const isFavorite = favorites.includes(articleId);

    button.classList.toggle("is-favorite", isFavorite);

    button.textContent = isFavorite ? "♥" : "♡";

    button.setAttribute(
      "aria-label",
      isFavorite
        ? "Remover artigo dos favoritos"
        : "Adicionar artigo aos favoritos"
    );

    button.setAttribute(
      "aria-pressed",
      isFavorite ? "true" : "false"
    );
  });
}

function toggleFavorite(articleId) {
  if (!articleId) {
    return;
  }

  const favorites = getFavorites();

  const index = favorites.indexOf(articleId);

  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(articleId);
  }

  saveFavorites(favorites);

  updateFavoritesCounter();
  updateFavoriteButtons();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".favorite-toggle");

  if (!button) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const articleId = button.dataset.favoriteId;

  toggleFavorite(articleId);
});

document.addEventListener("DOMContentLoaded", () => {
  updateFavoritesCounter();
  updateFavoriteButtons();
});

window.addEventListener("storage", (event) => {
  if (event.key !== FAVORITES_KEY) {
    return;
  }

  updateFavoritesCounter();
  updateFavoriteButtons();
});