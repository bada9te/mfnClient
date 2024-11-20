FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

ARG NEXT_PUBLIC_ENV_FILE=.env

COPY $NEXT_PUBLIC_ENV_FILE .env

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
