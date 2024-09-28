FROM node:lts-bullseye as build
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build

## Stage 2: Serve the app with nginx
FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]