FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN npm install --only=production

COPY . .

EXPOSE 4000

CMD ["sh","-c","npm run migrate && node src/index.js"]
