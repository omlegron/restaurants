import { NestFactory } from '@nestjs/core';
import { KitchenModule } from './kitchen.module';
import { RmqService } from '@app/common/rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(KitchenModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('KITCHEN'));
  await app.startAllMicroservices();
}

bootstrap();
