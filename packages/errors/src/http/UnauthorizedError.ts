import { CODES, STATUS_CODES } from "@repo/constants";
import { BaseError } from "../base/BaseError";

export class UnauthorizedError extends BaseError {

  statusCode = STATUS_CODES.UNAUTHORIZED;
  code = CODES.UNAUTHORIZED;

  constructor(public message = "Unauthorized") {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}