FROM node:10.16.0-alpine
RUN mkdir -p /app/src
WORKDIR /app
COPY src /app/src
COPY package.json /app/package.json
COPY knexfile.js /app/knexfile.js
COPY jest.config.js /app/jest.config.js
RUN yarn install
RUN npm install knex -g
CMD ["yarn", "run", "prod"]