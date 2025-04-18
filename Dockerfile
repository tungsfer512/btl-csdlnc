FROM node:20.19.0

WORKDIR /app
COPY package.* ./
RUN npm install
COPY . /app/

EXPOSE 5000

CMD [ "npm", "run", "start" ]
# ENTRYPOINT ["tail", "-f", "/dev/null"]

