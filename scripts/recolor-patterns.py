"""Make every stamped-concrete pattern in every colour, using colours taken from real project photos.

For each colour we read a real photo of a floor in that colour and learn, per brightness level, which
RGB colour that floor has (a gradient map). That map is then applied to the brightness of each pattern
crop, so texture comes from the pattern and colour from the real floor. Where a real crop already shows
a pattern in a colour, that crop is used as is.

Run from the project root:  python3 scripts/recolor-patterns.py public/images/patterns
"""
import colorsys
import sys

from PIL import Image, ImageFilter, ImageOps

d = sys.argv[1]
root = d.rsplit('/patterns', 1)[0]  # public/images

patterns = ['stone', 'slate', 'cobble']
# colour -> (source photo, crop box of a floor area in that colour)
sources = {
    'charcoal': ('p05.jpg', (0, 700, 1500, 2000)),
    'lightgrey': ('p12.jpg', (200, 1100, 1300, 2000)),
    'terracotta': ('p07.jpg', (0, 700, 1500, 2000)),
    'amber': ('p06.jpg', (0, 560, 1500, 2000)),
}
real = {('stone', 'amber'): 'pattern-stone.jpg', ('cobble', 'charcoal'): 'pattern-cobble.jpg'}


def gradient_map(img):
    """256-entry list: average colour of the pixels at each brightness, smoothed and filled."""
    img = img.convert('RGB').resize((400, 400))
    lum = img.convert('L')
    sums = [[0, 0, 0, 0] for _ in range(256)]
    for (r, g, b), l in zip(img.getdata(), lum.getdata()):
        s = sums[l]
        s[0] += r
        s[1] += g
        s[2] += b
        s[3] += 1
    known = [(i, (s[0] / s[3], s[1] / s[3], s[2] / s[3])) for i, s in enumerate(sums) if s[3] >= 3]
    lut = []
    for i in range(256):
        lo = max((k for k in known if k[0] <= i), default=known[0], key=lambda k: k[0])
        hi = min((k for k in known if k[0] >= i), default=known[-1], key=lambda k: k[0])
        t = 0 if hi[0] == lo[0] else (i - lo[0]) / (hi[0] - lo[0])
        lut.append(tuple(lo[1][j] + (hi[1][j] - lo[1][j]) * t for j in range(3)))
    # smooth so noise in the source does not band
    w = 6
    return [
        tuple(int(sum(lut[k][j] for k in range(max(0, i - w), min(256, i + w + 1))) / (min(256, i + w + 1) - max(0, i - w))) for j in range(3))
        for i in range(256)
    ]


def match_brightness(src_l, ref_l):
    """Histogram-match a greyscale image to a reference, so light crops do not wash out."""
    def cdf(im):
        h = im.histogram()
        tot = sum(h)
        acc, out = 0, []
        for v in h:
            acc += v
            out.append(acc / tot)
        return out

    cs, cr = cdf(src_l), cdf(ref_l)
    lut, j = [], 0
    for i in range(256):
        while j < 255 and cr[j] < cs[i]:
            j += 1
        lut.append(j)
    return src_l.point(lut)


# Wet photos reflect the sky; above this brightness the map keeps the floor colour instead of near-white.
highlight_cap = {'charcoal': 225, 'terracotta': 165, 'amber': 190}
# Warm floors: reflections in the source turn pink, so keep the floor's own hue/saturation fixed.
lock_hue = {'terracotta', 'amber'}


def floor_hue(img):
    px = sorted(img.convert('RGB').resize((200, 200)).getdata(), key=lambda c: sum(c))
    mid = px[len(px) // 4 : len(px) * 3 // 4]  # ignore shadows and reflections
    r, g, b = (sum(c[i] for c in mid) / len(mid) / 255 for i in range(3))
    h, s, _ = colorsys.rgb_to_hsv(r, g, b)
    return h, s


maps, refs = {}, {}
for c, (photo, box) in sources.items():
    crop = Image.open(f'{root}/{photo}').crop(box)
    lut = gradient_map(crop)
    cap = highlight_cap.get(c)
    if cap:
        lut = lut[:cap] + [lut[cap]] * (256 - cap)
    if c in lock_hue:
        h, sat = floor_hue(crop)
        locked = []
        for i, (r, g, b) in enumerate(lut):
            v = max(r, g, b) / 255
            # highlights get slightly less saturated, like real gloss, but never pink
            rr, gg, bb = colorsys.hsv_to_rgb(h, sat * (1 - 0.25 * (i / 255) ** 2), v)
            locked.append((int(rr * 255), int(gg * 255), int(bb * 255)))
        lut = locked
    maps[c] = lut
    refs[c] = crop.convert('L').resize((400, 400))

for p in patterns:
    src = Image.open(f'{d}/pattern-{p}.jpg')
    g = ImageOps.autocontrast(src.convert('L'), cutoff=1).filter(ImageFilter.SMOOTH)
    for c, lut in maps.items():
        out = f'{d}/{p}-{c}.jpg'
        if (p, c) in real:
            Image.open(f'{d}/{real[(p, c)]}').convert('RGB').save(out, quality=82, optimize=True)
            continue
        gm = match_brightness(g, refs[c])
        rgb = Image.merge('RGB', [gm.point([lut[i][j] for i in range(256)]) for j in range(3)])
        rgb.save(out, quality=82, optimize=True)
print('ok')
