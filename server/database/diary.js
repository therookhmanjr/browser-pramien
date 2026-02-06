module.exports = class Diary {
  constructor(db) {
    this.db = db;

    this.db.run(`
      CREATE TABLE IF NOT EXISTS notes(
        id INTEGER PRIMARY KEY,
        authorID INTEGER NOT NULL,
        image TEXT NOT NULL,
        type TEXT NOT NULL,
        date DATETIME,
        title TEXT,
        text TEXT,
        x INT,
        y INT,
        width INT,
        height INT
      )
    `);
  }

  createNote(authorID, image, type, date, title, text) {
    const id = this.size() + 1;

    this.db.run(
      `INSERT INTO notes VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, authorID, image, type, date, title, text, 0, 0, 200, 200]
    );

    return id;
  }

  getNote(id) {
    return this.db.get(
      `SELECT * FROM notes WHERE id = ?`,
      [id]
    );
  }

  deleteNote(id) {
    this.db.run(
      `DELETE FROM notes WHERE id = ?`,
      [id]
    );
  }

  editNote(id, x = 0, y = 0, width = 0, height = 0, text = '', title = '') {
    if (x !== undefined && y !== undefined) {
      this.db.run(
        `UPDATE notes SET x = ?, y = ? WHERE id = ?`,
        [x, y, id]
      );
    }

    if (width !== undefined && height !== undefined) {
      this.db.run(
        `UPDATE notes SET width = ?, height = ? WHERE id = ?`,
        [width, height, id]
      );
    }

    if (text !== undefined) {
      this.db.run(
        `UPDATE notes SET text = ? WHERE id = ?`,
        [text, id]
      );
    }

    if (title !== undefined) {
      this.db.run(
        `UPDATE notes SET title = ? WHERE id = ?`,
        [title, id]
      );
    }
  }

  getNotesByDate(authorID, date) {
    return this.db.all(
      `SELECT * FROM notes WHERE authorID = ? AND date = ?`,
      [authorID, date]
    );
  }

  size() {
    const row = this.db.get(`SELECT COUNT(id) as count FROM notes`);
    return row.count;
  }
};