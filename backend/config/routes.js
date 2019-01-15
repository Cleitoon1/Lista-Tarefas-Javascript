const express = require('express')
const auth = require('./auth')

module.exports = function (server) {
    /* Rotas Abertas */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const authService = require('../api/user/authService')
    openApi.post('/login', authService.login)
    openApi.post('/signup', authService.signUp)
    openApi.post('/validateToken', authService.validateToken)

    //Api Routes
    const protecedApi = express.Router();
    server.use('/api', protecedApi);

    protecedApi.use(auth)

    //rotas da API
    const todoService = require('../api/todo/todoService')
    todoService.register(protecedApi, '/todo');
}