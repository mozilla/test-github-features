FROM node:18 as base


WORKDIR /app
COPY package*.json /app/

RUN /bin/bash <<EOF
npm install
EOF

FROM base as builder

COPY --from=base /app/node_modules /app/node_modules
COPY src package.json tsconfig.json /app/

RUN npm run build

FROM base as final

COPY --from=builder /app/dist /app/dist
COPY --from=base /app/package.json /app/package.json

RUN npm i --omit=dev --no-save

EXPOSE 3000


CMD ["npm", "run", "start"]

