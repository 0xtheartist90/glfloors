'use client';

import { type ReactNode, useEffect, useState } from 'react';

import Image from 'next/image';

import { BeforeAfter } from '@/components/landing/BeforeAfter';
import { Gallery } from '@/components/landing/Gallery';
import { Patterns } from '@/components/landing/Patterns';
import { Reveal } from '@/components/landing/Reveal';
import { useI18n } from '@/i18n/LanguageProvider';
import type { Lang } from '@/i18n/LanguageProvider';
import { FACEBOOK_URL, LINE_ID, LINE_URL, PHONE_DISPLAY, PHONE_TEL, PRICES } from '@/lib/site';

import { ArrowUpRight, Clock, Droplets, Layers, Phone, Plus, Ruler, ShieldCheck } from 'lucide-react';

/* ---------- helpers ---------- */

// Titles use "\n" for line breaks and *word* for the gold accent.
function Title({ text, accent }: { text: string; accent: string }) {
    return text.split('\n').map((line, i) => (
        <span key={i} className='block'>
            {line.split(/\*(.+?)\*/).map((part, j) =>
                j % 2 ? (
                    <span key={j} className={accent}>
                        {part}
                    </span>
                ) : (
                    part
                )
            )}{' '}
        </span>
    ));
}

function LineIcon({ className = 'size-5' }: { className?: string }) {
    return (
        <svg viewBox='0 0 24 24' className={className} fill='currentColor' aria-hidden>
            <path d='M12 3C6.48 3 2 6.6 2 11.05c0 3.99 3.55 7.33 8.35 7.96.33.07.77.22.88.5.1.26.07.66.03.92l-.14.85c-.04.25-.2.98.86.53 1.06-.45 5.72-3.37 7.8-5.77C21.21 14.46 22 12.84 22 11.05 22 6.6 17.52 3 12 3Zm-3.6 10.4H6.5a.5.5 0 0 1-.5-.5V9.1a.5.5 0 0 1 1 0v3.3h1.4a.5.5 0 0 1 0 1Zm1.9-.5a.5.5 0 0 1-1 0V9.1a.5.5 0 0 1 1 0v3.8Zm4.6 0a.5.5 0 0 1-.9.3l-1.95-2.65v2.35a.5.5 0 0 1-1 0V9.1a.5.5 0 0 1 .9-.3l1.95 2.65V9.1a.5.5 0 0 1 1 0v3.8Zm3.1-2.4a.5.5 0 0 1 0 1h-1.4v.9h1.4a.5.5 0 0 1 0 1h-1.9a.5.5 0 0 1-.5-.5V9.1a.5.5 0 0 1 .5-.5h1.9a.5.5 0 0 1 0 1h-1.4v.9h1.4Z' />
        </svg>
    );
}

function LineButton({ children, variant = 'navy' }: { children: ReactNode; variant?: 'navy' | 'gold' }) {
    return (
        <a href={LINE_URL} target='_blank' rel='noopener noreferrer' className={`btn btn-${variant}`}>
            <span className='grid size-7 place-items-center rounded-full bg-linegreen text-white'>
                <LineIcon className='size-5' />
            </span>
            {children}
        </a>
    );
}

function Heading({
    eyebrow,
    title,
    text,
    dark = false
}: {
    eyebrow: string;
    title: string;
    text?: string;
    dark?: boolean;
}) {
    return (
        <div className='max-w-2xl'>
            <p className={`eyebrow ${dark ? '!text-gold' : ''}`}>{eyebrow}</p>
            <h2 className={`display-2 mt-4 ${dark ? 'text-white' : 'text-navy'}`}>
                <Title text={title} accent={dark ? 'text-gold' : 'text-gold-deep'} />
            </h2>
            {text && <p className={`mt-4 sm:text-lg ${dark ? 'text-white/70' : 'text-navy/70'}`}>{text}</p>}
        </div>
    );
}

/* ---------- header ---------- */

function LangSwitch({ light }: { light: boolean }) {
    const { lang, setLang, t } = useI18n();
    const options: Lang[] = ['th', 'en'];

    return (
        <div
            role='group'
            aria-label={t.header.language}
            className={`flex rounded-full p-0.5 text-sm ring-1 transition-colors ${light ? 'bg-white/10 ring-white/25' : 'ring-navy/15'}`}>
            {options.map((o) => {
                const active = lang === o;
                const tone = active
                    ? light
                        ? 'bg-white text-navy shadow-sm'
                        : 'bg-navy text-white shadow-sm'
                    : light
                      ? 'text-white/80 hover:text-white'
                      : 'text-navy/70 hover:text-navy';

                return (
                    <button
                        key={o}
                        type='button'
                        onClick={() => setLang(o)}
                        aria-pressed={active}
                        className={`min-h-9 rounded-full px-3.5 font-medium transition-colors ${tone}`}>
                        {o === 'th' ? 'ไทย' : 'EN'}
                    </button>
                );
            })}
        </div>
    );
}

const NAV = ['pricing', 'patterns', 'work', 'how', 'faq'] as const;

function Header() {
    const { t } = useI18n();
    const [scrolled, setScrolled] = useState(false);
    // Over the hero photo the header is transparent with white text; once scrolled it turns white.
    const light = !scrolled;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
                scrolled ? 'bg-white/90 shadow-[0_1px_0_rgb(15_30_58/0.08)] backdrop-blur-md' : ''
            }`}>
            <div
                className={`container-x flex items-center justify-between gap-4 transition-all duration-300 ${
                    scrolled ? 'h-16' : 'h-20 lg:h-24'
                }`}>
                <a href='#top' aria-label={t.header.home} className='flex items-center gap-3'>
                    <Image
                        src={light ? '/brand/mark-white.png' : '/brand/mark.png'}
                        alt=''
                        width={432}
                        height={368}
                        className='h-9 w-auto lg:h-10'
                        priority
                    />
                    <span
                        className={`text-[15px] font-semibold tracking-[0.22em] lg:text-base ${light ? 'text-white' : 'text-navy'}`}>
                        GL FLOORS
                    </span>
                </a>

                <nav className='hidden items-center gap-8 lg:flex' aria-label='Main'>
                    {NAV.map((id) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={`relative py-2 text-[15px] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100 ${
                                light ? 'text-white/85 hover:text-white' : 'text-navy/75 hover:text-navy'
                            }`}>
                            {t.nav[id]}
                        </a>
                    ))}
                </nav>

                <div className='flex items-center gap-3'>
                    <LangSwitch light={light} />
                    <a
                        href={LINE_URL}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={`btn hidden !min-h-11 !gap-2 !px-5 text-sm md:inline-flex ${
                            light ? 'bg-white text-navy hover:bg-cream' : 'btn-navy'
                        }`}>
                        <LineIcon className='size-4' />
                        {t.header.line}
                        <ArrowUpRight className='size-4' />
                    </a>
                </div>
            </div>
        </header>
    );
}

/* ---------- sections ---------- */

function Hero() {
    const { t } = useI18n();

    return (
        <section id='top' className='relative isolate flex min-h-[75svh] items-end overflow-hidden bg-navy text-white lg:items-center'>
            <Image
                src='/images/hero-bg.jpg'
                alt={t.hero.imageAlt}
                fill
                priority
                fetchPriority='high'
                sizes='100vw'
                className='-z-20 object-cover object-[72%_center] lg:object-center'
            />
            {/* navy shade: from the bottom on phones, from the left on desktop, so the house stays visible */}
            <div className='absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/75 to-navy/25 lg:bg-gradient-to-r lg:from-navy/90 lg:via-navy/55 lg:to-navy/0' />

            <div className='container-x pt-28 pb-12 lg:pt-28 lg:pb-16'>
                <div className='max-w-2xl'>
                    <div className='rise'>
                        <h1 className='display-1 lg:!text-[3.5rem] xl:!text-[4rem] [text-shadow:0_2px_30px_rgb(0_0_0/0.25)]'>
                            <Title text={t.hero.title} accent='text-gold' />
                        </h1>
                    </div>
                    <div className='rise' style={{ animationDelay: '160ms' }}>
                        <p className='mt-5 text-lg text-white/85 sm:text-xl'>{t.hero.subtitle}</p>
                    </div>
                    <div className='rise mt-8 flex flex-col gap-3 sm:flex-row' style={{ animationDelay: '200ms' }}>
                        <LineButton variant='gold'>{t.hero.ctaLine}</LineButton>
                        <a href={PHONE_TEL} className='btn btn-outline-light backdrop-blur-sm'>
                            <Phone className='size-5' strokeWidth={1.5} aria-hidden />
                            {t.hero.ctaCall}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

const uspIcons = [Layers, Droplets, ShieldCheck, Clock, Ruler];

function Usps() {
    const { t } = useI18n();

    return (
        <section aria-label={t.usps.title} className='grain bg-navy text-white'>
            <ul className='container-x grid grid-cols-2 lg:grid-cols-5'>
                {t.usps.items.map((label, i) => {
                    const Icon = uspIcons[i];

                    return (
                        <li
                            key={label}
                            className='flex flex-col items-center gap-4 border-white/15 px-3 py-7 text-center max-lg:border-b max-lg:last:col-span-2 max-lg:last:border-b-0 max-lg:odd:not-last:border-r lg:border-l lg:py-9 lg:first:border-l-0'>
                            <Icon className='size-8 text-gold' strokeWidth={1.1} aria-hidden />
                            <span className='text-[15px] font-medium sm:text-base'>{label}</span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

function Pricing() {
    const { t } = useI18n();

    return (
        <section id='pricing' className='section bg-white'>
            <div className='container-x'>
                <div className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
                    <Reveal>
                        <Heading eyebrow={t.pricing.eyebrow} title={t.pricing.title} />
                    </Reveal>
                    <Reveal delay={100}>
                        <span className='inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-base font-semibold text-navy'>
                            {t.pricing.badge}
                        </span>
                    </Reveal>
                </div>

                <ul className='mt-10 grid gap-4 md:grid-cols-3 md:gap-5'>
                    {PRICES.map(({ cm, price }, i) => (
                        <li key={cm}>
                            <Reveal
                                delay={i * 100}
                                className='group flex h-full flex-col rounded-sm border bg-cream/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-xl hover:shadow-navy/5 sm:p-7'>
                                <div className='flex items-end justify-between gap-4 md:block'>
                                    <div>
                                        <p className='text-sm text-navy/60'>{t.pricing.thicknessLabel}</p>
                                        <p className='mt-1 flex items-baseline gap-2 text-navy'>
                                            <span className='text-4xl font-light md:text-5xl'>{cm}</span>
                                            <span className='text-lg md:text-xl'>{t.pricing.cm}</span>
                                        </p>
                                    </div>
                                    {/* phones: price sits next to the thickness */}
                                    <p className='flex items-baseline gap-1.5 text-navy md:hidden'>
                                        <span className='text-3xl font-medium tracking-tight'>{price}</span>
                                        <span className='text-sm text-navy/70'>{t.pricing.unit}</span>
                                    </p>
                                </div>

                                {/* cross-section, slab drawn to scale on a gravel base */}
                                <div className='mt-4 md:mt-5' aria-hidden>
                                    <div
                                        className='rounded-t-[2px] bg-navy bg-[repeating-linear-gradient(90deg,transparent_0_46px,rgb(217_154_43/0.55)_46px_48px)] bg-[length:100%_3px] bg-no-repeat'
                                        style={{ height: `${cm * 3.5}px` }}
                                    />
                                    <div className='h-2 bg-[radial-gradient(circle,rgb(15_30_58/0.25)_1px,transparent_1.5px)] bg-[length:6px_6px] bg-cream-deep md:h-3' />
                                </div>

                                <p className='mt-3 text-sm text-navy/70 md:hidden'>{t.pricing.uses[i]}</p>
                                <div className='mt-5 hidden border-t pt-5 md:block'>
                                    <p className='flex items-baseline gap-2 text-navy'>
                                        <span className='text-4xl font-medium tracking-tight'>{price}</span>
                                        <span className='text-base text-navy/70'>{t.pricing.unit}</span>
                                    </p>
                                    <p className='mt-3 text-sm text-navy/70'>{t.pricing.uses[i]}</p>
                                </div>
                            </Reveal>
                        </li>
                    ))}
                </ul>
                <Reveal>
                    <p className='mt-6 max-w-2xl text-sm text-navy/65'>{t.pricing.note}</p>
                </Reveal>
            </div>
        </section>
    );
}

function PatternSection() {
    const { t } = useI18n();

    return (
        <section id='patterns' className='section border-t bg-white'>
            <div className='container-x'>
                <Reveal>
                    <Heading eyebrow={t.patterns.eyebrow} title={t.patterns.title} text={t.patterns.text} />
                </Reveal>
                <Reveal delay={100} className='mt-10'>
                    <Patterns />
                </Reveal>
            </div>
        </section>
    );
}

function Portfolio() {
    const { t } = useI18n();

    return (
        <>
            {/* full-bleed marquee of project photos, no heading */}
            <section id='work' aria-label={t.portfolio.title.replace(/[*\n]/g, ' ')} className='bg-white'>
                <Reveal>
                    <Gallery />
                </Reveal>
            </section>

            <section className='section bg-cream'>
                <div className='container-x grid items-center gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-16'>
                    <Reveal>
                        <Heading
                            eyebrow={t.portfolio.beforeAfterEyebrow}
                            title={t.portfolio.beforeAfterTitle}
                            text={t.portfolio.beforeAfterText}
                        />
                    </Reveal>
                    <Reveal delay={100}>
                        <BeforeAfter />
                    </Reveal>
                </div>
            </section>
        </>
    );
}

function Steps() {
    const { t } = useI18n();

    return (
        <section id='how' className='section grain bg-navy text-white'>
            <div className='container-x'>
                <Reveal>
                    <Heading eyebrow={t.steps.eyebrow} title={t.steps.title} dark />
                </Reveal>
                <ol className='mt-10 grid gap-8 md:grid-cols-3 md:gap-10'>
                    {t.steps.items.map((step, i) => (
                        <li key={step.title}>
                            <Reveal delay={i * 120} className='border-t border-white/15 pt-6'>
                                <span className='text-5xl font-light text-gold tabular-nums'>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className='mt-4 text-xl font-medium'>{step.title}</h3>
                                <p className='mt-3 text-white/70'>{step.body}</p>
                            </Reveal>
                        </li>
                    ))}
                </ol>
                <Reveal className='mt-10'>
                    <LineButton variant='gold'>{t.hero.ctaLine}</LineButton>
                </Reveal>
            </div>
        </section>
    );
}

function Faq() {
    const { t } = useI18n();

    return (
        <section id='faq' className='section bg-white'>
            <div className='container-x grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-16'>
                <Reveal>
                    <Heading eyebrow={t.faq.eyebrow} title={t.faq.title} />
                </Reveal>
                <Reveal delay={100} className='divide-y border-y'>
                    {t.faq.items.map((item) => (
                        <details key={item.q} className='group'>
                            <summary className='flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-base font-medium text-navy sm:text-lg [&::-webkit-details-marker]:hidden'>
                                {item.q}
                                <span className='grid size-10 shrink-0 place-items-center rounded-full border border-navy/15 transition group-open:rotate-45 group-open:border-gold group-open:bg-gold'>
                                    <Plus className='size-4' strokeWidth={1.5} aria-hidden />
                                </span>
                            </summary>
                            <p className='max-w-2xl pb-6 text-navy/70'>{item.a}</p>
                        </details>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}

function CtaBand() {
    const { t } = useI18n();

    return (
        <section className='grain relative isolate overflow-hidden bg-navy text-white'>
            <Image src='/images/p02.jpg' alt='' fill sizes='100vw' className='-z-20 object-cover' loading='lazy' />
            <div className='absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/90 to-navy/55' />
            <div className='container-x flex flex-col justify-center gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between'>
                <Reveal>
                    <p className='eyebrow !text-gold'>{t.cta.eyebrow}</p>
                    <h2 className='display-2 mt-5'>
                        <Title text={t.cta.title} accent='text-gold' />
                    </h2>
                    <p className='mt-4 max-w-lg text-white/75 sm:text-lg'>{t.cta.body}</p>
                </Reveal>
                <Reveal delay={120} className='flex flex-col gap-3 sm:flex-row lg:flex-col'>
                    <LineButton variant='gold'>{t.hero.ctaLine}</LineButton>
                    <a href={PHONE_TEL} className='btn btn-outline-light'>
                        <Phone className='size-5' strokeWidth={1.5} aria-hidden />
                        {t.cta.or} {PHONE_DISPLAY}
                    </a>
                </Reveal>
            </div>
        </section>
    );
}

function Footer() {
    const { t } = useI18n();
    const link = 'text-white/70 transition-colors hover:text-white';

    return (
        <footer className='grain bg-navy-deep pt-14 pb-28 text-white md:pb-10'>
            <div className='container-x grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]'>
                <div>
                    <Image src='/brand/logo-white.png' alt='GL FLOORS' width={445} height={498} loading='lazy' className='h-20 w-auto' />
                    <p className='mt-6 text-white/70'>{t.footer.tagline}</p>
                </div>
                <div>
                    <p className='eyebrow !text-gold'>{t.footer.contact}</p>
                    <ul className='mt-5 grid gap-3'>
                        <li>
                            <a href={LINE_URL} target='_blank' rel='noopener noreferrer' className={link}>
                                LINE · {LINE_ID}
                            </a>
                        </li>
                        <li>
                            <a href={PHONE_TEL} className={link}>
                                {PHONE_DISPLAY}
                            </a>
                        </li>
                        <li>
                            <a href={FACEBOOK_URL} target='_blank' rel='noopener noreferrer' className={link}>
                                {t.footer.facebook}
                            </a>
                        </li>
                    </ul>
                </div>
                <nav aria-label='Footer'>
                    <p className='eyebrow !text-gold'>GL FLOORS</p>
                    <ul className='mt-5 grid gap-3'>
                        {NAV.map((id) => (
                            <li key={id}>
                                <a href={`#${id}`} className={link}>
                                    {t.nav[id]}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className='container-x mt-12'>
                <p className='border-t border-white/10 pt-6 text-xs text-white/50'>
                    © {new Date().getFullYear()} GL FLOORS · Good Life (กู๊ดไลฟ์). {t.footer.rights}.
                </p>
            </div>
        </footer>
    );
}

function FloatingLine() {
    const { t } = useI18n();

    return (
        <a
            href={LINE_URL}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t.floating.label}
            className='fixed right-4 z-50 grid size-16 place-items-center rounded-full bg-linegreen text-white shadow-xl shadow-navy/30 transition active:scale-95 md:hidden'
            style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
            <span className='absolute inset-0 animate-ping rounded-full bg-linegreen opacity-20 motion-reduce:hidden' aria-hidden />
            <LineIcon className='relative size-9' />
        </a>
    );
}

/* ---------- page ---------- */

export function Landing() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Usps />
                <Pricing />
                <PatternSection />
                <Portfolio />
                <Steps />
                <Faq />
                <CtaBand />
            </main>
            <Footer />
            <FloatingLine />
        </>
    );
}
