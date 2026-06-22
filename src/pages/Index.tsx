import { useState } from 'react';
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

const HERO = 'https://cdn.poehali.dev/projects/9f544100-917c-4405-ba74-11f49fe9c8cb/files/5daecb57-d198-4fc3-816a-fd2bfb9b6dcd.jpg';
const WORK1 = 'https://cdn.poehali.dev/projects/9f544100-917c-4405-ba74-11f49fe9c8cb/files/1a1d29c5-956a-41fd-ac62-b0d8097b808f.jpg';
const WORK2 = 'https://cdn.poehali.dev/projects/9f544100-917c-4405-ba74-11f49fe9c8cb/files/2acbe21b-2474-4cfd-9376-21712814fcc0.jpg';

const NAV = [
  { id: 'about', label: 'О салоне' },
  { id: 'services', label: 'Услуги' },
  { id: 'masters', label: 'Мастера' },
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

const MASTERS = [
  { name: 'Рейна', role: 'Мастер по наращиванию', tags: ['Наращивание', 'Уход'], emoji: '✨' },
  { name: 'Анастасия', role: 'Колорист', tags: ['Окрашивание', 'Балаяж'], emoji: '🎨' },
  { name: 'Мария', role: 'Стилист-парикмахер', tags: ['Стрижки', 'Укладки'], emoji: '💇‍♀️' },
  { name: 'Ольга', role: 'Бровист, лэшмейкер', tags: ['Брови', 'Ресницы'], emoji: '👁️' },
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

const Index = () => {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState('');
  const [master, setMaster] = useState('');
  const [time, setTime] = useState('');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const BookingForm = () => (
    <div className="space-y-5">
      <div>
        <Label className="text-sm font-medium">Услуга</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <button
              key={s.title}
              onClick={() => setService(s.title)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                service === s.title
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background hover:border-primary'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium">Мастер</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {MASTERS.map((m) => (
            <button
              key={m.name}
              onClick={() => setMaster(m.name)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                master === m.name
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background hover:border-primary'
              }`}
            >
              {m.emoji} {m.name}
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
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
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
    <div className="min-h-screen bg-background text-foreground">
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
              <Button size="sm" className="rounded-full">Записаться</Button>
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
      <section id="hero" className="relative overflow-hidden pt-16">
        <div className="grain absolute inset-0 opacity-60" />
        <div className="container relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <Icon name="Award" size={16} className="text-accent" />
              Лауреат «Хорошего места 2026»
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-balance md:text-7xl">
              Салон красоты, где о волосах знают{' '}
              <span className="italic text-primary">правду</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Стрижки, сложное окрашивание, наращивание и уход в самом сердце Перми.
              Рейтинг 5,0 на основе 140 оценок.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" className="rounded-full text-base" onClick={() => setOpen(true)}>
                Записаться онлайн
                <Icon name="ArrowRight" size={18} className="ml-1" />
              </Button>
              <button
                onClick={() => scrollTo('services')}
                className="text-sm font-medium underline-offset-4 hover:underline"
              >
                Смотреть услуги
              </button>
            </div>
            <div className="mt-10 flex items-center gap-8">
              <div>
                <div className="font-display text-4xl font-semibold text-primary">5,0</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Рейтинг</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-4xl font-semibold text-primary">127</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Отзывов</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-4xl font-semibold text-primary">87</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Фото работ</div>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-up [animation-delay:200ms]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
              <img src={HERO} alt="Интерьер салона Pravda Pro Volosy" className="h-full w-full object-cover" />
            </div>
            <div className="animate-float-slow absolute -left-6 bottom-10 hidden rounded-2xl bg-card p-4 shadow-xl md:block">
              <div className="flex items-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="fill-current" />
                ))}
              </div>
              <div className="mt-1 text-sm font-medium">«Настоящие профессионалы»</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-y border-border/60 bg-secondary/40 py-20">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-sm uppercase tracking-[0.3em] text-primary">О салоне</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
              Уютное пространство красоты в Перми
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Pravda Pro Volosy — это команда мастеров, влюблённых в своё дело.
              Мы создаём не просто причёски, а уверенность и настроение.
              Чистота, забота о каждом клиенте и честный подход — вот наша правда о волосах.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: 'Heart', t: 'Можно с собакой' },
                { icon: 'ShieldCheck', t: 'Безопасные материалы' },
                { icon: 'Clock', t: 'Удобная запись' },
                { icon: 'Gem', t: 'Премиум-уход' },
              ].map((f) => (
                <div key={f.t} className="flex items-center gap-3 rounded-xl bg-card p-4">
                  <Icon name={f.icon} size={22} className="text-primary" />
                  <span className="text-sm font-medium">{f.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={WORK1} alt="Работа салона" className="aspect-[3/4] w-full rounded-2xl object-cover hover-lift" />
            <img src={WORK2} alt="Работа салона" className="mt-8 aspect-[3/4] w-full rounded-2xl object-cover hover-lift" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-primary">Услуги</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Что мы умеем</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="hover-lift group rounded-2xl border border-border bg-card p-7"
                style={{ animationDelay: `${i * 60}ms` }}
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

      {/* MASTERS */}
      <section id="masters" className="border-y border-border/60 bg-secondary/40 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-primary">Мастера</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Наша команда</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MASTERS.map((m) => (
              <div key={m.name} className="hover-lift rounded-2xl bg-card p-7 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl">
                  {m.emoji}
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold">{m.name}</h3>
                <p className="text-sm text-primary">{m.role}</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {m.tags.map((t) => (
                    <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-20">
        <div className="container max-w-3xl">
          <div className="mb-12 text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-primary">Прайс</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Цены на услуги</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {PRICES.map((p, i) => (
              <div
                key={p.name}
                className={`flex items-center justify-between gap-4 px-6 py-4 ${
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
            <Button size="lg" className="rounded-full" onClick={() => setOpen(true)}>
              Записаться на услугу
            </Button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="border-y border-border/60 bg-secondary/40 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-primary">Отзывы</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Что говорят клиенты</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="hover-lift rounded-2xl bg-card p-7">
                <div className="flex gap-1 text-accent">
                  {[...Array(r.stars)].map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="fill-current" />
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
          <div>
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
            <Button size="lg" className="mt-8 rounded-full" onClick={() => setOpen(true)}>
              Онлайн-запись
              <Icon name="ArrowRight" size={18} className="ml-1" />
            </Button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
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
