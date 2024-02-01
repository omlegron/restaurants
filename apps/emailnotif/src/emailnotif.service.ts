import { Injectable, Logger, Inject } from '@nestjs/common';
import { EmailnotifRepository } from './emailnotif.repository';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIF_SERVICE, KITCHEN_SERVICE } from 'apps/order/src/constants/services';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EmailnotifService {
  constructor(private readonly emailnotifRepository: EmailnotifRepository,
    @Inject(KITCHEN_SERVICE) private kitchenClient: ClientProxy
  ){}
  private readonly logger = new Logger(EmailnotifService.name)

  getHello(): string {
    return 'Hello World';
  }

  async notif(data: any){
    this.logger.log('Email sent for order confirmation: ', data)
    const session = await this.emailnotifRepository.startTransaction();
    try {
        const order = await this.emailnotifRepository.findOneAndUpdate({orderId: data.request.orderId}, {confirmation: 'Confirmed'});
        await lastValueFrom(
          this.kitchenClient.emit('order_created', {
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
