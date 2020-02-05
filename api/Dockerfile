FROM node:12.14.1-alpine

WORKDIR /api

COPY . /api

RUN npm install && npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]