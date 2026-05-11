import { CODES, STATUS_CODES } from "@repo/constants";
import { BaseError } from "../base/BaseError";

export class ValidationError extends BaseError {

  statusCode = STATUS_CODES.VALIDATION;
  code = CODES.VALIDATION;

  constructor(public errors: {field?: string; message: string}[]) {
    super("Validation failed");
    Object.setPrototypeOf(
      this,
      ValidationError.prototype
    );
  }

  serializeErrors() {
    return this.errors;
  }
  
}