(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.querySelector("[data-lightbox]");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector("[data-lightbox-caption]");
    var lastFocused = null;

    function openLightbox(src, caption) {
      lastFocused = document.activeElement;
      lbImg.src = src;
      lbImg.alt = caption || "";
      if (lbCaption) lbCaption.textContent = caption || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      lightbox.querySelector(".lightbox-close").focus();
    }
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lbImg.src = "";
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll("[data-lightbox-trigger]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openLightbox(btn.getAttribute("data-full"), btn.getAttribute("data-caption"));
      });
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });
  }

  /* ---------- Click-to-play video (no autoplay-with-sound) ---------- */
  document.querySelectorAll(".video-wrap").forEach(function (wrap) {
    var video = wrap.querySelector("video");
    var playBtn = wrap.querySelector(".play-btn");
    if (!video || !playBtn) return;
    playBtn.addEventListener("click", function () {
      video.setAttribute("controls", "");
      video.play();
      wrap.classList.add("is-playing");
    });
    video.addEventListener("pause", function () {
      wrap.classList.remove("is-playing");
    });
    video.addEventListener("ended", function () {
      wrap.classList.remove("is-playing");
      video.removeAttribute("controls");
    });
  });

  /* ---------- Gallery hover image swap (touch fallback: tap toggles) ---------- */
  document.querySelectorAll(".gallery-media[data-swap]").forEach(function (media) {
    media.addEventListener("click", function () {
      media.classList.toggle("show-b");
      var imgB = media.querySelector(".img-b");
      if (imgB) imgB.style.opacity = media.classList.contains("show-b") ? "1" : "";
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
