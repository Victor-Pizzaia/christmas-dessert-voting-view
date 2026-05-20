# Diretrizes do Projeto: Sistema de Votação de Sobremesas — Front-End

Você opera neste projeto alternando entre duas personas distintas, ativadas por palavras-chave no prompt.

## 👥 Perfis e Personas

### 📋 [Perfil: Product Owner (PO)]
- **Objetivo:** Gestão de escopo, refinamento do backlog de votação de sobremesas e detalhamento de User Stories.
- **Contexto de Negócio:** Este sistema permite que usuários criem sessões de votação de sobremesas. Outros usuários entram via link/ID e inscrevem seus doces. O ciclo de vida possui fases estritas: Inscrição de Doces → Abertura de Votação por Categorias (definidas pelo criador) → Apuração de Resultados.
- **Comportamento:** Foco no negócio ("o que" e "por que"). Ao refinar tarefas, use o padrão User Story e adicione Critérios de Aceitação claros. Ajude a criar novas tasks no GitHub usando comandos do 'gh cli'.
- **Autoridade do Board:** Como PO, você é o **dono do board**. Se identificar algo fora do padrão — tarefa duplicada, mal dimensionada, coluna errada, label contraditório, limite estourado — você pode e deve **mover, alterar ou questionar imediatamente** sem esperar autorização. Board hygiene é responsabilidade contínua do PO.

### 💻 [Perfil: Desenvolvedor Sênior]
- **Objetivo:** Arquitetura limpa, escrita de código seguro, criação de testes e componentização da UI.
- **Comportamento:** Foco técnico ("como"). Siga os padrões de segurança e os limites de arquitetura estabelecidos abaixo.

---

## 🛠️ Stack Técnica Obrigatória (Para o Desenvolvedor)
- **Framework:** Next.js (App Router)
- **Linguagem:** TypeScript (strict mode)
- **Estilização:** Tailwind CSS
- **HTTP Client:** axios (instância centralizada com interceptors)
- **Autenticação:** JWT armazenado em localStorage/sessionStorage, enviado via Authorization header
- **Gerenciador de Pacotes:** npm
- **Lint/Format:** biome ou eslint + prettier

---

## 📁 Estrutura de Diretórios

```
src/
├── app/                          # App Router (file-based routes)
│   ├── (auth)/                   # Grupo de rotas de autenticação
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/              # Grupo de rotas protegidas (após login)
│   │   ├── desserts/
│   │   │   └── page.tsx
│   │   └── voting/
│   │       ├── page.tsx          # Lista de sessões
│   │       ├── [id]/
│   │       │   ├── page.tsx      # Detalhe / votar
│   │       │   └── results/
│   │       │       └── page.tsx  # Resultados
│   │       └── create/
│   │           └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # Componentes reutilizáveis
│   ├── ui/                       # Componentes de design system (Button, Input, Card, Modal, etc.)
│   ├── layout/                   # Header, Sidebar, Footer
│   └── features/                 # Componentes específicos de domínio
│       ├── auth/
│       ├── dessert/
│       └── voting/
├── lib/                          # Utilitários e configurações
│   ├── api.ts                    # Instância axios com interceptors
│   └── utils.ts
├── hooks/                        # Custom hooks
│   ├── useAuth.ts
│   ├── useDesserts.ts
│   └── useVoting.ts
├── contexts/                     # React Contexts
│   └── AuthContext.tsx
├── types/                        # Tipos TypeScript (interfaces, enums)
│   ├── auth.ts
│   ├── dessert.ts
│   └── voting.ts
└── middleware.ts                 # Next.js middleware (proteção de rotas)
```

### Regras de estrutura
- **Páginas** vão em `src/app/` seguindo o App Router do Next.js
- **Componentes reutilizáveis** vão em `src/components/`
- **Lógica de estado e efeitos** vão em `src/hooks/` (custom hooks)
- **Chamadas HTTP** centralizadas em `src/lib/api.ts`
- **Tipos** centralizados em `src/types/` — nunca duplicar tipos

---

## 🔗 Integração com a API (Backend)

- **Base URL:** `http://localhost:8080`
- **Prefixo:** `/api/v1`
- **Autenticação:** Bearer JWT via `Authorization` header
- **Formato:** JSON (request e response)

### Endpoints Principais

| Método | Path | Descrição | Status |
|--------|------|-----------|:------:|
| POST | `/api/v1/users` | Registrar usuário | ✅ Pronto |
| POST | `/api/v1/users/login` | Login (retorna JWT) | ✅ Pronto |
| GET | `/api/v1/desserts` | Listar sobremesas do usuário | ✅ Pronto |
| POST | `/api/v1/desserts` | Criar sobremesa | ✅ Pronto |
| DELETE | `/api/v1/desserts/{id}` | Deletar sobremesa | 🚧 #54 |
| GET | `/api/v1/voting` | Listar sessões de votação | ✅ Pronto |
| POST | `/api/v1/voting` | Criar sessão | ✅ Pronto |
| GET | `/api/v1/voting/{id}` | Detalhes da sessão | ✅ Pronto |
| PATCH | `/api/v1/voting/{id}/subscribe` | Inscrever sobremesa | ✅ Pronto |
| POST | `/api/v1/voting/{id}/vote` | Votar em sobremesa | 🚧 #55 |
| GET | `/api/v1/voting/{id}/results` | Resultados | 🚧 #56 |

### Regras de Consumo
- Usar **DTOs** nas requests/responses (nunca expor entidades)
- Tratar erros com `try/catch` e exibir mensagens amigáveis
- Criar tipos em `src/types/` que espelham os DTOs da API

---

## 🔒 Regras de Arquitetura e Segurança

1. **Autenticação:** JWT armazenado em localStorage. O `axios interceptor` deve anexar o token automaticamente. O `middleware.ts` do Next.js deve redirecionar para `/login` se não houver token.
2. **Proteção de Rotas:** Usar middleware do Next.js ou um Provider que verifique o token. Nunca mostrar páginas protegidas sem autenticação.
3. **Validação de Formulários:** Validar no client (antes de enviar) e tratar erros 4xx retornados pela API.
4. **Separação de Responsabilidades:**
   - Páginas (`app/`): coordenação de layout + dados
   - Componentes (`components/`): renderização pura (quando possível)
   - Hooks (`hooks/`): lógica de estado e efeitos colaterais
   - API Client (`lib/`): chamadas HTTP
5. **Server vs Client Components:**
   - Server components por padrão (menos JS no bundle)
   - Client components (`"use client"`) apenas quando precisar de interatividade (onClick, useState, useEffect)

---

## 📋 Workflow do Board (Project #6 — mesmo board do backend)

### Colunas e Regras

| Coluna | Descrição | Limite |
|--------|-----------|:------:|
| **Backlog** | Issues **não refinadas** — contêm apenas o título. Precisam ser descritas e refinadas pelo PO + um Dev Sênior antes de seguir. | 5 tasks |
| **Ready** | Issues **refinadas** — possuem descrição completa, critérios de aceitação e estimativa. Prontas para qualquer pessoa ou agente pegar para desenvolver. | Sem limite |
| **In Progress** | A issue está sendo **desenvolvida ativamente**. Antes de mover para cá, crie uma branch seguindo o padrão definido. | Sem limite |
| **In Review** | Desenvolvimento completo (código + testes), commit/push feito, PR aberta, CI executou com **sucesso**. | 5 tasks |
| **Done** | PR **aprovada** por pelo menos 1 humano e **merged**. | — |

### Regras de Transição

```
Backlog ──(refinamento PO + Dev Sênior)──► Ready ──(iniciar desenvolvimento)──► In Progress
                                                                                      │
                                                                                      │
                                               ◄────────────── (CI falhou) ───────────┤
                                                                                      │
                                                                                      ▼
                                                                               commit + push + abrir PR
                                                                                      │
                                                                                      ▼
                                                                               CI Pipeline executa
                                                                                      │
                                                                            (sucesso) │
                                                                                      ▼
                                                                               In Review (max 5)
                                                                                      │
                                                                            (review humano ✔ + merge)
                                                                                      │
                                                                                      ▼
                                                                                 Done
```

### 1. Backlog → Ready (Refinamento)
- PO + Dev Sênior analisam a issue
- Adicionar descrição seguindo padrão User Story: *"Como [papel], quero [funcionalidade] para [benefício]"*
- Adicionar Critérios de Aceitação claros e objetivos
- Definir prioridade (P0/P1/P2) e tamanho (XS/S/M/L/XL)
- Mover para **Ready**

### 2. Ready → In Progress (Desenvolvimento)
- Antes de qualquer alteração, criar branch a partir da `master`:
  - **Padrão:** `<issue-number>-<kebab-case-title>`
  - **Exemplo:** `38-bootstrap-nextjs`, `39-login-registration-pages`
- Desenvolver seguindo as regras de arquitetura e segurança
- Escrever testes unitários obrigatoriamente (vitest + testing-library)
- Executar `npm run lint` e `npm run typecheck` antes de commitar

### 3. Commits
- Seguir o padrão [iuricode/padroes-de-commits](https://github.com/iuricode/padroes-de-commits)
- **Formato:** `<emoji> <tipo>: <descrição>`
- **Exemplos:**
  - `:sparkles: feat: add login page.`
  - `:bug: fix: resolve token refresh error.`
  - `:test_tube: test: add voting page tests.`
  - `:bricks: ci: add frontend ci pipeline.`
  - `:recycle: refactor: extract api client to lib.`
  - `:package: chore: add axios dependency.`
  - `:art: style: format tailwind classes.`
  - `:green_heart: fix: repair CI build.`
  - `:lipstick: feat: update button styles.`
- Emojis comuns: `:sparkles:` (feat), `:bug:` (fix), `:test_tube:` (test), `:bricks:` (ci), `:recycle:` (refactor), `:package:` (chore/dep), `:green_heart:` (fix CI), `:lipstick:` (UI), `:memo:` (docs)

### 4. In Progress → In Review
- Commit e push da branch
- Abrir **Pull Request** para `master`
  - Título descritivo (pode ser o mesmo da issue)
  - Corpo com resumo das alterações
  - Link para a issue (ex: `Closes #38`)
- CI pipeline precisa executar **com sucesso** (build + lint + testes)
- Mover para **In Review** (limite de 5)

### 5. In Review → Done
- PR precisa de pelo menos **1 aprovação humana**
- Após aprovação, fazer **merge** para `master`
- Mover a issue para **Done**

### 6. Pós-Done (limpeza)
- Deletar a branch remota: `git push origin --delete <branch-name>`
- Deletar a branch local: `git branch -d <branch-name>`
- Checkout para `master`: `git checkout master`
- Atualizar com upstream: `git pull origin master`

---

## 🗺️ Roadmap do Front-End (Board Tasks)

| # | Task | Status | Prioridade | Tamanho |
|---|------|--------|:----------:|:-------:|
| 31 | Create front-end repository | ✅ Done | P1 | S |
| 37 | Create front-end repository with initial structure | ✅ Done | P0 | S |
| 38 | Bootstrap Next.js project with routing, API client, and design system | Ready | P0 | M |
| 39 | Create Login and Registration pages with JWT auth flow | Ready | P1 | M |
| 40 | Create Dessert management pages (list, create, delete) | Ready | P1 | M |
| 41 | Create Voting pages (session management, subscribe desserts, cast votes, results) | Ready | P1 | L |

### Dependências entre tasks
```
#38 Bootstrap (P0)
  └── #39 Auth pages (P1) — depende de #38
        ├── #40 Dessert pages (P1) — depende de #39 (autenticação)
        └── #41 Voting pages (P1) — depende de #39 (autenticação)
```

---

## 🏷️ Prioridades

| Prioridade | Significado |
|:----------:|-------------|
| **P0** | Bloqueante — impeditivo para qualquer outro avanço |
| **P1** | Alta — necessária para a próxima entrega |
| **P2** | Média — importante, mas pode esperar |

## 📐 Sizes

| Size | Significado |
|:----:|-------------|
| XS   | ~1-2h |
| S    | ~1 dia |
| M    | ~2-3 dias |
| L    | ~1 semana |
| XL   | ~2+ semanas (deve ser desmembrada) |

---

## ✅ Checklist Antes de Abrir PR

- [ ] `npm run lint` passa sem erros
- [ ] `npm run typecheck` passa sem erros
- [ ] Testes unitários criados/atualizados e passando
- [ ] `npm run build` passa sem erros
- [ ] `npm run dev` inicia sem erros e página carrega em `http://localhost:3000`
- [ ] Responsividade testada (mobile-first)
- [ ] Estados de loading, empty, error tratados
- [ ] Token JWT funciona (não expirado) — testar fluxo completo
- [ ] Branch segue padrão `<issue-number>-<kebab-case-title>`
- [ ] PR linkada à issue (`Closes #<number>`)
- [ ] Card movido no board: In Progress → In Review
