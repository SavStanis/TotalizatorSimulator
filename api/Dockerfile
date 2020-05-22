FROM node:13.14.0-alpine
WORKDIR /api
COPY package*.json /api/
RUN npm install
COPY . /api/
EXPOSE 80
CMD ["npm", "start"]

