'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import { useI18n } from '@/i18n/LanguageProvider';
import { GALLERY } from '@/lib/site';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// A slow, full-width strip of project photos at their natural proportions. It pauses on hover,
// stands still (and scrolls by hand) for visitors who prefer reduced motion, and any photo opens
// a fullscreen lightbox (arrow keys + Escape work).
export function Gallery() {
    const { t } = useI18n();
    const [open, setOpen] = useState<number | null>(null);
    const n = GALLERY.length;

    const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n]);

    useEffect(() => {
        if (open === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(null);
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [open, step]);

    const alt = (i: number) => `${t.portfolio.imageAlt} ${i + 1}`;

    return (
        <>
            <div className='overflow-hidden motion-reduce:overflow-x-auto'>
                <ul className='marquee flex w-max hover:[animation-play-state:paused]'>
                    {[...GALLERY, ...GALLERY].map((photo, k) => {
                        const i = k % n;
                        const copy = k >= n;

                        return (
                            <li key={k} className='mr-2 shrink-0 sm:mr-3' aria-hidden={copy || undefined}>
                                <button
                                    type='button'
                                    tabIndex={copy ? -1 : undefined}
                                    onClick={() => setOpen(i)}
                                    aria-label={`${t.portfolio.open}: ${alt(i)}`}
                                    className='group relative block h-[300px] overflow-hidden rounded-sm bg-cream-deep sm:h-[440px]'
                                    style={{ aspectRatio: photo.ratio }}>
                                    <Image
                                        src={photo.src}
                                        alt={copy ? '' : alt(i)}
                                        fill
                                        loading='lazy'
                                        sizes='(min-width: 640px) 600px, 400px'
                                        className='object-cover transition duration-700 group-hover:scale-105'
                                    />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {open !== null && (
                <div
                    className='fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/95 p-4'
                    role='dialog'
                    aria-modal='true'
                    aria-label={alt(open)}
                    onClick={() => setOpen(null)}>
                    <button
                        type='button'
                        className='absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20'
                        aria-label={t.portfolio.close}>
                        <X />
                    </button>
                    <Image
                        src={GALLERY[open].src}
                        alt={alt(open)}
                        width={2000}
                        height={Math.round(2000 / GALLERY[open].ratio)}
                        sizes='100vw'
                        onClick={(e) => e.stopPropagation()}
                        className='h-auto max-h-[85vh] w-auto max-w-full rounded-sm object-contain'
                    />
                    <p className='absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/70 tabular-nums'>
                        {open + 1} / {n}
                    </p>
                    <button
                        type='button'
                        onClick={(e) => (e.stopPropagation(), step(-1))}
                        className='absolute left-3 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20'
                        aria-label={t.portfolio.prev}>
                        <ChevronLeft />
                    </button>
                    <button
                        type='button'
                        onClick={(e) => (e.stopPropagation(), step(1))}
                        className='absolute right-3 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20'
                        aria-label={t.portfolio.next}>
                        <ChevronRight />
                    </button>
                </div>
            )}
        </>
    );
}
