# Portfólio — Gabriel Takahashi

Página única em React + Vite + Tailwind CSS v4, com tema escuro/claro.

## Rodando local

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Scripts

| Comando           | O que faz                                     |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento com hot reload    |
| `npm run build`   | Gera o build de produção em `dist/`           |
| `npm run preview` | Serve o `dist/` local, igual à produção       |

## Onde editar o conteúdo

Tudo em `src/Portfolio.jsx`:

- **`data`** (topo do arquivo) — nome, resumo, contatos, experiência, stack, formação.
  Trocar `disponivel: false` apaga o pulso verde e muda o texto do status.
- **`temas`** — as cores. Trocar `violet` por `cyan`, `emerald` ou `amber` em todas as
  classes muda o acento do site inteiro.

O `<title>`, a descrição e as tags Open Graph ficam em `index.html`. Troque
`https://SEU-DOMINIO.vercel.app` pelo domínio real depois do deploy.

## Deploy na Vercel

```bash
git init
git add .
git commit -m "portfolio"
git remote add origin git@github.com:grabeTaka/portfolio.git
git push -u origin main
```

Em vercel.com: **Add New → Project → importar o repositório**. Ela detecta Vite
sozinha (build `npm run build`, output `dist`). Cada push na `main` faz deploy;
cada PR ganha uma URL de preview.

## Persistir o tema escolhido

O toggle começa no escuro a cada visita. Para lembrar a escolha e respeitar o
tema do sistema, troque o `useState` do tema em `src/Portfolio.jsx` por:

```jsx
const [escuro, setEscuro] = useState(() => {
  const salvo = localStorage.getItem("tema");
  if (salvo) return salvo === "escuro";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
});

useEffect(() => {
  localStorage.setItem("tema", escuro ? "escuro" : "claro");
  document.documentElement.style.colorScheme = escuro ? "dark" : "light";
}, [escuro]);
```
# Portfolio-vite
