<h1 align="center">Challenge - CUBOS</h1>

- [ ] Criar rota de pessoa
- [ ] Criar rota de login
- [ ] Criar rota de conta


## Rodar projeto com docker compose

- Primeiro é preciso rodar os containers da aplicação e do banco de dados

```
docker compose up --build -d
```

ou

```
docker-compose up --build -d
```

- Depois é necessário rodar as migrates para criar as tabelas

```
docker exec server npm run migrate
```

- Para verificar as tabelas criadas, é necessário entrar no container do postgress

```
docker exec -it database psql --username free --dbname cubos
```

- Logo após você entrar no container do banco de dados com o camando anterior, você pode usar o seguinte comando para listar as tabelas: ``\d``

- Para startar o projeto, você pode usar esse comando:

```
docker exec server npm run dev
```