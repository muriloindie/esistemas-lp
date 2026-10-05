# ESisitemas — Landing Page

Landing page institucional da **ESisitemas**, construída com Next.js (App Router) e TypeScript.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript 5**
- **Leaflet** (mapa da unidade E-Control)
- **ESLint** com `eslint-config-next`

## Como rodar

```bash
npm install      # instala as dependências
npm run dev      # servidor de desenvolvimento (http://localhost:3000)
npm run build    # build de produção
npm run start    # servidor de produção
npm run lint     # lint
```

## Estrutura

```
src/
  app/            # layout, página inicial e estilos globais
  components/     # componentes de UI (Hero, Navbar, Lightbox, PhoneVideo...)
  components/sections/  # seções da landing page (Services, Cases, Process...)
  hooks/          # hooks (useReducedMotion)
  lib/            # utilitários e links
public/           # imagens e vídeos estáticos
```

## Observações

- A pasta `.referencias` é material de apoio local e está no `.gitignore` — não vai para o repositório.
- `.next/`, `node_modules/` e `*.tsbuildinfo` também são ignorados.
