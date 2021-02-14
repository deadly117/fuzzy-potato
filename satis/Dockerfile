FROM composer/satis AS builder

COPY satis.json /build/satis.json

COPY packages/ /build/packages/

RUN /usr/local/bin/php /satis/bin/satis build /build/satis.json /build/output/

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /build/output/ /usr/satis/

EXPOSE 80