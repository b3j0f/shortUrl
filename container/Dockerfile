FROM node:20-alpine AS sources

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY src /app/src

FROM sources AS build

COPY .eslintrc.json /app/.eslintrc
COPY tsconfig.json /app/tsconfig.json

COPY tests /app/tests

RUN yarn install

FROM build AS prod

COPY jest.config.ts /app/jest.config.ts

RUN yarn run lint
RUN yarn test

ENV NODE_ENV production

CMD [ "yarn", "run", "start" ]
