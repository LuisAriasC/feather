# Dependencies
FROM node:12-alpine as dependencies

COPY package.json /app/
WORKDIR /app
RUN yarn install --frozen-lockfile
COPY . /app


# Builder
FROM node:12-alpine as builder

COPY --from=dependencies /app/node_modules /app/node_modules
COPY . /app/

WORKDIR /app

# Build with ts globally
RUN yarn global add typescript @nestjs/cli
RUN yarn build

COPY . /app

# Runner
FROM gcr.io/distroless/nodejs:12 as runner

LABEL "org.opencontainers.image.source"="https://github.com/LuisAriasC/FEATHER/"

COPY --from=dependencies /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist

WORKDIR /app

CMD ["dist/main"]
