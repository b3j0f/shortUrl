FROM node:20-alpine AS sources

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY src /app/src

FROM sources AS build

COPY .eslintrc.json /app/.eslintrc
COPY tsconfig.json /app/tsconfig.json
COPY .env.default /app/.env

COPY tests /app/tests

RUN yarn install

FROM build AS test

RUN yarn run lint
RUN yarn test

FROM test AS packaging

RUN rm -rf node_modules
ENV NODE_ENV production
RUN yarn install --silent
RUN yarn global add pkg tsc
RUN tsc ./src/main.ts
RUN pkg ./dist/app.js -o shorturl

FROM scratch AS prod

COPY --from=packaging shorturl .

CMD [ "shorturl" ]
