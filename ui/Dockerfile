FROM node:16

ENV TZ=Asia/Kolkata

WORKDIR /srv/space-rep/ui

ARG config_name

COPY package.json ./

RUN npm install

COPY . .

RUN cd src/config && ln -sf dev_config.js config.js

ENV NODE_OPTIONS=--max_old_space_size=14000

CMD ["npm","run","serve"]

EXPOSE 8080
