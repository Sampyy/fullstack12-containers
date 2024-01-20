FROM node:16

WORKDIR /usr/src/app

COPY . . 

RUN npm install

CMD [ "npm", "start" ]
#docker run -p 3000:3000 -v /app/node_modules -v "$(pwd):/usr/src/app/" -e CHOKIDAR_USEPOLLING=true -e WATCHPACK_POLLING=true hello-front-dev