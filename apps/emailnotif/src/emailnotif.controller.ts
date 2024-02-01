import { Controller, Get } from '@nestjs/common';
import { EmailnotifService } from './emailnotif.service';
import { Ctx, MessagePattern, Payload, RmqContext, EventPattern } from '@nestjs/microservices';


@Controller()
export class EmailnotifController {
  constructor(private readonly emailnotifService: EmailnotifService) {}

  @Get()
  getHello(): string {
    return this.emailnotifService.getHello();
  }

  @MessagePattern('order_notify')
  async handleOrderNotification(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('asdas')
    this.emailnotifService.notif(data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    // Acknowledge the message
    channel.ack(originalMsg);
  }
}
