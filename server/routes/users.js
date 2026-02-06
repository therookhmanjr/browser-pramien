module.exports = function (app, users) {
    const crypto = require('crypto');

    function sha256(message) {
        return crypto.createHash('sha256').update(message).digest('hex');
    }

    app.post('/api/register', async (req, res) => {
        try {
            console.log("REGISTER HIT");

            const login = req.body.login;
            const email = req.body.email;
            const password = req.body.password;

            if (!login || !email || !password) {
                return res.status(400).json({ error: "Missing fields" });
            }

            const existing = await users.getUserByLogin(login);

            if (existing) {
                return res.json({ error: "Already exists" });
            }

            const crypto = require('crypto');
            const fs = require('node:fs');

            const hashedPassword = crypto
                .createHash('sha256')
                .update(password)
                .digest('hex');

            const user = await users.createUser(login, hashedPassword, email);

            fs.mkdirSync(`./files/${user.id}`, { recursive: true });

            return res.json({ token: user.token });

        } catch (err) {
            console.error("REGISTER ERROR:", err);

            return res.status(500).json({
                error: "Internal server error"
            });
        }
    });

    app.post('/api/login', async (req, res) => {
        const login = req.body.login;
        const password = req.body.password;
        const user = await users.getUserByLogin(login);

        if (!user) {
            return res.json({ error: "invalid login or password" })
        }

        if (user.password === sha256(password)) {
            return res.json({ token: user.token })
        }
        else {
            return res.json({ error: "invalid login or password" })
        }
    })
}