FROM node:23.6.0-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:23.6.0-alpine AS runner

WORKDIR /app

COPY --from=builder /app ./

ENV PORT=3000
ENV HOSTNAME "0.0.0.0"
ENV AUTH_TRUST_HOST=true

EXPOSE 3000


CMD ["npm", "run", "start"]