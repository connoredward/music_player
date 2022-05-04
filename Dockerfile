FROM node:16-alpine

RUN mkdir -p /app

WORKDIR /tmp
COPY package*.json ./
RUN npm ci --no-optional
RUN cp -a /tmp/node_modules /app/
RUN rm -rf /tmp/*

WORKDIR /app
COPY . .

RUN npm run build

CMD [ "npm", "start" ]