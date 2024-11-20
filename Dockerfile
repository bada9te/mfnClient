FROM node:alpine

WORKDIR /app

COPY package.json .

RUN yarn

ARG NEXT_PUBLIC_ENV_FILE=.env

COPY $NEXT_PUBLIC_ENV_FILE .env

# Source the .env file to set environment variables
RUN export $(grep -v '^#' .env | xargs)

COPY . .

RUN yarn build

CMD ["yarn", "start"]
