FROM node:16

RUN mkdir /app-api
# Create app directory
WORKDIR /app-api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app-api

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /app-api

RUN npm install node-pre-gyp -g

EXPOSE 5000
CMD ["npm" ,"start"]