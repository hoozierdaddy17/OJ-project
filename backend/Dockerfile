# Use a base image with Node.js
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install necessary packages
RUN apk update && \
    apk add --no-cache \
    g++ \
    gcc \
    python3 \
    python3-dev \
    py3-pip \
    openjdk11-jdk

# Install app dependencies
RUN npm install

# Copy whole backend
COPY . .

# Rebuild native modules (e.g., bcrypt) to match the container's architecture
RUN npm rebuild bcrypt --build-from-source

# Expose the port 7000
EXPOSE 7000

# Command to run the app
CMD ["npm", "run", "dev"]
