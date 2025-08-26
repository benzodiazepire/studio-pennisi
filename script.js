document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
  
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const subject = document.getElementById("subject").value.trim() || "Richiesta di informazioni - Sito Web";
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
        window.location.href = `mailto:avvocato@studiolegalepennisi.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  
        // Reset form
        form.reset();
        showToast("✅ Grazie! Si aprirà il tuo client email per completare l’invio.");
      });
    }
  
    // Cookie banner
    checkCookieConsent();
  
    // Smooth scroll nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
        });
      });
    });
  });
  
  // Cookie functions
  function checkCookieConsent() {
    if (!localStorage.getItem("cookiesAccepted")) {
      document.getElementById("cookieBanner").style.display = "block";
    }
  }
  
  function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    document.getElementById("cookieBanner").style.display = "none";
    showToast("🍪 Preferenze cookie salvate.");
  }
  
  function showCookieInfo() {
    showToast("ℹ️ Questo sito utilizza solo cookie tecnici necessari al funzionamento.");
  }
  
  // Toast
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
  