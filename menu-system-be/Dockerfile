FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["yarn", "start:prod"]