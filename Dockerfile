FROM node:20.9.0
COPY ./src /usr/src/frontend
WORKDIR /usr/src/frontend

RUN cd node_modules && ls
ENV HOST=0.0.0.0
ARG SENTRY_DSN SENTRY_ENV SENTRY_RELEASE BUILD_MODE

RUN yarn install --frozen-lockfile

CMD ["yarn", "run", "dev"]