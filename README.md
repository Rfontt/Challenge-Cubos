<h1 align="center">Challenge - CUBOS</h1>

Repositório feito para realizar o desafio da construção de uma API referente a área financeira.
Ele foi desenvolvido usando clean architecture, TDD e design patterns como adapters, ports, repositories e injeção de dependência.

## Rodar projeto com docker compose

1. Primeiro é preciso rodar os containers da aplicação e do banco de dados

```
docker compose up --build -d
```

ou

```
docker-compose up --build -d
```

OBS: Já deixei um usuário com senha no arquivo knexfile.ts, caso essa etapa dê algum erro para você,crie um arquivo ``.env`` com as seguintes informações do banco de dados:

```ts
POSTGRES_PASSWORD=free
POSTGRES_USER=free
POSTGRES_DB=cubos
```

2. Depois é necessário rodar as migrates para criar as tabelas

```
docker exec server npm run migrate
```

3. Caso queira verificar as tabelas criadas, é necessário entrar no container do postgress

```
docker exec -it database psql --username free --dbname cubos
```

- Logo após você entrar no container do banco de dados com o camando anterior, você pode usar o seguinte comando para listar as tabelas: ``\d``

***Com todas essas etapas feitas, o projeto já está rodando e você pode seguir para a parte de rotas**


## Rodar o projeto sem docker

1. Para isso é necessário que você ajuste o arquivo ``knexfile.ts``:

```ts
 connection: {
   host: "SEU HOST",
   user: "SEU USER",
   password: "SUA SENHA",
   database: "SEU DATABASE"
},
```

2. Depois é preciso rodar no terminal o seguinte comando:

```
npm run migrate
```

3. E por último executar o servidor:

```
npm run dev
```

## Rotas da aplicação:

### Peoples:

- http://localhost:8080/people => ***POST***

### Account:

- http://localhost:8080/accounts => ***POST***
 
- http://localhost:8080/accounts/:people_id => ***GET***


### Card:

- http://localhost:8080/accounts/:accountId/cards => ***POST***
 
- http://localhost:8080/accounts/:accountId/cards => ***GET***

### Transaction:

- http://localhost:8080/accounts/:accountId/transactions => ***POST***
  
- http://localhost:8080/accounts/:accountId/transactions/internal => ***POST***
  
- http://localhost:8080/accounts/:accountId/balance => ***GET***

- http://localhost:8080/accounts/:accountId/transactions => ***GET***

## Testes

Como dito, esse projeto foi desenvolvido com o uso de TDD, então caso queira rodar os testes use:

```
npm run test
```