# Build image
FROM node:16-alpine AS BUILD_IMAGE
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm install
RUN npm run lint
RUN npm run test
RUN npm run build
RUN npm prune --production
#RUN find dist -name "*.d.ts" -type f -delete
#RUN find dist -name "*.d.ts.map" -type f -delete
#RUN find dist -name "*.js.map" -type f -delete

# Build stage
FROM node:12-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=BUILD_IMAGE /app/package.json ./
COPY --from=BUILD_IMAGE /app/config ./config
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
EXPOSE 8080
CMD ["node", "dist/start.js"]
