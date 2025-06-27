FROM node:22-alpine

WORKDIR /app

COPY package* .
COPY src/prisma ./src/prisma


RUN npm install 
RUN npx prisma generate --schema=src/prisma/schema.prisma

COPY . .
RUN npm run build 



EXPOSE 3000

CMD ["node","dist/index.js"]
