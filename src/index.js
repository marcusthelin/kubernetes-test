const express = require('express');
const { Sequelize } = require('sequelize');
let User;
const mariadb = require('mariadb');
mariadb
    .createConnection({
        host: process.env.DB_HOST,
        connectTimeout: 60000,
        user: 'root',
        password: 'root',
    })
    .then(async db => {
        await db.query('CREATE DATABASE IF NOT EXISTS app').catch(console.log);
        const sequelize = new Sequelize({
            dialect: 'mariadb',
            host: process.env.DB_HOST,
            password: 'root',
            username: 'root',
            database: 'app',
        });

        sequelize.authenticate().then(async () => {
            User = require('./models/user');
            await sequelize.sync();
        });

        const app = express();

        app.use(express.json());

        const hostname = require('os').hostname();

        app.get('/', async (req, res) => {
            const allUsers = await User.findAll();
            res.send(`
                <h2>Hello World! From ${hostname}</h2>
                <h3>Version: ${process.env.VERSION}</h3>
                ${JSON.stringify(allUsers, null, 4)}
            `);
        });

        app.get('/status', (req, res) => {
            res.send('Ok');
        });

        app.post('/', async (req, res) => {
            const { body } = req;
            try {
                await User.create({
                    firstName: body.name,
                });
                res.send('Ok');
            } catch (error) {
                res.json(error);
            }
        });

        app.listen(80, () => {
            console.log('Server started!');
        });

        module.exports.sequelize = sequelize;
    });
