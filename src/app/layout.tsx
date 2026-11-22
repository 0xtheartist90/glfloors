import type { ReactNode } from 'react';

import type { Metadata, Viewport } from 'next';
import { Prompt } from 'next/font/google';

import '@/app/globals.css';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import th from '@/i18n/th.json';
import { SITE_URL } from '@/lib/site';

const prompt = Prompt({
    subsets: ['thai', 'latin'],
    weight: ['300', '400', '500', '600'],
    display: 'swap',
    variable: '--font-prompt'
});

const description =
    'พื้นคอนกรีตพิมพ์ลาย เชียงใหม่ ราคาเริ่มต้น 500 บาท/ตร.ม. สำหรับทางเข้าบ้าน ลานจอดรถ ระเบียง โรงจอดรถ และรอบบ้าน ทนทาน ไม่ลื่น วัดหน้างานฟรี ส่งรูป + ตร.ม. ทาง LINE รับราคาประเมินฟรี';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: th.meta.title,
    description,
    alternates: { canonical: '/' },
    openGraph: {
        type: 'website',
        locale: 'th_TH',
        alternateLocale: ['en_US'],
        siteName: 'GL FLOORS',
        title: th.meta.title,
        description,
        url: '/',
        images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: 'GL FLOORS พื้นคอนกรีตพิมพ์ลาย เชียงใหม่' }]
    },
    twitter: {
        card: 'summary_large_image',
        title: th.meta.title,
        description,
        images: ['/images/og.jpg']
    }
};

export const viewport: Viewport = {
    themeColor: '#0F1E3A'
};

const schema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'GL FLOORS',
    alternateName: 'Good Life (กู๊ดไลฟ์)',
    description,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.png`,
    image: `${SITE_URL}/images/og.jpg`,
    telephone: '+66895199892',
    priceRange: '500–600 THB/m²',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chiang Mai',
        addressRegion: 'Chiang Mai',
        addressCountry: 'TH'
    },
    areaServed: { '@type': 'City', name: 'Chiang Mai' },
    sameAs: ['https://www.facebook.com/profile.php?id=61596872456541', 'https://line.me/ti/p/~jacknacmai']
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang='th' className={prompt.variable}>
            <body className='antialiased'>
                <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
                <LanguageProvider>{children}</LanguageProvider>
            </body>
        </html>
    );
}
