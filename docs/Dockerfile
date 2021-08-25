FROM node:14.17-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

ENV API_DOC_PORT=5000

EXPOSE 5000

CMD ["yarn", "start"]
