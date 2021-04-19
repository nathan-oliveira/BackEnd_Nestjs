1º Instale o Nestjs:
  Executa esse comando no terminal: npm i -g @nestjs/cli


2º Instale as dependências necessárias:
  Executa esse comando no terminal: npm install


3º Executa o Xampp e Crie uma base de dados:
  Nome: node_backend_acacia
  Collation: utf8mb4_general_ci

  
4º Crie as migrations:
  Executa esse comando no terminal: npm run typeorm migration:run

  
5º Inicie o Servidor:
  Executa esse comando no terminal: npm run start

=======================================================================================

Comando para rodar o jest(TDD): npm run test:e2e

================================ Helps abaixo (ignore) ================================
npx @nestjs/cli new

::Create Migrations::
npx typeorm migration:create -n create-notes

:: Run Migrations ::
npm run typeorm migration:run
