module.exports = function (app, drive, users, videos) {

  app.post('/api/uploadVideo', (req, res) => {
    try {
      const user = users.getUserByToken(req.body.token);

      if (!user) {
        return res.status(401).json({ error: "Invalid token" });
      }

      if (!req.files || !req.files.videoFile || !req.files.previewFile) {
        return res.status(400).json({ error: "Files missing" });
      }

      const videoFile = req.files.videoFile;
      const previewFile = req.files.previewFile;

      const videoName = Buffer.from(videoFile.name, 'latin1').toString('utf-8');
      const previewName = Buffer.from(previewFile.name, 'latin1').toString('utf-8');

      const videoPath = `./files/${user.id}/${videoName}`;
      const previewPath = `./files/${user.id}/${previewName}`;

      videoFile.mv(videoPath, () => {
        previewFile.mv(previewPath, () => {

          const videoFileID = drive.createFile(user.id, videoPath, Date.now());
          const previewFileID = drive.createFile(user.id, previewPath, Date.now());

          const videoID = videos.createVideo(
            req.body.name,
            req.body.description,
            user.id,
            videoFileID,
            previewFileID,
            Date.now()
          );

          return res.json({ videoID });
        });
      });

    } catch (e) {
      console.error("UPLOAD VIDEO ERROR:", e);
      return res.status(500).json({ error: e.message });
    }
  });

  app.post('/api/getVideo', (req, res) => {
    const video = videos.getVideo(req.body.id);

    if (!video) return res.status(404).json({ error: "Not found" });

    video.author = users.getUserById(video.authorID);
    video.file = drive.getFile(video.videoFileID);

    return res.json(video);
  });

  app.post('/api/getAllVideos', (req, res) => {
    const list = videos.getAllVideos();

    for (const video of list) {
      video.author = users.getUserById(video.authorID);
      video.file = drive.getFile(video.videoFileID);
    }

    return res.json(list);
  });

};