FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci --include=dev

RUN npm run build
RUN npm run test

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html