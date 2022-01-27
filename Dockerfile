# Build step
FROM node:17-alpine AS BUILD_IMAGE
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm ci
RUN npm run lint
RUN npm run build
RUN npm run test
RUN npm prune --production

# Application image
FROM node:17-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=BUILD_IMAGE /app/package.json ./
COPY --from=BUILD_IMAGE /app/config ./config
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
EXPOSE 8080
CMD ["npm", "start"]
