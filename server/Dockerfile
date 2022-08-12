FROM node:18-slim

RUN apt-get update
RUN apt-get install -y openssl htop


WORKDIR /dockerBackend

COPY . .

RUN npm install 



RUN npm run build



CMD ["npm", "run", "start"]