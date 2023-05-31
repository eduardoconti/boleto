# Primeira etapa: etapa de construção
FROM node:18.12.0-alpine 

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build webhook

EXPOSE 3002

RUN yarn --cwd dist/apps/webhook

RUN ls dist/apps/webhook -al

RUN ls /app -al

RUN yarn

# ENTRYPOINT [ "sh", "entrypoint.sh" ]

CMD ["yarn", "start:consumer-webhook:prod"]
