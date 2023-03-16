import { Request, RequestHandler, Response } from "express";
import * as MYSQLService from "../services/mysqlService.js";
import { queueAddNewItem } from "../services/queueService.js";

const randomId = () => {
  return Math.random().toString(36).substring(2, 6);
};

export const addImage: RequestHandler = async (req: Request, res: Response) => {
  try {
    //It's UTC time but was quick to get it
    const addedTime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const url = req.body.url;

    const uniqueID = randomId() + Date.now();

    MYSQLService.addInitRecord({
      id: uniqueID,
      sourceURL: url,
      addedDate: addedTime,
      status: "inprogress",
    });

    queueAddNewItem(url, uniqueID);

    const urlStatus = `http://localhost:8393/status/${uniqueID}`;
    res.status(200).json({
      urlStatus,
    });
  } catch (error) {
    console.error(
      "[imagesController][addImage][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when adding new Image",
    });
  }
};

export const getImage: RequestHandler = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const image = await MYSQLService.getImage(id);
    res.status(200).json({
      image,
    });
  } catch (error) {
    console.error(
      "[imagesController][getImage][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when getting the image",
    });
  }
};

export const getAllImages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const images = await MYSQLService.getAllImages();
    res.status(200).json({
      images,
    });
  } catch (error) {
    console.error(
      "[imagesController][getAllImages][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when getting all images",
    });
  }
};
