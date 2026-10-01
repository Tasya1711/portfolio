(function () {
  var header = document.querySelector(".header");
  var burger = document.querySelector(".header__burger");
  var navList = document.querySelector(".header__nav-list");

  if (header) {
    var onScroll = function () {
      var hero = document.querySelector(".hero");
      var threshold = hero ? hero.offsetHeight - header.offsetHeight : 8;
      header.classList.toggle("is-scrolled", window.scrollY >= threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (burger && navList) {
    burger.addEventListener("click", function () {
      navList.classList.toggle("is-open");
      burger.classList.toggle("is-open");
    });

    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("is-open");
        burger.classList.remove("is-open");
      });
    });
  }
})();

(function () {
  var track = document.querySelector(".projects__track");
  var next = document.querySelector(".projects__next");

  if (track && next) {
    var update = function () {
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      next.classList.toggle("is-hidden", atEnd);
    };
    next.addEventListener("click", function () {
      track.scrollBy({ left: track.clientWidth * 0.6, behavior: "smooth" });
    });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  var cards = document.querySelectorAll(".service-card");
  cards.forEach(function (card) {
    var off = function () { card.classList.remove("is-active"); };
    card.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse") return;
      card.classList.add("is-active");
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (type) {
      card.addEventListener(type, function (e) {
        if (e.pointerType === "mouse") return;
        off();
      });
    });
    card.addEventListener("touchend", off);
    card.addEventListener("touchcancel", off);
    card.addEventListener("contextmenu", function (e) {
      if (e.pointerType !== "mouse") off();
    });
  });
})();

(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("copy", function (e) {
    var t = e.target;
    if (t && t.closest && t.closest("input, textarea")) return;
    e.preventDefault();
  });

  document.addEventListener("gesturestart", function (e) { e.preventDefault(); });
  document.addEventListener("gesturechange", function (e) { e.preventDefault(); });
  window.addEventListener("wheel", function (e) {
    if (e.ctrlKey) e.preventDefault();
  }, { passive: false });

  if (reduce || !("IntersectionObserver" in window)) return;

  var groups = [
    ".projects .section-title",
    ".projects__info",
    ".project-card",
    ".services__title",
    ".service-card",
    ".process .section-tag",
    ".process .section-title",
    ".process-item",
    ".about__photo",
    ".about__inner > div:last-child",
    ".skills__headline",
    ".skill-card",
    ".footer__heading",
    ".footer__intro",
    ".footer__details"
  ];

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: "0px 0px -6% 0px" });

  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.setProperty("--reveal-delay", (i % 4) * 0.08 + "s");
      io.observe(el);
    });
  });
})();
