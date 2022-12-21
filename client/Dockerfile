FROM node:15-alpine3.10 as build

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install

COPY . ./


RUN npm run build

# production environment
FROM nginx:1.19.10-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]