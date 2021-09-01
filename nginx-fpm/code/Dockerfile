FROM alpine

COPY *.php /usr/build/

RUN addgroup -g 3000 -S nixuser \
    && adduser -u 3000 -S -HD -G nixuser nixuser \
    && mkdir -p /usr/app \
    && chown -R nixuser:nixuser /usr/app /usr/build

CMD ["/bin/cp", "-rp", "/usr/build/index.php", "/usr/app/"]