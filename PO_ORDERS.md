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

## 🎯 Tarefa Atual

**Tarefa:** Revisar Swagger e corrigir contratos da API no frontend
**Prioridade:** P1
**Size:** M
**Branch:** `fix-api-contracts-swagger`

### Instruções

1. **Suba o backend** para acessar o Swagger:
   ```bash
   cd /home/pizzaia/dev/spring/christmas-dessert-voting
   docker build -t christmas-dessert-voting .
   docker-compose up -d
   ```
   Swagger: http://localhost:8080/api/v1/swagger-ui.html

2. **Para cada endpoint**, compare o contrato do Swagger com o que o frontend está chamando:

   | Endpoint | Swagger body/params | Frontend atual |
   |----------|-------------------|----------------|
   | `POST /users` | { name, cpf, email, password, favoriteSweets[] } | Confira se confere |
   | `POST /users/login` | { identifier, password } | ✅ já corrigido |
   | `GET /desserts` | Response: DessertDTO[] | Confira os campos |
   | `POST /desserts` | { name, description?, recipe? } | Confira |
   | `DELETE /desserts/{id}` | Path: id (UUID) | Confira |
   | `POST /voting` | { name, description?, closingDate? } | Confira |
   | `PATCH /voting/{id}/subscribe` | { dessertId } | Confira |
   | `POST /voting/{id}/vote` | { dessertId } | Confira |
   | `GET /voting/{id}/results` | Response: resultados ordenados | Confira |

3. **Corrija** no frontend:
   - Nomes de campos diferentes
   - Tipos errados
   - Paths incorretos
   - Headers faltando

4. **Atualize** `types/` para espelhar os DTOs do backend

5. **Valide**: lint → typecheck → test → build

6. **Desligue** backend: `docker-compose down`

7. **PR** reportando cada correção feita

---

## Bloqueios

*(deixe aqui se encontrar algo que te impede)*
