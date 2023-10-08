FROM node:18

WORKDIR /musicfromnothing-client

COPY package*.json .

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]