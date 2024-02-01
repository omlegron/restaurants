import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@app/common";
import { Kitchen } from "./schema/kitchen.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Model, Connection } from "mongoose";


@Injectable()
export class KitchenRepository extends AbstractRepository<Kitchen> {
  protected readonly logger = new Logger(KitchenRepository.name);

  constructor(
    @InjectModel(Kitchen.name) orderKitchenModel: Model<Kitchen>,
    @InjectConnection() connection: Connection,
  ){
    super(orderKitchenModel, connection);
  }
}