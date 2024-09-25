FROM node:lts-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
ENV NODE_ENV=production
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/nginx/nginx.conf /etc/nginx/
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
