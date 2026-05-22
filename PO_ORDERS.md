# PO_ORDERS — Frontend (Next.js)

## ⚠️ REGRA CRÍTICA — Validar aplicação rodando

**ANTES de abrir qualquer PR, você DEVE:**

1. `npm run lint` ✅
2. `npm run typecheck` ✅
3. `npm test` ✅
4. `npm run build` ✅
5. Rodar `npm run dev` e validar que a página abre em `http://localhost:3000`
6. **Parar o dev server após validar (Ctrl+C)**

**Se o build falhar, NÃO ABRE PR.**

## Demais regras

### 0. NUNCA fazer push direto para master
Master é **read-only**. Toda alteração DEVE passar por branch + PR.

### 1. Sempre criar branch
Padrão: `<issue-number>-<kebab-case-title>`

### 2. Commits seguem padrão
`<emoji> <tipo>: <descrição>`

### 3. PR obrigatório
- Abrir PR para `master` com `Closes #<issue>`
- Build validado

### 4. Reportar ao PO
- Ao iniciar task → mover card para **In Progress**
- Ao abrir PR → mover card para **In Review**
- Terminar → esperar novas ordens

---

## ✅ Login corrigido
PR #29 já corrigiu `email` → `identifier`. Swagger agora disponível.

## 🎯 Tarefa Atual — Redesign Frontend (P1)

**Tarefa:** Refatorar layout e identidade visual conforme PRODUCT_VISION.md
**Prioridade:** P1
**Size:** L
**Branch:** `feat-redesign-palette-layout`

### Contexto
O frontend atual não reflete a visão do produto. Precisamos refatorar seguindo o documento [PRODUCT_VISION.md](./PRODUCT_VISION.md), que define:
- Paleta de cores: `#F4D0D9`, `#F4A5B5`, `#B5B8A3`, `#FFF8F0`, `#E8D5C4`, `#C9B1C9`, `#D45769`, `#3D2B1F`, `#7A5C43`
- Estrutura de páginas: Home institucional → Votações → Doces → Perfil
- Header com navegação + estado de login
- Footer institucional
- UX flow completo (criar votação → link único → fases)

### Instruções

1. **Configurar paleta no Tailwind** com os tokens do PRODUCT_VISION.md

2. **Criar layout global** (app/layout.tsx):
   - Header: logo, nav (Votações, Doces), login/perfil
   - Footer institucional
   - Wrapper com fundo Vanilla Cream (`#FFF8F0`)

3. **Refatorar Home Page** (`app/page.tsx`):
   - Seção institucional explicando o produto
   - "Crie desafios de sobremesas com os amigos"
   - Botão CTA "Começar Agora"

4. **Refatorar páginas existentes** com a nova paleta:
   - Login/Register
   - Votações list/criação/detalhe
   - Doces list/criação/detalhe
   - Perfil

5. **Garantir responsividade** (mobile-first)

6. **Validação:**
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`

7. **PR** com screenshots das páginas refatoradas

---

## Bloqueios

*(deixe aqui se encontrar algo que te impede)*
