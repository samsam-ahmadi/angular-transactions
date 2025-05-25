FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci --only=production=false
COPY . .
RUN npx tsc                    

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/transactions.json ./dist/transactions.json
COPY package*.json .      
RUN npm ci --only=production && npm cache clean --force
EXPOSE 8080
CMD ["node","dist/server.js"]