const express = require('express');
const mongoose = require('mongoose');
const Person = require('./models/Person');

const app = express();

// Middleware deve vir antes das rotas!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para depuração
app.use((req, res, next) => {
    console.log('Middleware de depuração:', req.method, req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Rota para criar uma nova pessoa
app.post('/person', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Requisição vazia ou JSON inválido' });
        }

        const { name, salary, aproved } = req.body;

        if (!name) {
            return res.status(422).json({ error: 'O nome é obrigatório!' });
        }

        const person = new Person({ name, salary, aproved });

        await person.save();
        res.status(201).json({ message: 'Pessoa criada com sucesso!', person });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar pessoa', details: error.message });
    }
});

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
