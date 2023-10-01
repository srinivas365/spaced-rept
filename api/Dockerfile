FROM node:16

# Create app directory
WORKDIR /srv/space-rep/api

ARG config_name

COPY package.json ./

RUN npm install

COPY . .

RUN cd config && ln -sf prod_config.js config.js

ENV NODE_OPTIONS=--max_old_space_size=14000

CMD ["node","index.js"]

EXPOSE 9095
