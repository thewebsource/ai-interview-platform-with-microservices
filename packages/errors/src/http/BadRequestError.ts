import { CODES, STATUS_CODES } from "@repo/constants";
import { BaseError } from "../base/BaseError";

export class BadRequestError extends BaseError {

  statusCode = STATUS_CODES.BAD_REQUEST;
  code = CODES.BAD_REQUEST;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(
      this,
      BadRequestError.prototype
    );
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
  
}