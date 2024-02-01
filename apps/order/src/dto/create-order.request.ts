import {IsNotEmpty, isEmpty, IsEmail, IsPhoneNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrderRequest{
    // @isEmpty()
    orderId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    // @isEmpty()
    status: string;

    // @isEmpty()
    confirmation: string;
     
    @IsPositive()
    price: number;
  
}