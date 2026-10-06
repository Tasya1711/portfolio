(function () {
  var stage = document.querySelector(".project-preview");
  var frame = document.getElementById("previewDevice");
  var buttons = document.querySelectorAll(".device-switch__btn");
  var NATURAL_WIDTH = { desktop: 1440, tablet: 834, mobile: 390 };

  var MOBILE_HEIGHT = 844;

  if (!stage || !frame) return;

  var iframe = frame.querySelector("iframe");

  function scrollbarWidth() {
    var probe = document.createElement("iframe");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText = "position:absolute;top:-9999px;left:-9999px;width:120px;height:120px;border:0;visibility:hidden";
    document.body.appendChild(probe);
    var w = 0;
    try {
      var doc = probe.contentDocument;
      doc.open();
      doc.write('<!doctype html><body style="margin:0"><div id="p" style="width:100px;height:100px;overflow:scroll"></div>');
      doc.close();
      var el = doc.getElementById("p");
      w = el.offsetWidth - el.clientWidth;
    } catch (e) {}
    document.body.removeChild(probe);
    return w;
  }

  var sbw = scrollbarWidth();

  function layout() {
    var device = frame.getAttribute("data-device");
    var naturalWidth = NATURAL_WIDTH[device];
    if (device === "mobile" && window.innerWidth <= 640) {
      naturalWidth = Math.min(480, Math.max(320, window.innerWidth));
    }

    var stagePadding = 56;
    var availableWidth = stage.clientWidth - stagePadding;

    if (window.matchMedia("(max-width: 900px)").matches) {
      var natH = device === "desktop" ? naturalWidth / 1.72 : device === "tablet" ? 1112 : MOBILE_HEIGHT;
      var fit = Math.min(1, availableWidth / naturalWidth);
      stage.style.height = Math.round(natH * fit + stagePadding) + "px";
    } else {
      stage.style.height = "";
    }
    var availableHeight = stage.clientHeight - stagePadding;
    var scale = Math.min(1, availableWidth / naturalWidth);

    frame.style.width = naturalWidth + "px";
    if (iframe && sbw > 0) {
      iframe.style.width = naturalWidth + sbw + "px";
      iframe.style.minWidth = "0";
    }
    if (sbw > 0) frame.style.overflow = "hidden";
    if (device === "mobile") {
      scale = Math.min(scale, availableHeight / MOBILE_HEIGHT);
    }
    var height = availableHeight / scale;
    var top = 0;
    if (device === "mobile") {
      height = MOBILE_HEIGHT;
      top = Math.max(0, (availableHeight - height * scale) / 2);
    } else if (device === "desktop") {
      height = Math.min(height, naturalWidth / 1.72);
      top = Math.max(0, (availableHeight - height * scale) / 2);
    }
    frame.style.height = height + "px";
    frame.style.marginTop = top + "px";
    frame.style.transform = "scale(" + scale + ")";
    frame.style.marginLeft = Math.max(0, (availableWidth - naturalWidth * scale) / 2) + "px";
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
