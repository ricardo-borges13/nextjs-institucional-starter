# AGENTS.md — Sites institucionais Next.js

Estas regras valem para Codex e agentes de código.
O pedido atual e o código aprovado têm prioridade.
Não reutilize identidade nem dados de outro cliente.

## 1. Fluxo de trabalho

- Leia os arquivos afetados e as configurações antes de editar.
- Altere só o necessário; reutilize componentes e mantenha o escopo.
- Não invente contatos, produtos, métricas, imagens ou certificações.
- Não instale pacotes nem mude hospedagem sem necessidade.
- Informe arquivos, testes executados, resultados e pendências.
- Preserve eventuais regras gerenciadas pelo Next.js neste arquivo.

## 2. Stack e estrutura

- Next.js App Router, React, TypeScript estrito, npm e SCSS Modules.
- Server Components por padrão; use client só quando necessário.
- Componentes comuns: `src/app/components/`.
- Componentes exclusivos: próximos da página correspondente.
- Header e Footer: `components/Layout/`.
- Animações: reutilize `components/Animation/`.
- Dados de menus, produtos e contatos: `src/data/`.
- Metadados e configuração institucional: `src/config/site.ts`.
- Cada componente visual possui seu próprio `.module.scss`.
- Defina tokens SCSS por cliente antes de usá-los nos componentes.
- Não copie textos, cores, marcas ou URLs de outro projeto.

## 3. Responsividade e UX

- **Notebook prioritário: 1366 × 728**; validar também 1366 × 641.
- Testar desktop 1920 × 1080 e 1440 × 900.
- Testar tablet 768 × 1024 e 1024 × 768.
- Testar mobile nas larguras 360, 375, 390 e 430 px.
- Compactar Hero, títulos, cards e espaçamentos em notebooks.
- Verificar a altura útil, não apenas a largura da tela.
- Evitar rolagem horizontal, elementos cortados e espaços vazios grandes.
- Imagens desktop/mobile devem preservar o assunto principal.
- Botões com alvo tocável adequado, foco visível e semântica correta.
- Respeitar `prefers-reduced-motion`.
- Não aplicar lazy loading à imagem principal do Hero.
- Evitar animações duplicadas e parallax pesado no mobile.

## 4. Rotas e links

- Usar `next/link` em links internos e `button` para ações.
- `typedRoutes: true` está ativo no `next.config.ts`.
- Menus dinâmicos devem usar `Route` de `next` como tipo de `href`.
- Evitar o tipo amplo `href?: \`/${string}\`` (erro TS2769).
- Não criar links para páginas inexistentes.
- Em protótipos, indicar funcionalidades indisponíveis claramente.

## 5. SEO e dados reais

- Configuração central: `src/config/site.ts`.
- Usar `createPageMetadata` nas novas páginas.
- Homologação é `noindex` por padrão, inclusive para Googlebot.
- Indexação exige ambiente de produção e domínio HTTPS aprovado.
- Usar títulos, canonical, descrição e H1 específicos por página.
- Sitemap contém somente URLs reais e publicáveis.
- Nunca inventar dados para JSON-LD ou resultados comerciais.
- Formulários demonstrativos não devem simular envio.
- Integrar envio real somente com validação, segurança e privacidade.

## 6. Build e hospedagem

- O starter usa servidor Next.js por padrão.
- Para hospedagem estática, configurar `output: 'export'`.
- Avaliar `trailingSlash` e `images.unoptimized` nesse modo.
- Na exportação, publicar `out/` e conferir as rotas e o 404.
- `robots.ts` e `sitemap.ts` usam `dynamic = 'force-static'`.
- Export estático não suporta endpoints/ações que exigem servidor.
- Sites multilíngues para SEO: rotas `/pt`, `/en` e `/es`.
- Usar traduções tipadas, canonical e `hreflang` por idioma.
- Em export estático, gerar parâmetros de rota durante o build.

## 7. Validação obrigatória

Execute sempre que possível, nesta ordem:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

- Corrija falhas de Prettier em vez de ignorá-las.
- Revise responsividade, navegação, formulários e console.
- Não declare que passou sem executar efetivamente.
- Em tarefas grandes, validar a cada etapa em vez de acumular erros.

## 8. Demonstrações comerciais

- Priorize Home responsiva e funcional antes de páginas internas.
- Não construir CMS, catálogos inteiros ou backend sem necessidade.
- Manter demonstrações não indexáveis e identificadas como protótipo.
- Reutilize componentes, mas nunca dados de clientes anteriores.

## Exemplo de prompt curto

```text
Implemente [alteração] em [seção].
Siga AGENTS.md e preserve o que já foi aprovado.
Teste 1366×728, mobile e os scripts de validação.
Informe mudanças, resultados e pendências.
```
