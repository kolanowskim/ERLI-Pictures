import * as MYSQLService from "../services/mysqlService.js";
import { promises as fs } from "fs";

export const queueAddNewItem = async (url: string, uniqueID: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const path = `./public/images/image.${uniqueID}.png`;

    const data = {
      id: uniqueID,
      targetURL: `http://localhost:8393/images/image.` + uniqueID + ".png",
      finishDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      status: "completed",
    };

    const flag = await MYSQLService.addImage(data);

    if (flag === true) {
      fs.writeFile(path, buffer);
      console.log("Added - uniqueID");
    } else {
      console.error(
        "[queueService][queueAddNewItem], Image hasn't been added to database"
      );
    }
  } catch (error) {
    MYSQLService.updateStatus(uniqueID, "error");

    console.error(
      "[queueService][queueAddNewItem][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
  }
};
