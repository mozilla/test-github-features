FROM node:18 as base

WORKDIR /app

RUN --mount=type=bind,src=package.json,dst=/app/package.json \
  npm install

RUN \
  --mount=type=bind,src=package.json,dst=/app/package.json \
  --mount=type=bind,src=src,dst=/app/src/ \
  --mount=type=bind,src=tsconfig.json,dst=/app/tsconfig.json \
  npm run build

FROM base as final

ARG VERSION="base"

ENV VERSION=${VERSION}

COPY --from=base /app/dist /app/dist
COPY package.json /app/package.json

RUN npm i --omit=dev --no-save

EXPOSE 3000

