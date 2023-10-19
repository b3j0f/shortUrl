# Lunii technical test

This technical test is about a shortener url service implemented in typescript.

## Setup

- Install [docker](https://www.docker.com/): for service execution in a docker container. Optionnally, you can install the cli tools [docker-compose](https://docs.docker.com/compose/) and [make](https://www.gnu.org/software/make/) in order to make easier the container management.
- Install [yarn](https://classic.yarnpkg.com/): to manage the service implementation, build a binary and test sources.
- Tape `yarn` in a terminal in order to install node_modules.

### Configuration

The project uses those environment variables:

- `PORT`: service port. `3000` by default.
- `HOST`: service host. `0.0.0.0` by default.
- `NODE_ENV`: service execution environment. `development` by default.
- `SHORT_URL_LENGTH`: length of short url. `6` by default.

Setting:

- in your local environment if you want to execute locally the server.
- in a file `.env` (default is `.env.default`).
- in the file `container/docker-compose.yml` for an execution with docker in the [properties](https://docs.docker.com/compose/environment-variables/set-environment-variables/) `services/shorturl/environment`.

### Commands

#### Docker

- ```make up```: start container in prod mode.
- ```make build```: build the container.
- ```make down```: stop the container and remove all related containers.

#### Yarn

- ```yarn start```: start the shorturl service in production mode.
- ```yarn lint```: lint the source files.
- ```yarn test```: launch the tests and display test coverage.
- ```yarn dev```: start the shorturl service in dev mode (hot reload) in local.

### Sources

Source codes are in the directory `src` contains all source files.

Dev configuration files are at the root:

- `package.json`: package management.
- `.eslintrc.json`: linter Eslint.
- `jest.config.ts`: test framework Jest.
- `nodemonde.json`: hot reload for development mode.
- `tsconfig`: typescript.
- `yarn.lock`: project dependencies listing.
- `.env.default`: default `.env` file.

#### Architecture

The architecture use logical layers and IoC to implement the server.

- `src/main.ts` is the entry point, which use `src/loaders` to start the server (weaving middleware, routes and configuration initialisation).
- `src/types` contains all interfaces.
- `src/routes` contains all routes which (as controller) use services in `src/services`
- `src/services` contains services depending with Dependency Injection to a store and en event emitter.
- `src/store` and `src/subscribers` contain respectively implemnetation of store and event emitters.
- `src/lib` contain tool functions (validate an url, transform a data to an interface, etc.).

### Tests

The directory `tests` contains all test files separataed in both `unit tests` and `integration tests`.

The hierarchy in `unit tests` and `integration tests` respect the hierarchy of the sources in `src`.
