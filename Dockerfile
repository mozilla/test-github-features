FROM node:18 as base

RUN useradd --system --no-create-home --home-dir /app --shell /usr/sbin/nologin nonroot

WORKDIR /app
COPY --chown=nonroot package*.json /app/

RUN /bin/bash <<EOF
npm install
EOF

FROM base as builder

COPY --chown=nonroot --from=base /app/node_modules /app/node_modules
COPY --chown=nonroot src package.json tsconfig.json /app/

RUN npm run build

FROM base as final

COPY --chown=nonroot --from=builder /app/dist /app/dist
COPY --chown=nonroot --from=base /app/package.json /app/package.json

RUN npm i --omit=dev --no-save

USER nonroot

RUN chown -R nonroot /app

EXPOSE 3000

CMD ["npm", "run", "start"]

