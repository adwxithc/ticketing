FROM node:15-alpine

WORKDIR /app

COPY ./package.json ./

RUN npm install --omit=dev

COPY ./ ./

CMD ["npm", "start"]