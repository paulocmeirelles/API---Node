# API-Node

Este projeto tem como finalidade apresentar uma API Rest utilizando NodeJS, Express e PostgreSQL

## Banco de Dados

O banco de dados escolhido foi o PostgreSQL  
Foi criado uma única dimensão chamada contas com os seguintes campos  
cpf bigint unique not null  
nome_completo varchar(100) not null  
saldo_reais numeric(15,2) not null

## Instruções

-Clone o projeto  
-Instale o postgresql, com o usuário padrão (psql crie um database chamado apinode e uma tabela "contas")  
-Rode o comando "npm install" na base do projeto  
-node server.js (podendo também utilizar o nodemon)

## Requisições (o id aqui é o mesmo que cpf)

**Método GET**  
/contas - para todas as contas  
/contas/:id para uma conta específica

**Método PUT** (As contas aqui não podem ficar zeradas)  
/contas/:id - para depósito ou retirada de dinheiro da conta em específico (o sinal de "-" para retirada)  
/transferencia/:id - para transferẽncia do cpf específico para o cpf de transferẽncia

**Método POST**  
/contas - para criar uma conta passando os campos cpf, nome_completo, saldo_reais
