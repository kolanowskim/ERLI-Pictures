import { Request, RequestHandler, Response } from "express";
import * as MYSQLService from "../services/mysqlService.js";

export const checkStatus: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;

  try {
    const result = await MYSQLService.getStatus(id);
    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[statusController][checkStatus][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when checking the image status",
    });
  }
};
