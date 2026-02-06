module.exports = class Player {
  constructor(db) {
    this.db = db;

    this.db.run(`
      CREATE TABLE IF NOT EXISTS videos(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        authorID INTEGER NOT NULL,
        videoFileID INTEGER NOT NULL,
        previewFileID INTEGER,
        createdAT INTEGER NOT NULL,
        access INTEGER
      )
    `);
  }

  createVideo(name, description, authorID, videoFileID, previewFileID, createdAT, access = 0) {
    const id = this.size() + 1;

    this.db.run(
      `INSERT INTO videos VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, description, authorID, videoFileID, previewFileID, createdAT, access]
    );

    return id;
  }

  getVideo(id) {
    return this.db.get(
      `SELECT * FROM videos WHERE id = ?`,
      [id]
    );
  }

  size() {
    const row = this.db.get(`SELECT COUNT(id) as count FROM videos`);
    return row.count;
  }

  getAllVideos() {
    return this.db.all(`SELECT * FROM videos`);
  }
};