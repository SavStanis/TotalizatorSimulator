FROM node:13.14.0-alpine
WORKDIR /client
COPY package*.json /client/
RUN npm install
COPY . /client/
EXPOSE 3001
CMD ["npm", "start"]
