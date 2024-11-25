import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards-status.enum";

export class StatusValidation implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {

    if (typeof value === 'string') {
      value = value.toUpperCase();
      return this.validate(value);
    } else {
      throw new BadRequestException('Status must be string');
    }
  }

  private validate(value) {
    if ([BoardStatus.PRIVATE, BoardStatus.PUBLIC].includes(value)) {
      return value;
    } else {
      throw new BadRequestException(`Status must be PUBLIC or PRIVATE`);
    };
  }
}