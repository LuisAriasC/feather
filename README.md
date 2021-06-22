# Feather Challenge

This repo was made to give an example of mu coding skills regarding the
challenge from Feather.

The repo architecture was made with Lerna to have a monolithic repo
architecture, so the main src is at ./packages/feather-api

## Download the repo

1. Download the repo:

```
git clone https://github.com/LuisAriasC/feather.git
```

or

```
git clone git@github.com:LuisAriasC/feather.git
```

## Deployed testing

1. Use the postman collection located at the root of the project with the name
   Feather.postman_collection.json, using the environment variables called
   feather.postman_environment.json

2. You can also make an instrospection to the deployed api pointing to
   https://feather-api-dc3arnza4a-uc.a.run.app/graphql in a browser and explore
   more queries and mutations

## Docker testing

1. Go to the ./packages/feather-api directory

```
cd packages/feather-api
```

2. Run the following command to set up a docker container with the repo:

```
yarn docker:build
```

3. Theproject will be runniing at a docker container at http://localhost:8080

## Local testing

1. Install yarn:

```
npm install -g yarn
```

2. Install deps

```
yarn install
```

3. Local testing occurs on http://localhost:8080
