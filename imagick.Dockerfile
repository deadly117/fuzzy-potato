FROM centos:7

WORKDIR /usr/app

ADD https://github.com/ImageMagick/ImageMagick/archive/refs/tags/7.1.0-29.tar.gz ImageMagick-7.1.0-29.tar.gz
# COPY ImageMagick-7.1.0-29.tar.gz ./

RUN tar -xzf ImageMagick-7.1.0-29.tar.gz

WORKDIR /usr/app/ImageMagick-7.1.0-29

RUN yum -y install gcc make file autoconf automake libtool

RUN yum -y install libjpeg-devel libpng-devel

WORKDIR /usr/app

ADD https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.2.2.tar.gz libwebp-1.2.2.tar.gz
# COPY libwebp-1.2.2.tar.gz ./

RUN tar -xzf libwebp-1.2.2.tar.gz

WORKDIR /usr/app/libwebp-1.2.2

RUN ./configure --libdir=/usr/lib64 \
    && make -j8 \
    && make install

WORKDIR /usr/app/ImageMagick-7.1.0-29

RUN ./configure --disable-docs --with-jpeg --with-png --with-webp \
    && make -j8 \
    && make install

WORKDIR /usr/app