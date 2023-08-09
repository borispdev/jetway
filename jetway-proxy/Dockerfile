FROM nginx:alpine

WORKDIR /etc/nginx/conf.d

RUN rm default.conf

COPY nginx.conf .

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]