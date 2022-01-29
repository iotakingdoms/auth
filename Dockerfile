# Build step
FROM node:17-alpine AS BUILD_IMAGE
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run lint
RUN npm run build
RUN npm run test:unit
RUN npm run test:integration
# RUN npm run test:e2e
RUN npm prune --production

# Application image
FROM node:17-alpine
RUN apk --no-cache add curl
WORKDIR /app
ENV NODE_ENV=production
COPY --from=BUILD_IMAGE /app/package.json ./
COPY --from=BUILD_IMAGE /app/config ./config
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
EXPOSE 8080
CMD ["npm", "start"]
