# Build stage
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Build the project (Parcel outputs to `dist`)
RUN npx parcel build ./src/index.html --public-url ./

# Production stage (lightweight image)
FROM node:20-slim

WORKDIR /app

# Copy only the built files from the builder stage
COPY --from=builder /app/dist /app/dist

# Install a lightweight web server
RUN npm install -g serve

# Expose the port for serving
EXPOSE 3000

# Run the server
CMD ["serve", "-s", "dist", "-l", "3000"]
