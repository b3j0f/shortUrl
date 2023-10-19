# Lunii technical test

This technical test is about a shortener url service implemented in typescript.

## Setup

- Install [docker](https://www.docker.com/): for interoperability and deployment pre-test concerns. Optionnally, you can install the cli tools [docker-compose](https://docs.docker.com/compose/) and [make](https://www.gnu.org/software/make/) in order to implify container management.
- Install [yarn](https://classic.yarnpkg.com/): to manage the service implementation, build a binary and test sources. Then launch `yarn` in a terminal.

### Configuration

The project uses those environment variables:

- `PORT`: service port. `3000` by default.
- `HOST`: service host. `0.0.0.0` by default.
- `NODE_ENV`: service execution environment. `development` by default.
- `SHORT_URL_LENGTH`: length of short url. `6` by default.

Setting:

- in your local environment if you want to execute locally the server.
- in a file `.env` (default is `.env.default`).
- in the file `container/docker-compose.yml` for an execution with docker.

### Commands

#### Docker

- ```make prod```: start container in prod mode.
- ```make dev```: start container in dev mode.
- ```make test```: start container in test mode.

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

### Tests

The directory `tests` contains all test files separataed in both `unit tests` and `integration tests`.

The hierarchy in `unit tests` respect the hierarchy of the sources in `src`.

### Containers

The directory `container` contains a Dockerfile image and a docker-compose file.
