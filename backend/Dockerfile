FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN yarn install --production=false
COPY . .

CMD [ "yarn", "start" ]