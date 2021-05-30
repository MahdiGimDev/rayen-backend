FROM node:12.10.0
# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD . /usr/src/app
# uninstall the current bcrypt modules
#RUN npm uninstall bcrypt
# install the bcrypt modules for the machine
#RUN npm install bcrypt
# TypeScript
# Start
CMD [ "npm", "start" ]
EXPOSE 4004