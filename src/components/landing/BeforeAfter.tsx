'use client';

import { useState } from 'react';

import Image from 'next/image';

import { useI18n } from '@/i18n/LanguageProvider';

export function BeforeAfter() {
    const { t } = useI18n();
    const [pos, setPos] = useState(50);

    return (
        <figure className='relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-cream-deep select-none'>
            <Image
                src='/images/before.jpg'
                alt={`${t.portfolio.before}: ${t.portfolio.imageAlt}`}
                fill
                sizes='(min-width: 1024px) 960px, 100vw'
                className='object-cover'
            />
            <div className='absolute inset-0' style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
                <Image
                    src='/images/after.jpg'
                    alt={`${t.portfolio.after}: ${t.portfolio.imageAlt}`}
                    fill
                    sizes='(min-width: 1024px) 960px, 100vw'
                    className='object-cover'
                />
            </div>

            <span className='absolute top-3 left-3 rounded-sm bg-white/95 px-3 py-1 text-xs font-medium tracking-wide text-navy'>
                {t.portfolio.before}
            </span>
            <span className='absolute top-3 right-3 rounded-sm bg-navy/90 px-3 py-1 text-xs font-medium tracking-wide text-white'>
                {t.portfolio.after}
            </span>

            <div className='pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-gold' style={{ left: `${pos}%` }}>
                <div className='absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-navy shadow-lg'>
                    <svg viewBox='0 0 24 24' className='size-5' fill='none' stroke='currentColor' strokeWidth='1.5' aria-hidden>
                        <path d='M9 6l-6 6 6 6M15 6l6 6-6 6' />
                    </svg>
                </div>
            </div>

            <input
                type='range'
                min={0}
                max={100}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-label={t.portfolio.sliderLabel}
                className='absolute inset-0 h-full w-full cursor-ew-resize opacity-0'
            />
        </figure>
    );
}
