# AGENTS.md — Padrão reutilizável de projetos institucionais Next.js

> **Finalidade:** instruções permanentes para Codex e outros agentes que implementam sites institucionais. Este arquivo é um template de trabalho, baseado nas práticas verificadas no projeto ELEV Soluções e adaptado para qualquer novo cliente. **Não copie identidade, textos, URLs, dependências ou regras comerciais da ELEV para outros sites.**
>
> **Prioridade:** pedido atual do desenvolvedor > requisitos e código já aprovado no projeto > estas diretrizes > preferências genéricas do agente. Ao haver conflito, explique-o e preserve o comportamento existente até confirmação.

## 1. Modo de trabalho do agente

1. Antes de editar, leia os arquivos impactados, o `package.json`, a configuração do Next.js e o `AGENTS.md`; consulte o `README.md` e documentos de projeto quando relevantes.
2. Identifique componentes e tokens reutilizáveis antes de criar equivalentes. Preserve decisões visuais e funcionais já aprovadas.
3. Trabalhe por etapas pequenas, inspecionáveis e reversíveis. Alteração simples pede solução simples; tarefa complexa pede diagnóstico e planejamento antes da edição.
4. Não refatore arquivos alheios ao pedido, não altere rotas, SEO, textos, imagens ou estilos globais por iniciativa própria.
5. **Não invente** contatos, endereços, marcas, depoimentos, produtos, números, certificações, resultados, datas ou URLs. Use dados confirmados; sinalize placeholders em protótipos e nunca os apresente como informações reais.
6. Não instale pacotes, crie infraestrutura, introduza CMS ou mude estratégia de renderização sem necessidade demonstrada.
7. Leia a documentação da versão do Next.js efetivamente instalada. Se `next dev` acrescentar um bloco gerenciado `nextjs-agent-rules` a este arquivo, **preserve-o** e obedeça a suas instruções específicas de versão.
8. Ao concluir: descreva arquivos modificados, decisões, validações executadas e pendências. Não afirme que rodou testes sem tê-los executado.

## 2. Stack e princípios fundamentais

- Next.js App Router, React, TypeScript e npm.
- SCSS Modules como padrão de estilos; SCSS global apenas para reset, fontes, tokens e estilos genuinamente globais.
- `next/link` para navegação interna, `next/image` ou `<picture>` cuidadosamente implementado para imagens; Metadata API nativa.
- ESLint, tipagem forte, HTML semântico e acessibilidade desde a primeira entrega.
- **Server Components por padrão.** `"use client"` somente nos componentes que necessitam de estado, efeitos, observers, browser APIs ou manipulação interativa.
- Framer Motion é opcional, não obrigatório. Se instalado, centralize animações no componente global `Animation`.
- Priorize velocidade mobile, clareza visual, estabilidade de layout, SEO e facilidade de manutenção antes de efeitos decorativos.
- Confirme se a hospedagem exige `output: 'export'`. Exportação estática é uma decisão de deploy, **não** configuração universal: APIs, Server Actions, otimização de imagem e rotas dinâmicas dependem dela.

## 3. Estrutura preferencial de diretórios

O agrupamento **`(site)`** é um *route group* do Next.js: organiza o projeto, mas **não** aparece na URL. Não usar `site` sem parênteses quando essa pasta não deve aparecer na rota.

```text
src/
  app/
    (site)/
      sobre/
        page.tsx
        components/               # componentes exclusivos desta rota
      produtos/
        page.tsx
        components/
      contato/
        page.tsx
      orcamento/
        page.tsx
    components/
      Animation/
        index.tsx
        Animation.module.scss
        types.ts
      Layout/
        Header/
          Header.tsx
          HeaderTop.tsx
          HeaderMain.tsx
          Header.module.scss
          Menu/                    # menu desktop/mobile se necessário
        Footer/
          Footer.tsx
          Footer.module.scss
      PageHeroSection/
        PageHeroSection.tsx
        PageHeroSection.module.scss
      Hero/                        # hero principal da Home (diferente do PageHero)
      CustomButton/
      FloatingWhatsApp/
      SiteVersionLogger.tsx
    styles/
      _variables.scss
      _mixins.scss                 # somente se houver repetição real
    globals.scss
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
    siteVersion.ts
    siteEnvironment.ts
  config/
    site.ts
  data/
    contactData.ts
    navigationData.ts
    productsData.ts                # somente se houver catálogo
  lib/
    organizationJsonLd.ts         # somente se houver dados confirmados
public/
  images/
    hero/
    page-hero/
    products/
    institutional/
  og/
```

**Regras de organização:**
- `src/app/page.tsx` = Home, mantida fina; componentes da Home podem ficar em `src/app/(site)/components/` ou `src/app/components/Home/` se esse padrão for escolhido no início e documentado. Não misture convenções sem necessidade.
- O que pertence a **uma única página** deve ficar perto dessa rota, preferencialmente em `src/app/(site)/nome-da-rota/components/`.
- O que é **realmente reutilizável** fica em `src/app/components/`; não promova componentes por antecipação.
- Header e Footer ficam sempre sob `components/Layout/`.
- Animações globais sob `components/Animation/`; não duplique wrappers de fade/slide/reveal.
- Dados comerciais reutilizados (produtos, contatos, menus) ficam em `src/data/`; configurações transversais ficam em `src/config/`.
- Componentes e seus `.module.scss` devem permanecer juntos. Consistência de nome: `Component.tsx` + `Component.module.scss` (use `styles.module.scss` somente onde o projeto já adota isso).
- Evite `page.tsx` gigantes: cada seção complexa pode ser componente próprio; não crie componentes para simples marcação sem ganho de legibilidade.

## 4. Design system, CSS e SCSS

**SCSS Modules são obrigatórios por padrão para todos os componentes visuais.**

```scss
@use '@/app/styles/variables' as *;
```

```tsx
import styles from './Component.module.scss';
```

- Defina cores, tipografia-base, espaçamentos recorrentes, largura de container, bordas, sombras e breakpoints em tokens reutilizáveis. Cada cliente define sua própria paleta; não reutilize o laranja da ELEV inadvertidamente.
- Exemplo de tokens configuráveis: `$primary`, `$primary-hover`, `$secondary`, `$text-primary`, `$text-secondary`, `$background`, `$border-color`, `$container-width`, `$whatsapp`, `$transition-default`.
- Mantenha um **container horizontal consistente** em Header, Hero, seções e Footer; largura de referência configurável (ex.: ~1300 px), com `padding-inline` responsivo.
- Faça estilos locais no `.module.scss`; não altere `globals.scss` para corrigir um único card ou uma única página.
- Use `clamp()` com moderação para tipografia e espaçamentos responsivos, `minmax()` e `grid` para grids fluidos; evite larguras fixas que causam overflow.
- Faça variações com props/classes explícitas em componentes globais, sem condicionais por nome de cliente/rota embutidas no componente.
- Evite `!important`, seletores globais invasivos, estilos inline repetidos, valores mágicos e grandes blocos duplicados de media queries.
- Altura do Header sticky/fixo deve ser refletida numa variável como `--site-header-height`; sincronize seus estados normal/compacto e confira se o Hero não fica oculto sob o Header. Evite compensação duplicada de margem + padding.
- Use hover, focus-visible e active; respeite `prefers-reduced-motion` e `prefers-reduced-transparency` quando necessário.
- Use `overflow-x: hidden` apenas quando justificado, **não** para esconder bugs de responsividade.

## 5. Responsividade: critérios de aprovação

Testar visualmente e funcionalmente, quando houver ambiente de navegação:

| Cenário | Viewport de referência |
|---|---|
| Desktop amplo | 1920 × 1080 |
| Desktop médio | 1440 × 900 |
| Notebook | 1366 × 768 e **1366 × 641** |
| Tablet | 1024 × 768 e 768 × 1024 |
| Mobile | 360, 375, 390 e 430 px de largura |

- Notebook é cenário prioritário: considere a **altura útil**, não apenas a largura. Compacte seções, CTAs, cards e espaçamentos quando necessário; use media queries por `max-height` se fizer sentido.
- Nunca introduza rolagem horizontal; menus, modais, cards, grids e carrosséis precisam caber na viewport.
- Em mobile: fontes legíveis, controles tocáveis (alvo próximo de 44 × 44 px), espaçamento confortável sem desperdício vertical; botões e ícones acessíveis por teclado.
- Menu mobile abre/fecha de forma previsível, permite navegação e fechamento, não bloqueia scroll indevidamente e não deixa overlay ativo ao mudar de rota.
- Imagens devem preservar o assunto principal em todos os recortes; não assuma que desktop cortado com `object-fit: cover` resolverá mobile.
- Componentes com vídeo/modal: garantir proporção adequada, limite baseado em viewport (`dvh` quando aplicável), fechar/teclado/foco e scroll do conteúdo.

## 6. Hero da Home e PageHeroSection das páginas internas

**Diferencie dois usos:**
- `Hero/`: primeira tela da Home, livre para composição comercial específica (CTA, imagem de fundo, parallax opcional).
- `PageHeroSection/`: componente global e padronizado para páginas internas (título, subtítulo, imagem desktop, imagem mobile, overlay e espaços opcionais).

### Imagens e dimensões

- Planeje **artes distintas para desktop e mobile**, com mesmo conceito visual e enquadramentos próprios.
- Referências de briefing, não medidas obrigatórias: Home desktop ~`1920×860` a `1920×1000`; PageHero panorâmico ~`1920×600`; mobile ~`768×1152`. Dimensões finais dependem da composição aprovada e das alturas reais.
- Suporte imagem desktop e mobile como props (`image`, `mobileImage`, `imageAlt`); defina `sizes`, proporção/altura da seção, posição focal e overlay por variante.
- Priorize WebP/AVIF otimizados e dimensões reais; arquivos devem ter nomes claros, sem embutir título/logo/CTA na imagem quando esses elementos podem ser HTML.
- Use `<picture><source media="(max-width: 768px)" ...>` quando art direction entre desktop/mobile exigir fontes independentes. Se `next/image` atender com imagens responsivas e otimização disponível, prefira a API nativa. **Não descarregue as duas imagens** por implementação duplicada descuidada.
- Hero acima da dobra é candidato a LCP: **não usar lazy loading**. Configure prioridade/preload conforme API instalada e necessidade comprovada; preloads desktop/mobile precisam de `media` mutuamente exclusivo. Não usar `priority`/`preload` em todos os cards.
- Se um efeito de entrada usar uma imagem de backdrop e outra animada, verifique se a duplicação de `<img>` não causa downloads/renderização desnecessários e nem atributos de acessibilidade duplicados. Prefira uma camada visual quando possível.
- `alt` descritivo para imagem informativa, `alt=""` para imagem puramente decorativa; nunca invente descrições corporativas.

### Efeitos de Hero

- Animação da imagem da direita para a esquerda pode ser usada como padrão visual **somente se aprovada** para o projeto; aplicar movimento sutil, sem flash de fundo cinza antes da entrada.
- Garanta fundo/overlay coerente desde o primeiro frame; o conteúdo deve permanecer legível mesmo antes da animação.
- Parallax **não é obrigatório**. Se for utilizado, comece com solução leve que não cause deslocamentos, falhas mobile ou impacto em LCP. `background-attachment: fixed` tem limitações em dispositivos móveis: desative ou substitua por uma alternativa estática nesses dispositivos.
- Não vincule a estrutura do Hero a dimensões fixas sem testar notebook e mobile.

## 7. Animações globais

- Criar/reutilizar `<Animation>` global, inspirado no padrão da ELEV, com variantes `fade`, `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight` e `zoom`, e parâmetros como `delay`, `duration`, `distance`, `amount` e `className`.
- Se Framer Motion já estiver instalado, concentrar `motion` e lógica de viewport nesse componente. **Não importar Framer Motion em cada seção** sem motivo.
- Nas animações horizontais, verificar overflow e, se necessário, usar `fadeUp` no mobile. Preservar conteúdo visível quando motion está desativado.
- Priorizar transform/opacity e animações discretas; evitar movimento constante, efeitos que causam CLS e JS para animações resolvíveis por CSS.
- Não modificar animação global para solucionar um caso isolado sem auditar outros consumidores; criar variante específica quando necessário.

## 8. SEO desde a arquitetura, não no final

- Cada rota pública deve possuir conteúdo útil e semântico e **um H1 principal**; hierarquia H2/H3 coerente, `main`, `nav`, `header`, `footer`, labels e links descritivos.
- Usar `Metadata` / `generateMetadata` nativos: título específico, `description` humana e não duplicada, canonical absoluto e correto, `metadataBase`, Open Graph, Twitter quando fizer sentido, `robots` por ambiente.
- Centralizar nome, domínio canônico, URL-base, perfil social, defaults e helpers de URL em `src/config/site.ts`.
- Definir imagem Open Graph própria (referência comum `1200×630`) para Home e páginas principais; não prometer que existe se não foi produzida.
- Implementar `robots.ts` e `sitemap.ts` e incluir **somente rotas públicas realmente existentes e indexáveis**. Não listar páginas fictícias ou `#` como destino.
- Homologação/protótipo: `noindex, nofollow` por ambiente e, idealmente, autenticação/controle de acesso; **`robots.txt` sozinho não é proteção de acesso e não garante desindexação**. Para exportação estática, as flags são resolvidas na build; validar HTML gerado e deploy real.
- Produção: remover `noindex` somente após aprovação, revisão de domínio e conteúdo. O projeto não deve deixar homologação indexável por padrão.
- Usar JSON-LD (`Organization`, `LocalBusiness`, `BreadcrumbList`, `Product`, etc.) **apenas quando dados públicos e verificáveis sustentarem o schema**; não fabricar avaliações, preços, endereço nem disponibilidade.
- Links internos via `next/link`, URL amigável, navegação funcional e breadcrumbs quando acrescentarem descoberta. Tratar 404 corretamente conforme modalidade de deploy.
- Dar atenção a SEO local quando relevante, mas não criar páginas artificiais de cidades apenas para ranquear. Endereço, unidades, áreas atendidas e contatos devem ser confirmados.
- URLs de imagens, canonical, sitemap e Open Graph devem ser validados no domínio final.

## 9. Performance e Core Web Vitals (principalmente mobile)

Objetivo: boa experiência real, não só nota de laboratório. Medir **LCP, INP e CLS** em produção/homologação antes de alegar ganhos. Referências de orientação: LCP ≤ 2,5 s; INP ≤ 200 ms; CLS ≤ 0,1 no percentil 75.

- O elemento LCP (frequentemente Hero) não deve ser lazy; reserve suas dimensões/altura. Evite imagens enormes sem compressão e overlays custosos.
- Use import estático/`next/image` quando viável, `sizes` adequados e lazy loading para imagens abaixo da dobra.
- Fonte local ou `next/font` com configuração adequada; evite várias famílias/pesos e arquivos desnecessários.
- Carregue scripts terceiros (GTM, Maps, vídeos, Instagram, chat) somente quando justificados. Iframes abaixo da dobra devem ser lazy e, quando apropriado, depender do consentimento necessário.
- Evite Client Components de página inteira e hidratação sem necessidade; carregue recursos pesados sob demanda (modal, mapa, embeds) quando possível.
- Implemente componentes com alturas/proporções previsíveis; evite reflow de cabeçalho, banner, imagens, carrosséis e banners de cookies.
- Vídeos em background e parallax JS são exceções que exigem justificativa e teste mobile.
- Verifique tamanho do bundle, waterfalls de recursos, caching do host/CDN, otimização de imagens e console sem erros.
- Não aplique `preload` indiscriminado: priorizar recursos essenciais e testar se há concorrência de downloads.
- Verifique que `output: 'export'` + `images.unoptimized` modifica a estratégia de imagem: a otimização precisa ocorrer no build/arquivos ou em serviço externo, conforme deploy.

## 10. Header, Footer, botões e contatos

- Header e Footer são compartilhados e devem ser parametrizados por dados do projeto, não conter dados fixos de outro cliente.
- Header pode ter `HeaderTop` e `HeaderMain` quando o layout aprovado pede faixa de contatos e navegação. Estados sticky/compacto exigem compensação de altura e teste de acessibilidade.
- Itens de navegação em `navigationData.ts`/`menuData.ts`. Menu completo pode ser planejado, mas não envie usuários a páginas inexistentes; placeholders em demo devem ser identificados e não indexados.
- `CustomButton` global com variantes claras; preservar `Link` vs `button` conforme ação. Hover não deve ser a única indicação interativa.
- `FloatingWhatsApp` com número em fonte única (`contactData.ts`), link `https://wa.me/<DDI><DDD><numero>`, rótulo acessível e posição que não cubra formulários ou o consentimento.
- Valores de telefone/e-mail só podem ser publicados como reais após validação. Placeholders são aceitos **somente em protótipo interno**, marcados como não confirmados e sem `mailto:`/`tel:` ativos para endereços fictícios.
- Header e Footer devem poder variar no mobile sem duplicar conteúdo inacessível ou introduzir links duplicados sem necessidade.

## 11. Dados, formulários, segurança e privacidade

- Não misturar dados de produtos, unidades e contatos dentro dos componentes de apresentação. Use tipos TypeScript e arquivos de dados centrais; evitar duplicação entre cards, formulários e SEO.
- Formulários: validação client-side útil + validação server-side/serviço de recebimento real quando houver envio; estados de loading/sucesso/erro; acessibilidade e prevenção de spam.
- Em exportação estática, **não prometa `route handlers`, Server Actions ou recebimento de arquivos na mesma hospedagem**. Avaliar endpoint externo/servidor separado antes da funcionalidade real.
- LGPD: solicitar somente dados necessários, informar finalidade e tratamento; em currículos/uploads, revisar armazenamento, destinatários, retenção e segurança.
- Não inserir segredos em variáveis `NEXT_PUBLIC_*`, componentes client ou repositório.
- Analytics, cookies e marketing somente após avaliação da base legal e regras de consentimento aplicáveis; não carregar GTM antes do consentimento quando essa for a política definida.
- Não adicionar dados estruturados que impliquem certificações, garantia, reputação ou vendas não comprovadas.

## 12. Versionamento do site

A fonte única da versão é **`package.json`**, campo `version`, em formato SemVer (`MAJOR.MINOR.PATCH`, ex.: `0.1.0`). Não manter versão duplicada manualmente em outros arquivos.

`src/app/siteVersion.ts`:

```ts
import packageJson from '../../package.json';
export const siteVersion = packageJson.version;
```

Criar componente client `SiteVersionLogger` que receba `version`, use `useEffect` e registre uma única vez por carregamento/versão, com mensagem padronizada:

```text
Nome do Site | versão 0.1.0
```

- Usar identificador genérico de deduplicação ou escopo do site, **não** `window.__elevSiteVersionLogged` em projetos novos.
- Montar `<SiteVersionLogger version={siteVersion} />` no `src/app/layout.tsx` sem transformar `RootLayout` em Client Component.
- Atualizar `package.json` em mudanças de release conforme escopo (patch/minor/major); manter lockfile consistente. **Não alterar versão a cada pequena edição sem pedido ou convenção de release definida.**
- Se o log não for desejado em produção, controlar explicitamente por configuração; não emitir logs com dados sensíveis.

## 13. Protótipos comerciais antes da contratação

- Entregar primeiro Home responsiva com Header, Hero, seções essenciais, CTA, Footer e WhatsApp, **sem criar todas as páginas** antes da aprovação.
- Estrutura e componentes devem ser aproveitáveis em produção, sem burocracia prematura de CMS, backend, analytics e integrações.
- Formulários em demo devem indicar que não enviam dados. Não induzir o visitante a acreditar que uma cotação foi realmente solicitada.
- Imagens de demonstração não devem ser apresentadas como fotografias reais da empresa; logotipo oficial requer uso permitido pelo contexto comercial e substituição quando necessário.
- Homologação `noindex` e, se possível, protegida; usar URL própria de teste, nunca substituir site atual sem autorização.
- Não implementar rotas e links quebrados apenas para fazer o menu parecer completo.

## 14. Rotina de validação e entrega

Antes de concluir mudanças relevantes:

1. Conferir o diff e o escopo; garantir que nenhum componente global foi quebrado por correção local.
2. Executar scripts **existentes** no `package.json`, tipicamente `npm run lint`, `npx tsc --noEmit` quando aplicável e `npm run build` para rotas, componentes, tipos e configuração. Não criar scripts apenas para reportar sucesso.
3. Inspecionar páginas e estados modificados em desktop, notebook de baixa altura e mobile; testar teclado, foco, menu, links, CTA e ausência de rolagem horizontal.
4. Conferir source/HTML gerado: title, meta description, canonical, OG, robots, sitemap e JSON-LD quando presentes; verificar se homologação não está indexável.
5. Para performance, medir LCP/CLS/INP quando viável; distinguir medições reais de suposições e identificar recursos pesados.
6. Para deploy estático, confirmar geração de todas as rotas, recursos públicos, fallback/404 e funcionamento na hospedagem escolhida.
7. Relatar **o que mudou, arquivos alterados, comandos executados, resultados, riscos e pendências**. Erros preexistentes não devem ser atribuídos automaticamente à alteração.

## 15. Checklist de início de um novo projeto

- [ ] Definir nome do projeto, domínio canônico, cliente e ambiente de homologação.
- [ ] Validar stack e estratégia de deploy (`export` estático ou servidor).
- [ ] Criar `src/app/(site)/`, `components/Layout/`, `Animation/`, `Hero/`, `PageHeroSection/` e SCSS Modules.
- [ ] Criar paleta/tokens exclusivos do cliente e container global.
- [ ] Centralizar navegação, contato, metadados, URL-base e dados reais.
- [ ] Configurar `siteVersion.ts`, `SiteVersionLogger` e `package.json`.
- [ ] Definir art direction de Hero desktop/mobile, LCP e preload correto.
- [ ] Configurar SEO base, robots, sitemap e `noindex` na homologação.
- [ ] Implementar Header + Hero e aprovar notebook/mobile antes de avançar.
- [ ] Só criar as demais rotas e formulários após validar a necessidade.

---

### Origem e adaptação

Padrões confirmados no repositório privado `ricardo-borges13/elev-solucoes-next.js` (branch `main`): organização em `src/app/(site)/`, `src/app/components/Layout/{Header,Footer}`, `Animation`, `PageHeroSection`, `Hero`, SCSS com `@use '@/app/styles/variables' as *`, imagens mobile/desktop do PageHero, `siteVersion.ts`, `SiteVersionLogger.tsx`, Metadata API, `robots.ts`, `sitemap.ts`, controle de ambiente e exportação estática. Regras acima sobre componentes locais, prioridade mobile, escopo de alterações, SEO e validação também refletem o `AGENTS.md` existente da ELEV.

**Este documento não é cópia literal da ELEV:** remove regras específicas de soluções/representações, melhora a separação entre convenções reutilizáveis e decisões por cliente e inclui cuidados adicionais de SEO, acessibilidade, desempenho e protótipos. Sempre conferir APIs e requisitos da versão instalada antes de implementar.
