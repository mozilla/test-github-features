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

FROM user as build

ARG HOME
# Always development for building as we need to build the code
ENV NODE_ENV=development

RUN \
  --mount=type=bind,source=src,target=${HOME}/src \
  --mount=type=bind,source=package.json,target=${HOME}/package.json \
  --mount=type=bind,source=package-lock.json,target=${HOME}/package-lock.json \
  --mount=type=bind,source=tsconfig.json,target=${HOME}/tsconfig.json \
  <<EOF
npm install --loglevel=verbose --no-save
npm run build
EOF

FROM user as final

ARG HOME VERSION NODE_ENV

ENV VERSION=${VERSION} NODE_ENV=${NODE_ENV}

COPY --from=build ${HOME}/dist ${HOME}/dist
COPY package.json package-lock.json ${HOME}/

RUN npm install --loglevel=verbose --no-save

EXPOSE 3000

