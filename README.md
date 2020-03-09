# Northwind Database
[Northwind Database Web App](http://northwind-vue.site/)

Company database app created in VueJS. Based by Microsoft's sample database Northwind Traders.

## Requirements

1. Docker
2. Docker Compose
3. NodeJS ^12.x

## Installation

1. Pull the repository
2. On the root folder of the repo, create .env file for the environment variables. Setup credentials, ports, urls as expected by the docker-compose.yml file. Hint: look for substitute environment variable placeholders ${ENV_VAR} in the docker-compose.yml
3. On the root folder of the repo, run `docker-compose up -d`
4. go to hasura directory. `cd hasura`
5. install hasura-cli `npm install -g hasura-cli`
6. apply database migrations. `hasura apply migrate`
7. Open web browser and go to http://localhost:3003/
