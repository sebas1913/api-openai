# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Next.js runs on
EXPOSE 3000

# Set the environment to production
ENV NODE_ENV=production

# Build the Next.js app
RUN npm run build

# Start the Next.js app
CMD ["npm", "start"]