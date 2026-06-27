#!/bin/sh
# Reemplaza SOLO $PORT en el template de nginx y arranca nginx
# (evita que envsubst destruya las variables internas de nginx como $uri)
set -e

PORT="${PORT:-80}"
echo "Starting nginx on port $PORT"

envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
