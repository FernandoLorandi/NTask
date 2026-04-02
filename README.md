# NTask

Projeto de exemplo (API + Web) inspirado no livro **"Construindo APIs REST com Node.js"** (Casa do Codigo). A ideia e demonstrar um fluxo completo de autenticacao com JWT e um CRUD simples de tarefas.

O repo contem:

- `ntask-api`: API REST em Node/Express, SQLite + Sequelize, Passport JWT.
- `ntask-web`: frontend estatico (Browserify + Babel) consumindo a API.

## Requisitos

- Node.js + npm

## Como rodar

### 1) API

```bash
cd ntask-api
npm install
npm run dev
```

A API sobe em `https://localhost:3000`.

Nota sobre HTTPS local: a API usa certificado local (`server.crt/server.key`). Em navegadores, pode ser necessario abrir `https://localhost:3000/` e aceitar o aviso de seguranca antes das chamadas XHR funcionarem.

### 2) Web

```bash
cd ntask-web
npm install
npm run start
```

O frontend sobe em `http://localhost:3001`.

## Endpoints principais

- `POST /users`: cria usuario
- `POST /token`: autentica e retorna `{ token }`
- `GET /tasks`: lista tasks do usuario autenticado
- `POST /tasks`: cria task para o usuario autenticado

## Notas e correcoes aplicadas

- JWT: corrigido o parse do payload na estrategia do Passport (`ntask-api/auth.js`).
- Bearer token: o frontend envia `Authorization: Bearer <token>` automaticamente (`ntask-web/src/ntask.js`).
- Tasks: corrigido vinculo da task com o usuario usando `UserId` (Sequelize) e adicionado auth em `/tasks/:id` (`ntask-api/routes/tasks.js`).
- UI: corrigidos erros que impediam o bundle de iniciar (ex.: `footer is not defined`) e pequenos typos em templates/components.

## Dicas de troubleshooting

- `Cannot GET /token`: acessar `/token` direto no navegador faz `GET`. O endpoint correto e `POST /token`.
- CORS: a API permite o origin `http://localhost:3001`.
