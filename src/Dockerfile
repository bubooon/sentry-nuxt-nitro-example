FROM node:20.9.0
COPY ./src /usr/src/frontend
WORKDIR /usr/src/frontend
ENV HOST=0.0.0.0
RUN yarn run prepare:app
RUN yarn run build:app
CMD ["yarn run start:app"]