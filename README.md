# Next.js Institucional Starter

Template para criar sites institucionais com Next.js App Router, React, TypeScript e SCSS Modules. A base é intencionalmente enxuta: oferece estrutura, acessibilidade e controles de SEO reutilizáveis sem incluir identidade visual, conteúdo comercial ou integrações de um cliente específico.

## Stack

- Next.js 16 e React 19
- TypeScript com checagem estrita
- SCSS Modules e Sass
- ESLint, Prettier e `prettier-plugin-organize-imports`
- Framer Motion centralizado no componente `Animation`

## Pré-requisitos

- Node.js 20.9 ou superior
- npm 11 (o projeto declara a versão usada para este template)

## Instalação e desenvolvimento

1. Crie um repositório a partir deste Template Repository no GitHub.
2. Instale as dependências com `npm ci`.
3. Copie `.env.example` para `.env.local` e mantenha os valores de homologação até ter os dados oficiais do cliente.
4. Execute `npm run dev` e abra a URL indicada pelo Next.js.

O acesso de outros dispositivos da rede local é permitido em desenvolvimento para `192.168.1.*` por `allowedDevOrigins` no `next.config.ts`. Essa configuração não afeta o ambiente de produção.

## Comandos

| Comando                | Finalidade                                       |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Inicia o servidor de desenvolvimento.            |
| `npm run lint`         | Executa ESLint.                                  |
| `npm run typecheck`    | Executa TypeScript sem emitir arquivos.          |
| `npm run format`       | Formata os arquivos com Prettier.                |
| `npm run format:check` | Verifica a formatação sem editar arquivos.       |
| `npm run build`        | Executa a build padrão de produção do Next.js.   |
| `npm run start`        | Inicia a build de produção com servidor Next.js. |

## Estrutura inicial

```text
src/
  app/
    components/
      Animation/
      Layout/
        Header/
        Footer/
      SiteVersionLogger.tsx
    globals.scss
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
    siteVersion.ts
  config/
    site.ts
```

- Componentes reutilizáveis ficam em `src/app/components`.
- Componentes exclusivos devem permanecer próximos à rota que os usa.
- Cada componente visual usa seu próprio SCSS Module. `globals.scss` é reservado a reset e estrutura realmente global.
- `Header` e `Footer` são somente pontos de extensão neutros; configure navegação, contatos e identidade visual no projeto do cliente.

## Estilos e animações

Use SCSS Modules em componentes visuais:

```tsx
import styles from './Component.module.scss';
```

O componente `Animation` centraliza Framer Motion e oferece `fade`, `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight` e `zoom`. Ele respeita `prefers-reduced-motion`; não importe Framer Motion diretamente em cada seção sem necessidade.

## Versão exibida no console

`src/app/siteVersion.ts` lê exclusivamente o campo `version` de `package.json`. O `SiteVersionLogger`, montado no layout global, registra uma única mensagem por carregamento e versão. Atualize a versão somente em releases planejadas.

## Configuração do site e SEO

`src/config/site.ts` é a fonte única para nome, descrição, idioma, ambiente, URL canônica e regra de indexação. Configure os valores pelo ambiente de build, nunca espalhando domínio ou metadados por páginas.

Por segurança, a indexação é bloqueada por padrão. Ela só é liberada quando todas as condições abaixo são verdadeiras durante a build:

```dotenv
SITE_ENV=production
SITE_INDEXABLE=true
SITE_URL=https://www.dominio-oficial-do-cliente.com.br
```

`SITE_URL` deve ser uma URL HTTPS oficial, sem porta, caminhos, parâmetros ou fragmentos. Valores ausentes ou inválidos, qualquer ambiente diferente de `production` ou `SITE_INDEXABLE` diferente de `true` mantêm `robots.index`, `robots.follow` e `googleBot` desativados.

Em desenvolvimento e homologação, `robots.ts` continua permitindo rastreamento técnico; a proteção é feita pelas diretivas `noindex`, não por `Disallow: /`. O sitemap fica vazio enquanto o site não é indexável e só publica rotas oficiais em produção aprovada.

Para páginas internas, use `createPageMetadata` de `@/config/site`. O helper reaplica a política global de indexação e evita que metadados locais liberem indexação acidentalmente.

```tsx
import { createPageMetadata } from '@/config/site';

export const metadata = createPageMetadata({
  title: 'Título da página',
  description: 'Descrição confirmada da página.',
  path: '/rota-publica',
});
```

Antes de liberar produção, substitua nome, descrição, idioma, domínio, favicon, imagens Open Graph e as rotas do sitemap pelos dados reais e aprovados do cliente.

## Hospedagem

O starter não fixa `output: "export"`. Escolha a estratégia conforme a hospedagem:

- Servidor Next.js: permite recursos que dependem de servidor, incluindo otimização padrão de imagens.
- Exportação estática: configure `output: "export"` somente quando for a decisão de deploy e adapte a estratégia de imagens e funcionalidades de servidor.

## Publicação e validação

Antes de abrir pull request ou publicar, execute:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

O workflow em `.github/workflows/validate.yml` executa essa mesma sequência com Node 20 no GitHub Actions.

Leia também o `AGENTS.md`: ele contém as regras de arquitetura, acessibilidade, performance, SEO e dados comerciais que se aplicam a todos os projetos derivados deste template.
