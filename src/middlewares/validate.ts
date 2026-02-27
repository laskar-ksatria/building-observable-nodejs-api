import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import HttpError, { errorStates } from "../errors";

export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ");
        next(new HttpError({ ...errorStates.invalidInput, message }));
      } else {
        next(err);
      }
    }
  };
};
