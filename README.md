# Lunii technical test

This technical test is about a shortener url service implemented in typescript.

## Setup

- [docker](https://www.docker.com/): for interoperability and deployment pre-test concerns. Optionnally, you can install the cli tools [docker-compose](https://docs.docker.com/compose/) and [make](https://www.gnu.org/software/make/) in order to implify container management.
- [yarn](https://classic.yarnpkg.com/): to manage the service implementation, build a binary and test sources.

## Execution

### Environment variables

The project uses those environment variables:

- `PORT`: service port. `3000` by default.
- `HOST`: service host. `0.0.0.0` by default.
- `NODE_ENV`: service execution environment. `development` by default.

### Commands

#### Docker

- ```make up```: pull images, kill orphan containers and start containers in background.
- ```make dev```: kill orphan docker containers and start docker containers in dev mode in background.

#### Yarn

- ```yarn start```: start the shorturl service in production mode.
- ```yarn lint```: lint the source files.
- ```yarn test```: launch the tests and display test coverage.
- ```yarn dev```: start the shorturl service in dev mode (hot reload) in local.

### Sources

Source codes are in the directory `src` contains all source files.

Dev configuration files are at the root:

- package.json: package management.
- .eslintrc.json: linter Eslint.
- jest.config.ts: test framework Jest.
- nodemonde.json: hot reload for development mode.
- tsconfig: typescript.
- yarn.lock: project dependencies listing.

### Tests

The directory `tests` contains all test files separataed in both unit tests and integration tests.

### Containers

The directory `container` contains a Dockerfile image and a docker-compose file.
