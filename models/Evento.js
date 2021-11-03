// Instanciando a conexão com o banco

const db = require('./db')
// const Sequelize = require('sequelize')

const Evento = db.sequelize.define('evento', {
    id:{
        type: db.Sequelize.INTEGER,
        primaryKey: true, // limite de caracteres
    },
    controlador_id: {
        type: db.Sequelize.STRING
    },
    evento: {
        type: db.Sequelize.STRING
    }
})

// Criando a tabela

// Post.sync({force:true})

module.exports = Evento