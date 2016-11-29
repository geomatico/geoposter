FROM python:2.7

MAINTAINER Oscar Fonts <oscar.fonts@geomati.co>

ARG DB_HOST
ARG DB_NAME
ARG DB_USER
ARG DB_PASS

RUN apt-get update \
 && apt-get install -y --no-install-recommends unzip gettext postgresql-client \
 && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/geomatico/geoposter/archive/master.zip \
 && unzip master.zip \
 && mv geoposter-master/geoposter-api api \
 && mv geoposter-master/geoposter-client client \
 && rm -rf master.zip geoposter-master \
 && cd api \
 && pip install uwsgi \
 && pip install -r requeriments.txt \
 && envsubst '$DB_HOST $DB_NAME $DB_USER $DB_PASS' < /api/geoposter/config.py > /api/geoposter/config.py2 \
 && rm /api/geoposter/config.py \
 && mv /api/geoposter/config.py2 /api/geoposter/config.py

ENV HOME /api/geoposter
WORKDIR /api/geoposter

COPY wait-for-postgres.sh .

EXPOSE 8000

CMD ./wait-for-postgres.sh postgresql://geoposter:geoposter@postgis
