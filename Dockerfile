ARG HOME=/app UID=9500 GID=9500 VERSION="base"
ARG NODE_ENV=production

# Define the base image, here we are root.
FROM node:18 as base

RUN touch /is-docker

# Define the user and working directory, everything from this is user land
FROM base as user

ARG HOME UID GID

RUN <<EOF
groupadd -g ${GID} user
useradd -u ${UID} -g ${GID} -s /sbin/nologin -d ${HOME} user
EOF

USER user
WORKDIR ${HOME}

FROM user as install

ARG HOME NODE_ENV

ENV NODE_ENV=${NODE_ENV}

RUN \
  --mount=type=bind,source=Makefile,target=${HOME}/Makefile \
  --mount=type=bind,source=package.json,target=${HOME}/package.json \
  --mount=type=bind,source=package-lock.json,target=${HOME}/package-lock.json \
  npm install --loglevel=verbose --no-save

FROM install as build

ARG HOME NODE_ENV
ENV NODE_ENV=${NODE_ENV}

RUN \
  --mount=type=bind,source=src,target=${HOME}/src \
  --mount=type=bind,source=package.json,target=${HOME}/package.json \
  --mount=type=bind,source=package-lock.json,target=${HOME}/package-lock.json \
  --mount=type=bind,source=tsconfig.json,target=${HOME}/tsconfig.json \
  npm run build

FROM install as final

ARG HOME VERSION

ENV VERSION=${VERSION}

COPY --from=build ${HOME}/dist ${HOME}/dist
COPY package.json package-lock.json ${HOME}/

EXPOSE 3000

