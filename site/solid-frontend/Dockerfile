# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package manifests & install deps
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build SolidStart for production
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.output .output
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
# Command to run the SSR server
CMD ["npm", "run", "start"]
