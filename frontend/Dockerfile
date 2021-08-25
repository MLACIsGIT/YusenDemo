FROM node:14.17-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

ENV REACT_APP_API_BASE_URL=http://localhost:4000

EXPOSE 3000

CMD ["yarn", "start"]
