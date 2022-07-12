# Image Like

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="50"></p>
<p style="text-align: center;">This project was generated using <a href="https://nx.dev">Nx</a>.</p>

---

## Start up

- [ ] run `yarn` to install dependencies

- [ ] create apps/api/.env from [.env.example](/apps/api/.env.example)

  > UNSPLASH_ACCESS_KEY is the only variable required

- [ ] run `docker composer up -d` to create db service (postgres)

- [ ] Run `yarn start` or `nx run-many --target=serve --all --parallel` to run api and web.

  - [ ] Maybe you need to install **nx** using `$ npm install -g nx`

Api will respond from [http://localhost:3333/graphql](http://localhost:3333/graphql)  
Webapp will respond from [http://localhost:4200/](http://localhost:4200/)
