(function () {
  var stage = document.querySelector(".project-preview");
  var frame = document.getElementById("previewDevice");
  var buttons = document.querySelectorAll(".device-switch__btn");
  var SCROLLBAR_GUTTER = 20;
  var NATURAL_WIDTH = { desktop: 1440, tablet: 834, mobile: 390 };

  if (!stage || !frame) return;

  function layout() {
    var device = frame.getAttribute("data-device");
    var naturalWidth = NATURAL_WIDTH[device];

    var stagePadding = 56;
    var availableWidth = stage.clientWidth - stagePadding;
    var availableHeight = stage.clientHeight - stagePadding;
    var scale = Math.min(1, availableWidth / naturalWidth);

    frame.style.width = naturalWidth - SCROLLBAR_GUTTER + "px";
    frame.style.height = availableHeight / scale + "px";
    frame.style.transform = "scale(" + scale + ")";
  }

  function setDevice(mode) {
    frame.setAttribute("data-device", mode);
    layout();

    buttons.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-device") === mode);
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setDevice(btn.getAttribute("data-device"));
    });
  });

  window.addEventListener("resize", layout);

  setDevice("desktop");
})();
