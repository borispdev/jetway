FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /etc/nginx/templates

COPY nginx.conf.template .

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]