FROM node:latest

RUN mkdir /app/src -p

WORKDIR /app

COPY package*.json ./
COPY webpack.config.babel.js ./
COPY .babelrc ./

RUN npm install

EXPOSE 8080
EXPOSE 3001

CMD ["npm","run","dev"]
