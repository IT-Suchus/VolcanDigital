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

# Copiar nginx.conf directamente (Nginx escuchará en el puerto 80)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Railway detecta y routea el tráfico al puerto expuesto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
