import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  Clock,
  Route as RouteIcon,
  CreditCard,
  Users,
  MapPin,
  Plane,
  Baby,
  Car,
  Phone,
  Instagram,
  Star,
  Check,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import carSpin from "@/assets/car-spin.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carHatch from "@/assets/car-hatch.jpg";
import carSedan from "@/assets/car-sedan.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nova Car Locadora | Aluguel de carros em Porto Seguro" },
      {
        name: "description",
        content:
          "Aluguel de carros em Porto Seguro, Arraial d'Ajuda, Trancoso e Caraíva. Frota nova, km livre, sem bloqueio de caução no cartão e atendimento 24 horas.",
      },
      { property: "og:title", content: "Nova Car Locadora de Veículos" },
      {
        property: "og:description",
        content:
          "Viaje com liberdade e sem burocracia: frota nova, km livre e entrega no aeroporto de Porto Seguro.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATS = "https://wa.me/5573999989200";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=R+Cidade+de+Faffi%2C+135%2C+Sala+003%2C+Centro%2C+Porto+Seguro+-+BA%2C+45810-000";
const INSTAGRAM = "https://www.instagram.com/novacar.locadora/";

const EMPRESA = {
  razaoSocial: "Nova Car LTDA",
  cnpj: "52.281.914/0001-71",
  endereco: "R. Cidade de Faffi, 135 - Sala 003, Centro, Porto Seguro - BA, 45810-000",
};

const frota = [
  { nome: "Spin", tag: "7 lugares", img: carSpin, specs: ["7 lugares", "Ar-condicionado", "Direção elétrica"] },
  { nome: "Jeep Renegade", tag: "SUV", img: carSuv, specs: ["SUV", "Ar-condicionado", "Direção elétrica"] },
  { nome: "HB20", tag: "Econômico", img: carHatch, specs: ["Econômico", "Ar-condicionado", "Direção elétrica"] },
  { nome: "Fiat Cronos", tag: "Sedan", img: carSedan, specs: ["Porta-malas amplo", "Ar-condicionado", "Direção elétrica"] },
];

const vantagens = [
  { icon: CreditCard, t: "Sem bloqueio de caução", d: "Você não tem valor preso no cartão de crédito." },
  { icon: Users, t: "Condutor adicional", d: "Sem custo extra para dividir a direção." },
  { icon: ShieldCheck, t: "Seguro com franquia", d: "Proteção com participação de franquia." },
  { icon: MapPin, t: "Retirada rápida", d: "Processo prático, sem filas e sem burocracia." },
  { icon: Plane, t: "Entrega no aeroporto", d: "Levamos o carro até você em Porto Seguro e região." },
  { icon: Clock, t: "Atendimento estendido", d: "24h de sábado a quinta. Sexta-feira, das 8h às 20h." },
  { icon: RouteIcon, t: "KM livre", d: "Rode o quanto quiser pelo litoral baiano." },
  { icon: Baby, t: "Cadeirinha e bebê conforto", d: "Itens de segurança disponíveis para locação." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="leading-none">
            <span className="font-display text-2xl text-ink-foreground">
              Nova <span className="text-primary">Car</span>
            </span>
            <span className="block text-[0.6rem] tracking-[0.45em] text-ink-foreground/60">LOCADORA</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-ink-foreground/80 md:flex">
            <a href="#frota" className="hover:text-primary">Frota</a>
            <a href="#vantagens" className="hover:text-primary">Vantagens</a>
            <a href="#contato" className="hover:text-primary">Contato</a>
          </nav>
          <a
            href={WHATS}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Reservar
          </a>
        </div>
      </header>

      <section id="top" className="relative isolate overflow-hidden bg-ink">
        <img
          src={hero}
          alt="Carro de aluguel em estrada litorânea de Porto Seguro ao pôr do sol"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
          <p className="mb-4 inline-block bg-primary px-3 py-1 text-xs font-bold tracking-[0.3em] text-primary-foreground">
            PORTO SEGURO • BAHIA
          </p>
          <h1 className="max-w-2xl text-5xl leading-[0.95] text-ink-foreground md:text-7xl">
            Viaje com <span className="text-primary">liberdade</span> e sem burocracia
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-foreground/75">
            Frota nova, confortável e completa para explorar Porto Seguro, Arraial d'Ajuda, Trancoso, Caraíva e região.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={WHATS}
              className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Reservar no WhatsApp
            </a>
            <a
              href="#frota"
              className="rounded-full border border-ink-foreground/30 px-8 py-3 font-semibold text-ink-foreground transition hover:border-primary hover:text-primary"
            >
              Ver a frota
            </a>
          </div>
        </div>

        <div className="relative border-t border-ink-foreground/10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px px-5 py-6 text-ink-foreground sm:grid-cols-3">
            {[
              { icon: ShieldCheck, t: "Seguro com participação", d: "de franquia" },
              { icon: Clock, t: "Atendimento", d: "24h (sáb a qui) · sex 8h-20h" },
              { icon: RouteIcon, t: "KM livre", d: "para você explorar" },
            ].map((i) => (
              <div key={i.t} className="flex items-center gap-3 px-2 py-3">
                <i.icon className="h-7 w-7 shrink-0 text-primary" />
                <p className="text-sm font-semibold leading-tight">
                  {i.t}
                  <span className="block font-normal text-ink-foreground/60">{i.d}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="frota" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-center text-3xl md:text-4xl">
          Frota nova, confortável e <span className="text-primary">completa</span>
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {frota.map((c) => (
            <article
              key={c.nome}
              className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1"
            >
              <div className="relative bg-muted p-4">
                <span className="absolute left-4 top-4 brand-slash px-3 py-1 text-xs font-bold uppercase text-primary-foreground">
                  {c.tag}
                </span>
                <div className="mt-6 flex aspect-[4/3] items-center justify-center">
                  <img
                    src={c.img}
                    alt={`${c.nome} para alugar em Porto Seguro`}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col border-t border-border p-5">
                <h3 className="text-2xl not-italic">{c.nome}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {c.specs.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" /> {s}
                    </li>
                  ))}
                </ul>
                <a
                  href={WHATS}
                  className="mt-5 rounded-full bg-ink py-2.5 text-center text-sm font-semibold text-ink-foreground transition hover:bg-primary hover:text-primary-foreground"
                >
                  Consultar diária
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="vantagens" className="bg-ink py-20 text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl md:text-4xl">
            Vantagens que fazem a <span className="text-primary">diferença</span>
          </h2>
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {vantagens.map((v) => (
              <div key={v.t}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg not-italic">{v.t}</h3>
                <p className="mt-1 text-sm text-ink-foreground/60">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-center gap-10 rounded-3xl bg-[image:var(--gradient-orange)] p-10 text-primary-foreground md:grid-cols-2">
          <div>
            <h2 className="text-3xl md:text-4xl">Viaje com segurança para toda a família</h2>
            <p className="mt-4 max-w-md text-primary-foreground/80">
              Cadeirinha infantil e bebê conforto disponíveis para locação junto com o seu veículo. Solicite na reserva.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Cadeirinha infantil", d: "Para locação" },
              { t: "Bebê conforto", d: "Para locação" },
            ].map((i) => (
              <div key={i.t} className="rounded-2xl bg-ink/90 p-6 text-ink-foreground">
                <Baby className="h-8 w-8 text-primary" />
                <h3 className="mt-3 text-xl not-italic">{i.t}</h3>
                <p className="text-sm text-ink-foreground/60">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl md:text-4xl">
              Faça sua <span className="text-primary">reserva</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Atendemos Porto Seguro, Arraial d'Ajuda, Trancoso, Caraíva e região, com entrega no aeroporto.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <a href={WHATS} className="flex items-center gap-3 font-medium hover:text-primary">
                <Phone className="h-5 w-5 text-primary" /> WhatsApp — 24h de sáb a qui · sex 8h às 20h
              </a>
              <a href={MAPS} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-medium hover:text-primary">
                <MapPin className="h-5 w-5 text-primary" /> {EMPRESA.endereco}
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 font-medium hover:text-primary"
              >
                <Instagram className="h-5 w-5 text-primary" /> @novacar.locadora
              </a>
              <p className="flex items-center gap-3 font-medium">
                <Car className="h-5 w-5 text-primary" /> Retirada rápida e prática, sem burocracia
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-card p-8 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-1 text-primary">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="mt-4 text-lg leading-relaxed">
              “Atendimento rápido, carro novo e entrega no aeroporto. Foi só chegar e viajar pelo litoral.”
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Cliente Nova Car — Porto Seguro</p>
            <a
              href={WHATS}
              className="mt-8 block rounded-full bg-primary py-3 text-center font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Reservar agora
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-ink py-8 text-center text-sm text-ink-foreground/50">
        <span className="font-display text-xl text-ink-foreground">
          Nova <span className="text-primary">Car</span> Locadora
        </span>
        <p className="mt-2">Porto Seguro • Arraial d'Ajuda • Trancoso • Caraíva e região</p>
        <p className="mt-4 text-xs text-ink-foreground/40">
          {EMPRESA.razaoSocial} · CNPJ {EMPRESA.cnpj} · {EMPRESA.endereco}
        </p>
      </footer>
    </div>
  );
}
