# Lunii technical test

This technical test is about a shortener url service implemented in typescript.

## Execution

The execution is possible in two environments:

- [docker](https://www.docker.com/): for interoperability and deployment pre-test concerns. Depends on the cli tool [make](https://www.gnu.org/software/make/).
- [yarn](https://classic.yarnpkg.com/): you know, it is a typescript project...

## Production

### Environment variables

The project uses those environment variables:

- `PORT`: service port. `3000` by default.
- `HOST`: service host. `0.0.0.0` by default.
- `NODE_ENV`: service execution environment. `development` by default.

### Docker

```make up```: pull images, kill orphan containers and start containers in background.

### Yarn

```yarn start```: start the shorturl service in production mode.

## Development

### Docker

```make dev```: kill orphan docker containers and start docker containers in dev mode in background.

### Yarn

```yarn lint```: lint the source files.
```yarn test```: launch the tests.
```yarn dev```: start the shorturl service in dev mode in local.

### Configuration

Configuration files are at the root:

- package.json: package management.
- .eslintrc.json: linter Eslint.
- jest.config.ts: test framework Jest.
- nodemonde.json: hot reload for development mode.
- tsconfig: typescript.
- yarn.lock: project dependencies listing.

### Sources

The directory `src` contains all source files.

### Tests

The directory `tests` contains all test files.

### Containers

The directory `container` contains docker and docker-compose files.
