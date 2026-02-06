module.exports = class Drive {
    constructor(db) {
        this.db = db;

        this.allowedOrigin = 'http://localhost:3000';

        this.db.run(`
      CREATE TABLE IF NOT EXISTS files(
        id INTEGER PRIMARY KEY,
        authorID INTEGER NOT NULL,
        filepath TEXT NOT NULL,
        createdAT INTEGER NOT NULL,
        access INTEGER,
        type TEXT NOT NULL,
        folderId INTEGER
      )
    `);

        this.db.run(`
      CREATE TABLE IF NOT EXISTS folders(
        id INTEGER PRIMARY KEY,
        authorID INTEGER NOT NULL,
        name TEXT NOT NULL,
        createdAT INTEGER NOT NULL,
        access INTEGER,
        image INTEGER
      )
    `);
    }

    createFile(authorID, filepath, createdAT, access = 0, type = 'userFile', folderId = null) {
        const id = this.size() + 1;

        this.db.run(
            `INSERT INTO files VALUES(?, ?, ?, ?, ?, ?, ?)`,
            [id, authorID, filepath, createdAT, access, type, folderId]
        );

        return id;
    }

    getFolder(id) {
        return this.db.get(
            `SELECT * FROM folders WHERE id = ?`,
            [id]
        );
    }

    size() {
        const row = this.db.get(`SELECT COUNT(id) as count FROM files`);
        return row.count;
    }

    getFile(id) {
        return this.db.get(
            `SELECT * FROM files WHERE id = ?`,
            [id]
        );
    }

    getFiles(userId = 0, folder = 0, type = 'userFile') {
        if (userId) {
            return this.db.all(
                `SELECT * FROM files WHERE authorID = ?`,
                [userId]
            );
        } else if (folder) {
            return this.db.all(
                `SELECT * FROM files WHERE folderId = ?`,
                [folder]
            );
        } else if (type) {
            return this.db.all(
                `SELECT * FROM files WHERE type = ?`,
                [type]
            );
        }
    }

    addCorsHeaders(response) {
        response.setHeader('Access-Control-Allow-Origin', this.allowedOrigin);
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
};