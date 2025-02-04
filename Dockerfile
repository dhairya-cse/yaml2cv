# Base image for dependencies
FROM node:23.6.0-alpine AS deps

WORKDIR /app

# Copy only package.json and package-lock.json first to leverage caching
COPY package.json package-lock.json ./

# Install dependencies only if package files change
RUN npm ci --only=production

# ----------------------------------
# Builder Stage (if needed)
# ----------------------------------
FROM node:23.6.0-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .  # Copy the rest of the app

# Build the application (if needed)
RUN npm run build

# ----------------------------------
# Runner Stage (Final Image)
# ----------------------------------
FROM node:23.6.0-alpine AS runner

WORKDIR /app

# Copy only necessary files for running the app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app ./

# Set environment variables
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV AUTH_TRUST_HOST=1
ENV DEFAULT_PROFILE=dhairya

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]