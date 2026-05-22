# Christmas Dessert Voting — Product Vision

## 📖 Sobre o Produto

Plataforma social para criar **desafios de sobremesas entre amigos**. Qualquer pessoa pode criar uma votação, compartilhar um link único, e os participantes inscrevem seus doces para competir em categorias. É tipo um "concurso de bolos" digital.

---

## 🧭 Experiência do Usuário (UX Flow)

### Home Page (Pública)
- Header com navegação: **Votações | Doces | Login/Cadastrar** (se deslogado) ou **Perfil** (se logado)
- Seção institucional explicando o produto:
  - "Crie desafios de sobremesas com os amigos"
  - "Compartilhe um link e veja quem faz a melhor sobremesa"
  - "Votação anônima por categorias"
- Footer institucional com links e informação
- **Carrossel de votações públicas rolando** (futuro)

### Página de Votações (Semi-pública)
- Se logado: lista as votações que o usuário **criou ou participa**
- Botão "Criar Nova Votação"
- Se clicar em "Criar" sem estar logado → modal sugerindo login
- Cada votação mostra: nome, status (aberta/fechada), participantes, link único

### Página de Criação de Votação (Autenticada)
- Formulário com:
  - Nome da votação
  - Descrição (opcional)
  - Visibilidade: **Pública** ou **Privada**
  - Data de encerramento
  - Categorias (ex: "Melhor Sabor", "Melhor Apresentação", "Mais Criativa")
- Botão "Criar" → redireciona para a página da votação

### Página da Votação (Pública — via link único)
- Detalhes: nome, descrição, criador, status, participantes
- **Link único** fixo no topo (ex: `app.com/vote/abc123`) — copiável
- **Fase atual** determina o que aparece:
  - **Inscrição**: formulário pra adicionar doces + lista dos inscritos
  - **Votação**: categorias + doces pra votar
  - **Resultados**: ranking por categoria + geral
- Botões de editar/excluir (apenas criador)
- Se privada: só entra quem tem o link
- Se pública: aparece na home

### Página de Doces (Pública)
- Lista/doces cadastrados no sistema
- Cada doce: nome, descrição, foto (futuro), criador
- Semelhante à página de votações no layout

### Página de Perfil (Autenticada)
- Informações do usuário: nome, email, bio (futuro), foto (futuro)
- Lista de votações que criou
- Editar informações

---

## 🎨 Identidade Visual — Paleta de Cores

Tema: **sobremesas, donuts, doceria artesanal** — tons pasteis suaves, aconchegantes.

```
🎨 PALETA CHRISTMAS DESSERT VOTING

Primárias
  #F4D0D9  ── Rose Bloom     (rosa doce suave)     → backgrounds, cards
  #F4A5B5  ── Strawberry      (morango cremoso)     → botões primários, destaques
  #B5B8A3  ── Sage Olive      (oliva sálvia suave)  → headers, footers, bordas
  #FFF8F0  ── Vanilla Cream   (creme vanila)        → fundo de página

Secundárias
  #E8D5C4  ── Caramel Latte   (caramelo claro)      → hover, cartões
  #C9B1C9  ── Lavender Mousse (lavanda suave)       → badges, tags
  #D45769  ── Cherry Pop      (cereja vibrante)     → CTAs, ícones importantes

Texto
  #3D2B1F  ── Dark Chocolate  (chocolate amargo)     → texto principal
  #7A5C43  ── Milk Chocolate  (chocolate ao leite)   → texto secundário
  #FFFFFF  ── Whipped Cream   (chantilly)            → texto sobre cores escuras

Acentos (uso raro)
  #FFD700  ── Honey Gold      (mel dourado)          → estrelas, badges "winner"

Tipografia
  Font: Inter (sans-serif) — limpa, legível, moderna
  Headings: bold, Dark Chocolate (#3D2B1F)
  Body: regular, Milk Chocolate (#7A5C43)
```

### Tokens de Design (Tailwind)

```js
// tailwind.config.js
colors: {
  'rose':      '#F4D0D9',
  'strawberry':'#F4A5B5',
  'sage':      '#B5B8A3',
  'vanilla':   '#FFF8F0',
  'caramel':   '#E8D5C4',
  'lavender':  '#C9B1C9',
  'cherry':    '#D45769',
  'dark-choc': '#3D2B1F',
  'milk-choc': '#7A5C43',
  'honey':     '#FFD700',
}
```

---

## 🔧 Mudanças Necessárias no Backend

| # | O quê | Prioridade |
|---|-------|:----------:|
| 1 | Adicionar campo `link_hash` (UUID único) na tabela `voting` | P1 |
| 2 | Adicionar campo `visibility` (PUBLIC/PRIVATE) na tabela `voting` | P1 |
| 3 | Adicionar campo `categories` (array de strings) na tabela `voting` | P1 |
| 4 | Endpoint GET `/voting/{link_hash}` — acessar votação por link | P1 |
| 5 | Separar fases: INSCRIÇÃO → VOTAÇÃO → RESULTADOS (campo `phase` no voting) | P1 |
| 6 | Ao criar votação, gerar link_hash automaticamente | P1 |
| 7 | Votações públicas aparecem na home (endpoint GET /voting/public) | P2 |
| 8 | Foto do perfil do usuário (futuro) | P3 |
| 9 | Bio do usuário (futuro) | P3 |

---

## 📋 Roadmap

### Fase 1 — Agora (MVP 2.0)
- Refatorar frontend com a nova paleta e layout
- Backend: link_hash + visibility + categories + phase
- Integrar frontend com backend real (não mock)
- Testar fluxo completo: criar votação → compartilhar link → inscrever → votar → resultados

### Fase 2 — Próximo
- Votações públicas na home
- Upload de foto do doce
- Categorias customizáveis por votação

### Fase 3 — Futuro
- Perfil com foto e bio
- Notificações
- Ranking global de doces
- Moderação de conteúdo
