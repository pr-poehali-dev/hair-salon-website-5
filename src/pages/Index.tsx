import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useReveal } from '@/hooks/use-reveal';

const WORK1 = 'https://cdn.poehali.dev/projects/9f544100-917c-4405-ba74-11f49fe9c8cb/files/1a1d29c5-956a-41fd-ac62-b0d8097b808f.jpg';
const WORK2 = 'https://cdn.poehali.dev/projects/9f544100-917c-4405-ba74-11f49fe9c8cb/files/2acbe21b-2474-4cfd-9376-21712814fcc0.jpg';

const SALON1 = 'https://cdn.poehali.dev/projects/9f544100-917c-4405-ba74-11f49fe9c8cb/bucket/074f612d-4938-414a-8d9b-d0025d9ab0c1.png';
const SALON2 = 'https://cdn.poehali.dev/projects/9f544100-917c-4405-ba74-11f49fe9c8cb/bucket/b675690e-60aa-4358-b342-8cd6994410ac.png';
const FACADE = 'https://cdn.poehali.dev/projects/9f544100-917c-4405-ba74-11f49fe9c8cb/bucket/32f076df-c8e7-4c19-b245-e24fbfbdc647.png';
const RECEPTION = 'https://cdn.poehali.dev/projects/9f544100-917c-4405-ba74-11f49fe9c8cb/bucket/8d32bce9-325f-4d24-a07e-bcfe7343884b.png';
const TEA = 'https://cdn.poehali.dev/projects/9f544100-917c-4405-ba74-11f49fe9c8cb/bucket/f1d80577-2dc3-4171-84ff-3967d742f547.png';

const PORTFOLIO = [
  { src: 'https://cdn.poehali.dev/projects/9f544100-917c-4405-ba74-11f49fe9c8cb/bucket/db87e1b0-f985-45cf-95c2-44bf1fdd46b1.png', title: 'Кератиновое выпрямление', tag: 'Уход' },
  { src: 'https://cdn.poehali.dev/projects/9f544100-917c-4405-ba74-11f49fe9c8cb/bucket/91e24a1c-ede1-4d01-bca5-6407d452db1d.png', title: 'Холодный блонд', tag: 'Окрашивание' },
  { src: 'https://cdn.poehali.dev/projects/9f544100-917c-4405-ba74-11f49fe9c8cb/bucket/aa2dc6f9-f5bc-424b-8c62-ec31faa40957.png', title: 'Балаяж с растяжкой', tag: 'Окрашивание' },
];

const NAV = [
  { id: 'about', label: 'О салоне' },
  { id: 'services', label: 'Услуги' },
  { id: 'portfolio', label: 'Работы' },
  { id: 'gallery', label: 'Интерьер' },
  { id: 'prices', label: 'Прайс' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' },
];

const SERVICES = [
  { icon: 'Scissors', title: 'Стрижки', desc: 'Авторские стрижки по форме лица, мужские и детские, оформление чёлки.' },
  { icon: 'Palette', title: 'Окрашивание', desc: 'Сложное окрашивание, омбре, балаяж, мелирование, тонирование, колорирование.' },
  { icon: 'Sparkles', title: 'Наращивание волос', desc: 'Натуральные донорские волосы, безопасные технологии, идеальная длина.' },
  { icon: 'Droplets', title: 'Уход и восстановление', desc: 'Кератин, ботокс, нанопластика, биоламинирование, трихологический пилинг.' },
  { icon: 'Wind', title: 'Укладки', desc: 'Голливудские локоны, вечерние и свадебные причёски, прикорневой объём.' },
  { icon: 'Eye', title: 'Брови, ресницы, макияж', desc: 'Ламинирование ресниц, оформление бровей, дневной и вечерний макияж.' },
];

const PRICES = [
  { name: 'Стрижка чёлки', note: 'без мытья / с мытьём', price: 'от 500 ₽' },
  { name: 'Авторская стрижка по форме', note: 'только с мытьём', price: 'от 3 000 ₽' },
  { name: 'Мужская стрижка', note: 'короткие / длинные', price: 'от 2 500 ₽' },
  { name: 'Окрашивание в один тон', note: '', price: 'от 3 000 ₽' },
  { name: 'Сложное окрашивание', note: 'балаяж, омбре', price: 'от 8 000 ₽' },
  { name: 'Укладки', note: 'локоны, объём', price: 'от 1 500 ₽' },
  { name: 'Кератин / ботокс / нанопластика', note: 'уход за волосами', price: 'от 3 500 ₽' },
  { name: 'Наращивание волос', note: 'донорские волосы', price: 'по договорённости' },
  { name: 'Макияж / брови', note: 'дневной и вечерний', price: 'от 800 ₽' },
];

const REVIEWS = [
  { name: 'Юлия Спиридонова', text: 'Ходила на наращивание к мастеру Рейне и осталась в полном восторге! Очень приятная, уютная атмосфера, всё чисто и аккуратно.', stars: 5 },
  { name: 'Вера К.', text: 'В салоне очень уютная атмосфера, вежливый, тактичный и приятный персонал. 10/10! Работают настоящие профессионалы.', stars: 5 },
  { name: 'Диана', text: 'Отличное место, рекомендую всем! Качество работы на высоте, обязательно вернусь снова.', stars: 5 },
];

const GALLERY = [
  { src: SALON2, alt: 'Зал салона с кирпичными стенами', span: 'md:col-span-2 md:row-span-2' },
  { src: RECEPTION, alt: 'Золотая ресепшн-зона', span: '' },
  { src: TEA, alt: 'Чаепитие для гостей', span: '' },
  { src: SALON1, alt: 'Зона ресепшн и витрина', span: '' },
  { src: FACADE, alt: 'Фасад салона Pravda Pro Volosy', span: 'md:col-span-2' },
];

const Index = () => {
  useReveal();
  const [open, setOpen] = useState(false);
  const [service, setService] = useState('');
  const [time, setTime] = useState('');
  const heroImgRef = useRef<HTMLImageElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => {
      if (heroImgRef.current) {
        const y = window.scrollY;
        heroImgRef.current.style.transform = `translateY(${y * 0.12}px) scale(1.05)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const SERVICE_NAMES = SERVICES.map((s) => s.title);

  const BookingForm = () => (
    <div className="space-y-5">
      <div>
        <Label className="text-sm font-medium">Услуга</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {SERVICE_NAMES.map((s) => (
            <button
              key={s}
              onClick={() => setService(s)}
              className={`rounded-full border px-4 py-2 text-sm transition-all hover:scale-105 ${
                service === s
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background hover:border-primary'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium">Удобное время</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              className={`rounded-full border px-4 py-2 text-sm transition-all hover:scale-105 ${
                time === t
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background hover:border-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="bk-name" className="text-sm font-medium">Имя</Label>
          <Input id="bk-name" placeholder="Ваше имя" className="mt-2" />
        </div>
        <div>
          <Label htmlFor="bk-phone" className="text-sm font-medium">Телефон</Label>
          <Input id="bk-phone" placeholder="+7 (___) ___-__-__" className="mt-2" />
        </div>
      </div>
      <Button className="w-full text-base" size="lg">
        Записаться
        <Icon name="ArrowRight" size={18} className="ml-1" />
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных
      </p>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex flex-col leading-none">
            <span className="font-display text-2xl font-semibold tracking-tight">Pravda</span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-primary">Pro Volosy</span>
          </button>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-full transition-transform hover:scale-105">Записаться</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display text-3xl">Онлайн-запись</DialogTitle>
              </DialogHeader>
              <BookingForm />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
        {/* Фоновое фото салона с параллаксом */}
        <div className="absolute inset-0">
          <img
            ref={heroImgRef}
            src={RECEPTION}
            alt="Салон красоты Pravda Pro Volosy"
            className="parallax-img h-[120%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
        </div>

        {/* Декоративные световые пятна */}
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />

        <div className="container relative z-10 pt-24">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Icon name="Award" size={16} className="text-accent" />
              Лауреат «Хорошего места 2026» · Рейтинг 5,0
            </span>
            <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.98] text-balance md:text-8xl">
              Ваши волосы
              <br />
              заслуживают
              <br />
              <span className="shimmer-text italic">правды</span>
            </h1>
            <p className="mt-7 max-w-xl text-xl text-muted-foreground">
              Премиальный салон красоты в Перми. Стрижки, сложное окрашивание,
              наращивание и уход — с заботой, чаем и безупречным результатом.
            </p>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="group h-14 rounded-full px-8 text-base shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
                onClick={() => setOpen(true)}
              >
                Записаться онлайн
                <Icon name="ArrowRight" size={20} className="ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
              <a
                href="tel:+79091146099"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-border bg-background/60 px-7 text-base font-medium backdrop-blur-sm transition-colors hover:bg-background"
              >
                <Icon name="Phone" size={18} className="text-primary" />
                +7 (909) 114-60-99
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
              {[
                { v: '5,0', l: 'Рейтинг' },
                { v: '127', l: 'Отзывов' },
                { v: '3 года', l: 'Дарим красоту' },
                { v: '23:00', l: 'Работаем до' },
              ].map((s, i) => (
                <div key={s.l} className="flex items-center gap-10">
                  {i > 0 && <div className="hidden h-10 w-px bg-border sm:block" />}
                  <div>
                    <div className="font-display text-4xl font-semibold text-primary">{s.v}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Плавающая карточка отзыва */}
        <div className="animate-float-slow absolute bottom-12 right-8 z-10 hidden max-w-xs rounded-2xl border border-border/60 bg-card/90 p-5 shadow-xl backdrop-blur-md lg:block">
          <div className="flex items-center gap-1 text-accent">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="Star" size={16} className="fill-current" />
            ))}
          </div>
          <p className="mt-2 text-sm">«Уютная атмосфера, работают настоящие профессионалы. 10/10!»</p>
          <div className="mt-2 text-xs text-muted-foreground">— Вера К.</div>
        </div>

        {/* Индикатор скролла */}
        <button
          onClick={() => scrollTo('about')}
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="text-xs uppercase tracking-[0.3em]">Листайте</span>
          <Icon name="ChevronDown" size={22} className="animate-bounce" />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-y border-border/60 bg-secondary/40 py-20">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div className="reveal">
            <span className="text-sm uppercase tracking-[0.3em] text-primary">О салоне</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
              Уютное пространство красоты в Перми
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Pravda Pro Volosy — это команда мастеров, влюблённых в своё дело.
              Кирпичные стены, дизайнерский свет и зелёные акценты создают атмосферу,
              в которую хочется возвращаться. Мы создаём не просто причёски,
              а уверенность и настроение.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: 'Heart', t: 'Можно с собакой' },
                { icon: 'ShieldCheck', t: 'Безопасные материалы' },
                { icon: 'Clock', t: 'Удобная запись' },
                { icon: 'Gem', t: 'Премиум-уход' },
              ].map((f) => (
                <div key={f.t} className="flex items-center gap-3 rounded-xl bg-card p-4 transition-transform hover:scale-105">
                  <Icon name={f.icon} size={22} className="text-primary" />
                  <span className="text-sm font-medium">{f.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-scale grid grid-cols-2 gap-4">
            <img src={WORK1} alt="Работа салона" className="aspect-[3/4] w-full rounded-2xl object-cover hover-lift" />
            <img src={WORK2} alt="Работа салона" className="mt-8 aspect-[3/4] w-full rounded-2xl object-cover hover-lift" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20">
        <div className="container">
          <div className="reveal mb-12 text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-primary">Услуги</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Что мы умеем</h2>
          </div>
          <div className="grid gap-6 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="reveal tilt-3d group rounded-2xl border border-border bg-card p-7"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO — WORKS */}
      <section id="portfolio" className="border-y border-border/60 bg-secondary/40 py-20">
        <div className="container">
          <div className="reveal mb-12 text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-primary">Работы</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Примеры наших работ</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Сложное окрашивание, идеальный блонд и зеркальный блеск после ухода —
              результат, который говорит сам за себя.
            </p>
          </div>
          <div className="grid gap-6 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO.map((p, i) => (
              <div
                key={p.title}
                className="reveal-scale group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <img
                  src={p.src}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                  {p.tag}
                </span>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl font-semibold text-background">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" className="rounded-full transition-transform hover:scale-105" onClick={() => setOpen(true)}>
              Хочу так же — записаться
              <Icon name="ArrowRight" size={18} className="ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* GALLERY — INTERIOR */}
      <section id="gallery" className="border-y border-border/60 bg-secondary/40 py-20">
        <div className="container">
          <div className="reveal mb-12 text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-primary">Интерьер</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Атмосфера салона</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Кирпич, золото и дизайнерский свет — пространство, в котором приятно
              провести время и преобразиться.
            </p>
          </div>
          <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-3">
            {GALLERY.map((g, i) => (
              <div
                key={i}
                className={`reveal-scale group relative overflow-hidden rounded-2xl ${g.span}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 translate-y-4 text-sm font-medium text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {g.alt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-20">
        <div className="container max-w-3xl">
          <div className="reveal mb-12 text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-primary">Прайс</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Цены на услуги</h2>
          </div>
          <div className="reveal overflow-hidden rounded-2xl border border-border bg-card">
            {PRICES.map((p, i) => (
              <div
                key={p.name}
                className={`flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-primary/5 ${
                  i % 2 ? 'bg-secondary/30' : ''
                }`}
              >
                <div>
                  <div className="font-medium">{p.name}</div>
                  {p.note && <div className="text-xs text-muted-foreground">{p.note}</div>}
                </div>
                <div className="whitespace-nowrap font-display text-xl font-semibold text-primary">
                  {p.price}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button size="lg" className="rounded-full transition-transform hover:scale-105" onClick={() => setOpen(true)}>
              Записаться на услугу
            </Button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="border-y border-border/60 bg-secondary/40 py-20">
        <div className="container">
          <div className="reveal mb-12 text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-primary">Отзывы</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Что говорят клиенты</h2>
          </div>
          <div className="grid gap-6 [perspective:1200px] md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <div
                key={r.name}
                className="reveal tilt-3d rounded-2xl bg-card p-7"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-1 text-accent">
                  {[...Array(r.stars)].map((_, j) => (
                    <Icon key={j} name="Star" size={18} className="fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground">«{r.text}»</p>
                <div className="mt-5 font-medium">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20">
        <div className="container grid gap-10 md:grid-cols-2">
          <div className="reveal">
            <span className="text-sm uppercase tracking-[0.3em] text-primary">Контакты</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Приходите в гости</h2>
            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <Icon name="MapPin" size={22} className="mt-1 text-primary" />
                <div>
                  <div className="font-medium">Адрес</div>
                  <div className="text-muted-foreground">Пермь, ул. Юрия Смирнова, 12</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Phone" size={22} className="mt-1 text-primary" />
                <div>
                  <div className="font-medium">Телефон</div>
                  <a href="tel:+79091146099" className="text-muted-foreground hover:text-foreground">
                    +7 (909) 114-60-99
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Clock" size={22} className="mt-1 text-primary" />
                <div>
                  <div className="font-medium">Часы работы</div>
                  <div className="text-muted-foreground">Ежедневно до 23:00</div>
                </div>
              </div>
            </div>
            <Button size="lg" className="mt-8 rounded-full transition-transform hover:scale-105" onClick={() => setOpen(true)}>
              Онлайн-запись
              <Icon name="ArrowRight" size={18} className="ml-1" />
            </Button>
          </div>
          <div className="reveal-scale overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Карта"
              src="https://yandex.ru/map-widget/v1/?ll=56.250668%2C57.993070&z=16&pt=56.250668,57.993070,pm2rdm"
              className="h-full min-h-[340px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 bg-secondary/40 py-10">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold text-foreground">Pravda Pro Volosy</span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-primary">Салон красоты · Пермь</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://vk.com/pravda_pro_volosy" target="_blank" rel="noreferrer" className="hover:text-foreground">VK</a>
            <a href="tel:+79091146099" className="hover:text-foreground">+7 (909) 114-60-99</a>
          </div>
          <div>© 2026 Pravda Pro Volosy</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;