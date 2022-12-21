FROM node:15-alpine3.10

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY --chown=node:node . .

USER node

EXPOSE 3001
EXPOSE 3002

CMD "npm" "start"