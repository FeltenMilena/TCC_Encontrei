const { ObjectId } = require('bson');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        var { name, email, password, passwordConfirm } = req.body;

        let userName = await User.findOne({ name });
        let userEmail = await User.findOne({ email });
        let userPassword = await User.findOne({ password });
        let userPasswordConfirm = await User.findOne({ passwordConfirm });

        if (!userEmail){
            if(userPassword == userPasswordConfirm){

                var user = await User.create({
                    name,
                    email,
                    password,
                    passwordConfirm
                })

            }else{
                return res.status(400).json({ error: 'Senhas inválidas'});
            }
        }else{
            return res.status(400).json({ error: 'Empresa ' +name+ ' já cadastrada'});
        }
        return res.json(user);
    }
};