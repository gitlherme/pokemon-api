# Pokemon Abilities Frontend
This is a project created to display the pokémon abilities ordered by name alphabetically.

You can see this project running LIVE [here]('https://pokemon-api-0r35.onrender.com/pokemons/pikachu').

!['Pokemon ability'](https://i.imgur.com/zXK4qii.png)
---

## Tech Stack
- NestJS
- Docker
- docker-compose
- Github Actions
- Jest
- class-validator
- Swagger
---

## Endpoints
`/pokemons/{name}` - Return the pokemon info; <br>
`/api` - Return the swagger documentation;

!['Swagger Docs'](https://i.imgur.com/NvfXtEQ.png)

---

## How to run

First of all, please clone this repo on your local machine.
```bash
git clone https://github.com/gitlherme/pokemon-api.git
```

Install the dependencies
```bash
pnpm install 
```

### Development environment
To see the development mode, use
```bash
pnpm run start:dev
```

The project will be started on your [http://localhost:3000](http://localhost:3000)

---

### Production environment

To see the production mode, use
```bash
pnpm run start:prod
```
---

### Docker

You can also build using Docker. For this, run `docker-compose up -d`, inside the root folder.*

*: needs to have Docker and docker-compose installed.

---

## How to test
To see results of unit tests use
```bash
pnpm run test
```
or if you want also see the coverage, run
```bash
pnpm run test:cov
```