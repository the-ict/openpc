# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run watch

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 7777

CMD ["npm", "start"]