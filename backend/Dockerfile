FROM node:latest

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY . /app/
RUN npm install

RUN ls
RUN pwd

ENTRYPOINT [ "npm", "start" ]