export const sqlQueries = {
  maxId: `SELECT MAX(id) as id FROM images`,
  addImage: `
  UPDATE  images SET targetURL = ?, finishDate = ?, status = ? WHERE id = ?;
    `,

  getImage: `
    SELECT * FROM images WHERE id = ?;
    `,

  getStatus: `
    SELECT status FROM images WHERE id = ?;
    `,
  getAllImages: `
    SELECT * FROM images ORDER BY addedDate DESC;
    `,
  insertInitRecord: `
    INSERT INTO images (id, sourceURL, addedDate, status)
    VALUES (?, ?, ?, ?);
    `,

  updateStatus: `
    UPDATE  images SET status = ? WHERE id = ?;
    `,
};
