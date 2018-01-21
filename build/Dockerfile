FROM node:latest

RUN mkdir /app/src -p

WORKDIR /app

COPY package*.json ./
COPY ./build/webpack.config.babel.js ./build/
COPY .babelrc ./

RUN npm install

EXPOSE 8080
EXPOSE 3001

CMD ["npm","run","dev"]
