## NTask (API + Web)

Este repo tem 2 projetos:

- `ntask-api`: API (HTTPS na porta 3000)
- `ntask-web`: Frontend estático (HTTP na porta 3001)

## Ajustes feitos (autenticacao)

### 1) Bug no decode do JWT (API)

Arquivo: `ntask-api/auth.js`

- O token gerado em `POST /token` tem payload `{ id: user.id }`.
- A estrategia JWT estava lendo isso errado (`payload.id` como objeto).
- Corrigido para usar `const { id } = payload`.

Resultado: rotas protegidas por `app.auth.authenticate()` passam a conseguir resolver `req.user` corretamente.

### 2) Header Authorization no formato correto (Web)

Arquivos: `ntask-web/src/app.js`, `ntask-web/src/ntask.js`

- A API usa `ExtractJwt.fromAuthHeaderAsBearerToken()`.
- Entao as requisicoes autenticadas precisam enviar `Authorization: Bearer <token>`.
- O frontend salva o token no `localStorage` e o wrapper em `Ntask` injeta automaticamente `options.headers.Authorization` quando existir token.

### 3) Checagem de status code no browser-request

Arquivos: `ntask-web/src/components/signin.js`, `ntask-web/src/components/signup.js`

- O `browser-request` expõe `resp.statusCode` (nao `resp.status`).
- Ajustado para tratar melhor erros HTTP e respostas invalidas.

### 4) Bug no template de cadastro

Arquivo: `ntask-web/src/templates/signup.js`

- O input de nome estava com `data-nome`, mas o JS procura por `data-name`.
- Corrigido para `data-name`.

## Ajustes feitos (tasks)

### 1) Tasks agora ficam vinculadas ao usuario

Arquivo: `ntask-api/routes/tasks.js`

- A coluna no banco e `user_id`, mas no Sequelize o atributo da associacao e `UserId` (com `field: 'user_id'`).
- A API estava criando tasks com `user_id` no `req.body`, o que o Sequelize ignora (campo desconhecido), deixando `user_id` como `NULL`.
- Corrigido para usar `UserId` no create e nos filtros (`GET /tasks`, `GET/PUT/DELETE /tasks/:id`).

Observacao: tasks antigas com `user_id = NULL` nao vao aparecer na lista. Para resolver em dev, voce pode resetar o banco (apagar `ntask-api/ntask.sqlite`) e reiniciar a API.

## Como rodar

### 1) Subir a API

Em um terminal:

```bash
cd ntask-api
npm install
npm run dev
```

A API sobe em `https://localhost:3000`.

Importante: como e HTTPS com certificado local (`server.crt/server.key`), o browser pode bloquear as chamadas ate voce confiar no certificado.

- Abra `https://localhost:3000/` no browser.
- Aceite o aviso de seguranca.
- Voce deve ver: `{ "status": "NTask API" }`.

### 2) Subir o frontend

Em outro terminal:

```bash
cd ntask-web
npm install
npm run start
```

O frontend sobe em `http://localhost:3001`.

## Observacoes

- `Cannot GET /token` e esperado se voce acessar `/token` direto no navegador (isso faz um GET). A rota correta e `POST /token`.
- O CORS na API esta configurado para permitir apenas `http://localhost:3001`.
