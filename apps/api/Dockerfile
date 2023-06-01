# Primeira etapa: etapa de construção
FROM node:18.12.0-alpine 

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build api

COPY apps/api/entrypoint.sh ./entrypoint.sh
EXPOSE 3000

RUN yarn --cwd dist/apps/api

RUN ls dist/apps/api -al

RUN ls /app -al

RUN yarn

# ENTRYPOINT [ "sh", "entrypoint.sh" ]

CMD ["yarn", "start:prod"]
