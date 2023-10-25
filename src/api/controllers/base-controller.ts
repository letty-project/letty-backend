import {
  Request,
  Response,
} from "express";
import {
  UserService,
} from "src/core";

const hit = async (req: Request, res: Response) => {
  //const isOK = await UserService.itsOK();
  //return res.status(200).json({ data: isOK });
};

export const BaseController = {
  hit,
};
