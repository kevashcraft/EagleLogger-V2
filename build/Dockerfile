FROM node:latest

RUN mkdir /app/src -p

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 8080
EXPOSE 3001

CMD ["npm","run","dev"]
