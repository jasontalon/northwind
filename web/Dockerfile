FROM node:12.14.1-alpine

WORKDIR /web

COPY . /web

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "buildstart"]