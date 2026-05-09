import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import { sendErrorsResponse } from "@repo/utils";
import { STATUS_CODES } from "@repo/constants";

export const validateRequest = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body || {},
        params: req.params,
        query: req.query,
      }) as any;

      if (parsed.body) {
        req.body = parsed.body;
      }
      next();

    } catch (error: any) {
      console.error(`[validateRequest] Validation Error:`, error);
      return sendErrorsResponse(res, STATUS_CODES.BAD_REQUEST, error.issues || [error.message]);
    }
};
