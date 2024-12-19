# Step 1 : Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npm run build

# Step 2 : Run
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 3000
USER node
CMD ["npm", "run", "start"]
