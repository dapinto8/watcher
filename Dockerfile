FROM node:12.14.1-slim

WORKDIR /usr/src/app
COPY package.json /usr/src/app/

RUN npm install

EXPOSE ${PORT}