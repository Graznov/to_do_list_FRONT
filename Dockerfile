FROM node:lts-alpine3.20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM fholzer/nginx-brotli:mainline-latest AS test
ARG SSL_CERT_PATH
ARG SSL_CERT_KEY_PATH
ARG ORIGIN_URL

ENV SSL_CERT_PATH=$SSL_CERT_PATH
ENV SSL_CERT_KEY_PATH=$SSL_CERT_KEY_PATH
ENV ORIGIN_URL=$ORIGIN_URL

RUN apk add --no-cache openssl busybox-suid gettext dcron

RUN mkdir -p /etc/ssl/private /etc/ssl/certs \
    && openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout $SSL_CERT_KEY_PATH \
      -out $SSL_CERT_PATH \
      -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=example.com"

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/nginx.conf.template

RUN echo "0 0 */90 * * openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout $SSL_CERT_KEY_PATH -out $SSL_CERT_PATH \
    -subj '/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=example.com'" > /etc/crontabs/root \
    && crond


RUN envsubst '$SSL_CERT_PATH $SSL_CERT_KEY_PATH $ORIGIN_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]


FROM fholzer/nginx-brotli:mainline-latest AS prod
ARG SSL_CERT_PATH
ARG SSL_CERT_KEY_PATH
ARG ORIGIN_URL
ARG ADMIN_EMAIL
ARG SITE_DOMAIN
ARG SITE_DOMAIN_WWW


ENV SSL_CERT_PATH=$SSL_CERT_PATH
ENV SSL_CERT_KEY_PATH=$SSL_CERT_KEY_PATH
ENV ORIGIN_URL=$ORIGIN_URL
ENV ADMIN_EMAIL=$ADMIN_EMAIL
ENV SITE_DOMAIN=$SITE_DOMAIN
ENV SITE_DOMAIN_WWW=$SITE_DOMAIN_WWW

RUN apk add --no-cache certbot gettext dcron

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/nginx.conf.template

RUN certbot certonly --staging --webroot --webroot-path=/usr/share/nginx/html --non-interactive --agree-tos --no-eff-email -m $ADMIN_EMAIL -d $SITE_DOMAIN, $SITE_DOMAIN_WWW
RUN echo "0 0 * * * certbot renew --quiet" > /etc/crontabs/root \
    && crond

RUN envsubst '$SSL_CERT_PATH $SSL_CERT_KEY_PATH $ORIGIN_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
