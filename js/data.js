/* ==========================================================================
   Kmayra | قميرة — données du site (textes, horaires, lieu, menu, galerie)
   Source unique de vérité : modifier ici pour changer le contenu.
   ========================================================================== */
window.KMAYRA = (function () {
  "use strict";

  var PLACE = {
    lat: 36.030453,
    lng: 10.5098625,
    mapsUrl:
      "https://www.google.com/maps/place/Kmayra+coffee+shop/@36.030453,10.5098625,17z/data=!3m1!4b1!4m6!3m5!1s0x12fd85007e042441:0x80313b62e541119f!8m2!3d36.030453!4d10.5098625",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=36.030453,10.5098625",
    instagram: "https://www.instagram.com/kmayra_coffeeshop/",
    facebook: "https://www.facebook.com/profile.php?id=61581065014302",
    tiktok: "https://www.tiktok.com/@kmayra_coffeeshop",
    phone: null,
    whatsapp: null, // chiffres uniquement, ex. "21600000000"
    email: null
  };

  /* Horaires hebdomadaires (heure de Tunisie), index 0 = dimanche.
     Mettre HOURS = null pour afficher « horaires en attente de confirmation ». */
  var HOURS = [0, 1, 2, 3, 4, 5, 6].map(function () {
    return { open: "07:00", close: "01:00" };
  });

  function isOpenNow(hours, now) {
    now = now || new Date();
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Tunis", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(now);
    var find = function (type) {
      return parts.filter(function (p) { return p.type === type; })[0].value;
    };
    var wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(find("weekday"));
    var mins = Number(find("hour")) * 60 + Number(find("minute"));
    var toM = function (s) { return Number(s.slice(0, 2)) * 60 + Number(s.slice(3, 5)); };
    var today = hours[wd];
    if (today !== "closed") {
      var o = toM(today.open), c = toM(today.close);
      if (c > o ? mins >= o && mins < c : mins >= o) return true;
    }
    var y = hours[(wd + 6) % 7];
    if (y !== "closed" && toM(y.close) <= toM(y.open) && mins < toM(y.close)) return true;
    return false;
  }

  /* ---- Textes (ar / en / fr) ---- */
  var t = {
    nav: { about: { ar: "حكايتنا", en: "Story", fr: "Histoire" }, menu: { ar: "القائمة", en: "Menu", fr: "Carte" }, gallery: { ar: "الأجواء", en: "Atmosphere", fr: "Ambiance" }, words: { ar: "كلامنا", en: "Our words", fr: "Nos mots" }, visit: { ar: "زورونا", en: "Visit", fr: "Visite" } },
    heroKicker: { ar: "كافيه · هرقلة، تونس", en: "Coffee shop · Hergla, Tunisia", fr: "Coffee shop · Hergla, Tunisie" },
    heroTitle: { ar: "العزّ قهوة .. و القصر شوفتك", en: "“I treasure coffee… and more so the sight of you.”", fr: "« Le café m'est cher… et plus encore te voir. »" },
    heroText: { ar: "جدران بيضاء، ركايز مقوّسة، كراسي خشب وضو دافي — قميرة بلاصة صغيرة تتشرب فيها قهوتك على راحتك.", en: "White walls, arched niches, wooden chairs and warm light — Kmayra is a small place made for taking your coffee slowly.", fr: "Murs blancs, niches arquées, chaises en bois et lumière douce — Kmayra est un petit lieu pour savourer son café sans se presser." },
    ctaMenu: { ar: "اكتشف القائمة", en: "Explore our menu", fr: "Découvrir la carte" },
    ctaFind: { ar: "وين نلقاونا", en: "Find us", fr: "Nous trouver" },
    aboutKicker: { ar: "حكايتنا", en: "Our story", fr: "Notre histoire" },
    aboutTitle: { ar: "قميرة… اسم دافي كيما البلاصة", en: "Kmayra — a name as warm as the room", fr: "Kmayra — un nom aussi chaleureux que le lieu" },
    about1: { ar: "شعارنا وجه امرأة بمحرمة داخل قوس — تحية للمرأة التونسية وللمعمار المتوسطي اللي يحاوطنا في هرقلة.", en: "Our emblem is a woman in a headscarf framed by an arch — a nod to Tunisian women and to the Mediterranean architecture around us in Hergla.", fr: "Notre emblème : une femme coiffée d'un foulard, encadrée d'une arche — un clin d'œil aux Tunisiennes et à l'architecture méditerranéenne d'Hergla." },
    about2: { ar: "في الداخل: ركايز في الحيط فيها فخار، ثريات من السمار، ورد أزرق، وكراسي حلفاء. وفي بعض الليالي، سهريات كاراوكي.", en: "Inside: wall niches holding pottery, woven rattan lamps, blue hydrangeas and straw poufs. On some evenings, karaoke nights.", fr: "À l'intérieur : niches murales et poteries, suspensions en rotin, hortensias bleus et poufs en paille. Certains soirs, karaoké." },
    about3: { ar: "ونتشاركو الحيط مع «دار عربي» — فن، لبسة وأشياء يومية.", en: "We share a wall with Dar Arbi — art, clothing and everyday objects.", fr: "Nous partageons un mur avec Dar Arbi — art, vêtements et objets du quotidien." },
    menuKicker: { ar: "القائمة", en: "The menu", fr: "La carte" },
    menuTitle: { ar: "شنوّا نشربو اليوم؟", en: "What are we having today?", fr: "On prend quoi aujourd'hui ?" },
    galleryKicker: { ar: "الأجواء", en: "The atmosphere", fr: "L'ambiance" },
    galleryTitle: { ar: "داخل قميرة", en: "Inside Kmayra", fr: "Chez Kmayra" },
    all: { ar: "الكل", en: "All", fr: "Tout" },
    wordsKicker: { ar: "روح البلاصة", en: "The soul of the place", fr: "L'âme du lieu" },
    wordsTitle: { ar: "كلامنا", en: "Our expressions", fr: "Nos expressions" },
    tbc: { ar: "يتأكد", en: "To be confirmed", fr: "À confirmer" },
    hoursKicker: { ar: "الأوقات", en: "Opening hours", fr: "Horaires" },
    hoursPending: { ar: "أوقات العمل في انتظار التأكيد. ابعثلنا على إنستغرام باش تتأكد.", en: "Opening hours are awaiting confirmation. Message us on Instagram to check today.", fr: "Horaires en attente de confirmation. Écrivez-nous sur Instagram pour aujourd'hui." },
    openNow: { ar: "مفتوح توا", en: "Open now", fr: "Ouvert" },
    closedNow: { ar: "مسكّر توا", en: "Closed now", fr: "Fermé" },
    closed: { ar: "مسكّر", en: "Closed", fr: "Fermé" },
    visitKicker: { ar: "زورونا", en: "Visit us", fr: "Venir" },
    visitTitle: { ar: "هرقلة، الساحل التونسي", en: "Hergla, on the Tunisian Sahel coast", fr: "Hergla, sur le Sahel tunisien" },
    address: { ar: "قميرة كافيه، هرقلة، سوسة، تونس", en: "Kmayra coffee shop, Hergla, Sousse, Tunisia", fr: "Kmayra coffee shop, Hergla, Sousse, Tunisie" },
    directions: { ar: "الطريق", en: "Get directions", fr: "Itinéraire" },
    follow: { ar: "تابعونا", en: "Follow us", fr: "Suivez-nous" },
    footer: { ar: "قهوة صغيرة بروح هرقلة.", en: "A small coffee shop with a Hergla soul.", fr: "Un petit café à l'âme d'Hergla." },
    days: { ar: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], fr: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"] }
  };

  /* ---- Galerie ---- */
  var PHOTOS = [
    { src: "assets/arched-room.jpg", cat: "interior", alt: "White room with a lit arched niche, wavy mirror, wooden chairs and rattan lamp" },
    { src: "assets/blue-corner.jpg", cat: "interior", alt: "Cozy bench with blue-and-white tiles, pottery niches and the Kmayra emblem artwork" },
    { src: "assets/guitar-wall.jpg", cat: "details", alt: "Wall saying “العزّ قهوة .. و القصر شوفتك” above a guitar, palms and straw cushions" },
    { src: "assets/iced-matcha-duo.jpg", cat: "food", alt: "Two iced matcha lattes in Kmayra cups, one with caramel" },
    { src: "assets/terrace.jpg", cat: "outside", alt: "Kmayra terrace with teal parasols, rattan chairs and a giant flower cup" },
    { src: "assets/interior-niches.jpg", cat: "interior", alt: "Arched wall niches, rattan lamps and wooden chairs" },
    { src: "assets/karaoke-evening.jpg", cat: "interior", alt: "Kmayra's room in the evening, Karaoke Day poster" },
    { src: "assets/flowers-window.jpg", cat: "details", alt: "Blue hydrangeas by the window, framed Sidi Bou Said prints" },
    { src: "assets/matcha-drink.jpg", cat: "food", alt: "Iced matcha drink beside blue flowers and straw poufs" },
    { src: "assets/guest-dessert.jpg", cat: "food", alt: "A guest with dessert, a cold drink and tea" },
    { src: "assets/dar-arbi-wall.jpg", cat: "details", alt: "Arabic calligraphy art by Dar Arbi with the Kmayra emblem" },
    { src: "assets/counter-team.jpg", cat: "people", alt: "The Kmayra team at the counter with pastries" },
    { src: "assets/tote-bag.jpg", cat: "details", alt: "Kmayra tote bag and a drink" },
    { src: "assets/bw-barista.jpg", cat: "people", alt: "Barista in black and white" },
    { src: "assets/storefront.jpg", cat: "outside", alt: "Kmayra shop front sign" }
  ];

  var CATS = {
    all: t.all,
    interior: { ar: "الداخل", en: "Interior", fr: "Intérieur" },
    details: { ar: "تفاصيل", en: "Details", fr: "Détails" },
    food: { ar: "مشروبات وحلويات", en: "Drinks & sweets", fr: "Boissons & douceurs" },
    people: { ar: "الفريق", en: "The team", fr: "L'équipe" },
    outside: { ar: "البرّة", en: "Outside", fr: "Extérieur" }
  };

  /* ---- Carte ---- */
  var MENU = [
    { cat: { ar: "قهوة كلاسيكية", en: "Classic coffees", fr: "Cafés classiques" }, items: [
      { ar: "إسبريسو", en: "Espresso", fr: "Espresso", price: "3.5" },
      { ar: "أمريكانو", en: "Americano", fr: "Americano", price: "4.0" },
      { ar: "كابوتشينو", en: "Cappuccino", fr: "Cappuccino", price: "4.0" },
      { ar: "لاتيه", en: "Latte", fr: "Latte", price: "4.0" },
      { ar: "كورتادو", en: "Cortado", fr: "Cortado", price: "3.8" },
      { ar: "إسبريسو دوبل", en: "Double espresso", fr: "Double espresso", price: "4.0" }
    ]},
    { cat: { ar: "قهوة خاصة", en: "Special coffee", fr: "Cafés spéciaux" }, items: [
      { ar: "لاتيه فانيليا", en: "Vanilla latte", fr: "Latte vanille", price: "6.0" },
      { ar: "سبانيش لاتيه", en: "Spanish latte", fr: "Spanish latte", price: "5.5" },
      { ar: "ماكياتو (كراميل / موكا / بندق)", en: "Macchiato (caramel / mocha / hazelnut)", fr: "Macchiato (caramel / moka / noisette)", price: "7.0" },
      { ar: "لاتيه نوتيلا", en: "Nutella latte", fr: "Latte Nutella", price: "10.0" },
      { ar: "لاتيه سبيكولوس", en: "Speculoos latte", fr: "Latte spéculoos", price: "10.5" },
      { ar: "أفوغاتو", en: "Affogato", fr: "Affogato", price: "6.0" }
    ]},
    { cat: { ar: "مشروبات سخونة", en: "Hot drinks", fr: "Boissons chaudes" }, items: [
      { ar: "شوكولا سخونة", en: "Hot chocolate", fr: "Chocolat chaud", price: "6.0" },
      { ar: "شوكولا سخونة بالنوتيلا", en: "Nutella hot chocolate", fr: "Chocolat chaud Nutella", price: "9.0" },
      { ar: "لوتس كريمي سخون", en: "Creamy Lotus hot", fr: "Lotus crémeux chaud", price: "10.0" }
    ]},
    { cat: { ar: "تاي", en: "Teas", fr: "Thés" }, items: [
      { ar: "تاي", en: "Tea", fr: "Thé", price: "3.0" },
      { ar: "تاي بارد بالخوخ", en: "Peach iced tea", fr: "Thé glacé pêche", price: "10.0" },
      { ar: "تاي بارد بالمانغو", en: "Mango iced tea", fr: "Thé glacé mangue", price: "10.0" }
    ]},
    { cat: { ar: "سموذي وغلال", en: "Smoothies & mixed fruits", fr: "Smoothies & fruits mixés" }, items: [
      { ar: "موز (تمر / توت أزرق / فراولو)", en: "Banana (dates / blueberry / strawberry)", fr: "Banane (dattes / myrtille / fraise)", price: "10.0" },
      { ar: "مانغو وخوخ", en: "Mango & peach", fr: "Mangue & pêche", price: "10.0" },
      { ar: "مينتي دريم", en: "Minty Dream", fr: "Minty Dream", price: "14.0" },
      { ar: "كوكو مون", en: "Coco Moon", fr: "Coco Moon", price: "13.0" },
      { ar: "تروبيكال", en: "Tropical", fr: "Tropical", price: "11.0" },
      { ar: "بيري كيس", en: "Berry Kiss", fr: "Berry Kiss", price: "13.0" },
      { ar: "روزا", en: "Rosa", fr: "Rosa", price: "12.0" },
      { ar: "فريش سيترونانا", en: "Fresh Citronana", fr: "Fresh Citronana", price: "11.0" },
      { ar: "بينك سامر", en: "Pink Summer", fr: "Pink Summer", price: "11.0" }
    ]},
    { cat: { ar: "ماتشا", en: "Matcha", fr: "Matcha" }, items: [
      { ar: "ماتشا لاتيه (بارد / سخون)", en: "Matcha latte (iced / hot)", fr: "Matcha latte (glacé / chaud)", price: "9.0" },
      { ar: "ماتشا فانيليا (بارد / سخون)", en: "Matcha vanilla (iced / hot)", fr: "Matcha vanille (glacé / chaud)", price: "10.0" },
      { ar: "ماتشا كراميل باردة", en: "Iced caramel matcha", fr: "Matcha caramel glacé", price: "12.0" },
      { ar: "ماتشا مانغو باردة", en: "Iced mango matcha", fr: "Matcha mangue glacé", price: "12.0" },
      { ar: "ماتشا فراولو باردة", en: "Iced strawberry matcha", fr: "Matcha fraise glacé", price: "12.0" },
      { ar: "وايت ماتشا باردة", en: "Iced white matcha", fr: "Matcha blanc glacé", price: "12.0" }
    ]},
    { cat: { ar: "إضافات", en: "Extras", fr: "Extras" }, items: [
      { ar: "ماء", en: "Water", fr: "Eau", price: "1.5" },
      { ar: "عصير فراولو", en: "Strawberry juice", fr: "Jus de fraise", price: "7.0" },
      { ar: "عصير برتقال", en: "Orange juice", fr: "Jus d'orange", price: "6.0" },
      { ar: "عصير نعناع وقارص", en: "Mint lemon juice", fr: "Citronnade menthe", price: "5.0" },
      { ar: "سبرايت", en: "Sprite", fr: "Sprite", price: "3.5" },
      { ar: "دوز سيروب", en: "Syrup shot", fr: "Dose sirop", price: "2.5" },
      { ar: "دوز نستله", en: "Nestlé shot", fr: "Dose Nestlé", price: "2.0" }
    ]}
  ];

  /* ---- Section « Nos mots » ---- */
  var WORDS = [
    { ar: "العزّ قهوة .. و القصر شوفتك", tr: { ar: "", en: "“I treasure coffee… and more so the sight of you.”", fr: "« Le café m'est cher… et plus encore te voir. »" }, confirm: false, src: "assets/guitar-wall.jpg" },
    { ar: "قميرة", tr: { ar: "", en: "“Little moon” — a tender Tunisian name, and ours.", fr: "« Petite lune » — un prénom tendre, et le nôtre." }, confirm: false },
    { ar: "شنوّا ؟؟", tr: { ar: "", en: "“What?!” — the Tunisian everything-word.", fr: "« Quoi ?! » — le mot tunisien à tout faire." }, confirm: false }
  ];

  return { PLACE: PLACE, HOURS: HOURS, isOpenNow: isOpenNow, t: t, PHOTOS: PHOTOS, CATS: CATS, MENU: MENU, WORDS: WORDS };
})();
