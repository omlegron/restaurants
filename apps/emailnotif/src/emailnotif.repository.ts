import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@app/common";
import { Emailnotif } from "./schema/emailnotif.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Model, Connection } from "mongoose";


@Injectable()
export class EmailnotifRepository extends AbstractRepository<Emailnotif> {
  protected readonly logger = new Logger(EmailnotifRepository.name);

  constructor(
    @InjectModel(Emailnotif.name) orderEmailnotifModel: Model<Emailnotif>,
    @InjectConnection() connection: Connection,
  ){
    super(orderEmailnotifModel, connection);
  }
}