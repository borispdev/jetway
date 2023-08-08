FROM node:18-alpine AS react_build

WORKDIR /app

COPY . .

RUN npm install

RUN npm install react-scripts

RUN npm run build

FROM nginx:1.25.1-alpine

COPY --from=react_build /app/build /usr/share/nginx/html

COPY --from=react_build /app/.env.example /usr/share/nginx/html/.env

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=react_build /app/nginx/nginx.conf /etc/nginx/conf.d

RUN apk add --update nodejs

RUN apk add --update npm

RUN npm i -g runtime-env-cra

WORKDIR /usr/share/nginx/html/

EXPOSE 80

EXPOSE 443

CMD [ "/bin/sh", "-c", "runtime-env-cra --config-name=./runtime-env.js --env-file=./.env && nginx -g \"daemon off;\""]