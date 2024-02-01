import { Module } from '@nestjs/common';
import { KitchenController } from './kitchen.controller';
import { KitchenService } from './kitchen.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { KitchenRepository } from './kitchen.repository';
import { DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KitchenSchema, Kitchen } from './schema/kitchen.schema';
import { NOTIF_SERVICE, KITCHEN_SERVICE } from 'apps/order/src/constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_KITCHEN_QUEUE: Joi.string().required()
      }),
      envFilePath: './apps/kitchen/.env'
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Kitchen.name, schema: KitchenSchema }]),
    RmqModule.register({
      name: KITCHEN_SERVICE
    }),
  ],
  controllers: [KitchenController],
  providers: [KitchenService, KitchenRepository],
})
export class KitchenModule {}
