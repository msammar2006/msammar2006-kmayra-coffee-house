/* ==========================================================================
   Kmayra | قميرة — interactions (JavaScript vanilla, aucune dépendance)
   Langue AR/EN/FR · onglets du menu · filtre galerie · lightbox ·
   badge « ouvert maintenant » · menu mobile
   Les données (textes, horaires, carte…) sont dans js/data.js
   ========================================================================== */
(function () {
  "use strict";

  var K = window.KMAYRA;
  var PLACE = K.PLACE, HOURS = K.HOURS, isOpenNow = K.isOpenNow, t = K.t;
  var PHOTOS = K.PHOTOS, CATS = K.CATS, MENU = K.MENU, WORDS = K.WORDS;

  var state = { lang: "ar", cat: "all", box: null, menuTab: 0, open: null, nav: false };

  /* ---- Helpers ---- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function L(x) { return x[state.lang]; }
  function get(path) { return path.split(".").reduce(function (o, k) { return o[k]; }, t); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  /* Relance une animation CSS (équivalent du remontage du composant d'origine). */
  function replay(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }
  function shown() {
    return PHOTOS.filter(function (p) { return state.cat === "all" || p.cat === state.cat; });
  }

  var app = $("#app");

  /* ---- Rendus ---- */
  function renderTexts() {
    $$("[data-i18n]").forEach(function (el) { el.textContent = L(get(el.getAttribute("data-i18n"))); });
  }

  function renderLangUI() {
    var ar = state.lang === "ar";
    document.documentElement.lang = state.lang;
    document.documentElement.dir = ar ? "rtl" : "ltr";
    app.setAttribute("dir", ar ? "rtl" : "ltr");

    var h1 = $("#hero-title");
    h1.setAttribute("dir", ar ? "rtl" : "ltr");
    h1.classList.toggle("font-ruqaa", ar);
    h1.classList.toggle("leading-[1.4]", ar);
    h1.classList.toggle("font-display", !ar);
    h1.classList.toggle("italic", !ar);
    h1.classList.toggle("leading-[1.1]", !ar);
    $("#hero-tagline").hidden = ar;

    $$("[data-lang]").forEach(function (b) {
      var on = b.getAttribute("data-lang") === state.lang;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.classList.toggle("bg-primary", on);
      b.classList.toggle("text-primary-foreground", on);
      b.classList.toggle("hover:bg-secondary", !on);
    });
  }

  function renderMenuTabs() {
    $("#menu-tabs").innerHTML = MENU.map(function (m, i) {
      var cls = state.menuTab === i
        ? "border-lime bg-lime text-ink"
        : "border-ink-foreground/30 hover:border-lime";
      return '<button type="button" data-tab="' + i + '" class="rounded-full border px-5 py-2 text-sm transition ' + cls + '">' + esc(L(m.cat)) + "</button>";
    }).join("");
  }

  function renderMenuList() {
    var ar = state.lang === "ar";
    var ul = $("#menu-list");
    ul.innerHTML = MENU[state.menuTab].items.map(function (it) {
      return '<li class="flex items-center justify-between gap-6 py-4">' +
        "<div>" +
          '<p dir="rtl" lang="ar" class="font-sans text-xl font-medium leading-relaxed">' + esc(it.ar) + "</p>" +
          (ar ? "" : '<p class="text-sm opacity-70">' + esc(it[state.lang]) + "</p>") +
        "</div>" +
        '<span dir="ltr" class="shrink-0 font-display text-lg text-lime">' + esc(it.price) + ' <span class="text-xs opacity-70">TND</span></span>' +
      "</li>";
    }).join("");
    replay(ul, "reveal");
  }

  function renderGalleryCats() {
    $("#gallery-cats").innerHTML = Object.keys(CATS).map(function (c) {
      var cls = state.cat === c ? "bg-accent text-accent-foreground" : "bg-secondary hover:bg-sand";
      return '<button type="button" data-cat="' + c + '" class="rounded-full px-4 py-1.5 text-sm transition ' + cls + '">' + esc(L(CATS[c])) + "</button>";
    }).join("");
  }

  function renderGalleryGrid() {
    $("#gallery-grid").innerHTML = shown().map(function (p, i) {
      return '<button type="button" data-index="' + i + '" class="group mb-4 block w-full overflow-hidden rounded-sm">' +
        '<img src="' + esc(p.src) + '" alt="' + esc(p.alt) + '" loading="lazy" class="w-full transition duration-700 group-hover:scale-105" />' +
      "</button>";
    }).join("");
  }

  function renderWords() {
    var ar = state.lang === "ar";
    $("#words-grid").innerHTML = WORDS.map(function (w) {
      return '<figure class="arch relative flex min-h-80 flex-col items-center justify-center overflow-hidden border border-border bg-card px-6 pb-10 pt-16 transition hover:-translate-y-1">' +
        (w.src ? '<img src="' + esc(w.src) + '" alt="" class="absolute inset-0 h-full w-full object-cover opacity-15" />' : "") +
        '<blockquote dir="rtl" lang="ar" class="relative font-ruqaa text-4xl leading-relaxed text-primary">' + esc(w.ar) + "</blockquote>" +
        (ar ? "" : '<figcaption class="relative mt-5 text-sm italic text-muted-foreground">' + esc(L(w.tr)) + "</figcaption>") +
        (w.confirm ? '<span class="relative mt-4 rounded-full border border-dashed border-accent px-3 py-0.5 text-[11px] text-accent">' + esc(L(t.tbc)) + "</span>" : "") +
      "</figure>";
    }).join("");
  }

  function renderHours() {
    var has = !!HOURS;
    $("#open-badge").hidden = !has;
    $("#hours-list").hidden = !has;
    $("#hours-pending").hidden = has;
    if (!has) return;
    $("#hours-list").innerHTML = HOURS.map(function (h, i) {
      return '<li class="flex justify-between py-3"><span>' + esc(t.days[state.lang][i]) + "</span>" +
        '<span dir="ltr">' + (h === "closed" ? esc(L(t.closed)) : esc(h.open) + " – " + esc(h.close)) + "</span></li>";
    }).join("");
    renderOpenBadge();
  }

  function renderOpenBadge() {
    var badge = $("#open-badge");
    badge.classList.toggle("bg-lime", !!state.open);
    badge.classList.toggle("text-ink", !!state.open);
    badge.classList.toggle("bg-muted", !state.open);
    $("#open-label").textContent = state.open ? L(t.openNow) : L(t.closedNow);
  }

  function renderContactLinks() {
    var box = $("#visit-actions");
    if (PLACE.phone) {
      var a = document.createElement("a");
      a.href = "tel:" + PLACE.phone;
      a.className = "rounded-full border border-primary px-6 py-3";
      a.textContent = PLACE.phone;
      box.appendChild(a);
    }
    if (PLACE.whatsapp) {
      var w = document.createElement("a");
      w.href = "https://wa.me/" + PLACE.whatsapp;
      w.className = "rounded-full border border-primary px-6 py-3";
      w.textContent = "WhatsApp";
      box.appendChild(w);
    }
  }

  /* ---- Langue ---- */
  function applyLang(replayAnimations) {
    try { localStorage.setItem("kmayra-lang", state.lang); } catch (e) {}
    renderLangUI();
    renderTexts();
    renderMenuTabs();
    renderMenuList();
    renderGalleryCats();
    renderGalleryGrid();
    renderWords();
    renderHours();
    if (replayAnimations) {
      replay(app, "animate-in");
      $$(".reveal").forEach(function (el) { replay(el, "reveal"); });
    }
  }

  function setLang(lang) {
    if (lang === state.lang) return;
    state.lang = lang;
    applyLang(true);
  }

  /* ---- Lightbox ---- */
  function openBox(i) {
    var p = shown()[i];
    if (!p) return;
    state.box = i;
    $("#lightbox-img").src = p.src;
    $("#lightbox-img").alt = p.alt;
    $("#lightbox-caption").textContent = p.alt;
    $("#lightbox").hidden = false;
  }
  function closeBox() {
    state.box = null;
    $("#lightbox").hidden = true;
  }
  function stepBox(d) {
    var n = shown().length;
    openBox((state.box + d + n) % n);
  }

  /* ---- Événements ---- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-lang],[data-tab],[data-cat],[data-index],#nav-toggle,#mobile-nav a,#lightbox") : null;
    if (!el) return;

    if (el.hasAttribute("data-lang")) return setLang(el.getAttribute("data-lang"));

    if (el.hasAttribute("data-tab")) {
      state.menuTab = Number(el.getAttribute("data-tab"));
      renderMenuTabs();
      return renderMenuList();
    }
    if (el.hasAttribute("data-cat")) {
      state.cat = el.getAttribute("data-cat");
      renderGalleryCats();
      return renderGalleryGrid();
    }
    if (el.hasAttribute("data-index")) return openBox(Number(el.getAttribute("data-index")));

    if (el.id === "nav-toggle") {
      state.nav = !state.nav;
      $("#mobile-nav").hidden = !state.nav;
      return;
    }
    if (el.id === "lightbox") return closeBox();

    /* lien du menu mobile */
    state.nav = false;
    $("#mobile-nav").hidden = true;
  });

  window.addEventListener("keydown", function (e) {
    if (state.box === null) return;
    if (e.key === "Escape") closeBox();
    if (e.key === "ArrowRight") stepBox(1);
    if (e.key === "ArrowLeft") stepBox(-1);
  });

  /* ---- Init ---- */
  var stored = null;
  try { stored = localStorage.getItem("kmayra-lang"); } catch (e) {}
  if (stored === "ar" || stored === "en" || stored === "fr") state.lang = stored;

  renderContactLinks();
  $("#year").textContent = new Date().getFullYear();
  applyLang(state.lang !== "ar");

  if (HOURS) {
    var tick = function () { state.open = isOpenNow(HOURS); renderOpenBadge(); };
    tick();
    setInterval(tick, 60000);
  }
})();
