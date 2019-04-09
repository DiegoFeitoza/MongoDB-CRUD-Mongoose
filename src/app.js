const port = 6060

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const mongoose = require('mongoose')   

var Usuarios = require('./config/schemas/usuario')
var cors = require('./config/cors')

mongoose.connect('mongodb://localhost:27017/diegodb')
 
//Configurando api para JSON
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors)

server.get('/', function(req, res, next) {  
    res.send('<h1>CRUD - MONGOOSE</h1>')
})

server.get('/lista/usuarios', (req,res) => {
    Usuarios.find().then(function(doc) {  
        res.send(doc);  
    })
})

server.post('/save/usuario',(req,res) => {
    const newUserObj = new Usuarios(req.body);
    newUserObj.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(newUserObj);
    });
})    

server.route('/edit/:id')
        .get((req, res) => {
            Usuarios.findOne({_id : req.params.id})
                .then((doc) => {                
                    res.status(200).send(doc)
                })
                .catch((err) => {
                    res.status(400).send(console.log(`Nenhum usuário encontrado com esse id`))
                })
        })
        .delete((req, res) => {
            Usuarios.findOne({_id: req.params.id})
                .then((doc) => {
                    Usuarios.deleteOne({_id: doc._id})
                    .then((docs) => {
                        res.status(200).send(`Usuário ${req.params.id} apagado com sucesso`)
                    }).catch((error) => {
                        res.status(403).send(`Não foi possível deletar o usuário ${req.params.id}`)
                    })
                })
                .catch((req, res) => {
                    res.status(403).send(`Não foi possivel encontrar o usuario com o ID: ${req.params.id}`)
                })
        })
        .put((req, res) => {
            Usuarios.findByIdAndUpdate(req.params.id,req.body,{new: true})
                    .then((doc) => {
                        res.status(200).send(`Usuário ${doc._id} editado com sucesso`)
                    })
                    .catch((err) => {
                        res.status(403).send(`Não foi possível editar o usuário`)
                    })                    
        })

server.listen(port, function(){
    console.log(`Rodando BACKEND na porta ${port}`)
})
