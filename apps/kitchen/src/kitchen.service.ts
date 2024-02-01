import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIF_SERVICE, KITCHEN_SERVICE } from 'apps/order/src/constants/services';
import { lastValueFrom } from 'rxjs';
import { KitchenRepository } from './kitchen.repository';

@Injectable()
export class KitchenService {
  constructor(private readonly kitchenRepository: KitchenRepository,
    @Inject(KITCHEN_SERVICE) private kitchenClient: ClientProxy
  ){}

  private readonly logger = new Logger(KitchenService.name)


  getHello(): string {
    return 'Hello World';
  }

  kitch(data: any){
    this.logger.log('Kitchen Recive, Order Confirmed', data)
  }

  proccess(data: any){
    this.logger.log('Kitchen Recive, Order Proccessed', data)
  }

  async updateOrder(data: any){
    const session = await this.kitchenRepository.startTransaction();
    try {
        const order = await this.kitchenRepository.findOneAndUpdate({orderId: data.order.orderId}, {status: 'Proccess'});
        await lastValueFrom(
          this.kitchenClient.emit('order_proccess', {
            order,
          }),
        );
        await session.commitTransaction();
        return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;

    }
  }

}
