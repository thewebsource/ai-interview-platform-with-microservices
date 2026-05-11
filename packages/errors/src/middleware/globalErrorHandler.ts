import { Request, Response, NextFunction } from "express";
import { BaseError } from "../base/BaseError";
import { CODES, COMMON_ERROR_MESSAGE, STATUS_CODES } from "@repo/constants";

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  console.error(err);

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
      statusCode: err.statusCode,
      errors: err.serializeErrors(),
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(500).json({
    success: false,
    message: COMMON_ERROR_MESSAGE.INTERNALSERVER,
    code: CODES.INTERNALSERVER,
    statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
    errors: [],
    timestamp: new Date().toISOString(),
  });
};