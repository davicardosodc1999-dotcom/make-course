const COOKIE_CONSENT_KEY = "belezaEmFocoCookieConsent";

const cookieBanner = document.getElementById("cookie-banner");
const cookieAccept = document.getElementById("cookie-accept");
const cookieReject = document.getElementById("cookie-reject");
const cookieSettings = document.getElementById("cookie-settings");

function getCookieConsent() {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch (error) {
    return null;
  }
}

function saveCookieConsent(value) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch (error) {
    console.warn("Não foi possível salvar a preferência de cookies.", error);
  }
}

function showCookieBanner() {
  if (!cookieBanner) {
    return;
  }

  cookieBanner.removeAttribute("hidden");
}

function hideCookieBanner() {
  if (!cookieBanner) {
    return;
  }

  cookieBanner.setAttribute("hidden", "");
}

function initializeCookieConsent() {
  const savedConsent = getCookieConsent();

  if (!savedConsent) {
    setTimeout(() => {
      showCookieBanner();
    }, 700);
  }
}

if (cookieAccept) {
  cookieAccept.addEventListener("click", () => {
    saveCookieConsent("accepted");
    hideCookieBanner();
  });
}

if (cookieReject) {
  cookieReject.addEventListener("click", () => {
    saveCookieConsent("rejected");
    hideCookieBanner();
  });
}

if (cookieSettings) {
  cookieSettings.addEventListener("click", () => {
    const message =
      "Configuração demonstrativa: a integração com uma plataforma real de gerenciamento de consentimento será configurada posteriormente.";

    alert(message);
  });
}

document.addEventListener("DOMContentLoaded", initializeCookieConsent);