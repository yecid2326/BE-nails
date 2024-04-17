FROM node:14 
WORKDIR /app/src
COPY package*.json ./
COPY . .

RUN npm install
RUN npm install bcrypt
EXPOSE 4001
CMD ["npm", "run","dev"]