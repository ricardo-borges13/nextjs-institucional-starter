# AGENTS.md — Padrão para projetos institucionais Next.js

Este arquivo é a referência permanente para Codex e agentes de código. **Leia antes de alterar o projeto.** Os prompts podem ser curtos: solicite apenas a mudança; as regras abaixo já se aplicam. O projeto atual e seus requisitos aprovados prevalecem sobre preferências genéricas. Nunca copie dados ou identidade de clientes anteriores.

## 1. Fluxo de trabalho
- Inspecione o código afetado, dependências e arquivos de configuração antes de editar.
- Faça somente o que foi solicitado, com mudanças pequenas e reutilização de componentes existentes. Não refatore outras áreas sem necessidade.
- Não invente dados comerciais, produtos, imagens reais, contatos, certificados, números, URLs ou funcionalidades. Use apenas conteúdo confirmado ou placeholders explicitamente rotulados em demonstrações.
- Não instale bibliotecas, mude estratégia de renderização/hospedagem, crie CMS ou API sem justificativa ou pedido.
- Ao concluir, informe arquivos modificados, testes **executados de fato**, resultados e pendências. Não declare sucesso sem comprovação.
- Quando o Next.js adicionar instruções gerenciadas ao AGENTS.md, preserve o bloco.

## 2. Stack e arquitetura
- Next.js 16 App Router, React 19, TypeScript estrito, npm, SCSS Modules. Server Components como padrão; `'use client'` apenas quando necessário.
- Componentes globais em `src/app/components/`; componentes exclusivos junto à rota. Header/Footer em `components/Layout/`. Animações no componente global `Animation`.
- Cada componente visual tem seu `.module.scss`. Use `@use '@/app/styles/variables' as *;` **quando** os tokens existirem no projeto; este starter não os inclui até a identidade visual ser definida.
- Dados de navegação/contatos/produtos em `src/data/`; SEO e configuração global em `src/config/site.ts`. Não espalhe informações comerciais por JSX.
- Use `next/link` nas rotas internas e `next/image` ou `<picture>` para imagens conforme o tipo de deploy e a necessidade de art direction.
- **Rotas tipadas:** `typedRoutes: true` está ativo. Para menus armazenados como dados, tipar `href` como `Route` de `next` (ou usar `satisfies` com rotas concretas). Evite `href?: \`/${string}\``: o tipo amplo causa erro TS2769 em `Link`. Para rotas calculadas dinamicamente, valide o destino e faça narrowing apropriado, sem casts indiscriminados.
- Não criar links para páginas inexistentes. Ações de demonstração devem informar honestamente que estão indisponíveis, sem `mailto:` ou WhatsApp como substitutos não solicitados.

## 3. Layout, UX e responsividade — obrigatório
- **Notebook principal: 1366 × 728**, além de 1366 × 641 e resoluções com menos altura. Também conferir 1920 × 1080, 1440 × 900, tablet 768/1024 e mobile 360, 375, 390 e 430 px.
- Evitar seções gigantes em notebook: reduzir espaçamentos, dimensões do Hero, cards, fontes e CTAs por breakpoint e, quando necessário, `max-height`. Fazer isso **na primeira implementação**, não após o usuário apontar cortes.
- Mobile e tablet: preservar imagem focal, navegação acessível, altura útil (`svh`/`dvh` quando apropriado), alvos tocáveis ~44px, modais roláveis e sem overflow horizontal.
- Definir tokens de cor, tipografia, container e espaçamento **por cliente**. SCSS global apenas reset/tokens compartilhados; estilos locais em Modules. Preferir `clamp()`, grid responsivo e dimensões de imagem explícitas.
- Respeitar `prefers-reduced-motion`, `:focus-visible` e semântica de links vs botões. Hover não deve ser a única resposta à interação.
- Hero desktop/mobile com enquadramentos próprios quando necessário. Não carregar imagem LCP com lazy loading; otimizar WebP/AVIF e evitar CLS. Parallax apenas quando solicitado e sem comprometer mobile.
- Use `Animation` existente; não duplicar wrappers nem importar Framer Motion em cada seção.

## 4. SEO, conteúdo e privacidade
- `src/config/site.ts` centraliza domínio, nome, canonical, metadata e `robots`. Use `createPageMetadata` nas novas páginas.
- **Staging é noindex por padrão.** Indexação só quando `SITE_ENV=production`, `SITE_INDEXABLE=true` e `SITE_URL` é HTTPS oficial e válido. Nunca usar apenas `NODE_ENV` para liberar SEO.
- Usar títulos e descrições próprios, um H1 por página, alt correto, metadados e sitemap apenas com rotas reais. Não publicar dados estruturados inventados.
- Homologação não deve se passar pelo site oficial. Se houver material sensível, autenticação; robots/noindex não são proteção de acesso.
- Formulários só anunciam envio quando há integração funcional testada. Em demo, declarar que não enviam. Validar dados, finalidade LGPD e tratamento adequado em produção.
- Scripts de analytics/marketing e cookies apenas quando justificados e conforme consentimento aplicável. Não expor segredos em `NEXT_PUBLIC_*`.

## 5. Build, deploy e erros conhecidos
- O starter usa build **com servidor Next.js** por padrão. Para hospedagem somente de arquivos estáticos (ex.: Apache/DialHost), configurar explicitamente `output: 'export'`, avaliar `trailingSlash`, `images: { unoptimized: true }` e regras de hospedagem. Publicar conteúdo de `out/`, nunca `.next/`.
- **Export estático:** em rotas de metadados `robots.ts` e `sitemap.ts`, usar `export const dynamic = 'force-static'` quando exigido pelo Next 16. Conferir a geração de `robots.txt`, `sitemap.xml` e todas as páginas; não usar recursos de servidor incompatíveis.
- Para internacionalização, se houver necessidade de SEO por idioma, preferir URLs como `/pt`, `/en`, `/es`, com objetos de tradução tipados, `generateStaticParams` em export estático e `hreflang`/canonical por rota. Não usar só `useState` como estratégia de SEO.
- Antes de entregar, execute `npm run format:check`, `npm run lint`, `npm run typecheck` e `npm run build`. Formate os arquivos alterados e **não ignore falhas do CI** para afirmar que a entrega está pronta.
- Não misturar correções de build com redesign fora do escopo. Não corrigir falha de formatação alterando dependências ou desativando verificações.
- Testar navegação/âncoras, botões, formulário, mobile/notebook, 404 e ausência de erros no console quando houver navegador disponível.

## 6. Projeto de demonstração
- Primeiro entregar somente Home com Header, Hero, conteúdo principal, CTA e Footer. Aprovar layout antes de investir em páginas internas.
- Evitar compromissos sem contrato: backend, catálogos completos, CMS, integrações e traduções técnicas extensas somente quando fizer sentido.
- Links desativados em protótipo devem informar indisponibilidade. Não inventar métricas, parceiros, depoimentos, certificações ou fotos da empresa.
- Reaproveitar componentes entre projetos, mas **nunca** herdar marcas, contatos, paleta ou textos de outro cliente.

## 7. Entrega
Informar objetivamente: o que mudou, quais arquivos, quais comandos foram executados e o que ainda precisa validar. Se não houver ambiente para executar build ou navegador, dizer isso expressamente.

## Prompt curto recomendado
```text
Implemente [alteração] em [componente/seção].
Siga AGENTS.md e preserve os estilos e funcionalidades aprovados.
Valide principalmente 1366×728 e mobile. Rode format:check, lint, typecheck e build; reporte resultados.
```
