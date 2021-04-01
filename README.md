1º Instale o Nestjs:
  roda esse comando no terminal: npm i -g @nestjs/cli

2º Instale as dependências necessárias!
  roda esse comando no terminal: npm install

3º Executa o Xampp e Crie uma base de dados:
  nome: node_backend_acacia
  collation: utf8mb4_general_ci
  
4º Crie as migrations:
  rode esse comando no terminal: npm run typeorm migration:run
  
5º Inicie o Servidor:
  rode esse comando no terminal: npm run start



----------------------------------------------------------------------------------------------------------
::Create Migrations::
npx typeorm migration:create -n create-notes

:: Run Migrations ::
npm run typeorm migration:run
