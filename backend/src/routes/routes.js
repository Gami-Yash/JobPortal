const express = require('express');
const router = express.Router();
const Database = require('../models/database');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const secret_key = 'askctyhoyqy34t5b6jrctn7gdcgh9c565jhgfnkjwov687n6we'
router.use(express.json());
router.use(cookieParser());

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const db = new Database();
        const connectedClient = await db.connectToDatabase();
        const result = await connectedClient.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result && result.rows.length > 0) {
            const checkPassword = await bcrypt.compare(password, result.rows[0].password);
            if (checkPassword) {
                jwt.sign({ username: username, role: result.rows[0].role, isAdmin: result.rows[0].is_admin }, secret_key, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        console.log('Error signing token:', err);
                        res.status(500).json({ error: 'Internal server error' });
                        db.closeDatabaseConnection()
                    } else {
                        res.cookie('token', token, { httpOnly: true, secure: true });
                        res.status(200).json({
                            isAuthenticated: true,
                            user: {
                                id: result.rows[0].id,
                                name: result.rows[0].username,
                                isadmin: result.rows[0].is_admin,
                                role: result.rows[0].role,
                            }
                        });
                        db.closeDatabaseConnection()
                    }
                });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
                db.closeDatabaseConnection()
            }
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
            db.closeDatabaseConnection()
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        db.closeDatabaseConnection()
    }
});


router.post('/signup', async (req, res) => {
    const { username, password, role, email } = req.body;
    const db = new Database()
    try {
        const db = new Database();
        const connectedClient = await db.connectToDatabase();
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const result = await connectedClient.query('INSERT INTO users (username, password, role, email) VALUES ($1, $2, $3, $4)', [username, hashPassword, role, email]);
    } catch (error) {
        console.log(error);
    }
});


router.get('/check-auth', (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.json({ isAuthenticated: false });
    }
    try {
        const decoded = jwt.verify(token, secret_key);
        const { userId, userName, isadmin, superUser } = decoded;
        res.json({
            isAuthenticated: true,
            user: {
                id: decoded.id,
                name: decoded.username,
                isadmin: decoded.isAdmin,
                role: decoded.role
            }
        });
    } catch (error) {
        console.error('Token verification failed:', error);
        res.json({ isAuthenticated: false });
    }
});

router.post('/detail', async (req, res) => {
    try {
        const { skills, experience, education, location } = req.body.formData;
        const { email, password, role, username } = req.body.formData.state;

        console.log(skills, experience, education, location, email, password, role);
        let skillsArray = [];
        if (typeof skills === 'string') {
            skillsArray = skills.split(',').map(skill => skill.trim());
        } else if (Array.isArray(skills)) {
            skillsArray = skills;
        }

        const db = new Database();
        const connectedClient = await db.connectToDatabase();
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const userResult = await connectedClient.query(
            'INSERT INTO users (username, password, role, email) VALUES ($1, $2, $3, $4) RETURNING id',
            [username, hashPassword, role, email]
        );

        if (userResult.rows.length > 0) {
            const userId = userResult.rows[0].id;
            const userInfoResult = await connectedClient.query(
                'INSERT INTO user_info (user_id, skills, experience, education, location) VALUES ($1, $2, $3, $4, $5)',
                [userId, skillsArray, experience, education, location]
            );

            if (userInfoResult.rowCount > 0) {
                res.status(201).json({ message: 'User and user info successfully created' });
            } else {
                res.status(500).json({ message: 'Failed to create user info' });
            }
        } else {
            res.status(500).json({ message: 'Failed to create user' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});



router.post('/logout', (req, res) => {
    try {
        res.cookie('token', '', { maxAge: 0, httpOnly: true, secure: true });
        res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log out' });
    }
});


module.exports = router;

