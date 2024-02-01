import { Module } from '@nestjs/common';
import { EmailnotifController } from './emailnotif.controller';
import { EmailnotifService } from './emailnotif.service';
import { DatabaseModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EmailnotifRepository } from './emailnotif.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Emailnotif, EmailnotifSchema } from './schema/emailnotif.schema';
import { NOTIF_SERVICE, KITCHEN_SERVICE } from 'apps/order/src/constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_NOTIFY_QUEUE: Joi.string().required()
      }),
      envFilePath: './apps/emailnotif/.env'
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Emailnotif.name, schema: EmailnotifSchema }]),
    RmqModule.register({
      name: KITCHEN_SERVICE
    }),
  ],
  controllers: [EmailnotifController],
  providers: [EmailnotifService, EmailnotifRepository],
})
export class EmailnotifModule {}

