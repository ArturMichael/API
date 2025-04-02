const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'OI express!' });
});

const DB_USER = 'ArturMichael';
const DB_PASSWORD = encodeURIComponent('Artur1812'); // Codifica caracteres especiais corretamente

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.yqd06kk.mongodb.net/bancodaapi?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
    })
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

