FROM nginx:1.18-alpine

RUN addgroup -g 3000 -S nixuser \
    && adduser -u 3000 -S -HD -G nixuser nixuser

COPY nginx.conf /etc/nginx/nginx.conf