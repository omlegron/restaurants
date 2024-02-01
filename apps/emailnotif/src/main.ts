import { NestFactory } from '@nestjs/core';
import { EmailnotifModule } from './emailnotif.module';
import { RmqService } from '@app/common/rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(EmailnotifModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('NOTIFY'));
  await app.startAllMicroservices();
}
bootstrap();
