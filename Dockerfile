FROM node:18

WORKDIR /app

ENV NODE_ENV=production

COPY . .
RUN npm i

ENTRYPOINT ["node", "main.js"]