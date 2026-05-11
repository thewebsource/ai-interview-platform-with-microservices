import { CODES, STATUS_CODES } from "@repo/constants";
import { BaseError } from "../base/BaseError";

export class NotFoundError extends BaseError {

  statusCode = STATUS_CODES.NOT_FOUND;
  code = CODES.RESOURCE_NOT_FOUND;

  constructor(public message = "Resource not found") {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}