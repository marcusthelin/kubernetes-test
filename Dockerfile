FROM node:12

WORKDIR /app

ADD package.json .

RUN npm install

RUN npm install -g nodemon

ENV VERSION "1"

CMD [ "npm", "start" ]
