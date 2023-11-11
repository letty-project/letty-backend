import {
  ClassConstructor,
  plainToInstance,
} from "class-transformer";
import {
  validate,
} from "class-validator";
import {
  NextFunction,
  Request,
  Response,
} from "express";

export const validateMiddleware = <T extends object>(target: ClassConstructor<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const body = plainToInstance(target, req.body);
    const errors = await validate(body, { whitelist: true, forbidNonWhitelisted: true });
    if (errors.length > 0) {
      const message = errors.reduce((p, c) => {
        return p.concat(Object.values<string>(c.constraints!));
      }, [] as string[]);
      return res.status(400).json({
        code: "Bad Request",
        message,
      });
    }
    req.body = Object.setPrototypeOf(req.body, target.prototype);
    return next();
  };
};
