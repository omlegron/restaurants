import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrderRepository } from './order.repository';
import { NOTIF_SERVICE, KITCHEN_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository, 
    @Inject(NOTIF_SERVICE) private notifyClient: ClientProxy,
  ){}

  async createOrder(request: CreateOrderRequest){
    const session = await this.orderRepository.startTransaction();

    try {
      const order = await this.orderRepository.create(request, {session});
        await lastValueFrom(
          this.notifyClient.emit('order_notify', {
            request,
          }),
        );
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;

    }
  }

  async getOrder() {
    return this.orderRepository.find({});
  }
}
