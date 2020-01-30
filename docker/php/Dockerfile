FROM php:7.4-fpm

RUN pecl install apcu
RUN apt-get update && apt-get install -y
RUN apt-get install --assume-yes git
RUN apt-get install --assume-yes libzip-dev
RUN docker-php-ext-install zip
RUN docker-php-ext-enable apcu
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /usr/src/app

COPY api /usr/src/app

RUN PATH=$PATH:/usr/src/apps/vendor/bin:bin