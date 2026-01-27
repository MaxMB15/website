# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package manifests & install deps
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Node.js for production
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000
# Command to run the SSR server
CMD ["npm", "run", "start"]
