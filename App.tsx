import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowRight, Check, Clock3, Heart, Menu, Send, ShoppingBag, Sparkles, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Collection = {
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  accent: string;
};

type Product = {
  name: string;
  detail: string;
  price: string;
  image: string;
  tag?: string;
};

const collections: Collection[] = [
  { name: 'Birthday Flowers', eyebrow: 'For the bright days', description: 'A little more colour, a lot more feeling.', image: '/images/bloom-seasonal.jpg', accent: 'from-[#efc9b5]' },
  { name: 'Romantic Bouquets', eyebrow: 'For your person', description: 'Petals that say the part you could not.', image: '/images/bloom-roses.jpg', accent: 'from-[#dfafb0]' },
  { name: 'Wedding Flowers', eyebrow: 'For the forever moments', description: 'Considered florals for your walk down the aisle.', image: '/images/bloom-hero.jpg', accent: 'from-[#e6d6bd]' },
  { name: 'Sympathy Flowers', eyebrow: 'For holding space', description: 'Quiet, graceful gestures of love and remembrance.', image: '/images/bloom-studio.jpg', accent: 'from-[#c9d0bd]' },
  { name: 'Gift Boxes', eyebrow: 'For a thoughtful extra', description: 'Small luxuries chosen to complement the flowers.', image: '/images/bloom-hero.jpg', accent: 'from-[#dfc6ba]' },
  { name: 'Seasonal Flowers', eyebrow: 'For right now', description: 'The freshest stems, gathered at their most beautiful.', image: '/images/bloom-seasonal.jpg', accent: 'from-[#d5cdb5]' },
];

const products: Product[] = [
  { name: 'The Sunday Bunch', detail: 'Seasonal blooms · medium', price: 'R895', image: '/images/bloom-seasonal.jpg', tag: 'Bestseller' },
  { name: 'Rose & Rapture', detail: 'Garden roses · premium', price: 'R1,250', image: '/images/bloom-roses.jpg' },
  { name: 'The Quiet Garden', detail: 'Whites & foliage · large', price: 'R1,450', image: '/images/bloom-hero.jpg' },
  { name: 'A Little Celebration', detail: 'Bright seasonal mix · petite', price: 'R650', image: '/images/bloom-seasonal.jpg' },
  { name: 'Afterglow', detail: 'Peach roses & cosmos · medium', price: 'R980', image: '/images/bloom-roses.jpg', tag: 'New this week' },
  { name: 'The Grand Gesture', detail: 'Statement arrangement · large', price: 'R1,850', image: '/images/bloom-hero.jpg' },
];

const testimonials = [
  { quote: 'The bouquet was even more beautiful than the photograph. It made an ordinary Tuesday feel like an occasion.', name: 'Naledi M.', note: 'Rosebank, Johannesburg' },
  { quote: 'Bloom & Co. understood the mood immediately. Thoughtful, effortless, and delivered exactly when promised.', name: 'Daniel K.', note: 'Parkhurst, Johannesburg' },
  { quote: 'The details were exquisite — from the flowers to the handwritten note. I will be ordering again and again.', name: 'Sarah T.', note: 'Melrose, Johannesburg' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const openCollection = (collection: Collection) => {
    setSelectedCollection(collection);
    setNotice(`${collection.name} is ready to explore — tell us what you have in mind.`);
  };

  return (
    <div className="noise min-h-[100dvh] overflow-x-hidden bg-[#f7f3eb] text-[#294437]">
      <div className="bg-[#294437] px-5 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f7f3eb] sm:text-[11px]">
        Same-day delivery across Johannesburg · Monday to Saturday
      </div>

      <header className="relative z-40 border-b border-[#d9d1c1]/70 bg-[#f7f3eb]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <a href="#top" onClick={() => scrollToSection('top')} data-testid="link-logo" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#bd887e]/45 text-[#bd887e] transition-transform duration-300 group-hover:rotate-12">
              <span className="font-display text-[21px] italic">b</span>
            </span>
            <span className="font-display text-[22px] tracking-[-0.03em] text-[#294437]">Bloom <span className="text-[#bd887e]">&</span> Co.</span>
          </a>
          <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#52645a] lg:flex" aria-label="Main navigation">
            <button onClick={() => scrollToSection('collections')} data-testid="button-nav-collections" className="transition-colors hover:text-[#bd887e]">Collections</button>
            <button onClick={() => scrollToSection('best-sellers')} data-testid="button-nav-bestsellers" className="transition-colors hover:text-[#bd887e]">Best sellers</button>
            <button onClick={() => scrollToSection('studio')} data-testid="button-nav-studio" className="transition-colors hover:text-[#bd887e]">Our studio</button>
            <button onClick={() => scrollToSection('contact')} data-testid="button-nav-contact" className="transition-colors hover:text-[#bd887e]">Contact</button>
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            <a href="tel:+27111234567" data-testid="link-header-phone" className="text-[11px] font-semibold tracking-[0.08em] text-[#52645a] transition-colors hover:text-[#bd887e]">+27 11 123 4567</a>
            <a href="https://wa.me/27721234567" target="_blank" rel="noreferrer" data-testid="link-header-whatsapp" className="rounded-full bg-[#294437] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f7f3eb] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#bd887e]">WhatsApp us</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu" className="rounded-full border border-[#d9d1c1] p-2.5 lg:hidden">
            {menuOpen ? <X size={19} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#d9d1c1]/70 px-5 py-5 lg:hidden">
            <nav className="flex flex-col gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#52645a]" aria-label="Mobile navigation">
              {['collections', 'best-sellers', 'studio', 'contact'].map((item) => (
                <button key={item} onClick={() => { scrollToSection(item); setMenuOpen(false); }} data-testid={`button-mobile-${item}`} className="py-1 text-left transition-colors hover:text-[#bd887e]">{item.replace('-', ' ')}</button>
              ))}
              <a href="https://wa.me/27721234567" target="_blank" rel="noreferrer" data-testid="link-mobile-whatsapp" className="mt-2 inline-flex w-fit rounded-full bg-[#294437] px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-[#f7f3eb]">Order on WhatsApp</a>
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[.86fr_1.14fr] lg:gap-16 lg:px-12 lg:pb-28 lg:pt-24">
          <div className="relative z-10 max-w-[590px]">
            <div className="reveal mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#bd887e]">
              <span className="h-px w-10 bg-[#bd887e]" /> The art of giving
            </div>
            <h1 className="reveal reveal-delay-1 text-balance font-display text-[clamp(3.65rem,7vw,7.5rem)] leading-[.94] tracking-[-0.06em] text-[#294437]">
              Flowers that make every moment bloom.
            </h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-[420px] text-[16px] leading-7 text-[#66766c]">
              Handcrafted bouquets and beautiful floral arrangements, thoughtfully created for life's special moments.
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => scrollToSection('best-sellers')} data-testid="button-hero-shop" className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#294437] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#f7f3eb] transition-all duration-300 hover:-translate-y-1 hover:bg-[#bd887e] hover:shadow-[0_12px_24px_rgba(189,136,126,.18)]">
                Shop Flowers <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <a href="https://wa.me/27721234567?text=Hello%20Bloom%20%26%20Co.%2C%20I%27d%20love%20to%20place%20an%20order." target="_blank" rel="noreferrer" data-testid="link-hero-whatsapp" className="inline-flex items-center justify-center gap-3 rounded-full border border-[#294437]/25 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#294437] transition-all duration-300 hover:-translate-y-1 hover:border-[#bd887e] hover:text-[#bd887e]">
                Order on WhatsApp
              </a>
            </div>
            <div className="mt-12 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b978d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#bd887e]" /> Johannesburg <span className="text-[#bd887e]">•</span> Same-day delivery available
            </div>
          </div>
          <div className="reveal reveal-delay-2 relative min-h-[430px] sm:min-h-[570px] lg:min-h-[660px]">
            <div className="absolute -right-8 top-4 h-52 w-52 rounded-full bg-[#dfafb0]/30 blur-3xl sm:h-72 sm:w-72" />
            <div className="absolute bottom-0 left-0 z-10 max-w-[220px] rounded-2xl border border-[#f7f3eb]/35 bg-[#294437]/92 p-5 text-[#f7f3eb] shadow-[0_15px_45px_rgba(41,68,55,.18)] backdrop-blur-sm sm:-left-8 sm:max-w-[240px] sm:p-6">
              <Sparkles size={17} strokeWidth={1.3} className="mb-6 text-[#e1b0a2]" />
              <p className="font-display text-[21px] leading-[1.15]">Every stem chosen with feeling.</p>
              <p className="mt-3 text-[11px] leading-5 text-[#c8d0c7]">Grown with care. Arranged by hand. Delivered with heart.</p>
            </div>
            <div className="absolute inset-x-5 top-0 bottom-7 overflow-hidden rounded-[11rem_11rem_1.5rem_1.5rem] sm:inset-x-12 lg:inset-x-20">
              <img src="/images/bloom-hero.jpg" alt="A generous ivory and blush flower arrangement" className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.04]" data-testid="img-hero-bouquet" />
            </div>
            <div className="absolute right-0 top-16 flex h-20 w-20 items-center justify-center rounded-full border border-[#bd887e]/50 bg-[#f7f3eb]/80 text-center text-[9px] font-semibold uppercase leading-4 tracking-[0.12em] text-[#bd887e] backdrop-blur-sm sm:right-3 sm:h-24 sm:w-24">
              Since<br />2018
            </div>
          </div>
        </section>

        <section id="collections" className="scroll-mt-16 border-y border-[#d9d1c1]/70 bg-[#f1ebe1] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1320px]">
            <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-16">
              <div>
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#bd887e]">Find your feeling</p>
                <h2 className="font-display text-[clamp(2.4rem,4.4vw,4.3rem)] leading-none tracking-[-0.05em] text-[#294437]">Flowers for every chapter.</h2>
              </div>
              <p className="max-w-[275px] text-sm leading-6 text-[#66766c]">From the first hello to the forever kind of yes, find something that says it beautifully.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection, index) => (
                <button key={collection.name} onClick={() => openCollection(collection)} data-testid={`button-collection-${index}`} className={`group relative min-h-[330px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${collection.accent} text-left shadow-[0_7px_25px_rgba(41,68,55,.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(41,68,55,.13)] ${index === 1 ? 'lg:translate-y-8' : ''} ${index === 4 ? 'lg:translate-y-8' : ''}`}>
                  <img src={collection.image} alt="" className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-75 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#294437]/90 via-[#294437]/15 to-transparent" />
                  <div className="relative flex h-full flex-col justify-between p-6 text-[#f7f3eb] sm:p-7">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f7f3eb]/45 bg-[#f7f3eb]/10 text-sm backdrop-blur-sm">0{index + 1}</span>
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#f0c9bc]">{collection.eyebrow}</p>
                      <h3 className="font-display text-[30px] leading-none tracking-[-0.04em]">{collection.name}</h3>
                      <p className="mt-3 max-w-[235px] text-[12px] leading-5 text-[#e8e8de]">{collection.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f0c9bc]">Explore Collection <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="best-sellers" className="scroll-mt-16 mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
          <div className="mb-12 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end lg:mb-16">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#bd887e]">The good stuff</p>
              <h2 className="font-display text-[clamp(2.4rem,4.4vw,4.3rem)] leading-none tracking-[-0.05em] text-[#294437]">A little something beautiful.</h2>
            </div>
            <button onClick={() => setNotice('Our full catalogue is coming soon. For now, we would love to make something bespoke for you.')} data-testid="button-view-all-flowers" className="group inline-flex items-center gap-3 border-b border-[#294437]/35 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#294437] transition-colors hover:border-[#bd887e] hover:text-[#bd887e]">View all flowers <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></button>
          </div>
          <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <article key={product.name} className="group" data-testid={`card-product-${index}`}>
                <div className="relative aspect-[.91] overflow-hidden rounded-[1.35rem] bg-[#e8ddcf]">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]" />
                  <div className="absolute inset-0 bg-[#294437]/0 transition-colors duration-500 group-hover:bg-[#294437]/10" />
                  {product.tag && <span className="absolute left-4 top-4 rounded-full bg-[#f7f3eb]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#294437]">{product.tag}</span>}
                  <button onClick={() => setNotice(`${product.name} added to your enquiry — we will help you find the perfect size.`)} aria-label={`Enquire about ${product.name}`} data-testid={`button-enquire-${index}`} className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-[#f7f3eb] text-[#294437] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#bd887e] hover:text-[#f7f3eb]">
                    <ShoppingBag size={16} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="flex items-start justify-between gap-3 pt-5">
                  <div>
                    <h3 className="font-display text-[25px] leading-none tracking-[-0.03em] text-[#294437]">{product.name}</h3>
                    <p className="mt-2 text-xs text-[#839087]">{product.detail}</p>
                  </div>
                  <span className="pt-1 text-sm font-semibold text-[#294437]">{product.price}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="studio" className="scroll-mt-16 bg-[#294437] text-[#f7f3eb]">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-12 lg:py-28">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -bottom-5 -left-4 h-32 w-32 rounded-full border border-[#bd887e]/35 sm:-left-8 sm:h-44 sm:w-44" />
              <img src="/images/bloom-studio.jpg" alt="A florist carefully wrapping a bouquet in the Bloom & Co. studio" className="relative z-10 mx-auto aspect-[.82] max-h-[620px] w-full max-w-[470px] rounded-[13rem_13rem_1.5rem_1.5rem] object-cover" data-testid="img-studio" />
              <div className="absolute bottom-8 right-0 z-20 flex h-24 w-24 rotate-6 items-center justify-center rounded-full bg-[#e1b0a2] text-center font-display text-[16px] leading-[1.1] text-[#294437] shadow-lg sm:-right-5 sm:h-28 sm:w-28">Made<br /><i>by hand</i></div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e1b0a2]">A little about us</p>
              <h2 className="max-w-[600px] font-display text-[clamp(2.7rem,5vw,5.2rem)] leading-[.97] tracking-[-0.055em]">We believe flowers are a form of <i className="text-[#e1b0a2]">attention.</i></h2>
              <p className="mt-8 max-w-[510px] text-[15px] leading-7 text-[#c6d0c5]">Bloom & Co. began with a small worktable, a pair of secateurs and a belief that the everyday deserves ceremony. Today, our Johannesburg studio creates thoughtful arrangements from the best blooms we can find — always with a little wildness, never without feeling.</p>
              <p className="mt-5 max-w-[510px] text-[15px] leading-7 text-[#c6d0c5]">Whether it is a birthday, a new beginning or simply a Tuesday, we make it easy to send something that means more.</p>
              <button onClick={() => setNotice('We would love to tell you more about our studio story. Send us a WhatsApp and say hello.')} data-testid="button-studio-story" className="group mt-9 inline-flex items-center gap-3 border-b border-[#e1b0a2]/60 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e1b0a2]">Meet the studio <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></button>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d9d1c1]/70 bg-[#f1ebe1] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mb-12 max-w-[550px]">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#bd887e]">The Bloom promise</p>
              <h2 className="font-display text-[clamp(2.4rem,4vw,4rem)] leading-none tracking-[-0.05em] text-[#294437]">Good flowers.<br /><i>Good feeling.</i></h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-[#d9d1c1] bg-[#d9d1c1] md:grid-cols-3">
              {[
                { icon: Sparkles, title: 'Fresh, always', copy: 'We source the best seasonal stems and make every arrangement to order.' },
                { icon: Clock3, title: 'When you need it', copy: 'Same-day delivery across Johannesburg for orders placed before 12pm.' },
                { icon: Heart, title: 'Made meaningful', copy: 'From the colour palette to the handwritten note, every detail is considered.' },
              ].map((item, index) => (
                <div key={item.title} className="bg-[#f7f3eb] p-7 sm:p-9 lg:p-11" data-testid={`trust-item-${index}`}>
                  <item.icon size={22} strokeWidth={1.25} className="mb-14 text-[#bd887e]" />
                  <h3 className="font-display text-[27px] tracking-[-0.03em] text-[#294437]">{item.title}</h3>
                  <p className="mt-3 max-w-[250px] text-[13px] leading-6 text-[#718077]">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#bd887e]">Kind words</p>
              <h2 className="font-display text-[clamp(2.4rem,4vw,4rem)] leading-none tracking-[-0.05em] text-[#294437]">From people who feel it.</h2>
            </div>
            <div className="hidden gap-2 sm:flex">
              <span className="h-px w-12 bg-[#bd887e]" /><span className="h-px w-4 bg-[#d9d1c1]" />
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <figure key={testimonial.name} className={`rounded-[1.5rem] p-7 sm:p-9 ${index === 1 ? 'bg-[#dfafb0]/45' : 'bg-[#f1ebe1]'}`} data-testid={`testimonial-${index}`}>
                <div className="mb-12 text-4xl font-display text-[#bd887e]">“</div>
                <blockquote className="font-display text-[24px] leading-[1.18] tracking-[-0.025em] text-[#294437]">{testimonial.quote}</blockquote>
                <figcaption className="mt-8 border-t border-[#294437]/15 pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#294437]">{testimonial.name}</p>
                  <p className="mt-1 text-xs text-[#77857c]">{testimonial.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-16 mx-5 mb-8 overflow-hidden rounded-[1.8rem] bg-[#dcae9e] sm:mx-8 lg:mx-12">
          <div className="relative mx-auto grid max-w-[1320px] items-center gap-8 px-6 py-14 sm:px-12 lg:grid-cols-[1fr_auto] lg:px-20 lg:py-20">
            <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full border border-[#294437]/15 sm:-right-4 sm:-top-36 sm:h-[420px] sm:w-[420px]" />
            <div className="relative z-10">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#294437]/65">Let us make something lovely</p>
              <h2 className="max-w-[650px] font-display text-[clamp(2.8rem,5vw,5.5rem)] leading-[.93] tracking-[-0.055em] text-[#294437]">Have something in mind?</h2>
              <p className="mt-6 max-w-[420px] text-sm leading-6 text-[#294437]/70">Tell us who it is for, what you are celebrating, and when you would like it delivered. We will take care of the rest.</p>
            </div>
            <div className="relative z-10 flex flex-col items-start gap-3 sm:flex-row lg:flex-col">
              <a href="https://wa.me/27721234567?text=Hello%20Bloom%20%26%20Co.%2C%20I%27d%20love%20to%20order%20flowers." target="_blank" rel="noreferrer" data-testid="link-contact-whatsapp" className="inline-flex items-center gap-3 rounded-full bg-[#294437] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#f7f3eb] transition-all duration-300 hover:-translate-y-1 hover:bg-[#3b5b49]">Start an order <ArrowRight size={15} /></a>
              <a href="mailto:hello@bloomandco.co.za" data-testid="link-contact-email" className="inline-flex items-center gap-3 rounded-full border border-[#294437]/35 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#294437] transition-all duration-300 hover:-translate-y-1 hover:border-[#294437]"><Send size={14} /> Email the studio</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-[1320px] px-5 pb-8 pt-8 sm:px-8 lg:px-12">
        <div className="grid gap-10 border-b border-[#d9d1c1] pb-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" onClick={() => scrollToSection('top')} data-testid="link-footer-logo" className="font-display text-[29px] tracking-[-0.04em] text-[#294437]">Bloom <span className="text-[#bd887e]">&</span> Co.</a>
            <p className="mt-4 max-w-[250px] text-[12px] leading-5 text-[#7b887f]">Flowers for the meaningful, the everyday, and everything in between.</p>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#bd887e]">Explore</p>
            <div className="flex flex-col items-start gap-3 text-xs text-[#52645a]">
              <button onClick={() => scrollToSection('collections')} data-testid="button-footer-collections" className="hover:text-[#bd887e]">Collections</button>
              <button onClick={() => scrollToSection('best-sellers')} data-testid="button-footer-bestsellers" className="hover:text-[#bd887e]">Best sellers</button>
              <button onClick={() => scrollToSection('studio')} data-testid="button-footer-studio" className="hover:text-[#bd887e]">Our studio</button>
            </div>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#bd887e]">Say hello</p>
            <div className="flex flex-col items-start gap-3 text-xs text-[#52645a]">
              <a href="mailto:hello@bloomandco.co.za" data-testid="link-footer-email" className="hover:text-[#bd887e]">hello@bloomandco.co.za</a>
              <a href="tel:+27111234567" data-testid="link-footer-phone" className="hover:text-[#bd887e]">+27 11 123 4567</a>
              <a href="https://wa.me/27721234567" target="_blank" rel="noreferrer" data-testid="link-footer-whatsapp" className="hover:text-[#bd887e]">WhatsApp the studio</a>
            </div>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#bd887e]">Find us</p>
            <p className="text-xs leading-5 text-[#52645a]">Johannesburg,<br />Gauteng, South Africa</p>
            <p className="mt-3 text-xs text-[#7b887f]">Mon–Sat · 08:00–16:00</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-6 text-[10px] uppercase tracking-[0.13em] text-[#9aa39b] sm:flex-row">
          <span>© 2024 Bloom & Co. All rights reserved.</span>
          <span>Made for moments that matter.</span>
        </div>
      </footer>

      {notice && (
        <div role="status" data-testid="status-notice" className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-[470px] -translate-x-1/2 items-center gap-3 rounded-2xl border border-[#d9d1c1] bg-[#f7f3eb] px-4 py-4 text-sm text-[#294437] shadow-[0_18px_45px_rgba(41,65,52,.17)]">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#dce7d8] text-[#294437]"><Check size={15} /></span>
          <span className="flex-1 leading-5">{notice}</span>
          <button onClick={() => setNotice(null)} aria-label="Dismiss notice" data-testid="button-dismiss-notice" className="rounded-full p-1 text-[#7b887f] transition-colors hover:bg-[#e9e2d7] hover:text-[#294437]"><X size={16} /></button>
        </div>
      )}

      {selectedCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#294437]/45 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="collection-dialog-title">
          <div className="relative w-full max-w-[560px] overflow-hidden rounded-[1.5rem] bg-[#f7f3eb] shadow-[0_24px_70px_rgba(41,65,52,.25)]">
            <button onClick={() => setSelectedCollection(null)} aria-label="Close collection" data-testid="button-close-collection" className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f3eb]/85 text-[#294437] backdrop-blur-sm hover:bg-[#bd887e] hover:text-[#f7f3eb]"><X size={17} /></button>
            <div className="grid sm:grid-cols-[.8fr_1.2fr]">
              <img src={selectedCollection.image} alt="" className="h-56 w-full object-cover sm:h-full" />
              <div className="p-7 sm:p-9">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#bd887e]">{selectedCollection.eyebrow}</p>
                <h2 id="collection-dialog-title" className="font-display text-[34px] leading-none tracking-[-0.04em] text-[#294437]">{selectedCollection.name}</h2>
                <p className="mt-5 text-sm leading-6 text-[#66766c]">{selectedCollection.description} Let us create something personal, seasonal and made especially for the moment.</p>
                <a href="https://wa.me/27721234567?text=Hello%20Bloom%20%26%20Co.%2C%20I%27d%20like%20to%20explore%20your%20collection." target="_blank" rel="noreferrer" data-testid="link-dialog-whatsapp" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#294437] px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f7f3eb] hover:bg-[#bd887e]">Talk to us <ArrowRight size={14} /></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;