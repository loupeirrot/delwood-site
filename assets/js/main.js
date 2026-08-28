(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Navigation mobile ------------------------------------------------------ */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navRoot = document.documentElement;

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = navRoot.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    document.querySelectorAll(".nav-mobile a").forEach(function (link) {
      link.addEventListener("click", function () {
        navRoot.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* Révélations au scroll --------------------------------------------------- */
  var revealTargets = document.querySelectorAll(".reveal, .reveal-stagger");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* Tracé du signe (SVG masque) ---------------------------------------------- */
  var signePaths = document.querySelectorAll(".signe path");

  signePaths.forEach(function (path) {
    var length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = reduceMotion ? 0 : length;
  });

  if (!reduceMotion && "IntersectionObserver" in window && signePaths.length) {
    var signeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("path").forEach(function (path, i) {
              path.style.transitionDelay = i * 120 + "ms";
              path.style.strokeDashoffset = 0;
            });
            signeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    document.querySelectorAll(".signe").forEach(function (svg) {
      signeObserver.observe(svg);
    });
  }

  /* Façade vidéo Vimeo (lazy embed) -------------------------------------------- */
  document.querySelectorAll("[data-video-embed]").forEach(function (facade) {
    facade.addEventListener("click", function () {
      var vimeoId = facade.getAttribute("data-video-embed");
      var iframe = document.createElement("iframe");
      iframe.src = "https://player.vimeo.com/video/" + vimeoId + "?autoplay=1&title=0&byline=0&portrait=0";
      iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("title", facade.getAttribute("data-video-title") || "Vidéo Delwood");
      facade.innerHTML = "";
      facade.appendChild(iframe);
    });

    facade.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        facade.click();
      }
    });
  });

  /* Filtres œuvres --------------------------------------------------------------- */
  var filterButtons = document.querySelectorAll("[data-filter]");
  var filterItems = document.querySelectorAll("[data-category]");

  if (filterButtons.length && filterItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");

        var value = btn.getAttribute("data-filter");

        filterItems.forEach(function (item) {
          var match = value === "all" || item.getAttribute("data-category") === value;
          item.style.display = match ? "" : "none";
        });
      });
    });
  }

  /* Formulaire de contact (mailto, sans backend) ------------------------------------ */
  var contactForm = document.querySelector("[data-contact-form]");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var data = new FormData(contactForm);
      var lines = [
        "Nom : " + (data.get("nom") || ""),
        "Organisation : " + (data.get("organisation") || ""),
        "Email : " + (data.get("email") || ""),
        "Type de projet : " + (data.get("type_projet") || ""),
        "Lieu : " + (data.get("lieu") || ""),
        "Budget indicatif : " + (data.get("budget") || ""),
        "",
        (data.get("message") || "")
      ];

      var subject = encodeURIComponent("Nouveau projet - " + (data.get("type_projet") || "Delwood"));
      var body = encodeURIComponent(lines.join("\n"));

      window.location.href = "mailto:contact@delwood.fr?subject=" + subject + "&body=" + body;
    });
  }

  /* Année courante dans le pied de page -------------------------------------------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* En-tête : ombre au scroll ------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var lastScrolled = false;
    var onScroll = function () {
      var scrolled = window.scrollY > 12;
      if (scrolled !== lastScrolled) {
        header.style.boxShadow = scrolled ? "0 1px 0 rgba(20,18,15,0.08)" : "none";
        lastScrolled = scrolled;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
