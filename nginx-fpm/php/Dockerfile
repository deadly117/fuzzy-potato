FROM php:7.4-fpm-alpine

RUN addgroup -g 3000 -S nixuser \
    && adduser -u 3000 -S -HD -G nixuser nixuser \
    && rm /usr/local/etc/php-fpm.d/zz-docker.conf \
    && mkdir /sock \
    && chown -R nixuser:nixuser /sock

COPY www.conf /usr/local/etc/php-fpm.d/www.conf

USER nixuser