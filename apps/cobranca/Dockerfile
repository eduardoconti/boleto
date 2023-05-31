# Primeira etapa: etapa de construção
FROM node:18.12.0-alpine 

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build cobranca

EXPOSE 3001

RUN yarn --cwd dist/apps/cobranca

RUN ls dist/apps/cobranca -al

RUN ls /app -al

RUN yarn

CMD ["yarn", "start:consumer-csv:prod"]
