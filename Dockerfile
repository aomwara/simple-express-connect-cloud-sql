# Use the official Node.js image as the base image
FROM node:16

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port on which your Express app runs (default is 3000)
EXPOSE 8080

# Start the Express application
CMD ["node", "app.js"]
