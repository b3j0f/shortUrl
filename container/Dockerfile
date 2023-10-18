FROM node:20-alpine AS sources

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY src/ ./

FROM sources AS test-build

COPY .eslintrc.json ./
COPY tsconfig.json ./

COPY test/ ./

RUN yarn install --silent

FROM test-build AS test

RUN yarn run lint
RUN yarn run test

FROM test-build AS dev

COPY nodemon.json ./

RUN yarn run dev

FROM sources AS packaging

ENV NODE_ENV production
RUN yarn install --silent
RUN yarn global add pkg tsc
RUN tsc ./src/app.ts
RUN pkg ./dist/app.js -o shorturl

FROM scratch AS prod

COPY --from=packaging shorturl .

CMD [ "shorturl" ]
