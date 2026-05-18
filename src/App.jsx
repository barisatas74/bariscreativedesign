import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  Clock,
  Code2,
  Coffee,
  GraduationCap,
  HeartPulse,
  Home,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MousePointer2,
  Phone,
  Scissors,
  ShoppingBag,
  Sparkles,
  Store,
  X,
} from "lucide-react";

const WHATSAPP_NUMBER = "905345255865";
const CONTACT_EMAIL = "bariscreativedesign@gmail.com";
const CONTACT_PHONE = "+90 534 525 58 65";
// Web3Forms access key — .env.local içinde VITE_WEB3FORMS_ACCESS_KEY olarak tanımlanır.
// Boş bırakılırsa form mailto fallback'ine düşer.
const WEB3FORMS_ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "").trim();
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/bariscreativedesign/?hl=tr",
  linkedin: "https://www.linkedin.com/in/bar%C4%B1%C5%9F-ata%C5%9F-733a75356/",
};

const WHATSAPP_MESSAGE =
  "Merhaba, BarışCreativeDesign ile bir proje hakkında konuşmak istiyorum.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const SCROLL_OFFSET = 80;
const SECTION_SCROLL_ADJUST = {
  "#yaklasim": 56,
  "#surec": 56,
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const titleReveal = {
  hidden: { y: "112%", rotate: 1.5 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] },
  },
};

const navItems = [
  ["Sektörler", "#sektorler"],
  ["Hizmetler", "#hizmetler"],
  ["Yaklaşım", "#yaklasim"],
  ["Süreç", "#surec"],
  ["Teklif", "#teklif"],
  ["SSS", "#sss"],
  ["İletişim", "#iletisim"],
];

// Magnetic button efekti — sayfa boyunca [data-magnetic] olan elemanlara uygulanır
function useMagneticButtons() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // dokunmatik cihazlarda devre dışı
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll("[data-magnetic]"));
    const cleanups = elements.map((el) => {
      let raf = 0;
      const strength = parseFloat(el.dataset.magnetic) || 0.22;
      const onMove = (event) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
        });
      };
      const onLeave = () => {
        cancelAnimationFrame(raf);
        el.style.transform = "";
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        cancelAnimationFrame(raf);
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        el.style.transform = "";
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);
}

function scrollToSection(event, href, afterScroll) {
  if (!href.startsWith("#")) return;

  const top = getSectionTop(href);
  if (top === null) return;

  event.preventDefault();
  window.scrollTo({ top, behavior: "smooth" });
  window.history.pushState(null, "", href);
  afterScroll?.();
}

function getSectionTop(href) {
  let target;
  try {
    target = document.querySelector(href);
  } catch {
    return null;
  }
  if (!target) return null;
  const flushSections = new Set(["#top", "#iletisim"]);
  const offset = flushSections.has(href) ? 0 : SCROLL_OFFSET;
  const adjustment = SECTION_SCROLL_ADJUST[href] || 0;
  return Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset + adjustment);
}

function useInitialHashScroll() {
  useEffect(() => {
    if (!window.location.hash) return;
    const frame = requestAnimationFrame(() => {
      const top = getSectionTop(window.location.hash);
      if (top !== null) window.scrollTo({ top, behavior: "auto" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
}

const services = [
  {
    number: "01",
    title: "Web Tasarım & Geliştirme",
    text: "Modern, hızlı, mobil uyumlu ve dönüşüm odaklı web siteleri.",
    icon: Code2,
    color: "bg-acid text-ink",
  },
  {
    number: "02",
    title: "UI/UX Tasarım",
    text: "Kullanıcıyı yormayan, markayı güçlendiren temiz ve etkileyici arayüzler.",
    icon: MousePointer2,
    color: "bg-cyan text-ink",
  },
  {
    number: "03",
    title: "E-Ticaret Arayüzleri",
    text: "Ürünleri daha profesyonel sunan, satışa odaklı modern mağaza tasarımları.",
    icon: Store,
    color: "bg-coral text-white",
  },
  {
    number: "04",
    title: "Yapay Zeka & Otomasyon",
    text: "İş süreçlerini hızlandıran, manuel yükü azaltan dijital sistemler.",
    icon: Bot,
    color: "bg-violet text-white",
  },
];

const processSteps = [
  ["01", "Keşif", "İhtiyacını, hedef kitleni ve marka duruşunu netleştiririm."],
  ["02", "Tasarım", "Modern, özgün ve güven veren arayüz tasarlarım."],
  ["03", "Geliştirme", "Responsive, hızlı ve temiz kodlanmış siteye dönüştürürüm."],
  ["04", "Yayına Alma", "Siteyi yayına hazırlar, gerekli son kontrolleri yaparım."],
];

const results = [
  "Daha profesyonel marka görünümü",
  "Daha yüksek müşteri güveni",
  "Daha iyi mobil deneyim",
  "Daha hızlı iletişim ve teklif alma",
];

const heroTitleLines = [
  "Markanı sıradanlıktan",
  "çıkaran yaratıcı",
  "web deneyimleri.",
];

const industries = [
  {
    name: "Güzellik & Wellness",
    note: "Randevu, güven ve premium algı",
    icon: Scissors,
  },
  {
    name: "E-Ticaret",
    note: "Ürün odağı, hızlı aksiyon, satış akışı",
    icon: ShoppingBag,
  },
  {
    name: "İnşaat & Mimari",
    note: "Portföy, proje sunumu ve kurumsal güven",
    icon: Building2,
  },
  {
    name: "Restoran & Kafe",
    note: "Menü, konum, rezervasyon ve marka hissi",
    icon: Coffee,
  },
  {
    name: "Danışmanlık",
    note: "Uzmanlık algısı ve net iletişim",
    icon: BriefcaseBusiness,
  },
  {
    name: "Eğitim & Kurs",
    note: "Program anlatımı ve başvuru akışı",
    icon: GraduationCap,
  },
  {
    name: "Sağlık & Klinik",
    note: "Temiz görünüm, güven ve hızlı temas",
    icon: HeartPulse,
  },
  {
    name: "Emlak",
    note: "İlan, lokasyon ve güçlü ilk izlenim",
    icon: Home,
  },
];

const guarantees = [
  {
    title: "Net süreç, net takvim",
    text: "Proje başında teslim tarihini paylaşırım. Gecikme olursa ek revizyon ücretsizdir.",
  },
  {
    title: "Revizyon hakkı",
    text: "Her pakette belirli sayıda revizyon turu vardır. Tasarım yönü onaylanana kadar üzerinde çalışırız.",
  },
  {
    title: "Şeffaf teklif",
    text: "Kapsamı birlikte netleştirir, sürpriz maliyet çıkarmadan önce onayını alırım.",
  },
];

const solutionTracks = [
  {
    name: "Tek Sayfalık Site",
    eyebrow: "Hızlı başlangıç",
    desc: "Yeni görünüm isteyen küçük işletmeler, kişisel markalar ve kampanya sayfaları için sade ama güçlü başlangıç.",
    bestFor: ["Küçük işletme", "Kişisel marka", "Hızlı yayına çıkış"],
    features: [
      "Net mesaj hiyerarşisi",
      "Mobil uyumlu modern arayüz",
      "WhatsApp ve e-posta aksiyonları",
      "Temel teknik SEO hazırlığı",
    ],
    cta: "Bu çözümü konuşalım",
    highlighted: false,
  },
  {
    name: "Kurumsal Web Deneyimi",
    eyebrow: "En dengeli",
    desc: "Markasını daha profesyonel göstermek, güven vermek ve daha güçlü teklif almak isteyen işletmeler için.",
    bestFor: ["Kurumsal görünüm", "Çok bölümlü yapı", "Güven odaklı sunum"],
    features: [
      "Özel tasarım yönü",
      "Hizmet ve süreç anlatımı",
      "Mikro etkileşimler",
      "SEO, sitemap ve sosyal paylaşım hazırlığı",
      "Yayına hazırlık kontrolü",
    ],
    cta: "Ön görüşme iste",
    highlighted: true,
  },
  {
    name: "Özel Sistem & Otomasyon",
    eyebrow: "Kapsama göre",
    desc: "E-ticaret, panel, yapay zeka, otomasyon veya özel iş akışı olan projelerde kapsamı birlikte çıkarırız.",
    bestFor: ["E-ticaret", "AI / otomasyon", "Panel ve özel modül"],
    features: [
      "İhtiyaç analizi",
      "Modül ve entegrasyon planı",
      "Ölçeklenebilir teknik yapı önerisi",
      "Güvenlik ve performans yaklaşımı",
      "Aşamalandırılmış proje planı",
    ],
    cta: "Kapsamı çıkaralım",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Bir proje ne kadar sürede tamamlanır?",
    a: "Tek sayfalık siteler genelde 1-2 hafta, çok sayfalı kurumsal projeler 3-5 hafta sürer. E-ticaret ve özel sistemlerde takvim kapsama göre belirlenir ve süreç başında net şekilde paylaşılır.",
  },
  {
    q: "Tasarımı beğenmezsem ne oluyor?",
    a: "Her pakette revizyon hakkı var. İlk taslakta yön doğru olana kadar üzerinde çalışırız; sonrasında detayları iyileştiririz. Hedef, senin de tam olarak ardında durduğun bir tasarım üretmek.",
  },
  {
    q: "Site sonradan kendim güncelleyebilir miyim?",
    a: "Evet. Talebine göre içerik güncellemelerini kolayca yapabileceğin bir altyapı (statik site + içerik dosyası, ya da WordPress/headless CMS) öneririm. Teslimde kısa bir kullanım eğitimi de veriyorum.",
  },
  {
    q: "Hosting, alan adı ve e-posta dahil mi?",
    a: "Hosting/alan adı paket dışıdır ama önerilir ve kurulum sürecini ben yaparım. İstersen kendi servislerinde, istersen önerdiğim altyapıda yayınlarız.",
  },
  {
    q: "SEO ve performans nasıl?",
    a: "Tüm projeler temel teknik SEO (meta etiketler, semantik HTML, sitemap, hız optimizasyonu) ile teslim edilir. Pro ve Kurumsal pakette gelişmiş SEO ve schema markup da dahildir.",
  },
  {
    q: "Fiyat nasıl netleşiyor?",
    a: "Önce ihtiyacı, sayfa yapısını, içerik durumunu ve özel istekleri konuşuyoruz. Sonrasında kapsamı net olan, sürpriz maliyet çıkarmayan samimi bir teklif paylaşıyorum.",
  },
];

function SectionLabel({ children, tone = "dark" }) {
  return (
    <span
      className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] ${
        tone === "light"
          ? "border-white/20 text-white/70"
          : "border-ink/15 text-ink/60"
      }`}
    >
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink text-white shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Ana menü">
        <a
          href="#top"
          onClick={(event) => scrollToSection(event, "#top", () => setIsOpen(false))}
          className="font-display text-xl font-black tracking-tight sm:text-2xl"
        >
          Barış<span className="text-acid">Creative</span>Design
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={(event) => scrollToSection(event, href)}
              className="text-sm font-semibold text-white/70 transition hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href="#iletisim"
          onClick={(event) => scrollToSection(event, "#iletisim")}
          className="hidden rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-acid lg:inline-flex"
        >
          Projeni Başlatalım
        </a>
        <button
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-white/10 bg-ink px-5 py-5 lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={(event) => scrollToSection(event, href, () => setIsOpen(false))}
                  className="rounded-full border border-white/10 px-5 py-4 text-sm font-bold text-white/78"
                >
                  {label}
                </a>
              ))}
              <a
                href="#iletisim"
                onClick={(event) => scrollToSection(event, "#iletisim", () => setIsOpen(false))}
                className="rounded-full bg-acid px-5 py-4 text-center text-sm font-black text-ink"
              >
                Projeni Başlatalım
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 text-white sm:pt-28">
      <div className="green-cloud green-cloud--right pointer-events-none absolute -right-[16vw] top-4 hidden h-[105svh] w-[58vw] xl:block" />
      <div className="ambient-cloud ambient-cloud--soft ambient-cloud--slow pointer-events-none absolute -left-[18vw] bottom-[-18vh] hidden h-[36rem] w-[38rem] xl:block [--cloud-opacity-end:0.34] [--cloud-opacity-start:0.16]" />
      <div className="pointer-events-none absolute bottom-24 left-8 top-32 hidden w-44 flex-col justify-between text-white/38 xl:flex">
        <div className="h-28 w-px bg-white/16" />
        <div className="space-y-5">
          <p className="vertical-label text-xs font-black uppercase tracking-[0.34em]">Baris Creative</p>
          <div className="h-28 w-px bg-acid" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.28em]">Scroll</p>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-10 sm:px-8 lg:pb-14">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="transform-gpu">
          <motion.p
            variants={fadeUp}
            className="mb-5 inline-flex max-w-full rounded-full border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 sm:text-xs sm:tracking-[0.24em]"
          >
            Creative web studio
          </motion.p>
          <motion.h1
            variants={stagger}
            className="max-w-full break-words font-display text-[clamp(1.85rem,8.7vw,4rem)] font-black lowercase leading-[0.94] tracking-normal sm:text-[clamp(3.2rem,7vw,7rem)] sm:leading-[0.88]"
          >
            {heroTitleLines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block transform-gpu will-change-transform" variants={titleReveal}>
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-3xl text-lg leading-8 text-white/75 sm:mt-8 sm:text-2xl sm:leading-9"
          >
            BarışCreativeDesign; web tasarım, UI/UX, yapay zeka destekli sistemler
            ve modern dijital arayüzler ile işletmelerin daha güçlü ve daha
            dikkat çekici görünmesini sağlar.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="#iletisim"
              data-magnetic="0.18"
              onClick={(event) => scrollToSection(event, "#iletisim")}
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-acid px-7 text-base font-black text-ink transition will-change-transform hover:bg-white"
            >
              Projeni Başlatalım
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#hizmetler"
              onClick={(event) => scrollToSection(event, "#hizmetler")}
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-7 text-base font-bold text-white transition hover:border-white hover:bg-white hover:text-ink"
            >
              Hizmetleri Gör
            </a>
          </motion.div>
        </motion.div>
      </div>
      <div className="relative z-10 border-y border-white/10 bg-ink/50 py-4 text-white backdrop-blur-md">
        <div className="marquee text-sm font-black uppercase tracking-[0.22em] text-white/65" aria-label="Hizmet başlıkları">
          <div className="marquee-track">
            <span>Web Tasarım • UI/UX • AI Sistemler • Otomasyon • Creative Direction • </span>
            <span aria-hidden="true">Web Tasarım • UI/UX • AI Sistemler • Otomasyon • Creative Direction • </span>
            <span aria-hidden="true">Web Tasarım • UI/UX • AI Sistemler • Otomasyon • Creative Direction • </span>
            <span aria-hidden="true">Web Tasarım • UI/UX • AI Sistemler • Otomasyon • Creative Direction • </span>
            <span aria-hidden="true">Web Tasarım • UI/UX • AI Sistemler • Otomasyon • Creative Direction • </span>
            <span aria-hidden="true">Web Tasarım • UI/UX • AI Sistemler • Otomasyon • Creative Direction • </span>
            <span aria-hidden="true">Web Tasarım • UI/UX • AI Sistemler • Otomasyon • Creative Direction • </span>
            <span aria-hidden="true">Web Tasarım • UI/UX • AI Sistemler • Otomasyon • Creative Direction • </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientLogos() {
  return (
    <section
      id="sektorler"
      aria-label="Hizmet verilen sektörler"
      className="relative overflow-hidden bg-ink py-14 text-white scroll-mt-20 sm:py-16"
    >
      <div className="ambient-cloud ambient-cloud--soft pointer-events-none absolute -left-32 top-0 h-72 w-[32rem]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionLabel tone="light">Sektörler</SectionLabel>
            <h2 className="font-display text-[clamp(1.9rem,4vw,3.4rem)] font-black leading-[1.02]">
              Her sektör için aynı şablon değil, doğru his.
            </h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-white/58 sm:text-base sm:leading-7">
            Müşterinin ilk baktığı şey sektöre göre değişir. Tasarımı da buna göre
            güven, hız ve aksiyon etrafında kurarım.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map(({ name, note, icon: Icon }, index) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.045] p-5 transition duration-500 hover:-translate-y-1 hover:border-acid/45 hover:bg-white/[0.075]"
            >
              <span className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-acid/0 blur-2xl transition duration-500 group-hover:bg-acid/18" />
              <div className="relative flex items-start justify-between gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-acid text-ink shadow-[0_16px_42px_rgba(215,255,54,0.18)] transition duration-500 group-hover:-rotate-6 group-hover:scale-105">
                  <Icon className="h-5 w-5" strokeWidth={2.4} />
                </span>
                <span className="font-display text-3xl font-black leading-none text-white/10 transition duration-500 group-hover:text-acid/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="relative mt-5 font-display text-xl font-black leading-tight text-white">
                {name}
              </h3>
              <p className="relative mt-2 text-sm font-semibold leading-6 text-white/56">
                {note}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section
      id="hizmetler"
      className="scroll-scene relative -mb-px flex min-h-[100svh] items-center overflow-hidden bg-ink py-8 scroll-mt-20 text-white sm:py-10"
    >
      <div className="ambient-cloud ambient-cloud--soft pointer-events-none absolute -left-28 top-12 h-80 w-[34rem]" />
      <div className="ambient-cloud pointer-events-none absolute -right-36 bottom-8 hidden h-96 w-[38rem] md:block" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, #000 0%, #000 55%, transparent 85%)",
        }}
      />

      <div className="scene-content relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={stagger}
          className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
        >
          <motion.div variants={fadeUp} className="max-w-3xl">
            <SectionLabel tone="light">Hizmetler</SectionLabel>
            <h2 className="font-display text-[clamp(1.6rem,3.6vw,2.8rem)] font-black leading-[1.05]">
              Dijitalde daha güçlü görünmen için{" "}
              <span className="relative inline-block">
                <span className="relative z-10">tasarlıyorum.</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-acid/70" />
              </span>
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="max-w-md text-sm leading-6 text-white/60 sm:text-base sm:leading-7"
          >
            Marka kimliğinden yapay zekaya — projeni baştan sona düşünür,
            akıcı bir deneyime dönüştürürüm.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-6 grid gap-3 md:grid-cols-2 lg:gap-4"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const bgClass = service.color.split(" ")[0];
            return (
              <motion.article
                key={service.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] sm:p-5"
              >
                <span
                  className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full ${bgClass} opacity-0 blur-3xl transition duration-700 group-hover:opacity-25`}
                />
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50 transition duration-500 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="font-display text-4xl font-black tracking-tight text-white/15 transition duration-500 group-hover:text-white/30 sm:text-5xl">
                    {service.number}
                  </span>
                  <span
                    className={`relative inline-flex h-11 w-11 items-center justify-center rounded-xl ${service.color} shadow-lg shadow-black/30 transition duration-500 group-hover:-rotate-6 group-hover:scale-110 sm:h-12 sm:w-12`}
                  >
                    <Icon className="h-5 w-5" />
                    <span
                      className={`absolute inset-0 -z-10 rounded-xl ${bgClass} opacity-0 blur-md transition duration-500 group-hover:opacity-80`}
                    />
                  </span>
                </div>

                <div className="relative mt-4 sm:mt-5">
                  <h3 className="font-display text-lg font-black leading-tight text-white sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[13px] leading-6 text-white/60 sm:text-sm sm:leading-6">
                    {service.text}
                  </p>
                </div>

                <div className="relative mt-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.28em] text-white/40 transition duration-500 group-hover:text-acid sm:mt-4">
                  <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-12" />
                  <span>Detay</span>
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-2 opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 flex flex-col items-start gap-3 rounded-[20px] border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5"
        >
          <p className="text-sm font-semibold text-white/75 sm:text-base">
            İhtiyacın listenin dışında mı? Özel projelere de bayılırım.
          </p>
          <a
            href="#iletisim"
            onClick={(event) => scrollToSection(event, "#iletisim")}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-acid px-5 py-2.5 text-sm font-black text-ink transition hover:bg-white"
          >
            Bana ulaş
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="yaklasim" className="scroll-scene relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink py-12 text-white scroll-mt-20 sm:py-16">
      <div className="ambient-cloud ambient-cloud--bright pointer-events-none absolute right-[-16vw] top-[-16vh] h-[44rem] w-[48rem] [--cloud-opacity-end:0.62] [--cloud-opacity-start:0.36]" />
      <div className="ambient-cloud ambient-cloud--soft ambient-cloud--slow pointer-events-none absolute -left-36 bottom-6 h-80 w-[34rem]" />
      <div className="pointer-events-none absolute -left-14 bottom-[-8vh] font-display text-[18vw] font-black uppercase leading-none text-white/[0.04]">
        BCD
      </div>

      <div className="scene-content relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={stagger}
          className="max-w-4xl"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel tone="light">Yaklaşım</SectionLabel>
            <h2 className="font-display text-[clamp(3.4rem,8vw,8.4rem)] font-black lowercase leading-[0.82] tracking-normal text-white">
              tasarım
              <span className="block text-transparent [-webkit-text-stroke:2px_#ffffff]">
                sadece
              </span>
              <span className="block text-acid [text-shadow:4px_4px_0_#050505]">
                güzel değil.
              </span>
            </h2>
            <p className="mt-7 max-w-2xl text-xl font-bold leading-snug text-white/72 sm:text-2xl">
              Güven veren, hızlı anlaşılabilen ve müşteriyi aksiyona yaklaştıran
              dijital deneyimler tasarlarım.
            </p>
          </motion.div>
        </motion.div>

        <div className="relative min-h-[520px] lg:min-h-[610px]">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-4 w-[78%] rounded-[34px] bg-white p-7 text-ink shadow-[0_30px_90px_rgba(255,255,255,0.12)] sm:p-9"
          >
            <span className="font-display text-7xl font-black text-acid">01</span>
            <p className="mt-10 font-display text-4xl font-black leading-none sm:text-5xl">
              İlk izlenim saniyeler içinde kurulur.
            </p>
            <p className="mt-5 text-base font-semibold leading-7 text-ink/62">
              Bu yüzden sayfanın ritmini, hiyerarşisini ve güven hissini daha ilk
              ekranda netleştiririm.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 4 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-36 w-[72%] rounded-[34px] border border-white/12 bg-[#111111] p-7 text-white shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:p-9"
          >
            <span className="font-display text-7xl font-black text-acid">02</span>
            <p className="mt-10 font-display text-4xl font-black leading-none sm:text-5xl">
              Her ekran bir satış konuşmasıdır.
            </p>
            <p className="mt-5 text-base font-semibold leading-7 text-white/68">
              Süslemek yerine hedefe götüren arayüzler kurarım: net mesaj, güçlü
              kontrast, kolay aksiyon.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-[8%] right-[8%] grid grid-cols-3 overflow-hidden rounded-[28px] bg-acid text-ink shadow-[0_24px_70px_rgba(215,255,54,0.24)]"
          >
            {[
              ["Netlik", "01"],
              ["Güven", "02"],
              ["Aksiyon", "03"],
            ].map(([label, number]) => (
              <div key={label} className="border-r border-ink/14 p-5 last:border-r-0 sm:p-6">
                <p className="font-display text-4xl font-black">{number}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.2em]">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Guarantees() {
  return (
    <section aria-label="Çalışma garantilerim" className="relative overflow-hidden bg-bone py-20 text-ink sm:py-24">
      <div className="ambient-cloud ambient-cloud--soft pointer-events-none absolute -right-32 top-8 h-80 w-[34rem]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <SectionLabel>Çalışma Prensiplerim</SectionLabel>
          <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] font-black leading-[1.02]">
            Birlikte çalışırken tahmin etmen gereken hiçbir şey yok.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-ink/65 sm:text-lg">
            Sürecin her adımında ne beklediğini bilmen için kurduğum kurallar.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {guarantees.map((item, index) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="relative flex flex-col rounded-[28px] border border-ink/10 bg-white p-7 shadow-[0_18px_60px_rgba(5,5,5,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(5,5,5,0.1)]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-acid font-display text-xl font-black text-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-2xl font-black leading-tight">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-base leading-7 text-ink/70">
                {item.text}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="surec" className="scroll-scene relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-bone py-16 text-ink scroll-mt-20 sm:py-20">
      <div className="ambient-cloud ambient-cloud--bright pointer-events-none absolute -left-40 top-10 h-96 w-[40rem] [--cloud-opacity-end:0.58] [--cloud-opacity-start:0.3]" />
      <div className="ambient-cloud ambient-cloud--soft ambient-cloud--slow pointer-events-none absolute bottom-4 right-[-14vw] h-80 w-[36rem]" />
      <div className="ambient-cloud ambient-cloud--bright pointer-events-none absolute right-[-6rem] top-[22%] hidden h-72 w-[30rem] xl:block [--cloud-opacity-end:0.46] [--cloud-opacity-start:0.22]" />

      <div className="scene-content relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="max-w-xl"
        >
          <SectionLabel>Süreç</SectionLabel>
          <h2 className="font-display text-[clamp(2.8rem,7vw,7rem)] font-black lowercase leading-[0.86] text-ink">
            net süreç.
            <span className="block text-acid [text-shadow:4px_4px_0_#050505]">
              hızlı sonuç.
            </span>
          </h2>
          <p className="mt-7 text-xl font-bold leading-snug text-ink/70">
            Belirsizliği azaltan, her adımı görünür yapan ve projeyi yayına kadar
            ritimli ilerleten çalışma akışı.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white">
            <span className="h-3 w-3 rounded-full bg-acid" />
            4 adımda yayına hazır
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="relative grid gap-4 sm:grid-cols-2"
        >
          <div className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px bg-ink/10 sm:block" />
          <div className="pointer-events-none absolute left-8 right-8 top-1/2 hidden h-px bg-ink/10 sm:block" />

          {processSteps.map(([number, title, text], index) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-[32px] border border-ink/10 bg-white/78 p-6 shadow-[0_24px_70px_rgba(5,5,5,0.08)] backdrop-blur transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_30px_90px_rgba(5,5,5,0.2)] sm:p-7"
            >
              <div
                className={`absolute right-0 top-0 z-0 h-24 w-24 rounded-bl-[36px] ${
                  index === 0
                    ? "bg-acid"
                    : index === 1
                      ? "bg-cyan"
                      : index === 2
                        ? "bg-coral"
                        : "bg-violet"
                }`}
              />
              <span className="pointer-events-none absolute inset-0 z-[1] bg-ink opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
              <span className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10 flex items-start justify-between gap-5">
                <span className="font-display text-6xl font-black leading-none text-ink/14 transition-colors duration-300 group-hover:text-acid">
                  {number}
                </span>
                <span className="mt-2 h-3 w-3 rounded-full bg-ink transition-colors duration-300 group-hover:bg-acid" />
              </div>
              <h3 className="relative z-10 mt-10 font-display text-3xl font-black leading-none text-ink transition-colors duration-300 group-hover:text-white sm:text-4xl">
                {title}
              </h3>
              <p className="relative z-10 mt-4 text-base font-semibold leading-7 text-ink/62 transition-colors duration-300 group-hover:text-acid">
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Pricing() {
  function goToContactWithSolution(track) {
    const summary = [
      `İlgilendiğim çözüm: ${track.name}`,
      `Kullanım alanı: ${track.bestFor.join(", ")}`,
      "Proje kapsamını birlikte netleştirmek istiyorum.",
    ].join("\n");
    try {
      sessionStorage.setItem("bcd_quote_summary", summary);
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    url.searchParams.set("plan", track.name);
    url.hash = "iletisim";
    window.history.pushState(null, "", url);
    window.dispatchEvent(new Event("popstate"));
    window.dispatchEvent(new CustomEvent("bcd:quote-summary", { detail: { summary } }));
    const target = document.querySelector("#iletisim");
    if (target) {
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY);
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <section id="teklif" className="relative overflow-hidden bg-ink py-8 text-white scroll-mt-20 sm:py-10 lg:min-h-[calc(100svh-5rem)] lg:flex lg:items-center">
      <div className="ambient-cloud ambient-cloud--soft pointer-events-none absolute -left-32 top-12 h-96 w-[36rem]" />
      <div className="ambient-cloud pointer-events-none absolute -right-40 bottom-12 hidden h-96 w-[40rem] md:block" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <SectionLabel tone="light">Teklif & Uygun Çözüm</SectionLabel>
            <h2 className="font-display text-[clamp(1.9rem,3.1vw,2.8rem)] font-black leading-[1.02]">
              Çözümünü seç, kapsamı birlikte netleştirelim.
            </h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-white/62 sm:text-base sm:leading-7">
            Rakamdan önce ihtiyacı konuşuruz. Sana en yakın başlığı seç, formda kapsamı birlikte netleştirelim.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-4 grid gap-4 lg:grid-cols-3"
        >
          {solutionTracks.map((track) => (
            <motion.article
              key={track.name}
              variants={fadeUp}
              className={`group relative flex min-h-[430px] flex-col overflow-hidden rounded-[26px] p-5 transition duration-300 hover:-translate-y-1 sm:p-6 ${
                track.highlighted
                  ? "bg-acid text-ink shadow-[0_26px_80px_rgba(215,255,54,0.25)]"
                  : "border border-white/10 bg-white/[0.045] text-white hover:border-white/24 hover:bg-white/[0.07]"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className={`text-[11px] font-black uppercase tracking-[0.22em] ${track.highlighted ? "text-ink/62" : "text-white/45"}`}>
                  {track.eyebrow}
                </p>
                {track.highlighted && (
                  <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-acid">
                    En dengeli
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-display text-[clamp(1.65rem,2.2vw,2.2rem)] font-black leading-[0.96]">
                {track.name}
              </h3>
              <p className={`mt-3 text-sm font-semibold leading-5 ${track.highlighted ? "text-ink/74" : "text-white/62"}`}>
                {track.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {track.bestFor.map((item) => (
                  <span
                    key={item}
                    className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${
                      track.highlighted ? "bg-ink/10 text-ink/70" : "bg-white/8 text-white/55"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <ul className="mt-4 grid gap-2 text-sm font-semibold">
                {track.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        track.highlighted ? "bg-ink text-acid" : "bg-acid text-ink"
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className={track.highlighted ? "text-ink/84" : "text-white/76"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => goToContactWithSolution(track)}
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black transition ${
                  track.highlighted
                    ? "bg-ink text-white hover:bg-white hover:text-ink"
                    : "border border-white/20 hover:border-white hover:bg-white hover:text-ink"
                }`}
              >
                {track.cta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="sss" className="relative min-h-screen overflow-hidden bg-bone py-12 text-ink scroll-mt-20 sm:py-16">
      <div className="ambient-cloud ambient-cloud--bright pointer-events-none absolute -right-32 top-0 h-96 w-[40rem] [--cloud-opacity-end:0.5] [--cloud-opacity-start:0.25]" />
      <div className="ambient-cloud ambient-cloud--soft pointer-events-none absolute -left-40 bottom-0 h-80 w-[34rem]" />
      <div className="pointer-events-none absolute -right-10 top-[20%] font-display text-[14vw] font-black uppercase leading-none text-ink/[0.04] hidden lg:block">
        FAQ
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <SectionLabel>SSS</SectionLabel>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] font-black lowercase leading-[0.92] text-ink">
            sorular
            <span className="block text-acid [text-shadow:4px_4px_0_#050505]">
              cevaplar.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-ink/70">
            Çoğu yeni müşterinin aklındaki ilk soruları topladım. Aradığını bulamazsan
            direkt yaz, birkaç saat içinde dönerim.
          </p>

          <div className="mt-8 rounded-[24px] border border-ink/10 bg-white/70 p-5 backdrop-blur sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-acid">
                <MessageCircle className="h-5 w-5 text-ink" />
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-ink/55">
                  Hızlı yanıt
                </p>
                <p className="font-display text-base font-black">Genelde aynı gün</p>
              </div>
            </div>
            <a
              href="#iletisim"
              onClick={(event) => scrollToSection(event, "#iletisim")}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-acid hover:text-ink"
            >
              Sorunu yaz
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="space-y-3"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const num = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={faq.q}
                variants={fadeUp}
                className={`group relative overflow-hidden rounded-[22px] border transition duration-300 ${
                  isOpen
                    ? "border-ink bg-ink text-white shadow-[0_24px_70px_rgba(5,5,5,0.18)]"
                    : "border-ink/10 bg-white/70 hover:border-ink/25 hover:bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-trigger-${index}`}
                  className="flex w-full items-start gap-5 px-5 py-5 text-left sm:px-7"
                >
                  <span
                    className={`mt-0.5 font-display text-2xl font-black leading-none transition ${
                      isOpen ? "text-acid" : "text-ink/25 group-hover:text-ink/50"
                    }`}
                  >
                    {num}
                  </span>
                  <span className="flex-1 font-display text-base font-black leading-snug sm:text-lg">
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-300 ${
                      isOpen ? "bg-acid text-ink rotate-180" : "bg-ink/8 text-ink group-hover:bg-ink group-hover:text-white"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-7">
                        <div className="ml-0 border-l-2 border-acid pl-5 sm:ml-12">
                          <p className="text-sm leading-7 text-white/75 sm:text-base">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative z-10 mx-auto mt-12 max-w-7xl px-5 sm:px-8"
      >
        <div className="rounded-[28px] border border-ink/10 bg-ink p-7 text-white shadow-[0_24px_70px_rgba(5,5,5,0.16)] sm:p-9">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-md">
              <SectionLabel tone="light">Sonuçlar</SectionLabel>
              <h3 className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-black leading-[1.05]">
                İyi tasarım, markanın algısını değiştirir.
              </h3>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
              {results.map((result, index) => (
                <div
                  key={result}
                  className="rounded-2xl border border-white/12 bg-white/[0.05] p-4 transition hover:bg-white/[0.08]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-acid text-sm font-black text-ink">
                    {index + 1}
                  </span>
                  <p className="mt-3 text-sm font-bold leading-snug text-white">
                    {result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ContactForm() {
  // status: "idle" | "submitting" | "sent" | "email-client" | "error"
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [quotePrefill, setQuotePrefill] = useState("");

  useEffect(() => {
    function readPlanFromUrl() {
      try {
        const url = new URL(window.location.href);
        const plan = url.searchParams.get("plan") || "";
        setSelectedPlan(plan);
      } catch {
        /* ignore */
      }
    }
    function readQuoteSummary() {
      try {
        const summary = sessionStorage.getItem("bcd_quote_summary");
        if (summary) setQuotePrefill(summary);
      } catch {
        /* ignore */
      }
    }
    readPlanFromUrl();
    readQuoteSummary();
    const onQuote = (e) => setQuotePrefill(e.detail?.summary || "");
    window.addEventListener("popstate", readPlanFromUrl);
    window.addEventListener("bcd:quote-summary", onQuote);
    return () => {
      window.removeEventListener("popstate", readPlanFromUrl);
      window.removeEventListener("bcd:quote-summary", onQuote);
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const phoneDigits = phone.replace(/\D/g, "");
    const message = String(formData.get("message") || "").trim();
    const plan = String(formData.get("plan") || "").trim();
    const botcheck = String(formData.get("botcheck") || "").trim();

    if (botcheck) {
      setStatus("error");
      setErrorMessage("Gönderim doğrulanamadı. Lütfen sayfayı yenileyip tekrar dene.");
      return;
    }

    if (!name || !email || !phoneDigits || !message) {
      setStatus("error");
      setErrorMessage("Lütfen tüm alanları doldur.");
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setErrorMessage("Lütfen geçerli bir e-posta adresi gir.");
      return;
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setStatus("error");
      setErrorMessage("Lütfen telefon numaranı 10-15 rakam aralığında gir.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    // 1) Eğer Web3Forms erişim anahtarı tanımlıysa → gerçek e-posta gönderimi
    if (WEB3FORMS_ACCESS_KEY) {
      try {
        const subject = plan
          ? `Yeni proje talebi — ${name} (${plan} paket)`
          : `Yeni proje talebi — ${name}`;
        const payload = {
          access_key: WEB3FORMS_ACCESS_KEY,
          subject,
          from_name: name,
          replyto: email,
          name,
          email,
          phone: phoneDigits,
          plan: plan || "Belirtilmedi",
          message,
          botcheck,
        };
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.success === false) {
          throw new Error(data.message || "Gönderim başarısız oldu.");
        }
        setStatus("sent");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
        return;
      } catch (error) {
        // Backend başarısızsa mailto fallback'ine düş
        console.warn("Web3Forms hatası, mailto fallback:", error);
      }
    }

    // 2) Fallback: mailto — kullanıcının kendi mail istemcisini açar
    try {
      const subject = plan
        ? `Yeni proje talebi — ${name} (${plan} paket)`
        : `Yeni proje talebi — ${name}`;
      const body = `Ad Soyad: ${name}\nE-posta: ${email}\nTelefon: ${phoneDigits}${plan ? `\nPaket: ${plan}` : ""}\n\nMesaj:\n${message}`;
      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setStatus("email-client");
      setErrorMessage("");
      // mailto gerçek gönderim değildir; kullanıcı mail uygulamasında gönderimi tamamlamalı.
      setTimeout(() => setStatus("idle"), 8000);
    } catch (error) {
      setStatus("error");
      setErrorMessage("Beklenmeyen bir hata oluştu. WhatsApp veya e-posta ile yazabilirsin.");
    }
  }

  return (
    <section id="iletisim" className="relative overflow-hidden bg-acid pb-12 pt-28 sm:pb-14 sm:pt-32">
      <div className="ambient-cloud ambient-cloud--soft pointer-events-none absolute -left-32 top-8 h-80 w-[34rem] opacity-20 mix-blend-multiply" />
      <div className="pointer-events-none absolute -right-32 bottom-[-8rem] h-80 w-80 rounded-full bg-white/28 blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
        >
          <SectionLabel>İletişim</SectionLabel>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[0.95] text-ink">
            Projeni konuşalım.
          </h2>
          <p className="mt-4 max-w-md text-base leading-6 text-ink/75">
            Formu doldur ya da direkt WhatsApp / e-posta ile yaz. Genelde aynı gün
            içinde dönüş yapıyorum.
          </p>

          <div className="mt-6 space-y-2.5">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 rounded-2xl border border-ink/15 bg-white/40 px-5 py-3 text-sm font-bold text-ink transition hover:bg-white"
            >
              <Mail className="h-5 w-5" />
              {CONTACT_EMAIL}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-ink/15 bg-white/40 px-5 py-3 text-sm font-bold text-ink transition hover:bg-white"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp ile yaz
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-ink/15 bg-white/40 px-5 py-3 text-sm font-bold text-ink transition hover:bg-white"
            >
              <Instagram className="h-5 w-5" />
              @bariscreativedesign
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-ink/15 bg-white/40 px-5 py-3 text-sm font-bold text-ink transition hover:bg-white"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
          </div>

          <div className="mt-6 space-y-2 rounded-2xl border border-ink/15 bg-white/40 p-4">
            <p className="flex items-center gap-2.5 text-sm font-bold text-ink">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
              </span>
              Genelde 1-2 saat içinde dönüyorum
            </p>
            <p className="flex items-center gap-2.5 text-sm font-semibold text-ink/75">
              <MapPin className="h-4 w-4 shrink-0" />
              Bursa'dan Türkiye geneline uzaktan çalışıyorum
            </p>
            <p className="flex items-center gap-2.5 text-sm font-semibold text-ink/75">
              <Clock className="h-4 w-4 shrink-0" />
              Pzt-Cmt • 09:00 - 19:00
            </p>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="rounded-[28px] bg-ink p-6 text-white shadow-[0_30px_90px_rgba(5,5,5,0.28)] sm:p-7"
        >
          <div className="space-y-3.5">
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/55">
                Ad Soyad
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={80}
                autoCapitalize="words"
                autoComplete="name"
                placeholder="Adın"
                onInput={(event) => {
                  const input = event.currentTarget;
                  const start = input.selectionStart;
                  input.value = input.value.replace(
                    /(^|\s)(\S)/g,
                    (_, space, char) => space + char.toLocaleUpperCase("tr-TR"),
                  );
                  if (start !== null) input.setSelectionRange(start, start);
                }}
                className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white placeholder:text-white/35 transition focus:border-acid focus:outline-none focus:ring-2 focus:ring-acid/30"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/55">
                E-posta
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={120}
                autoComplete="email"
                inputMode="email"
                placeholder="adin@example.com"
                className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white placeholder:text-white/35 transition focus:border-acid focus:outline-none focus:ring-2 focus:ring-acid/30"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/55">
                Telefon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={15}
                placeholder="05XXXXXXXXX"
                onInput={(event) => {
                  event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "");
                }}
                onKeyDown={(event) => {
                  const allowed = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Home", "End"];
                  if (allowed.includes(event.key) || event.ctrlKey || event.metaKey) return;
                  if (!/^[0-9]$/.test(event.key)) event.preventDefault();
                }}
                className="w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white placeholder:text-white/35 transition focus:border-acid focus:outline-none focus:ring-2 focus:ring-acid/30"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/55">
                Mesaj
              </label>
              <textarea
                id="message"
                name="message"
                key={quotePrefill}
                required
                maxLength={1200}
                rows={quotePrefill ? 6 : 3}
                autoComplete="off"
                defaultValue={quotePrefill}
                placeholder="Projen hakkında kısaca bahset…"
                className="w-full resize-none rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-sm font-semibold text-white placeholder:text-white/35 transition focus:border-acid focus:outline-none focus:ring-2 focus:ring-acid/30"
              />
            </div>
            <input
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <input type="hidden" name="plan" value={selectedPlan} />
            {selectedPlan && (
              <p className="rounded-2xl border border-acid/30 bg-acid/10 px-4 py-2.5 text-xs font-bold text-acid">
                Seçili paket: <span className="uppercase tracking-[0.16em]">{selectedPlan}</span>
              </p>
            )}
            <label className="flex items-start gap-3 text-xs font-semibold leading-5 text-white/60">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 rounded border-white/30 bg-transparent accent-acid"
              />
              <span>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("bcd:open-kvkk"))}
                  className="underline hover:text-acid"
                >
                  KVKK Aydınlatma Metni
                </button>
                'ni okudum, kişisel verilerimin iletişim amacıyla işlenmesini kabul ediyorum.
              </span>
            </label>
            {status === "error" && errorMessage && (
              <p
                role="alert"
                className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-300"
              >
                {errorMessage}
              </p>
            )}
            {status === "sent" && (
              <p
                role="status"
                className="rounded-2xl border border-acid/40 bg-acid/15 px-4 py-2.5 text-xs font-bold text-acid"
              >
                Mesajın iletildi. En kısa sürede dönüş yapacağım.
              </p>
            )}
            {status === "email-client" && (
              <p
                role="status"
                className="rounded-2xl border border-acid/40 bg-acid/15 px-4 py-2.5 text-xs font-bold text-acid"
              >
                Mail uygulaman açıldı. Gönder butonuna bastığında talebin bana ulaşır.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              aria-busy={status === "submitting"}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-acid px-7 py-3.5 text-sm font-black text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting"
                ? "Gönderiliyor…"
                : status === "sent"
                  ? "Gönderildi ✓"
                  : status === "email-client"
                    ? "Mail hazırlandı"
                  : "Mesajı Gönder"}
              {status !== "submitting" && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

// NOT: Aşağıdaki yasal metinler taslak/şablondur. Yayına almadan önce
// bir hukuk danışmanına gözden geçirtilmesi tavsiye edilir.
const LEGAL_DOCS = {
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    updated: "Mayıs 2026",
    sections: [
      {
        h: "Veri Sorumlusu",
        p: "BarışCreativeDesign (\"BCD\") olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") kapsamında veri sorumlusu sıfatıyla hareket etmekteyiz.",
      },
      {
        h: "Toplanan Veriler",
        p: "İletişim formu veya doğrudan iletişim bağlantıları üzerinden ad-soyad, e-posta adresi, telefon numarası ve mesaj içeriği işlenebilir. Barındırma servisinin güvenlik kayıtları kapsamında IP adresi ve tarayıcı bilgisi gibi teknik loglar oluşabilir.",
      },
      {
        h: "İşleme Amaçları",
        p: "Talep ve sorularınızın yanıtlanması, teklif hazırlanması, sözleşme öncesi iletişim, hizmet sunumu, yasal yükümlülüklerin yerine getirilmesi ve site performansının iyileştirilmesi amaçlarıyla işlenir.",
      },
      {
        h: "Aktarım",
        p: "Verileriniz; barındırma, e-posta gönderimi ve form servis sağlayıcıları (örn. Web3Forms kullanılırsa) gibi sözleşmeli iş ortaklarımız haricinde üçüncü kişilerle paylaşılmaz. Yurt dışı aktarımı ilgili mevzuat ve açık rıza/uygun güvence şartları kapsamında değerlendirilir.",
      },
      {
        h: "Saklama Süresi",
        p: "Veriler, işleme amacının gerektirdiği süre boyunca ve yasal saklama yükümlülükleri kapsamında saklanır; süre sonunda silinir, yok edilir veya anonim hale getirilir.",
      },
      {
        h: "Haklarınız",
        p: "KVKK md. 11 kapsamında verilerinize erişme, düzeltilmesini isteme, silinmesini talep etme, işlemeye itiraz etme haklarına sahipsiniz. Taleplerinizi bariscreativedesign@gmail.com adresine yazılı olarak iletebilirsiniz.",
      },
    ],
  },
  gizlilik: {
    title: "Gizlilik Politikası",
    updated: "Mayıs 2026",
    sections: [
      {
        h: "Kapsam",
        p: "Bu politika bariscreativedesign.com sitesini ziyaret eden ve iletişim kanallarını kullanan kişilerin verilerinin nasıl işlendiğini açıklar.",
      },
      {
        h: "Veri Güvenliği",
        p: "Kişisel verileriniz; yetkisiz erişim, kayıp ve değiştirilmeye karşı uygun teknik ve idari tedbirlerle korunur. Form servisi aktif edildiğinde gönderimler HTTPS üzerinden iletilir; servis aktif değilse mail uygulamanız üzerinden gönderim yapılır.",
      },
      {
        h: "Üçüncü Taraf Bağlantılar",
        p: "Site; Instagram, LinkedIn, WhatsApp gibi üçüncü taraf platformlara bağlantılar içerir. Bu platformların kendi gizlilik politikaları geçerlidir.",
      },
      {
        h: "Çocukların Gizliliği",
        p: "Site bilinçli olarak 18 yaş altı kullanıcılardan veri toplamaz.",
      },
      {
        h: "Değişiklikler",
        p: "Politika, ihtiyaç halinde güncellenebilir. Güncel sürüm her zaman bu sayfada yayımlanır.",
      },
    ],
  },
  cerez: {
    title: "Çerez Politikası",
    updated: "Mayıs 2026",
    sections: [
      {
        h: "Çerez Nedir?",
        p: "Çerezler; tarayıcınızda saklanan, siteyi tekrar ziyaret ettiğinizde tanınmanızı sağlayan küçük metin dosyalarıdır.",
      },
      {
        h: "Kullandığımız Çerez Türleri",
        p: "Şu an üçüncü taraf reklam veya analitik çerezi kullanılmamaktadır. Site; çerez tercihinizi, teklif özeti ve çıkış penceresi durumunu tarayıcınızda yerel olarak saklayabilir. Analitik eklenirse yalnızca tercihinize göre çalıştırılır.",
      },
      {
        h: "Onayınız",
        p: "Sayfa girişinde gösterilen bandı kullanarak isteğe bağlı çerezleri kabul edebilir veya reddedebilirsiniz. Tercihiniz tarayıcınızda yerel olarak saklanır.",
      },
      {
        h: "Çerezleri Silme",
        p: "Çerezleri istediğiniz zaman tarayıcınızın ayarlarından silebilir veya engelleyebilirsiniz. Bu durum, sitedeki bazı işlevleri etkileyebilir.",
      },
    ],
  },
};

function LegalModal() {
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const handlers = Object.keys(LEGAL_DOCS).map((key) => {
      const handler = () => setActiveKey(key);
      window.addEventListener(`bcd:open-${key}`, handler);
      return [key, handler];
    });
    return () => {
      handlers.forEach(([key, handler]) => {
        window.removeEventListener(`bcd:open-${key}`, handler);
      });
    };
  }, []);

  useEffect(() => {
    if (!activeKey) return;
    const onKey = (event) => {
      if (event.key === "Escape") setActiveKey(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeKey]);

  const doc = activeKey ? LEGAL_DOCS[activeKey] : null;

  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-3 backdrop-blur sm:items-center sm:p-6"
          onClick={() => setActiveKey(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-hidden rounded-[24px] border border-white/10 bg-ink text-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">
                  Yasal • Güncelleme: {doc.updated}
                </p>
                <h2 id="legal-modal-title" className="mt-1 font-display text-xl font-black sm:text-2xl">
                  {doc.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveKey(null)}
                aria-label="Kapat"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition hover:border-acid hover:text-acid"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[68vh] overflow-y-auto p-5 text-sm leading-7 text-white/75 sm:p-6">
              {doc.sections.map((section) => (
                <div key={section.h} className="mb-5 last:mb-0">
                  <h3 className="font-display text-base font-black text-white">
                    {section.h}
                  </h3>
                  <p className="mt-2 text-white/70">{section.p}</p>
                </div>
              ))}
              <p className="mt-6 border-t border-white/10 pt-4 text-xs text-white/45">
                Sorularınız için: <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-acid">{CONTACT_EMAIL}</a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WhatsAppFab() {
  const [scrolled, setScrolled] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(() => !getCookieConsent());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 240);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    const onConsent = () => setCookieOpen(false);
    const onReopen = () => setCookieOpen(true);
    window.addEventListener("bcd:consent-changed", onConsent);
    window.addEventListener("bcd:open-cookie-prefs", onReopen);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("bcd:consent-changed", onConsent);
      window.removeEventListener("bcd:open-cookie-prefs", onReopen);
    };
  }, []);

  // Cookie banner görünürken Fab gizli — alt köşede çakışmasınlar
  const visible = scrolled && !cookieOpen;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      data-magnetic="0.16"
      className={`group fixed bottom-5 right-5 z-[60] inline-flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 text-sm font-black text-white shadow-2xl shadow-emerald-900/30 ring-1 ring-black/10 transition-all duration-300 hover:bg-[#1ebe5d] sm:bottom-8 sm:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="absolute -inset-1 -z-10 rounded-full bg-[#25D366]/45 opacity-70 blur-md transition group-hover:opacity-90" />
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp ile yaz</span>
    </a>
  );
}

// Çerez izni okuma/yazma yardımcıları — ileride analytics eklenirse
// bu fonksiyonlar üzerinden sorgulanmalı.
const COOKIE_CONSENT_KEY = "bcd_cookie_consent";
function getCookieConsent() {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
}
function setCookieConsent(value) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* storage disabled */
  }
  window.dispatchEvent(new CustomEvent("bcd:consent-changed", { detail: { value } }));
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[55] h-0.5 bg-transparent"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Sayfa kaydırma ilerlemesi"
    >
      <div
        className="h-full bg-acid transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem("bcd_exit_seen") === "1";
    } catch {
      /* ignore */
    }
    if (alreadyShown) return;

    // Touch cihazlarda exit-intent yerine 30 saniye sonra göster
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    let armedAt = Date.now();
    const minWaitMs = 8000; // sayfa girişinden en az 8 saniye sonra

    const trigger = () => {
      if (alreadyShown || dismissed) return;
      if (Date.now() - armedAt < minWaitMs) return;
      alreadyShown = true;
      try {
        sessionStorage.setItem("bcd_exit_seen", "1");
      } catch {
        /* ignore */
      }
      setVisible(true);
    };

    let mobileTimer;
    if (isCoarse) {
      mobileTimer = setTimeout(trigger, 30000);
    }

    const onMouseLeave = (event) => {
      // mouse viewport'un üst kenarından çıkıyorsa
      if (event.clientY <= 0 && !event.relatedTarget) {
        trigger();
      }
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, [dismissed]);

  function close() {
    setVisible(false);
    setDismissed(true);
  }

  function goContact() {
    close();
    const target = document.querySelector("#iletisim");
    if (target) {
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY);
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          className="fixed inset-0 z-[75] flex items-center justify-center bg-black/70 p-4 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-[26px] bg-acid p-7 text-ink shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Kapat"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 transition hover:border-ink hover:bg-ink hover:text-acid"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="font-display text-xs font-black uppercase tracking-[0.22em] text-ink/60">
              Bir saniye —
            </p>
            <h2 id="exit-intent-title" className="mt-3 font-display text-3xl font-black leading-[1.05] sm:text-4xl">
              Sitenin ücretsiz tasarım denetimini ister misin?
            </h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-ink/75 sm:text-base">
              Mevcut sitenin ilk izlenim, hız ve dönüşüm açısından nerede zayıfladığını
              kısa bir video / yazılı denetimle paylaşırım. Tamamen ücretsiz, bağlayıcı değil.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={goContact}
                data-magnetic="0.16"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-black text-white transition will-change-transform hover:bg-white hover:text-ink"
              >
                Denetim İste
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={close}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-ink/30 px-5 py-3 text-sm font-bold text-ink transition hover:bg-ink hover:text-acid"
              >
                Şimdi değil
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reopen = () => setVisible(true);
    window.addEventListener("bcd:open-cookie-prefs", reopen);
    let timer;
    if (!getCookieConsent()) {
      timer = setTimeout(() => setVisible(true), 1200);
    }
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("bcd:open-cookie-prefs", reopen);
    };
  }, []);

  function accept() {
    setCookieConsent("accepted");
    // ANALİTİK ENTEGRASYONU: GA/Pixel script'leri yalnızca burada başlatılmalı.
    // Örn: window.gtag?.("consent", "update", { ad_storage: "granted", analytics_storage: "granted" });
    setVisible(false);
  }

  function decline() {
    setCookieConsent("declined");
    // ANALİTİK ENTEGRASYONU: yüklü cookie'leri temizle, script'leri devre dışı bırak.
    // Örn: window.gtag?.("consent", "update", { ad_storage: "denied", analytics_storage: "denied" });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-md">
      <div className="rounded-2xl border border-white/10 bg-ink/95 p-5 text-white shadow-2xl backdrop-blur-xl">
        <p className="font-display text-sm font-black uppercase tracking-[0.18em] text-acid">
          Çerez Bildirimi
        </p>
        <p className="mt-2 text-sm leading-6 text-white/75">
          Bu site tercihlerini tarayıcında saklar. Analitik eklenirse yalnızca onayına göre çalışır. Detaylar için{" "}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("bcd:open-cerez"))}
            className="underline hover:text-acid"
          >
            Çerez Politikası
          </button>'nı
          incele.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={accept}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-acid px-5 py-2.5 text-sm font-black text-ink transition hover:bg-white"
          >
            Kabul et
          </button>
          <button
            onClick={decline}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Reddet
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink py-10 text-white">
      <div className="ambient-cloud ambient-cloud--soft pointer-events-none absolute -right-32 -top-28 h-72 w-[30rem]" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="BarışCreativeDesign"
              width="44"
              height="44"
              className="h-11 w-11 rounded-xl object-contain"
            />
            <p className="font-display text-2xl font-black">BarışCreativeDesign</p>
          </div>
          <p className="mt-3 max-w-xs text-sm font-semibold leading-6 text-white/55">
            Web tasarım, UI/UX, AI sistemler ve otomasyon ile markaların dijitalde daha
            güçlü görünmesini sağlıyorum.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-acid hover:text-acid"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-acid hover:text-acid"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="text-sm">
          <p className="font-display text-xs font-black uppercase tracking-[0.24em] text-white/45">
            Menü
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={(event) => scrollToSection(event, href)}
                className="font-semibold text-white/70 transition hover:text-acid"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="text-sm">
          <p className="font-display text-xs font-black uppercase tracking-[0.24em] text-white/45">
            İletişim
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-white/75 transition hover:text-acid"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
              className="font-semibold text-white/75 transition hover:text-acid"
            >
              {CONTACT_PHONE}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-white/75 transition hover:text-acid"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp ile yaz
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 grid max-w-7xl gap-4 border-t border-white/10 px-5 pt-6 text-xs font-semibold text-white/45 sm:flex sm:items-center sm:justify-between sm:px-8">
        <p>© {year} BarışCreativeDesign — Tüm hakları saklıdır.</p>
        <div className="flex flex-wrap gap-5 uppercase tracking-[0.18em]">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("bcd:open-kvkk"))}
            className="hover:text-acid"
          >
            KVKK
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("bcd:open-gizlilik"))}
            className="hover:text-acid"
          >
            Gizlilik
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("bcd:open-cerez"))}
            className="hover:text-acid"
          >
            Çerez Politikası
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("bcd:open-cookie-prefs"))}
            className="hover:text-acid"
          >
            Çerez Tercihini Değiştir
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useMagneticButtons();
  useInitialHashScroll();
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <div className="relative overflow-hidden bg-ink">
          <Hero />
          <ClientLogos />
          <Services />
        </div>
        <Manifesto />
        <Guarantees />
        <Process />
        <Pricing />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFab />
      <CookieBanner />
      <ExitIntentPopup />
      <LegalModal />
    </>
  );
}
