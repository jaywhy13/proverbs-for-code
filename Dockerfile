FROM node:20.10.0 AS builder
# Set the working directory in the container to /app
RUN mkdir /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install any needed packages
RUN yarn install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

RUN yarn run build

# Build the Nginx container
FROM nginx:1.24.0-alpine-slim

# Copy across static files
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

