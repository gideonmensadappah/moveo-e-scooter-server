import { Injectable, PipeTransform } from '@nestjs/common';
import { Types, isObjectIdOrHexString } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe
  implements PipeTransform<string, Types.ObjectId>
{
  transform(value: string) {
    if (isObjectIdOrHexString(value)) {
      return new Types.ObjectId(value);
    }
    throw new Error('Value must be an ObjectId');
  }
}
