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

# Copiar el build estático
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar nginx.conf (usa puerto 80 como placeholder, se reemplaza en CMD)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Railway asigna $PORT dinámicamente; sed lo inyecta antes de arrancar nginx
CMD sh -c "sed -i 's/listen 80;/listen ${PORT:-80};/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
