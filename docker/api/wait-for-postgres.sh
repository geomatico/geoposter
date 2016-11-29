#!/bin/bash
set -e
conn="$1"

until psql $conn -c '\l'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec uwsgi --http=0.0.0.0:8000 --wsgi-file=run.py --callable=app --processes=1 --threads=8
