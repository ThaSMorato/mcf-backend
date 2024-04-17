FROM node:20.11.1-alpine

WORKDIR /app

EXPOSE 3333

COPY package.json ./

RUN npm install --silent

COPY . ./

RUN npm run prisma generate

CMD ["npm", "run", "start:dev"]
