import type { RmqOptions } from '@nestjs/microservices';

export const rabbitmqDefaultOptions: Pick<RmqOptions, 'options'> = {
  options: {
    prefetchCount: 5,
    persistent: true,
    noAck: false,
    queueOptions: {
      durable: true,
    },
  },
};
