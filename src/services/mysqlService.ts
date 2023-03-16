import { execute } from "./mysqlConnector.js";
import { sqlQueries } from "./mysqlQueries.js";

type Image = {
  id: string;
  sourceURL: string;
  targetURL: string;
  addedDate: string;
  finishDate: string;
  status: string;
};

type ImageINIT = {
  id: string;
  sourceURL: string;
  addedDate: string;
  status: string;
};

type ImageUPDATE = {
  id: string;
  targetURL: string;
  finishDate: string;
  status: string;
};

type Images = [Image];

/* export const getMaxId = async () => {
  // console.log(await execute(sqlQueries.maxId, ""));
  return execute<{ id: number }>(sqlQueries.maxId, []);
}; */

export const addImage = async (img: ImageUPDATE) => {
  const result = await execute<{ affectedRows: number }>(sqlQueries.addImage, [
    img.targetURL,
    img.finishDate,
    img.status,
    img.id,
  ]);

  return result.affectedRows > 0;
};

export const getImage = async (id: string) => {
  return execute<Image>(sqlQueries.getImage, [id]);
};

export const getAllImages = async () => {
  return execute<Images>(sqlQueries.getAllImages, []);
};

export const getStatus = async (id: string) => {
  return execute<{ id: string }>(sqlQueries.getStatus, [id]);
};

export const addInitRecord = async (img: ImageINIT) => {
  const result = await execute<{ affectedRows: number }>(
    sqlQueries.insertInitRecord,
    [img.id, img.sourceURL, img.addedDate, img.status]
  );

  return result.affectedRows > 0;
};

export const updateStatus = async (id: string, status: string) => {
  execute(sqlQueries.updateStatus, [status, id]);
};
