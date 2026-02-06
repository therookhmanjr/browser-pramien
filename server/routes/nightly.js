module.exports = function (app, drive, users, nightly) {

  app.post('/api/nightly/upload', (req, res) => {
    try {
      const user = users.getUserByToken(req.body.token);

      if (!user) {
        return res.status(401).json({ error: "Invalid token" });
      }

      if (!req.files || !req.files.file) {
        return res.status(400).json({ error: "No file" });
      }

      const file = req.files.file;
      const fileName = Buffer.from(file.name, 'latin1').toString('utf-8');
      const path = `./files/${user.id}/${fileName}`;

      file.mv(path, () => {
        const fileID = drive.createFile(user.id, path, Date.now());
        const songID = nightly.createSong(req.body.name, user.id, fileID, 0);

        return res.json({ songID });
      });

    } catch (e) {
      console.error("NIGHTLY UPLOAD ERROR:", e);
      return res.status(500).json({ error: e.message });
    }
  });

  app.post('/api/getSong', (req, res) => {
    const song = nightly.getSong(req.body.id);

    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    song.author = users.getUserById(song.author);
    song.file = drive.getFile(song.file);

    return res.json(song);
  });

  app.post('/api/getAllSongs', (req, res) => {
    const songs = nightly.getAllSongs();

    for (const song of songs) {
      song.author = users.getUserById(song.author);
      song.file = drive.getFile(song.file);
    }

    return res.json(songs);
  });

  app.post('/api/getSongsByUser', (req, res) => {
    const user = users.getUserByToken(req.body.token);

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const songs = nightly.getSongByAuthor(user.id);

    for (const song of songs) {
      song.author = users.getUserById(song.author);
      song.file = drive.getFile(song.file);
    }

    return res.json(songs);
  });

};