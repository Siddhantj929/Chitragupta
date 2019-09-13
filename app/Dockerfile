FROM node:latest

# Specifying the work directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing required packages
COPY package.json /usr/src/app/
RUN npm install

# Start the process
EXPOSE 3000
CMD ["npm", "start"]
