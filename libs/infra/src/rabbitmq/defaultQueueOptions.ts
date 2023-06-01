import type { RmqOptions } from '@nestjs/microservices';

export const rabbitmqDefaultOptions: Pick<RmqOptions, 'options'> = {
  options: {
    prefetchCount: 1,
    persistent: true,
    noAck: false,
    queueOptions: {
      durable: true,
    },
    socketOptions: {
      heartbeatIntervalInSeconds: 60,
    },
  },
};
