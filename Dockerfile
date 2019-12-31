FROM 'nginx'

COPY ./dist/grouptaste /usr/share/nginx/html

EXPOSE 80