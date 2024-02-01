import { Controller, Get } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @Get()
  getHello(): string {
    return this.kitchenService.getHello();
  }

  @MessagePattern('order_created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.kitchenService.kitch(data);
    this.kitchenService.updateOrder(data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    // Acknowledge the message
    channel.ack(originalMsg);
  }

  @MessagePattern('order_proccess')
  async handleOrderProccess(@Payload() data: any, @Ctx() context: RmqContext) {
    this.kitchenService.proccess(data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    // Acknowledge the message
    channel.ack(originalMsg);
  }
}
