# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# VITE_API_URL se pasa como build arg desde Railway
ARG VITE_API_URL=http://localhost:8000
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ── Production stage ──────────────────────────────────────────────────────────
FROM nginx:alpine

# gettext provee envsubst (para reemplazar $PORT en nginx.conf)
RUN apk add --no-cache gettext

# Copiar el build estático
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar nginx.conf como template (se procesa en entrypoint)
COPY nginx.conf /etc/nginx/nginx.conf.template

# Copiar y permisar el entrypoint
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Puerto default — Railway sobreescribe $PORT en runtime
EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
