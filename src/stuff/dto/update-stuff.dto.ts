import { PartialType } from '@nestjs/mapped-types';

export class UpdateStuffDto  {
    first_name: string;
    last_name: string;
    image: string;
    tel: string;
    email: string;
    telegram_name: string
}
