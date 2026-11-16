import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { t, PLACE, HOURS, isOpenNow, type Lang } from "@/lib/kmayra";
import logo from "@/assets/k/logo.jpg.asset.json";
import flowers from "@/assets/k/flowers-window.jpg.asset.json";
import niches from "@/assets/k/interior-niches.jpg.asset.json";
import tote from "@/assets/k/tote-bag.jpg.asset.json";
import matcha from "@/assets/k/matcha-drink.jpg.asset.json";
import darArbi from "@/assets/k/dar-arbi-wall.jpg.asset.json";
import dessert from "@/assets/k/guest-dessert.jpg.asset.json";
import karaoke from "@/assets/k/karaoke-evening.jpg.asset.json";
import barista from "@/assets/k/bw-barista.jpg.asset.json";
import storefront from "@/assets/k/storefront.jpg.asset.json";
import counter from "@/assets/k/counter-team.jpg.asset.json";
import terrace from "@/assets/k/terrace.jpg.asset.json";
import guitarWall from "@/assets/k/guitar-wall.jpg.asset.json";
import blueCorner from "@/assets/k/blue-corner.jpg.asset.json";
import archedRoom from "@/assets/k/arched-room.jpg.asset.json";
import matchaDuo from "@/assets/k/iced-matcha-duo.jpg.asset.json";

const DESC = "Kmayra | قميرة — coffee shop in Hergla, Tunisia. Café à Hergla, كافيه في هرقلة: matcha, desserts, karaoke evenings.";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kmayra | قميرة — Coffee shop in Hergla, Tunisia" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Kmayra | قميرة — Coffee shop, Hergla" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "CafeOrCoffeeShop", name: "Kmayra | قميرة",
      address: { "@type": "PostalAddress", addressLocality: "Hergla", addressRegion: "Sousse", addressCountry: "TN" },
      geo: { "@type": "GeoCoordinates", latitude: PLACE.lat, longitude: PLACE.lng },
      hasMap: PLACE.mapsUrl, sameAs: [PLACE.instagram, PLACE.facebook, PLACE.tiktok],
    }) }],
  }),
  component: Index,
});

type Cat = "interior" | "details" | "food" | "people" | "outside";
const PHOTOS: { src: string; cat: Cat; alt: string }[] = [
  { src: archedRoom.url, cat: "interior", alt: "White room with a lit arched niche, wavy mirror, wooden chairs and rattan lamp" },
  { src: blueCorner.url, cat: "interior", alt: "Cozy bench with blue-and-white tiles, pottery niches and the Kmayra emblem artwork" },
  { src: guitarWall.url, cat: "details", alt: "Wall saying “العزّ قهوة .. و القصر شوفتك” above a guitar, palms and straw cushions" },
  { src: matchaDuo.url, cat: "food", alt: "Two iced matcha lattes in Kmayra cups, one with caramel" },
  { src: terrace.url, cat: "outside", alt: "Kmayra terrace with teal parasols, rattan chairs and a giant flower cup" },
  { src: niches.url, cat: "interior", alt: "Arched wall niches, rattan lamps and wooden chairs" },
  { src: karaoke.url, cat: "interior", alt: "Kmayra's room in the evening, Karaoke Day poster" },
  { src: flowers.url, cat: "details", alt: "Blue hydrangeas by the window, framed Sidi Bou Said prints" },
  { src: matcha.url, cat: "food", alt: "Iced matcha drink beside blue flowers and straw poufs" },
  { src: dessert.url, cat: "food", alt: "A guest with dessert, a cold drink and tea" },
  { src: darArbi.url, cat: "details", alt: "Arabic calligraphy art by Dar Arbi with the Kmayra emblem" },
  { src: counter.url, cat: "people", alt: "The Kmayra team at the counter with pastries" },
  { src: tote.url, cat: "details", alt: "Kmayra tote bag and a drink" },
  { src: barista.url, cat: "people", alt: "Barista in black and white" },
  { src: storefront.url, cat: "outside", alt: "Kmayra shop front sign" },
];
const CATS: Record<Cat | "all", Record<Lang, string>> = {
  all: t.all, interior: { ar: "الداخل", en: "Interior", fr: "Intérieur" }, details: { ar: "تفاصيل", en: "Details", fr: "Détails" },
  food: { ar: "مشروبات وحلويات", en: "Drinks & sweets", fr: "Boissons & douceurs" }, people: { ar: "الفريق", en: "The team", fr: "L'équipe" }, outside: { ar: "البرّة", en: "Outside", fr: "Extérieur" },
};

const MENU: { cat: Record<Lang, string>; items: { ar: string; en: string; fr: string; d: Record<Lang, string> }[] }[] = [
  { cat: { ar: "مشروبات باردة", en: "Cold drinks", fr: "Boissons froides" }, items: [
    { ar: "ماتشا باردة", en: "Iced matcha", fr: "Matcha glacé", d: { ar: "باينة في صورنا", en: "As seen in our photos", fr: "Vu sur nos photos" } },
    { ar: "مشروب بارد بالقوارص", en: "Citrus cold drink", fr: "Boisson froide aux agrumes", d: { ar: "الاسم يتأكد", en: "Exact name to confirm", fr: "Nom exact à confirmer" } },
  ]},
  { cat: { ar: "قهوة وتاي", en: "Coffee & tea", fr: "Café & thé" }, items: [
    { ar: "قهوة", en: "Coffee", fr: "Café", d: { ar: "الأنواع تتأكد", en: "Varieties to confirm", fr: "Variétés à confirmer" } },
    { ar: "تاي بالقارص", en: "Tea with lemon", fr: "Thé au citron", d: { ar: "باين في صورنا", en: "As seen in our photos", fr: "Vu sur nos photos" } },
  ]},
  { cat: { ar: "حلويات", en: "Sweets", fr: "Douceurs" }, items: [
    { ar: "تشيز كيك", en: "Cheesecake", fr: "Cheesecake", d: { ar: "باين في صورنا", en: "As seen in our photos", fr: "Vu sur nos photos" } },
    { ar: "دونات", en: "Doughnuts", fr: "Donuts", d: { ar: "في الفترينة", en: "From the counter display", fr: "Dans la vitrine" } },
    { ar: "معجنات", en: "Pastries", fr: "Viennoiseries", d: { ar: "الأنواع تتأكد", en: "Varieties to confirm", fr: "Variétés à confirmer" } },
  ]},
];

const WORDS: { ar: string; tr: Record<Lang, string>; confirm: boolean; src?: string }[] = [
  { ar: "العزّ قهوة .. و القصر شوفتك", tr: { ar: "", en: "“I treasure coffee… and more so the sight of you.”", fr: "« Le café m'est cher… et plus encore te voir. »" }, confirm: false, src: guitarWall.url },
  { ar: "قميرة", tr: { ar: "", en: "“Little moon” — a tender Tunisian name, and ours.", fr: "« Petite lune » — un prénom tendre, et le nôtre." }, confirm: false },
  { ar: "شنوّا ؟؟", tr: { ar: "", en: "“What?!” — the Tunisian everything-word.", fr: "« Quoi ?! » — le mot tunisien à tout faire." }, confirm: false },
];

function Index() {
  const [lang, setLang] = useState<Lang>("ar");
  const [cat, setCat] = useState<Cat | "all">("all");
  const [box, setBox] = useState<number | null>(null);
  const [menuTab, setMenuTab] = useState(0);
  const [open, setOpen] = useState<boolean | null>(null);
  const [nav, setNav] = useState(false);
  const L = (x: Record<Lang, string>) => x[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const s = localStorage.getItem("kmayra-lang") as Lang | null;
    if (s) setLang(s);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang; document.documentElement.dir = dir;
    localStorage.setItem("kmayra-lang", lang);
  }, [lang, dir]);
  useEffect(() => {
    const h = HOURS;
    if (!h) return;
    const tick = () => setOpen(isOpenNow(h));
    tick(); const i = setInterval(tick, 60000); return () => clearInterval(i);
  }, []);
  const shown = PHOTOS.filter((p) => cat === "all" || p.cat === cat);
  useEffect(() => {
    if (box === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBox(null);
      if (e.key === "ArrowRight") setBox((b) => (b! + 1) % shown.length);
      if (e.key === "ArrowLeft") setBox((b) => (b! - 1 + shown.length) % shown.length);
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [box, shown.length]);

  const links = [["about", t.nav.about], ["menu", t.nav.menu], ["gallery", t.nav.gallery], ["words", t.nav.words], ["visit", t.nav.visit]] as const;
  const Kicker = ({ c }: { c: string }) => <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">{c}</p>;

  return (
    <div dir={dir} key={lang} className="animate-in fade-in duration-500">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo.url} alt="Kmayra logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-display text-lg tracking-wide">Kmayra <span className="font-ruqaa">| قميرة</span></span>
          </a>
          <nav className="hidden gap-7 text-sm md:flex">
            {links.map(([id, l]) => <a key={id} href={`#${id}`} className="transition-colors hover:text-accent">{L(l)}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex overflow-hidden rounded-full border border-border text-xs" role="group" aria-label="Language">
              {(["ar", "en", "fr"] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
                  className={`px-3 py-1.5 transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                  {l === "ar" ? "عربي" : l.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="md:hidden px-2 text-xl" aria-label="Menu" onClick={() => setNav(!nav)}>☰</button>
          </div>
        </div>
        {nav && <nav className="flex flex-col gap-3 border-t border-border px-5 py-4 md:hidden">
          {links.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setNav(false)}>{L(l)}</a>)}
        </nav>}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden pt-24 grain">
        <div aria-hidden className="pointer-events-none absolute -top-24 -end-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 -start-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-[1.1fr_1fr] md:py-24">
          <div className="reveal">
            <Kicker c={L(t.heroKicker)} />
            <h1 dir={lang === "ar" ? "rtl" : "ltr"} className={`${lang === "ar" ? "font-ruqaa leading-[1.4]" : "font-display italic leading-[1.1]"} text-5xl text-primary md:text-6xl`}>{L(t.heroTitle)}</h1>
            {lang !== "ar" && <p dir="rtl" className="mt-4 font-ruqaa text-2xl text-accent">العزّ قهوة .. و القصر شوفتك</p>}
            <div className="mt-6 flex items-center gap-3 text-accent" aria-hidden><span className="h-px w-12 bg-accent/50" />✿ ✿ ✿<span className="h-px w-12 bg-accent/50" /></div>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">{L(t.heroText)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#menu" className="rounded-full bg-primary px-7 py-3.5 text-primary-foreground transition hover:-translate-y-0.5">{L(t.ctaMenu)}</a>
              <a href="#visit" className="rounded-full border border-primary px-7 py-3.5 transition hover:bg-primary hover:text-primary-foreground">{L(t.ctaFind)}</a>
            </div>
          </div>
          <div className="relative reveal [animation-delay:200ms]">
            <img src={archedRoom.url} alt="Inside Kmayra: arched niche, wooden chairs and warm light" className="arch aspect-[4/5] w-full object-cover shadow-2xl" />
            <img src={flowers.url} alt="Blue hydrangeas" className="arch absolute -bottom-8 -start-8 w-2/5 border-4 border-background object-cover aspect-[3/4] float-slow" />
            <img src={logo.url} alt="" className="absolute -top-4 -end-4 h-24 w-24 rounded-full border-4 border-background object-cover" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <img src={darArbi.url} alt="Dar Arbi calligraphy wall" className="arch aspect-square w-full object-cover" />
          <div className="self-center">
            <Kicker c={L(t.aboutKicker)} />
            <h2 className="font-display text-4xl md:text-5xl">{L(t.aboutTitle)}</h2>
            <div className="mt-6 space-y-4 text-lg text-muted-foreground">
              <p>{L(t.about1)}</p><p>{L(t.about2)}</p><p>{L(t.about3)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-4xl px-5">
          <Kicker c={L(t.menuKicker)} />
          <h2 className="font-display text-4xl md:text-5xl">{L(t.menuTitle)}</h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {MENU.map((m, i) => (
              <button key={i} onClick={() => setMenuTab(i)}
                className={`rounded-full border px-5 py-2 text-sm transition ${menuTab === i ? "border-lime bg-lime text-ink" : "border-ink-foreground/30 hover:border-lime"}`}>{L(m.cat)}</button>
            ))}
          </div>
          <ul key={menuTab} className="mt-10 divide-y divide-ink-foreground/15 reveal">
            {MENU[menuTab]!.items.map((it) => (
              <li key={it.en} className="flex items-baseline justify-between gap-6 py-5">
                <div>
                  <p className="font-ruqaa text-2xl">{it.ar}</p>
                  {lang !== "ar" && <p className="font-display text-lg">{it[lang]}</p>}
                  <p className="text-sm opacity-60">{L(it.d)}</p>
                </div>
                <span className="shrink-0 rounded-full border border-dashed border-ink-foreground/40 px-3 py-1 text-xs opacity-80">{L(t.priceTbc)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm opacity-60">{L(t.menuNote)}</p>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="mx-auto max-w-6xl px-5 py-24">
        <Kicker c={L(t.galleryKicker)} />
        <h2 className="font-display text-4xl md:text-5xl">{L(t.galleryTitle)}</h2>
        <div className="mt-8 flex flex-wrap gap-2">
          {(Object.keys(CATS) as (Cat | "all")[]).map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-1.5 text-sm transition ${cat === c ? "bg-accent text-accent-foreground" : "bg-secondary hover:bg-sand"}`}>{L(CATS[c])}</button>
          ))}
        </div>
        <div className="mt-10 columns-2 gap-4 md:columns-3">
          {shown.map((p, i) => (
            <button key={p.src} onClick={() => setBox(i)} className="group mb-4 block w-full overflow-hidden rounded-sm">
              <img src={p.src} alt={p.alt} loading="lazy" className="w-full transition duration-700 group-hover:scale-105" />
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Photos: <a className="underline" href={PLACE.instagram} target="_blank" rel="noreferrer">@kmayra_coffeeshop</a></p>
      </section>
      {box !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4" onClick={() => setBox(null)} role="dialog" aria-modal>
          <img src={shown[box]!.src} alt={shown[box]!.alt} className="max-h-[85vh] max-w-full object-contain" />
          <p className="absolute bottom-6 text-sm text-ink-foreground">{shown[box]!.alt}</p>
          <button className="absolute end-6 top-6 text-3xl text-ink-foreground" aria-label="Close">×</button>
        </div>
      )}

      {/* WORDS */}
      <section id="words" className="relative bg-secondary py-24 grain">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <Kicker c={L(t.wordsKicker)} />
          <h2 className="font-display text-4xl md:text-5xl">{L(t.wordsTitle)}</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {WORDS.map((w) => (
              <figure key={w.ar} className="arch relative flex min-h-80 flex-col items-center justify-center overflow-hidden border border-border bg-card px-6 pb-10 pt-16 transition hover:-translate-y-1">
                {w.src && <img src={w.src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" />}
                <blockquote dir="rtl" lang="ar" className="relative font-ruqaa text-4xl leading-relaxed text-primary">{w.ar}</blockquote>
                {lang !== "ar" && <figcaption className="relative mt-5 text-sm italic text-muted-foreground">{L(w.tr)}</figcaption>}
                {w.confirm && <span className="relative mt-4 rounded-full border border-dashed border-accent px-3 py-0.5 text-[11px] text-accent">{L(t.tbc)}</span>}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* HOURS + VISIT */}
      <section id="visit" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2">
        <div>
          <Kicker c={L(t.hoursKicker)} />
          {HOURS ? (<>
            <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm ${open ? "bg-lime text-ink" : "bg-muted"}`}>
              <span className="h-2 w-2 rounded-full bg-current" />{open ? L(t.openNow) : L(t.closedNow)}</span>
            <ul className="mt-6 divide-y">{HOURS.map((h, i) => (
              <li key={i} className="flex justify-between py-3"><span>{t.days[lang][i]}</span><span dir="ltr">{h === "closed" ? L(t.closed) : `${h.open} – ${h.close}`}</span></li>))}
            </ul></>) : (
            <p className="rounded-sm border border-dashed border-accent p-6 text-muted-foreground">{L(t.hoursPending)}</p>)}

          <div className="mt-14">
            <Kicker c={L(t.visitKicker)} />
            <h2 className="font-display text-3xl md:text-4xl">{L(t.visitTitle)}</h2>
            <p className="mt-4 text-muted-foreground">{L(t.address)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={PLACE.directionsUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-6 py-3 text-primary-foreground">{L(t.directions)}</a>
              {PLACE.phone && <a href={`tel:${PLACE.phone}`} className="rounded-full border border-primary px-6 py-3">{PLACE.phone}</a>}
              {PLACE.whatsapp && <a href={`https://wa.me/${PLACE.whatsapp}`} className="rounded-full border border-primary px-6 py-3">WhatsApp</a>}
            </div>
            {!PLACE.phone && <p className="mt-4 text-sm text-muted-foreground">{L(t.contactPending)}</p>}
          </div>
        </div>
        <iframe title="Kmayra on Google Maps" loading="lazy" className="arch h-[520px] w-full border-0"
          src={`https://www.google.com/maps?q=${PLACE.lat},${PLACE.lng}&z=17&output=embed`} />
      </section>

      {/* SOCIAL + FOOTER */}
      <footer className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex flex-col items-center gap-6 text-center">
            <img src={logo.url} alt="Kmayra" className="h-20 w-20 rounded-full object-cover" />
            <p className="font-ruqaa text-3xl">قميرة</p>
            <p className="opacity-70">{L(t.footer)}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-lime">{L(t.follow)}</p>
            <div className="flex gap-4">
              {[["Instagram", PLACE.instagram], ["Facebook", PLACE.facebook], ["TikTok", PLACE.tiktok]].map(([n, u]) => (
                <a key={n} href={u} target="_blank" rel="noreferrer" className="rounded-full border border-ink-foreground/30 px-5 py-2 text-sm transition hover:border-lime hover:text-lime">{n}</a>
              ))}
            </div>
            <nav className="mt-4 flex flex-wrap justify-center gap-5 text-sm opacity-70">
              {links.map(([id, l]) => <a key={id} href={`#${id}`}>{L(l)}</a>)}
            </nav>
            <p className="text-xs opacity-50">© {new Date().getFullYear()} Kmayra | قميرة — Hergla, Tunisia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
