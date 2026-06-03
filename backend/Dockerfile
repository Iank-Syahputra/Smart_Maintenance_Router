FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

COPY prisma/ ./prisma/
RUN npx prisma generate --schema=prisma/schema.prisma

COPY . .

RUN mkdir -p uploads/avatars
RUN chmod +x docker-entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["node", "src/index.js"]
