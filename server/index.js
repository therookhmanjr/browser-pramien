const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const DDG = require('duck-duck-scrape');
var fileupload = require("express-fileupload");
var fs = require('fs-extra');
const app = express();
const PORT = 8080;
let searchCache = {}

const Drive = require('./database/drive');
const Users = require('./database/users');
const Player = require('./database/player');
const Diary = require('./database/diary');
const Nightly = require('./database/nightly');

let users, drive, videos, diary, nightly;

app.use(cors());
app.use(express.json());
app.use('/files', express.static('files'))
app.use(fileupload());

app.post("/api/search", async (req, res) => {
    if (req.body.q == "") return res.json({ "results": [{ title: "nothing found", icon: "", description: "", url: "" }] })
    if (req.body.q in searchCache) return res.json({ "results": searchCache[req.body.q] });
    else {
        try {
            const searchResults = await DDG.search(req.body.q);
            searchCache[req.body.q] = searchResults.results;
            return res.json({ "results": searchResults.results });
        }
        catch {
            return res.status(500).send('Not too fast!');
        }
    }
});

app.get('/', (req, res) => {
    res.send('OK');
});

// DB init
const db = new Database(__dirname + '/database.db');

const dbAdapter = {
    run: (sql, params = []) => {
        const stmt = db.prepare(sql);
        return stmt.run(...params);
    },
    get: (sql, params = []) => {
        const stmt = db.prepare(sql);
        return stmt.get(...params);
    },
    all: (sql, params = []) => {
        const stmt = db.prepare(sql);
        return stmt.all(...params);
    }
};

drive = new Drive(dbAdapter);
users = new Users(dbAdapter);
videos = new Player(dbAdapter);
diary = new Diary(dbAdapter);
nightly = new Nightly(dbAdapter);

// ROUTES СНАЧАЛА
require('./routes/users')(app, users);
require('./routes/drive')(app, drive, users);
require('./routes/player')(app, drive, users, videos);
require('./routes/diary')(app, diary, users);
require('./routes/nightly')(app, drive, users, nightly);

// ТОЛЬКО ПОТОМ listen
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
