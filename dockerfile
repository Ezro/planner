FROM node:18

WORKDIR /src

# COPY package*.json ./
COPY . .

RUN npm install
# RUN npm run build
EXPOSE 8080
CMD ["vite", "preview"]