# Build the application
FROM node:20-alpine AS build
WORKDIR /app
COPY ../frontend/package.json ../frontend/package-lock.json ./
RUN npm install
COPY ../frontend ./
RUN npm run build

# Serve the built application
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
