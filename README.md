<h1 align="center">Challenge - CUBOS</h1>

Repositório feito para realizar o desafio da construção de uma API referente a área financeira.
Ele foi desenvolvido usando clean architecture, TDD e design patterns como adapters, ports, repositories e injeção de dependência.

## Antes de rodar o projeto

Você precisa configurar a variável de ambiente de JWT, então crie um arquivo ``.env`` na raiz do projeto e adicione o seguinte:

```ts
JWT_KEY=my_key
```

## Rodar projeto com docker compose

1. Primeiro é preciso rodar os containers da aplicação e do banco de dados

```
docker compose up --build -d
```

ou

```
docker-compose up --build -d
```

OBS: Já deixei um usuário com senha no arquivo knexfile.ts, caso essa etapa dê algum erro para você,no arquivo ``.env`` adicione as seguintes informações do banco de dados:

```ts
POSTGRES_PASSWORD=free
POSTGRES_USER=free
POSTGRES_DB=cubos
```

1. Depois é necessário rodar as migrates para criar as tabelas

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

## Tabelas 

- People => Responsável pelo armazenamento dos usuários
  
- account => Responsável pelo armazenamento das contas
  
- type => Para não ocorrer repetição de dados nas tabelas de **card** e **transactions**, resolvi criar uma tabela específica para guardar os dados

```
ID 1 = VIRTUAL
ID 2 = PHYSICAL
ID 3 = CREDIT
ID 4 = DEBIT
```

- account_card => associação de account com card
  
- transaction => Responsável por guardar as transações de contas

## Rotas da aplicação:

### Peoples:

- http://localhost:8080/people => ***POST***

BODY: 

```json
{
	"name": "Rfontt",
	"document": "10760260000119",
	"password": "test##@@"
}
```

### Login:

- http://localhost:8080/login => ***POST***

BODY: 

```json
{
	"document": "10760260000119",
	"password": "test##@@"
}
```

### Account:

***OBS: Necessita de um token***

- http://localhost:8080/accounts => ***POST***

BODY: 

```json
{
	"branch": "001",
	"account": "22221-5",
	"people_id": 1
}
```

- http://localhost:8080/accounts/:people_id => ***GET***


### Card:

***OBS: Necessita de um token***

- http://localhost:8080/accounts/:accountId/cards => ***POST***
 
BODY:

```json
{
	"type_id": 1,
  "number": "214 4336 789 22",
  "cvv": 125
}
```
**OBS: type 1 = VIRTUAL**

- http://localhost:8080/accounts/:accountId/cards => ***GET***

### Transaction:


***OBS: Necessita de um token***

- http://localhost:8080/accounts/:accountId/transactions => ***POST***

BODY:

```json
{
	"value": 100,
	"description": "Send money",
	"type_id": 4
}
```

**OBS: type 4 = DEBIT**
  
- http://localhost:8080/accounts/:accountId/transactions/internal => ***POST***

BODY:

```json
{
	"receiverAccountId": 2,
	"value": 100,
	"description": "Send money",
	"type_id": 4
}
```

- http://localhost:8080/accounts/:accountId/balance => ***GET***

- http://localhost:8080/accounts/:accountId/transactions => ***GET***

## Testes

Como dito, esse projeto foi desenvolvido com o uso de TDD, então caso queira rodar os testes use:

```
npm run test
```