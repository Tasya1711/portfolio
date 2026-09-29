(function () {
  var SHARED = {
    "brand.logo": { uk: "Н. Бабич", en: "N. Babych" },
    "nav.projects": { uk: "Проєкти", en: "Projects" },
    "nav.services": { uk: "Послуги", en: "Services" },
    "nav.process": { uk: "Процес", en: "Process" },
    "nav.about": { uk: "Про мене", en: "About" },
    "nav.skills": { uk: "Навички", en: "Skills" },
    "nav.contact": { uk: "Контакти", en: "Contact" },

    "footer.heading": { uk: "Контакти", en: "Contact" },
    "footer.lead": {
      uk: "Маєте ідею для сайту? Напишіть, і обговоримо деталі.",
      en: "Have an idea for a website? Write to me and let’s discuss the details.",
    },
    "footer.closing": {
      uk: "Створімо щось разом",
      en: "Let’s build something together",
    },
    "footer.label.email": { uk: "Email", en: "Email" },
    "footer.label.telegram": { uk: "Telegram", en: "Telegram" },
    "footer.label.instagram": { uk: "Instagram", en: "Instagram" },
    "footer.rights": { uk: "© 2026 Наталія Бабич", en: "© 2026 Natalie Babych" },

    "project.back": { uk: "Усі проєкти", en: "All projects" },
    "project.visit": { uk: "Переглянути сайт", en: "Visit website" },

    "device.label": { uk: "Перегляд", en: "Preview" },
    "device.desktop": { uk: "Десктоп", en: "Desktop" },
    "device.tablet": { uk: "Планшет", en: "Tablet" },
    "device.mobile": { uk: "Мобільний", en: "Mobile" },
  };

  function getLang() {
    try {
      return localStorage.getItem("lang") || "uk";
    } catch (e) {
      return "uk";
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {}
  }

  function apply(lang) {
    var dict = Object.assign({}, SHARED, window.PAGE_I18N || {});
    document.documentElement.lang = lang === "en" ? "en" : "uk";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var entry = dict[key];
      if (!entry) return;
      var value = entry[lang];
      if (value == null) return;

      var attr = el.getAttribute("data-i18n-attr");
      if (attr) {
        el.setAttribute(attr, value);
      } else {
        el.innerHTML = value;
      }
    });

    document.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });

    if (dict.__title) document.title = dict.__title[lang];
    if (dict.__description) {
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", dict.__description[lang]);
    }
  }

  function init() {
    var lang = getLang();
    apply(lang);

    document.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang");
        setLang(lang);
        apply(lang);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
