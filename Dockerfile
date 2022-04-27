FROM node:lts-alpine as build
WORKDIR /app

# Copy the package.json as well as the package-lock.json and install
# the dependencies. This is a separate step so the dependencies
# will be cached unless changes to one of those two files
# are made.
COPY package.json package-lock.json ./
RUN npm install

# Copy the main application
COPY . ./

# Build the application
RUN npm run build

FROM nginx:1.17.0-alpine
#!/bin/sh

## Remove default nginx index page
RUN rm -rf /var/www/*

# Copy from the stahg 1
COPY --from=build /app/dist /var/www

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

