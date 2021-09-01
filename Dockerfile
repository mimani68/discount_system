FROM node:12-alpine

ENV NODE_ENV=development
WORKDIR /app

COPY package*.json ./
RUN npm install; npm i -g @nestjs/cli

COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
