module.exports = class Nightly {
  constructor(db) {
    this.db = db;

    this.db.run(`
      CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        author INTEGER NOT NULL,
        file INTEGER NOT NULL,
        album INTEGER,
        image INTEGER
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS albums (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        author INTEGER NOT NULL,
        image INTEGER
      )
    `);
  }

  createSong(title, author, file, album = null, image = null) {
    const id = this.sizeSongs() + 1;

    this.db.run(
      `INSERT INTO songs VALUES(?, ?, ?, ?, ?, ?)`,
      [id, title, author, file, album, image]
    );

    return id;
  }

  createAlbum(title, author, image) {
    const id = this.sizeAlbums() + 1;

    this.db.run(
      `INSERT INTO albums VALUES(?, ?, ?, ?)`,
      [id, title, author, image]
    );

    return id;
  }

  sizeSongs() {
    const row = this.db.get(`SELECT COUNT(id) as count FROM songs`);
    return row.count;
  }

  sizeAlbums() {
    const row = this.db.get(`SELECT COUNT(id) as count FROM albums`);
    return row.count;
  }

  getSong(id) {
    return this.db.get(
      `SELECT * FROM songs WHERE id = ?`,
      [id]
    );
  }

  getAllSongs() {
    return this.db.all(`SELECT * FROM songs`);
  }

  getSongByAuthor(author) {
    return this.db.all(
      `SELECT * FROM songs WHERE author = ?`,
      [author]
    );
  }

  getSongsFromAlbum(albumId) {
    return this.db.all(
      `SELECT * FROM songs WHERE album = ?`,
      [albumId]
    );
  }

  getAlbum(id) {
    const album = this.db.get(
      `SELECT * FROM albums WHERE id = ?`,
      [id]
    );

    if (!album) return null;

    const songs = this.getSongsFromAlbum(album.id);

    return {
      title: album.title,
      author: album.author,
      image: album.image,
      songs
    };
  }

  getAlbumsByAuthor(author) {
    return this.db.all(
      `SELECT * FROM albums WHERE author = ?`,
      [author]
    );
  }

  deleteAlbum(id) {
    this.db.run(
      `DELETE FROM albums WHERE id = ?`,
      [id]
    );
  }

  deleteSong(id) {
    this.db.run(
      `DELETE FROM songs WHERE id = ?`,
      [id]
    );
  }
};