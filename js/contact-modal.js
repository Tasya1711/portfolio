(function () {
  var modal = document.getElementById("contactModal");
  if (!modal) return;

  function open() {
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".js-contact-trigger").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      open();
    });
  });

  modal.querySelectorAll("[data-contact-close]").forEach(function (el) {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
