(function () {
  var header = document.querySelector(".header");
  var burger = document.querySelector(".header__burger");
  var navList = document.querySelector(".header__nav-list");

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
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
