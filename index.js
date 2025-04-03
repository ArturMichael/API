const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log('Middleware de depuração:', req.method, req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Rota para criar uma nova pessoa
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// Rota principal
app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!' });
});

// Configuração do banco de dados
const DB_USER = 'ArturMichael';
const DB_PASSWORD = encodeURIComponent('Artur1812');

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.yqd06kk.mongodb.net/bancodaapi?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
    })
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
