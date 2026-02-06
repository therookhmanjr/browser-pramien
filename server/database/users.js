module.exports = class Users {
    constructor(db) {
        this.db = db;

        this.db.run(`
        CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        login TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        birthday INT,
        fullName TEXT,
        country TEXT,
        gender TEXT,
        token TEXT
        )
    `);
    }

    getUserById(id) {
        return this.db.get(
            `SELECT * FROM users WHERE id=?`,
            [id]
        );
    }

    getUserByLogin(login) {
        return this.db.get(
            `SELECT * FROM users WHERE login=?`,
            [login]
        );
    }

    countUsers() {
        const row = this.db.get(`SELECT COUNT(id) as count FROM users`);
        return row.count;
    }

    createUser(login, password, email, birthday = 0, fullName = '', country = '', gender = '') {
        const id = this.countUsers() + 1;
        const token = this.createToken(18);

        this.db.run(
            `INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, login, password, email, birthday, fullName, country, gender, token]
        );

        return this.getUserById(id);
    }

    updateUser(id, login = '', password = '', email = '', birthday = 0, fullName = '', country = '', gender = '') {
        this.db.run(
            `UPDATE users SET login = ?, password = ?, email = ?, birthday = ?, fullName = ?, country = ?, gender = ? WHERE id = ?`,
            [login, password, email, birthday, fullName, country, gender, id]
        );
    }

    deleteUser(id) {
        this.db.run(
            `DELETE FROM users WHERE id = ?`,
            [id]
        );
    }

    createToken(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';

        for (let i = 0; i < length; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }

        const exists = this.db.get(`SELECT id FROM users WHERE token=?`, [token]);
        if (exists) return this.createToken(length);

        return token;
    }

    getUserByToken(token) {
        return this.db.get(`SELECT id FROM users WHERE token=?`, [token]);
    }
};