
# syntax=docker/dockerfile:1

# Stage 1: Install production dependencies
FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev \
    && npm cache clean --force

# Stage 2: Production runtime
FROM node:22-alpine AS production

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY --from=dependencies --chown=node:node \
    /app/node_modules ./node_modules

COPY --chown=node:node package.json ./
COPY --chown=node:node server.js ./

USER node

EXPOSE 3000

CMD ["node", "server.js"]
