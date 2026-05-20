# PO_ORDERS — Frontend (Next.js)

## ⚠️ REGRA CRÍTICA — Validar aplicação rodando

**ANTES de abrir qualquer PR, você DEVE:**

1. `npm run lint` ✅
2. `npm run typecheck` ✅
3. `npm test` (ou vitest) ✅
4. `npm run build` ✅ — **o build precisa passar sem erros**
5. Rodar `npm run dev` e validar que a página abre em `http://localhost:3000`
6. **Parar o dev server após validar (Ctrl+C)**

**Se o build falhar ou a página não abrir, VOCÊ NÃO ABRE PR.** Corrija primeiro.

## Demais regras

### 0. REGRA ABSOLUTA — NUNCA fazer push direto para master
Master é **read-only**. Toda alteração DEVE passar por branch + PR. Qualquer push direto será rejeitado.

### 1. Sempre criar branch
Padrão: `<issue-number>-<kebab-case-title>`

### 2. Commits seguem padrão
`<emoji> <tipo>: <descrição>`

### 3. PR obrigatório
- Abrir PR para `master`
- Corpo com `Closes #<issue>`
- Build validado (regra crítica acima)

### 4. Reportar ao PO
- Ao iniciar task → mover card no board para **In Progress**
- Ao abrir PR → mover card para **In Review**
- Terminar → esperar novas ordens

---

## 🎯 Tarefa Atual

**Issue:** #41 — Create Voting pages (session management, subscribe desserts, cast votes, results)
**Prioridade:** P1
**Size:** L
**Branch:** `41-voting-pages`
**Link:** https://github.com/Victor-Pizzaia/christmas-dessert-voting/issues/41

### Instruções
1. Voting session list page — `GET /api/v1/voting`
2. Create voting session form — `POST /api/v1/voting`
3. Subscribe desserts to session — `PATCH /api/v1/voting/{id}/subscribe`
4. Vote page — `POST /api/v1/voting/{id}/vote` (#55 em andamento no backend)
5. Results page — `GET /api/v1/voting/{id}/results` (#56 em andamento no backend)
6. Loading, empty, error states
7. Responsive layout
8. Unit tests

### Endpoints
| Ação | Path | Método | Status |
|------|------|:------:|:------:|
| Listar sessões | `/api/v1/voting` | GET | ✅ Pronto |
| Criar sessão | `/api/v1/voting` | POST | ✅ Pronto |
| Inscrever | `/api/v1/voting/{id}/subscribe` | PATCH | ✅ Pronto |
| Votar | `/api/v1/voting/{id}/vote` | POST | 🚧 #55 |
| Resultados | `/api/v1/voting/{id}/results` | GET | 🚧 #56 |

---

## Bloqueios

*(deixe aqui se encontrar algo que te impede)*
