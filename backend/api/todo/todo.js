const restful = require('node-restful')
const mongoose = restful.mongoose

const toDoSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Informe o Título!']},
    description: { type: String, required: [true, 'Informe a Descrição!']},
    status: { type: String, required: false, uppercase: true,
        enum: ['ABERTA', 'EM_ANDAMENTO', 'CONCLUIDA'] },
    dataCriacao: {type: Date, default: Date.now},
    dataAlteracao: {type: Date, default: Date.now},
    usuario: {type: 'ObjectId', ref: 'Usuario', required: true}
})

module.exports = restful.model('ToDo', toDoSchema)