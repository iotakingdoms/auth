FROM node:latest
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
COPY . .
RUN npm install
RUN npm run lint
RUN npm run test
RUN npm run build

RUN rm -R ./.git ./lib ./test ./.github ./coverage\
          ./.dockerignore ./.gitignore \
          ./Dockerfile ./README.md ./CHANGELOG.md \
          ./git-conventional-commits.json ./jest.config.js \
          ./tsconfig.json ./.eslintrc.json
RUN find dist -name "*.d.ts" -type f -delete
RUN find dist -name "*.d.ts.map" -type f -delete
RUN find dist -name "*.js.map" -type f -delete

EXPOSE 8080
CMD ["node", "dist/start.js"]
