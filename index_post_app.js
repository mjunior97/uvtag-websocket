const express = require("express")

// Instanciando o módulo do express

const app = express()

// Handlebars

const handlebars = require('express-handlebars')

// Body Parser

const bodyParser = require('body-parser')

// Configuração do Handlebars

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Configuração do body parser

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Salvando dados no banco

const Leitura = require('./models/Leitura')

// Rota principal da aplicação

app.get("/", function(req, res){
    Leitura.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('home', {posts: posts})
    })
})

app.get("/cad", function(req, res){
    res.render('formulario')
})

// Capturar dados do formulário com o Body Parser

app.post("/add", function(req, res){
    Leitura.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        //res.send("Texto: " + req.body.titulo + " - Conteúdo: " + req.body.conteudo + " gravados com sucesso!")
        res.redirect('/')
    }).catch(function(erro){
        res.send("Erro ao gravar os dados do post! Erro: " + erro)
    })
})

// Cadastrar rota para deletar post´s

app.get("/deletar/:id", function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Postagem deletada com sucesso!")
    }).catch(function(erro){
        res.send("Esta postagem não existe!")
    })
})

// Função de callback
// A chamada listen tem que ser a última do código

app.listen(8081, function(){

    console.log("Servidor rodando!")

}
)