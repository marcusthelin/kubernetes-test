FROM node:12 as dev

WORKDIR /app

ADD package.json .

RUN npm install

RUN npm install -g nodemon

CMD [ "npm", "start" ]