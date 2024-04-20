# MFC - Medical Facility Coordinator - Backend

O MFC é uma aplicação backend desenvolvida para listar postos de saúde e permitir que enfermeiros façam login e se candidatem para os turnos.
Tecnologias usadas

- Nest
- bcrypt
- Node v20.11.1
- Passport
- JWT
- Zod
- Vitest
- Prisma
- PostgreSQL
- Supertest
- Docker

## Pré-requisitos

Certifique-se de ter a versão correta do Node.js instalada (v20.11.1). Você pode usar o nvm para gerenciar suas versões do Node.js.
Instalação

## Clone o repositório e instale as dependências:

```
git clone git@github.com:ThaSMorato/mcf-backend.git
cd [nome-do-projeto]
npm install
```

## Variáveis de ambiente

O projeto utiliza as seguintes variáveis de ambiente:

- `DATABASE_URL` - URL para o banco de dados PostgreSQL.
- `JWT_PRIVATE_KEY` - Chave privada para a criação/leitura do token JWT.
- `JWT_PUBLIC_KEY` - Chave pública para a criação do token JWT.

As variáveis de ambiente devem ser adicionadas a um arquivo `.env` na raiz do projeto.

## Comandos

- Ambiente de Desenvolvimento (com watch): `npm run start:dev`
- Ambiente de Desenvolvimento: `npm run start`
- Construir aplicativo para Produção: `npm run build`
- Aplicativo de Produção: `npm run start:prod`
- Testes (unitários e de integração): `npm run test`
- Testes E2E: `npm run test:e2e`
- Docker: `docker-compose up`

## Funcionalidades

- `[GET]` /health-units?page=[number] - Recuperar até 10 unidades de saúde em uma página específica.
- `[POST]` /sessions - Criar uma sessão para o enfermeiro.
- `[GET]` /profile - Recuperar o perfil do usuário atualmente autenticado.
- `[POST]` /shift/:shiftId/n urse-shifts - Criar uma relação entre um enfermeiro e um turno de saúde disponível.

## Melhorias Futuras

Estas são algumas das possíveis melhorias que podem ser adicionadas no futuro:
- Aceitar inscrição de enfermeiro para um turno.
- Retornar os turnos associados a cada enfermeiro.
- Validar se um enfermeiro já se inscreveu para um turno.
- Adicionar filtros para os postos de saúde.
- Implementar recurso de refresh de token.
- Mover o token a ser adicionado a cookies em vez de retornado na resposta.
- Implementar criação de postos de saúde.
- Implementar criação de turno para um posto de saúde.
- Implementar criação de perfis de enfermeiros.
- Melhorias nas regras de negócio: um turno deve permitir mais de um enfermeiro?
