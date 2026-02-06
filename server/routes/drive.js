module.exports = function (app, drive, users) {
    app.post('/api/upload', (req, res) => {
        try {
            drive.addCorsHeaders(res);

            if (!req.files || !req.files.file) {
                return res.status(400).json({ error: "No file" });
            }

            const user = users.getUserByToken(req.body.token);

            if (!user) {
                return res.status(401).json({ error: "Invalid token" });
            }

            const file = req.files.file;
            const fileName = Buffer.from(file.name, 'latin1').toString('utf-8');

            const path = `./files/${user.id}/${fileName}`;

            file.mv(path, () => {
                const fileID = drive.createFile(user.id, path, Date.now());
                return res.json({ fileID });
            });

        } catch (e) {
            console.error("UPLOAD ERROR:", e);
            return res.status(500).json({ error: e.message });
        }
    });

    app.post('/api/getFilesByUser', async (req, res) => {
        drive.addCorsHeaders(res);
        const user = await users.getUserByToken(req.body.token);
        if (!user || !user.id) {
            return res.status(404).json({ error: "User not found" });
        }
        const files = await drive.getFiles(user.id);

        return res.status(200).json(files);
    });

    app.post('/api/getFilesByFolder', async (req, res) => {
        drive.addCorsHeaders(res);
        const user = await users.getUserByToken(req.body.token);
        if (!user || !user.id) {
            return res.status(404).json({ error: "User not found" });
        }
        const folder = await drive.getFolder(req.body.id);

        if (!folder || folder.authorID !== user.id) {
            return res.status(403).json({ error: "You don't have permission to access this folder" });
        }

        const files = await drive.getFiles(folder.id);
        return res.status(200).json(files);
    });

    app.get('/download', async (req, res) => {
        const file = await drive.getFile(req.query.fileid);
        console.log(file.id);
        res.download(file.filepath); // Set disposition and send it.
    });
}
