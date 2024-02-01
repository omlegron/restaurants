import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";
import {now, Document} from "mongoose";

@Schema({ versionKey: false, timestamps: true, collection: 'orders' })
export class Kitchen extends AbstractDocument {
    @Prop()
    orderId: number;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    price: number;

    @Prop({default: 'Pending'})
    status: string;

    @Prop({default: 'Not Confirm'})
    confirmation: string;

}

export const KitchenSchema = SchemaFactory.createForClass(Kitchen)