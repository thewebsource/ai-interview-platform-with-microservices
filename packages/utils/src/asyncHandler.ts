import {Request, Response, NextFunction, RequestHandler} from "express";

export const asyncHandler = (controller: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
};