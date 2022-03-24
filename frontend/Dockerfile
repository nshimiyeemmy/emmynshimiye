FROM node:16
#specifying the working directory
WORKDIR /usr/app
#copy package.json to the working directory
COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build 

CMD [ "npm","run", "preview" ]