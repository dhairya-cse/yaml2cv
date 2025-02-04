FROM node:23.6.0-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

FROM node:23.6.0-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .


RUN npm run build

FROM node:23.6.0-alpine AS runner

WORKDIR /app


COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app ./

ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV AUTH_TRUST_HOST=1
ENV DEFAULT_PROFILE=dhairya


EXPOSE 3000

CMD ["npm", "run", "start"]