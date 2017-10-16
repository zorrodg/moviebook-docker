FROM node:alpine
WORKDIR /usr/src

# Copy files
COPY app/ ./app
COPY package.json .
COPY nuxt.config.js .

RUN yarn --prod

EXPOSE 3000
ENV HOST 0.0.0.0
ENV nodeCmd start

RUN yarn run build
RUN mkdir static
RUN cp -R .nuxt/dist/* static/

ENTRYPOINT yarn run $nodeCmd

