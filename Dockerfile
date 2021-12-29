FROM node

WORKDIR .
COPY . .
RUN npm install
EXPOSE 4001

CMD ["node", "./index.js"]
