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

# Copiar build
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar el nginx.conf como template (con $PORT)
COPY nginx.conf /etc/nginx/templates/default.conf.template

# envsubst viene incluido en nginx:alpine con el paquete gettext
# Railway inyecta PORT, nginx-entrypoint lo procesa vía templates/
EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]
