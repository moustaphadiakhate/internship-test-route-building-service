FROM node:carbon-alpine

ENV BUILD_PACKAGES="bash build-base" \
    APP_DIR="/usr/src/app"

RUN apk update && \
    apk upgrade && \
    apk add --update $BUILD_PACKAGES && \
    rm -rf /var/cache/apk/* && \
    mkdir -p $APP_DIR

WORKDIR ${APP_DIR}

COPY .env .
COPY app/package.json .
RUN npm install

COPY app/. .

EXPOSE 3000
CMD [ "npm", "start" ]
