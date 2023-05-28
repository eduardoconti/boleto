import type { RmqOptions } from '@nestjs/microservices';

export const rabbitmqDefaultOptions: Pick<RmqOptions, 'options'> = {
  options: {
    prefetchCount: 20,
    persistent: true,
    noAck: false,
    queueOptions: {
      durable: true,
    },
  },
};
