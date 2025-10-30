# Stage 1 — base for development
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (cached if package.json changes only)
COPY package*.json ./
RUN npm install

# Copy rest of source (you’ll often override this via bind mount)
COPY . .

# Expose frontend dev server port (React uses 3000 by default)
EXPOSE 3000

# Optional: set environment
ENV NODE_ENV=development
ENV HOST=0.0.0.0

# Default command (React example)
CMD ["npm", "start"]
