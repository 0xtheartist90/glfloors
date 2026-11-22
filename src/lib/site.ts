export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const LINE_ID = 'jacknacmai';
export const LINE_URL = `https://line.me/ti/p/~${LINE_ID}`;
export const PHONE_DISPLAY = '089-519-9892';
export const PHONE_TEL = 'tel:0895199892';
export const PHONE_INTL = '+66895199892';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61596872456541';

export const PRICES = [
    { cm: 5, price: 500 },
    { cm: 7, price: 550 },
    { cm: 10, price: 600 }
] as const;

// Portfolio photos for the marquee, with their width/height ratio so they keep natural proportions.
// Adding or swapping a photo: put it in public/images and add/adjust a line here.
export const GALLERY: { src: string; ratio: number }[] = [
    { src: '/images/p01.jpg', ratio: 4 / 3 },
    { src: '/images/p02.jpg', ratio: 1 },
    { src: '/images/p03.jpg', ratio: 4 / 3 },
    { src: '/images/p04.jpg', ratio: 3 / 4 },
    { src: '/images/p05.jpg', ratio: 3 / 4 },
    { src: '/images/p06.jpg', ratio: 3 / 4 },
    { src: '/images/p07.jpg', ratio: 3 / 4 },
    { src: '/images/p08.jpg', ratio: 3 / 4 },
    { src: '/images/p09.jpg', ratio: 4 / 3 },
    { src: '/images/p10.jpg', ratio: 4 / 3 },
    { src: '/images/p11.jpg', ratio: 3 / 4 },
    { src: '/images/p12.jpg', ratio: 3 / 4 }
];
