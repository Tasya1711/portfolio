(function () {
  var stage = document.querySelector(".project-preview__stage");
  var device = document.getElementById("previewDevice");
  var iframe = device ? device.querySelector("iframe") : null;
  var buttons = document.querySelectorAll(".device-switch__btn");

  if (!stage || !device || !iframe) return;

  function applyHeight(mode) {
    var h = device.getAttribute("data-" + mode + "-height") || "3200";
    iframe.style.height = h + "px";
  }

  function applyZoom() {
    var padding = 56;
    var available = stage.clientWidth - padding;
    var deviceWidth = device.getBoundingClientRect().width / (device.style.zoom || 1);
    var natural = { desktop: 1440, tablet: 834, mobile: 390 }[device.getAttribute("data-device")];
    var scale = Math.min(1, available / natural);
    device.style.zoom = scale;
  }

  function setDevice(mode) {
    device.setAttribute("data-device", mode);
    applyHeight(mode);
    applyZoom();

    buttons.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-device") === mode);
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setDevice(btn.getAttribute("data-device"));
    });
  });

  window.addEventListener("resize", applyZoom);

  setDevice("desktop");
})();
