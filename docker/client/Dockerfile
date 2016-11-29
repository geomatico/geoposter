FROM nginx:alpine

MAINTAINER Oscar Fonts <oscar.fonts@geomati.co>

ENV BRANCH branding_besos
ARG URLAPI

RUN apk update \
 && apk add wget  \
 && apk add ca-certificates wget unzip gettext \
 && update-ca-certificates

RUN wget https://github.com/geomatico/geoposter/archive/${BRANCH}.zip \
 && unzip ${BRANCH}.zip \
 && mv geoposter-${BRANCH}/geoposter-client/* /usr/share/nginx/html \
 && rm -rf ${BRANCH}.zip geoposter-${BRANCH} \
 && envsubst '$URLAPI' < /usr/share/nginx/html/js/src/GeoPoster.js > /usr/share/nginx/html/js/src/GeoPoster.js2 \
 && rm /usr/share/nginx/html/js/src/GeoPoster.js \
 && mv /usr/share/nginx/html/js/src/GeoPoster.js2 /usr/share/nginx/html/js/src/GeoPoster.js
