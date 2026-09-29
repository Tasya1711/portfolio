(function () {
  var items = document.querySelectorAll(".process-item");
  if (!items.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-active", entry.isIntersecting);
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  items.forEach(function (item) {
    observer.observe(item);
  });

  items[0].classList.add("is-active");
})();
