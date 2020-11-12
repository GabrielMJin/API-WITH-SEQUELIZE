const config = require('config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = () => {
    const app = express();

    // Setando variáveis da aplicação
    app.set('host', process.env.HOST || config.get('server.host'));
    app.set('port', process.env.PORT || config.get('server.port'));

    // Middlewares
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    return app;
}