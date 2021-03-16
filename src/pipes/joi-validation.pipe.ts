import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { abortEarly: false });

    if (error) {
      throw new BadRequestException(
        {
          statusCode: 400,
          message: error.details.map((e) => e.message).join(', '),
          errors: error.details.map((e) => {
            return {
              text: e.message,
              key: e.context.key,
            };
          }),
        },
        'Validation Error',
      );
    }
    return value;
  }
}
