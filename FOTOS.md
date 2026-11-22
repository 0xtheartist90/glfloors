# Foto's: wat staat waar

Alle foto's staan in `public/images/`. Vervang een foto door een nieuwe met **dezelfde bestandsnaam** te uploaden. Next.js verkleint en comprimeert ze automatisch (WebP/AVIF in de juiste maat), dus JPG met een lange zijde van ~2000 px is prima.

| Bestand | Waar op de pagina | Vorm | Nu gevuld met |
|---|---|---|---|
| `hero-bg.jpg` | Hero-achtergrond over de volle breedte, met donkerblauwe overloop | Breed liggend (nu 2000×762). Op mobiel wordt rechts-van-het-midden uitgesneden. | Grijze oprit voor een modern wit huis |
| `p01.jpg` t/m `p12.jpg` | Portfolio-marquee, in volgorde | Eigen verhouding (zie "Portfolio" hieronder) | Jouw 12 foto's uit `landing-images` |
| `before.jpg` | Voor/na-slider, linkerkant ("ก่อน") | Liggend 4:3, zelfde standpunt als after | Carport vóór (Lek 233) |
| `after.jpg` | Voor/na-slider, rechterkant ("หลัง") | Liggend 4:3, zelfde standpunt als before | Carport ná (Lek 235) |
| `og.jpg` | Preview bij delen op LINE/Facebook | 1200×630 | Logo op crème (gegenereerd) |

Logo's staan in `public/brand/` (`logo.png`, `logo-white.png`, `mark.png`, `mark-white.png`). Het favicon is `src/app/icon.png` en `src/app/apple-icon.png`.

## Portfolio (marquee)

De portfolio is een doorlopende strook. Elke foto houdt zijn eigen verhouding; die staat per foto in `src/lib/site.ts` (`GALLERY`, `ratio`: liggend `4 / 3`, staand `3 / 4`, vierkant `1`). Foto toevoegen, weghalen of vervangen door een met een andere vorm: pas die lijst aan.

## Patroon- en kleurvoorbeelden (`public/images/patterns/`)

Uitsneden uit jullie eigen foto's, voor de sectie "ลายและสี":

| Bestand | Toont | Uit foto |
|---|---|---|
| `pattern-stone.jpg` | ลายหินธรรมชาติ / natuursteen | p06 |
| `pattern-slate.jpg` | ลายหินแผ่น / leisteenplaten | p10 |
| `pattern-cobble.jpg` | ลายหินก้อนเล็ก / kinderkopjes | p05 |
| kleur `charcoal` | เทาดำ / antraciet | toon van p05 |
| kleur `lightgrey` | เทาอ่อน / lichtgrijs | toon van p12 |
| kleur `terracotta` | ส้มอิฐ / terracotta | toon van p07 |
| kleur `amber` | น้ำตาลทอง / amberbruin | toon van p08 |

Vierkant, ~900 px (patronen) en ~240 px (kleuren). Elk patroon bestaat in elke kleur (`<patroon>-<kleur>.jpg`); die zijn gemaakt met `python3 scripts/recolor-patterns.py public/images/patterns` uit de `pattern-*.jpg` uitsneden. Draai dat opnieuw als je een patroonfoto vervangt. De namen staan in `src/i18n/th.json` / `en.json` onder `patterns`; check of ze kloppen met hoe GL FLOORS ze zelf noemt.

