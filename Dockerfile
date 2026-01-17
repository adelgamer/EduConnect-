FROM node:22.22.0-alpine3.23

WORKDIR /app

EXPOSE 3001

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]