# --- Stage 1: Build the React Application ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 2: Serve the application with Nginx ---
FROM nginx:stable-alpine
# Copy the built static files from Stage 1 to Nginx's public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]