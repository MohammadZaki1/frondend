# Use Node 14 for Angular 11 projects
FROM node:14-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

CMD ["npx", "http-server", "dist/hsncverificationclient-main", "-p", "80"]
