const { ObjectId } = require('bson');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        var { email, password } = req.body;

        let userEmail = await User.findOne({ email });
        let userPassword = await User.findOne({ password });

        if (!userEmail){
            return res.status(400).json({ error: 'Usuário não cadastrado'});
        }
        return res.json(userEmail);
    }
};

/*
        var { email, password } = req.body;

        let userCandidate = await UserCandidate.find({ email, password });

        if(userCandidate.length === 0){
            return res.status(400).json({ error: 'Usuário ou senha inválido.'});
        }
        return res.json(userCandidate);
*/