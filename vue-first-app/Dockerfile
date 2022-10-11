# build stage
FROM node:lts-alpine as vue-app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build
RUN npm install
EXPOSE 8080
CMD ["node", "./index.js"]



# docker build -t shopping-cart-app:1.0 .