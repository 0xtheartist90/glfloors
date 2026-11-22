# Grok prompt: pattern recolours for GL FLOORS

Upload the 3 photos in this folder (`stone.jpg`, `slate.jpg`, `cobble.jpg`) together with the prompt below.

---

I'm attaching 3 close-up photos of real stamped concrete floors (stamped concrete / พื้นคอนกรีตพิมพ์ลาย):

1. `stone.jpg`: random natural flagstone pattern (currently amber/orange)
2. `slate.jpg`: rectangular slate slab pattern (currently grey)
3. `cobble.jpg`: small cobblestone pattern (currently dark charcoal, wet)

Recolour each photo into these 4 stamped-concrete colours, 12 images in total:

| Name | Look | Base colour (guide) |
|---|---|---|
| charcoal | dark charcoal grey, almost slate-black, neutral (not blue) | #3F4349 |
| lightgrey | light natural concrete grey, neutral | #A8A9A5 |
| terracotta | brick red-orange like clay roof tiles | #A3482C |
| amber | warm golden-brown / honey, like the stone.jpg original | #B5762F |

Rules (important):
- Change **only the colour of the concrete**. Keep the exact same pattern, joints, stone shapes, texture, perspective, crop, lighting and wet gloss. Add nothing and remove nothing.
- It must look like a **real photo of a coloured stamped-concrete floor**: realistic colour variation across the stones, darker joints, natural shadows. It must not look painted, flat, posterised or like a colour filter.
- Highlights and wet reflections take a lighter shade of the floor colour itself: **no pink, salmon, purple or blue casts**, and no blown-out white patches.
- All 3 patterns in the same colour must look like the same product (same colour and the same saturation and brightness), so they can sit side by side.
- Where a photo already has that colour (stone.jpg is already amber, cobble.jpg is already charcoal), only make it consistent with the other two; don't change it more than needed.
- Output: square, 1200×1200 px, JPG, no text, no watermark, no border.

File names: `<pattern>-<colour>.jpg`, so:
`stone-charcoal.jpg`, `stone-lightgrey.jpg`, `stone-terracotta.jpg`, `stone-amber.jpg`,
`slate-charcoal.jpg`, `slate-lightgrey.jpg`, `slate-terracotta.jpg`, `slate-amber.jpg`,
`cobble-charcoal.jpg`, `cobble-lightgrey.jpg`, `cobble-terracotta.jpg`, `cobble-amber.jpg`

---

## Afterwards

Put the 12 files in `public/images/patterns/` (overwriting the existing ones with the same name). The site picks them up automatically; the colour circles use the `slate-<colour>.jpg` versions. In dev, clear the image cache if you still see the old ones: `rm -rf .next/cache/images`.
