FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install --only=production

USER node

CMD npm start