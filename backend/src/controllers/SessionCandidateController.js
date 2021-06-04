const { ObjectId } = require('bson');
const UserCandidate = require('../models/UserCandidate');

module.exports = {

    async store(req, res) {
        var { name, email, password, passwordConfirm } = req.body;

        let userEmail = await UserCandidate.findOne({ email });

        if (!userEmail){
            if(password == passwordConfirm){
                
                var userCandidate = await UserCandidate.create({
                    name,
                    email,
                    password,
                    passwordConfirm
                });

            }else{
                return res.status(400).json({ error: 'Senhas inválidas'});
            }
        }else{
            return res.status(400).json({ error: 'Candidato ' +name+ ' já cadastrado'});
        }

        return res.json(userCandidate);
    }
};