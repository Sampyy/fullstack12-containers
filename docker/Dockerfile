FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

ENV DEBUG=docker:*

USER node
CMD DEBUG=docker:* npm start