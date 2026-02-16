document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const subject =
        document.getElementById("subject").value.trim() ||
        "Richiesta di informazioni - Sito Web";
      const message = document.getElementById("message").value.trim();
      const privacyChecked = document.getElementById("privacy").checked;

      // Validazioni
      if (!name || !email || !phone || !message) {
        showToast("⚠️ Compila tutti i campi obbligatori.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast("📧 Inserisci un indirizzo email valido.");
        return;
      }

      if (!privacyChecked) {
        showToast("🔒 Devi accettare la privacy policy.");
        return;
      }

      // Corpo email codificato
      const body = encodeURIComponent(
        `Nome: ${name}\nEmail: ${email}\nTelefono: ${phone}\n\nMessaggio:\n${message}`
      );

      // Invia con mailto
      window.location.href = `mailto:avvocato@studiolegalepennisi.com?subject=${encodeURIComponent(
        subject
      )}&body=${body}`;

      // Reset form e feedback
      form.reset();
      showToast("✅ Grazie! Si aprirà il tuo client email per completare l’invio.");
    });
  }

  // Mostra banner cookie se non accettato
  checkCookieConsent();

  // Smooth scroll nav (esistente)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

/* Cookie functions */
function checkCookieConsent() {
  const consent = localStorage.getItem("cookie-consent");
  if (consent === "accepted") {
    activateScripts();
  } else if (consent === "rejected") {
    // Non facciamo nulla, gli script restano bloccati
  } else {
    // Nessuna scelta effettuata, mostra banner
    const banner = document.getElementById("cookieBanner");
    if (banner) banner.style.display = "block";
  }
}

function handleCookies(choice) {
  const banner = document.getElementById("cookieBanner");
  if (banner) banner.style.display = "none";

  if (choice === 'all') {
    localStorage.setItem("cookie-consent", "accepted");
    activateScripts();
    showToast("🍪 Cookie accettati. Grazie!");
  } else {
    localStorage.setItem("cookie-consent", "rejected");
    showToast("🍪 Hai rifiutato i cookie non essenziali.");
  }
}

function activateScripts() {
  // Trova tutti gli script con data-cookiecategory="analytics" e li attiva
  const scripts = document.querySelectorAll('script[data-cookiecategory="analytics"]');
  
  scripts.forEach(script => {
    // Crea un nuovo elemento script
    const newScript = document.createElement('script');
    
    // Copia gli attributi (tranne type che diventa default JS)
    if (script.src) newScript.src = script.src;
    if (script.innerHTML) newScript.innerHTML = script.innerHTML;
    newScript.async = true;

    // Sostituisce il vecchio script o lo appende
    script.parentNode.insertBefore(newScript, script);
    script.remove(); // Rimuove il placeholder
  });

  // Nasconde il placeholder delle recensioni se presente
  const placeholder = document.querySelector('.cookie-placeholder');
  if(placeholder) placeholder.style.display = 'none';
}

/* Toast */
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
