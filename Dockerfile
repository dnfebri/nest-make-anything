FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN yarn Install

# Bundle app source
COPY . .

RUN yarn build

EXPOSE 9000

CMD [ "yarn", "start:prod" ]