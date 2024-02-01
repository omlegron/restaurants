import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRequest } from './dto/create-order.request'
import { urid } from 'urid';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  @Post()
  async createOrder(@Body() request: CreateOrderRequest){
    // console.log('request', request);
    request.orderId = this.generateRandomNumber(1, 957);
    request.status = 'Pending';
    request.confirmation = 'Not Confirm';
    return this.orderService.createOrder(request);
  }

  @Get()
  async getOrders() {
    return this.orderService.getOrder();
  }
}
