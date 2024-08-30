# Use a base image with Node.js
FROM node:18-alpine
#alpine is a linux flavor (light weight version)

# Set the working directory
WORKDIR /compiler

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy backend <localhost> <container(workdir)>
COPY . .

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

# Expose the port 7500
EXPOSE 7500

# Command to run the app
CMD ["node", "server.js"]
