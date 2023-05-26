import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import { PrismaClient } from '@prisma/client';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import * as Tracing from '@sentry/tracing';

import { BaseException } from '@domain-core/exceptions';

import type { EnvironmentVariables } from '@main/config';
import { configValidationSchema } from '@main/config';

import { PrismaService } from './database/prisma';
import { HttpService } from './http-service';
import { SentryMonitorError } from './sentry';
import { JwtStrategy } from './strategy/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    HttpModule,
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    ScheduleModule.forRoot(),
    //forwardRef(() => AppModule),
    SentryModule.forRootAsync({
      inject: [ConfigService],
      imports: [],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        dsn: configService.get('SENTRY_DSN'),
        debug: true,
        tracesSampleRate: 1.0,
        profilesSampleRate: 1.0,
        attachStacktrace: true,
        environment: configService.get('NODE_ENV'),
        integrations: [
          new Sentry.Integrations.Http({ tracing: true }),
          new Tracing.Integrations.Express(),
          new ProfilingIntegration(),
          new Tracing.Integrations.Prisma({ client: new PrismaClient() }),
        ],
        logLevels: ['debug'],
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        beforeSend(event, hint) {
          const exception = hint.originalException;
          if (exception instanceof BaseException) {
            event.extra = {
              message: exception.message,
              metadata: exception.metadata,
            };
          }

          return event;
        },
      }),
    }),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        secret: configService.getOrThrow('JWT_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [
    HttpService,
    Logger,
    PrismaService,
    SentryMonitorError,
    {
      provide: APP_INTERCEPTOR,
      useFactory: (): SentryInterceptor => new SentryInterceptor(),
    },
    JwtStrategy,
  ],
  exports: [HttpService, Logger, PrismaService, SentryMonitorError, JwtModule],
})
export class InfraModule {}
