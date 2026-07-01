# Use official Node image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of source code
COPY . .

# Build TypeScript to JS
RUN npm run build

# Expose port
EXPOSE 5000

# Run compiled JS
CMD ["node", "dist/index.js"]