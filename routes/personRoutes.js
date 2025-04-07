const router = require('express').Router()
const Person = require('../models/Person');



router.post('/', async (req, res) => {
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


router.get('/', async (req, res) => {
   try {
    const people = await Person.find()

    res.status(200).json(people)

   } catch (error) {
    res.status(500).json({error: error})
   } 
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
       const person = await Person.findOne({_id: id })

       res.status(200).json(person)
        
    } catch (error) {
        res.status(500).json({error: error}) 
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({_id: id})

    try {

        await Person.deleteOne({_id: id})
        res.status(200).json({message: 'Usuario removido'})
        
    } catch (error) {
        res.status(500).json({error: error})   
    }

})

module.exports = router