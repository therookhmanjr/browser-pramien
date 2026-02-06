module.exports = function (app, diary, users) {

  app.post('/api/notes/create', (req, res) => {
    const user = users.getUserByToken(req.body.token);

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const note_id = diary.createNote(
      user.id,
      '',
      req.body.type,
      req.body.date,
      'Write your title here',
      'Write your text here'
    );

    return res.json({ id: note_id });
  });

  app.post('/api/notes/edit', (req, res) => {
    diary.editNote(
      req.body.id,
      req.body.x || 0,
      req.body.y || 0,
      req.body.width || 0,
      req.body.height || 0,
      req.body.text || '',
      req.body.title || ''
    );

    return res.sendStatus(200);
  });

  app.post('/api/notes/getByDate', (req, res) => {
    const user = users.getUserByToken(req.body.token);

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const notes = diary.getNotesByDate(user.id, req.body.date);

    return res.json(notes);
  });

  app.post('/api/notes/delete', (req, res) => {
    diary.deleteNote(req.body.id);
    return res.sendStatus(200);
  });

};