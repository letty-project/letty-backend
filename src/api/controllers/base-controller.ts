import {
  Request,
  Response,
} from "express";
import {
  BaseService,
} from "src/core";

const hit = async (req: Request, res: Response) => {
  const isOK = BaseService.itsOK();
  return res.status(200).json({ data: isOK });
};

export const BaseController = {
  hit,
};
