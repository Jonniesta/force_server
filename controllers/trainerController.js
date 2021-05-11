const router = require('express').Router();
const sequelize = require ('sequelize');

const validateSession = require('../middleware/validate-session');

const Trainer = require('../db').import('../models/trainer')

router.post('/create', validateSession, (req, res) => {
    const TrainerForm = {
        firstName: req.body.trainer.firstName,
        lastName: req.body.trainer.lastName,
        address: req.body.trainer.address,
        city: req.body.trainer.city,
        state: req.body.trainer.state,
        zip: req.body.trainer.zip,
        phoneNumber: req.body.trainer.zip,
        email: req.body.trainer.email,
        date: req.body.trainer.date,
        gender: req.body.trainer.gender,
        userId: req.user.id
    }
    Trainer.create(TrainerForm)
    .then(trainer => res.status(200).json(book))
    .catch(err => res.status(500).json({error: err}))
});



router.get('/trainerList', (req, res) => {
    

    Trainer.findAll()
    .then(trainer => res.status(200).json(trainer))
    .catch(err => res.status(500).json({error: err})) 
});


router.delete('/delete/:id', validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id }}; 

    Trainer.destroy(query)
    .then(() => res.status(200).json({ message: "Trainer Form removed"  }))
    .catch((err) => res.status(500).json({ error: err } ));
});



module.exports = router;