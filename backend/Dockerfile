FROM node:14.17-alpine3.14
#RUN addgroup app && adduser -S -G app app
#USER app
WORKDIR /app
COPY . .
RUN yarn
ENV MONGO_CONNECT=mongodb://host.docker.internal:27017/CUSTOMERPORTAL
ENV JWT_KEY=4FoXKpWgPJMw
ENV LOCAL_SYSTEM_IP=*
ENV REG_EMAIL_HOST=smtp.mailtrap.io
ENV REG_EMAIL_PORT=2525
ENV REG_EMAIL_FROM=regisztracio@customerportal.hu
ENV REG_EMAIL_USER=9982e3b2313bca
ENV REG_EMAIL_PASS=b6cd322168bd89
ENV REG_EMAIL_LINK_ACCEPTED='http://localhost:3000/firstlogin'
ENV REG_EMAIL_LINK_DISMISSED='http://localhost:3000/dismissregistration'
ENV PORT=4000
EXPOSE 4000
CMD ["yarn", "start"]
