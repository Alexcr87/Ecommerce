FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install --build-from-source

COPY . .

EXPOSE 3001

RUN npm rebuild bcrypt --build-from-source

CMD ["npm","run","start", "--watch"]