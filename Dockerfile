FROM node:latest
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
COPY . .
RUN npm install
#RUN npm run test
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]
