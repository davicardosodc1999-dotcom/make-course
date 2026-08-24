const loadMoreButton = document.getElementById("load-more-articles");
const additionalArticles = document.getElementById("additional-articles");

if (loadMoreButton && additionalArticles) {
  loadMoreButton.addEventListener("click", () => {
    const isHidden = additionalArticles.hasAttribute("hidden");

    if (isHidden) {
      additionalArticles.removeAttribute("hidden");

      loadMoreButton.innerHTML = `
        <span aria-hidden="true">↑</span>
        Mostrar menos artigos
      `;

      additionalArticles.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "nearest"
      });
    } else {
      additionalArticles.setAttribute("hidden", "");

      loadMoreButton.innerHTML = `
        <span aria-hidden="true">⟳</span>
        Carregar mais artigos
      `;
    }
  });
}