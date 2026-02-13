FROM node:25 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli@21
# RUN npm ci
RUN npm i --legacy-peer-deps
COPY . .
RUN ng build


# EXPOSE 4200
# RUN ng build
# CMD ["ng", "serve", "--host", "0.0.0.0"]

# Stage 2: Запуск nginx
FROM nginx:alpine

# Меняем конфиг nginx-а на собственный
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранное приложение из предыдущего этапа в рабочую директорию nginx
COPY --from=build /app/dist/front/browser /usr/share/nginx/html
EXPOSE 8080

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
