'use client';

import { useState } from 'react';

import Image from 'next/image';

import { useI18n } from '@/i18n/LanguageProvider';
import { LINE_URL } from '@/lib/site';

import { Check } from 'lucide-react';

// Every pattern exists in every colour (public/images/patterns/<pattern>-<colour>.jpg, made from real
// project crops by scripts/recolor-patterns.py). Order matches the names in th/en.json.
const PATTERNS = ['stone', 'slate', 'cobble'];
const COLORS = ['charcoal', 'lightgrey', 'terracotta', 'amber'];
const img = (p: number, c: number) => `/images/patterns/${PATTERNS[p]}-${COLORS[c]}.jpg`;

export function Patterns() {
    const { t } = useI18n();
    const p = t.patterns;
    const [pattern, setPattern] = useState(0);
    const [color, setColor] = useState(0);

    return (
        <div>
            <fieldset>
                <legend className='mb-4 text-sm font-medium text-navy/60'>{p.patternLabel}</legend>
                <div className='grid grid-cols-3 gap-2 sm:gap-3'>
                    {p.patterns.map((name, i) => {
                        const active = pattern === i;

                        return (
                            <button
                                key={name}
                                type='button'
                                onClick={() => setPattern(i)}
                                aria-pressed={active}
                                className={`group overflow-hidden rounded-sm border bg-white text-left transition ${
                                    active ? 'border-navy ring-1 ring-navy' : 'hover:border-navy/40'
                                }`}>
                                <span className='relative block aspect-[4/3] overflow-hidden'>
                                    <Image
                                        src={img(i, color)}
                                        alt={name}
                                        fill
                                        sizes='(min-width: 1024px) 33vw, 34vw'
                                        className='object-cover transition duration-700 group-hover:scale-105'
                                    />
                                    {active && (
                                        <span className='absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-navy text-white'>
                                            <Check className='size-4' />
                                        </span>
                                    )}
                                </span>
                                <span className='block px-2.5 py-2.5 text-sm leading-snug font-medium text-navy sm:px-4 sm:py-3 sm:text-[15px]'>{name}</span>
                            </button>
                        );
                    })}
                </div>
            </fieldset>

            <div className='mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end'>
                <fieldset>
                    <legend className='mb-4 text-sm font-medium text-navy/60'>{p.colorLabel}</legend>
                    <div className='flex flex-wrap gap-x-6 gap-y-4'>
                        {p.colors.map((name, i) => {
                            const active = color === i;

                            return (
                                <button
                                    key={name}
                                    type='button'
                                    onClick={() => setColor(i)}
                                    aria-pressed={active}
                                    className='flex items-center gap-3 text-[15px] text-navy'>
                                    <span
                                        className={`relative size-12 overflow-hidden rounded-full ring-offset-2 transition ${
                                            active ? 'ring-2 ring-navy' : 'ring-1 ring-navy/15'
                                        }`}>
                                        <Image src={img(1, i)} alt='' fill sizes='48px' className='object-cover' />
                                    </span>
                                    <span className={active ? 'font-medium' : 'text-navy/70'}>{name}</span>
                                </button>
                            );
                        })}
                    </div>
                </fieldset>

                <div className='rounded-sm bg-cream p-5 lg:min-w-[22rem]'>
                    <p className='text-sm text-navy/60'>{p.choice}</p>
                    <p className='mt-1 text-lg font-medium text-navy' aria-live='polite'>
                        “{p.patterns[pattern]} · {p.colors[color]}”
                    </p>
                    <a
                        href={LINE_URL}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='mt-4 inline-flex items-center gap-2 text-[15px] font-medium text-navy underline decoration-gold decoration-2 underline-offset-[6px] hover:decoration-navy'>
                        {p.send} →
                    </a>
                </div>
            </div>
        </div>
    );
}
