const { ObjectId } = require('bson');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        var { email, password } = req.body;

        let user = await User.findOne({ email, password });

        if (!user){
            return res.status(400).json({ error: 'Usuário não cadastrado'});
        }
        return res.json(user);
    }
};