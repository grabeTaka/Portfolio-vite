import { useState, useEffect } from "react";
import { Copy, Check, Github, Linkedin, Moon, Sun } from "lucide-react";

/* ------------------------------------------------------------------
   CONTEÚDO — dados extraídos do currículo.
------------------------------------------------------------------ */
const data = {
  nome: "Gabriel Takahashi",
  cargo: "Engenheiro de software sênior",
  local: "São Paulo, SP",
  disponivel: true,
  resumo:
    "Mais de 7 anos construindo sistemas que mexem no resultado do negócio: plataformas de faturamento que processam milhões por mês, logística que triplicou de capacidade e integrações que abriram novas fontes de receita. Atuo em toda a stack, do Node.js e Spring Boot no back-end ao React e Next.js no front.",
  email: "gabriel.takahashi2020@gmail.com",
  github: "https://github.com/grabeTaka",
  linkedin: "https://www.linkedin.com/in/gabriel-taka/",
  whatsapp: "https://wa.me/5512991208280",

  experiencia: [
    {
      periodo: "Mai/2024 — atual",
      empresa: "ZRP Aplicações",
      cargo: "Engenheiro de software sênior",
      contexto:
        "Plataforma de faturamento e produtos de energia da Matrix Energia, uma das maiores comercializadoras varejistas independentes do Brasil.",
      entregas: [
        "Liderei tecnicamente o core de faturamento em Node.js, substituindo um sistema terceiro deficiente e levando cerca de R$ 10 milhões de faturamento mensal para dentro da plataforma.",
        "Arquitetei microsserviços em Spring Boot que viabilizaram novos produtos de energia para PF e PJ e elevaram o engajamento dos clientes em mais de 90%.",
        "Integrei pagamento e cobrança via Vindi, SysOpen e Open Finance (Celcoin), ampliando os meios de pagamento e acelerando a liquidação de recebíveis.",
        "Implementei a camada de segurança e autenticação com BFFs em Spring Boot, Azure e Keycloak, além dos portais administrativo e do cliente em Next.js.",
      ],
      stack: ["Node.js", "Spring Boot", "Next.js", "Keycloak", "Azure", "Redis", "N8N"],
    },
    {
      periodo: "Jan/2022 — Mai/2024",
      empresa: "Shopper.com.br",
      cargo: "Engenheiro de software sênior",
      contexto:
        "Supermercado online B2C de compras recorrentes, com mais de 1 milhão de clientes cadastrados e uso intenso de dados para logística e previsão de demanda.",
      entregas: [
        "Reestruturei o sistema de logística migrando a base legada de JavaScript para TypeScript e triplicando o processamento de 1.000 para 3.000 pedidos por dia.",
        "Criei do zero o rastreamento de rotas em tempo real com Firebase e Google Maps API, incluindo resgate de veículos, que levou o cumprimento das janelas de entrega de 38% para 97%.",
        "Projetei em Spring Boot as APIs e o BFF dos totens físicos, viabilizando a abertura de lojas que geraram cerca de R$ 30 milhões em receita anual.",
        "Integrei a plataforma às APIs do iFood com Spring Boot, Redis, SQS e Lambda, habilitando a venda dentro do ecossistema do app.",
        "Participei da criação da infraestrutura como código na AWS com Terraform, tirando o provisionamento do manual e padronizando deploys com Docker.",
      ],
      stack: ["TypeScript", "Spring Boot", "AWS", "Terraform", "Firebase", "Next.js", "Jest"],
    },
    {
      periodo: "Set/2020 — Dez/2021",
      empresa: "Propz",
      cargo: "Engenheiro de software pleno",
      contexto:
        "CRM de personalização com Big Data e machine learning para grandes varejistas como Carrefour e Farmácia São João, processando mais de R$ 7,5 bilhões em transações e 22 milhões de interações por mês.",
      entregas: [
        "Desenvolvi funcionalidades full-stack do CRM com Angular, React e jQuery no front e Node.js e Groovy no back, usadas diariamente por grandes redes varejistas.",
        "Modelei a base de dados inicial do sistema, garantindo consistência e escala para o volume de interações processadas.",
        "Conduzi levantamento de requisitos junto aos clientes, traduzindo necessidades de negócio em automações de campanhas de marketing.",
      ],
      stack: ["Node.js", "Groovy", "Angular", "React", "Big Data"],
    },
    {
      periodo: "Dez/2018 — Set/2020",
      empresa: "ContinuoDev Tecnologia",
      cargo: "Engenheiro de software júnior",
      contexto:
        "Múltiplos projetos web: e-commerce, controle de estoque e plataformas de exchange.",
      entregas: [
        "Desenvolvi soluções full-stack com JavaScript, Node.js, MySQL e Firebase em projetos de clientes distintos.",
      ],
      stack: ["JavaScript", "Node.js", "MySQL", "Firebase"],
    },
  ],

  stack: [
    { grupo: "Linguagens", itens: ["Java", "TypeScript", "JavaScript", "Groovy", "SQL"] },
    { grupo: "Back-end", itens: ["Node.js", "Spring Boot", "APIs REST", "Microsserviços"] },
    { grupo: "Front-end", itens: ["React", "Next.js", "Angular", "Storybook"] },
    { grupo: "Cloud & DevOps", itens: ["AWS (SQS, Lambda, Rekognition)", "Terraform", "Docker", "Azure"] },
    { grupo: "Dados", itens: ["PostgreSQL", "MySQL", "Redis", "Firebase", "Pub/Sub"] },
    { grupo: "Práticas", itens: ["Scrum e Kanban", "Design Patterns", "Clean Code", "Code review"] },
  ],

  formacao: [
    { periodo: "2018 — 2022", curso: "Análise e Desenvolvimento de Sistemas", instituicao: "Fatec SP" },
    { periodo: "2024 — 2026", curso: "Inglês — B2", instituicao: "KNN Idiomas" },
    { periodo: "2019 — 2021", curso: "Inglês — B1", instituicao: "Callan Way" },
  ],
};

/* ------------------------------------------------------------------
   Tokens de tema. Trocar cor do acento = mexer só aqui.
------------------------------------------------------------------ */
const temas = {
  escuro: {
    page: "bg-zinc-950 text-zinc-100",
    glow: "bg-violet-600 opacity-20",
    sutil: "text-zinc-500",
    corpo: "text-zinc-400",
    forte: "text-zinc-100",
    linha: "border-zinc-800",
    trilho: "bg-zinc-800",
    chip: "bg-zinc-900 text-zinc-400 ring-1 ring-zinc-800",
    acento: "text-violet-400",
    ponto: "bg-violet-400",
    marcador: "bg-violet-400 ring-4 ring-zinc-950",
    btn: "bg-violet-500 text-zinc-950 hover:bg-violet-400",
    icone: "border-zinc-800 text-zinc-400 hover:border-violet-400 hover:text-violet-400",
    ring: "focus-visible:ring-violet-400 focus-visible:ring-offset-zinc-950",
    selecao: "selection:bg-violet-500 selection:text-zinc-950",
  },
  claro: {
    page: "bg-white text-zinc-900",
    glow: "bg-violet-400 opacity-20",
    sutil: "text-zinc-400",
    corpo: "text-zinc-600",
    forte: "text-zinc-900",
    linha: "border-zinc-200",
    trilho: "bg-zinc-200",
    chip: "bg-zinc-50 text-zinc-500 ring-1 ring-zinc-200",
    acento: "text-violet-600",
    ponto: "bg-violet-600",
    marcador: "bg-violet-600 ring-4 ring-white",
    btn: "bg-violet-600 text-white hover:bg-violet-700",
    icone: "border-zinc-200 text-zinc-500 hover:border-violet-600 hover:text-violet-600",
    ring: "focus-visible:ring-violet-600 focus-visible:ring-offset-white",
    selecao: "selection:bg-violet-200 selection:text-zinc-900",
  },
};

/* lucide-react não traz o ícone de marca do WhatsApp — glifo oficial inline. */
function IconeWhatsapp({ size = 16 }) {
  return (
    <svg
      role="img"
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.945 11.945 0 005.71 1.454h.006c6.585 0 11.946-5.359 11.949-11.945A11.86 11.86 0 0020.52 3.449" />
    </svg>
  );
}

function Secao({ t, rotulo, id, children }) {
  return (
    <section id={id} className={`border-t ${t.linha} py-16 sm:py-24`}>
      <div className="grid gap-8 sm:grid-cols-[10rem_1fr]">
        <h2 className={`font-mono text-xs uppercase tracking-widest ${t.sutil}`}>
          {rotulo}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [escuro, setEscuro] = useState(true);
  const [copiado, setCopiado] = useState(false);
  const [pronto, setPronto] = useState(false);
  const t = escuro ? temas.escuro : temas.claro;

  useEffect(() => {
    const timer = setTimeout(() => setPronto(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const copiarEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.location.href = `mailto:${data.email}`;
    }
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden antialiased transition-colors duration-500 ${t.page} ${t.selecao}`}
    >
      <div
        className={`pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-500 ${t.glow}`}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex justify-end pt-6">
          <button
            onClick={() => setEscuro(!escuro)}
            aria-label={escuro ? "Ativar tema claro" : "Ativar tema escuro"}
            className={`rounded-full border p-2.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${t.icone} ${t.ring}`}
          >
            {escuro ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Hero */}
        <header
          className={`pb-20 pt-10 transition-all duration-700 sm:pb-28 sm:pt-16 ${
            pronto ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div className={`mb-6 flex items-center gap-2 font-mono text-xs ${t.sutil}`}>
            <span className="relative flex h-2 w-2">
              {data.disponivel && (
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${t.ponto}`}
                />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  data.disponivel ? t.ponto : "bg-zinc-600"
                }`}
              />
            </span>
            {data.disponivel ? "Aberto a novas oportunidades" : "Sem disponibilidade"}
            <span className="opacity-40">/</span>
            {data.local}
          </div>

          <h1 className="text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
            {data.nome}
          </h1>
          <p className={`mt-3 font-mono text-sm ${t.acento}`}>{data.cargo}</p>

          <p className={`mt-8 max-w-3xl text-lg leading-relaxed ${t.corpo}`}>
            {data.resumo}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              onClick={copiarEmail}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${t.btn} ${t.ring}`}
            >
              {copiado ? <Check size={14} /> : <Copy size={14} />}
              {copiado ? "E-mail copiado" : data.email}
            </button>
            <a
              href={data.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={`rounded-full border p-2.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${t.icone} ${t.ring}`}
            >
              <Github size={16} />
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={`rounded-full border p-2.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${t.icone} ${t.ring}`}
            >
              <Linkedin size={16} />
            </a>
            <a
              href={data.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className={`rounded-full border p-2.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${t.icone} ${t.ring}`}
            >
              <IconeWhatsapp size={16} />
            </a>
          </div>
        </header>

        {/* Experiência */}
        <Secao t={t} id="experiencia" rotulo="Experiência">
          <ol className="relative">
            <span
              className={`absolute left-1 top-2 hidden h-full w-px sm:block ${t.trilho}`}
              aria-hidden="true"
            />

            {data.experiencia.map((e, i) => (
              <li
                key={`${e.empresa}-${i}`}
                className={`relative sm:pl-10 ${i > 0 ? "mt-14" : ""}`}
              >
                <span
                  className={`absolute left-0 top-2 hidden h-2 w-2 rounded-full sm:block ${t.marcador}`}
                  aria-hidden="true"
                />

                <p className={`font-mono text-xs ${t.sutil}`}>{e.periodo}</p>

                <h3 className={`mt-2 text-xl font-medium tracking-tight ${t.forte}`}>
                  {e.cargo}
                  <span className={`mx-2 font-normal ${t.sutil}`}>·</span>
                  <span className={t.acento}>{e.empresa}</span>
                </h3>

                {e.contexto && (
                  <p className={`mt-2 max-w-3xl leading-relaxed ${t.corpo}`}>{e.contexto}</p>
                )}

                <ul className="mt-4 max-w-3xl space-y-2">
                  {e.entregas.map((entrega) => (
                    <li key={entrega} className="flex gap-3">
                      <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${t.ponto}`} />
                      <span className={`leading-relaxed ${t.corpo}`}>{entrega}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {e.stack.map((tec) => (
                    <span
                      key={tec}
                      className={`rounded-full px-2.5 py-1 font-mono text-xs ${t.chip}`}
                    >
                      {tec}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Secao>

        {/* Stack */}
        <Secao t={t} id="stack" rotulo="Stack">
          <dl className="space-y-6">
            {data.stack.map((s) => (
              <div key={s.grupo} className="flex flex-col gap-2 sm:flex-row sm:gap-8">
                <dt
                  className={`w-32 shrink-0 font-mono text-xs uppercase tracking-wider ${t.sutil}`}
                >
                  {s.grupo}
                </dt>
                <dd className={t.corpo}>{s.itens.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Secao>

        {/* Formação */}
        <Secao t={t} id="formacao" rotulo="Formação">
          <ul className="space-y-5">
            {data.formacao.map((f) => (
              <li key={f.curso} className="flex flex-col gap-1 sm:flex-row sm:gap-8">
                <span className={`w-32 shrink-0 font-mono text-xs ${t.sutil}`}>
                  {f.periodo}
                </span>
                <div>
                  <p className={`font-medium ${t.forte}`}>{f.curso}</p>
                  <p className={`mt-0.5 text-sm ${t.corpo}`}>{f.instituicao}</p>
                </div>
              </li>
            ))}
          </ul>
        </Secao>

        {/* Contato */}
        <Secao t={t} id="contato" rotulo="Contato">
          <p className={`max-w-3xl text-lg leading-relaxed ${t.corpo}`}>
            Quer conversar sobre uma vaga ou um projeto? Escreva para{" "}
            <a
              href={`mailto:${data.email}`}
              className={`underline decoration-2 underline-offset-4 ${t.acento}`}
            >
              {data.email}
            </a>
            . Costumo responder em até um dia útil.
          </p>
        </Secao>

        <footer className={`border-t ${t.linha} py-10 font-mono text-xs ${t.sutil}`}>
          © {new Date().getFullYear()} {data.nome}
        </footer>
      </div>
    </div>
  );
}
