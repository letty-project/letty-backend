FROM node:18-alpine

WORKDIR /usr/src/app

ADD build build
ADD package*.json .

ENV NODE_ENV=production

RUN npm install

EXPOSE 4000

CMD ["node","./build/server.js"]
