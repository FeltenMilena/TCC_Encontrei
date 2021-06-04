const { ObjectId } = require('bson');
const User = require('../models/User');

module.exports = {

    // Metodo POST pasta Session
    async store(req, res) {
        //busca no corpo
        var { name, email, password, passwordConfirm } = req.body;

       // let userName = await User.findOne({ name });
       //Busca os valores no banco e armazena nas variáveis decladas.
        let userEmail = await User.findOne({ email });

        //Validação de usuário.
        if (!userEmail){
            if(password == passwordConfirm){
                
                //Cria usuário caso não exista e se as senhas está corretas.
                var user = await User.create({
                    name,
                    email,
                    password,
                    passwordConfirm
                });

            }else{
                return res.status(400).json({ error: 'Senhas inválidas'});
            }
        }else{
            return res.status(400).json({ error: 'Empresa ' +name+ ' já cadastrada'});
        }
        //Retorna o usuário criado.
        return res.json(user);
    }
};