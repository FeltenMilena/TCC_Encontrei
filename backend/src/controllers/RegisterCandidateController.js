const { ObjectId } = require('bson');
const UserCandidate = require('../models/UserCandidate');

module.exports = {
    async store(req, res) {
        var { email } = req.body;

        let userEmail = await UserCandidate.findOne({ email });

        if (!userEmail){
            return res.status(400).json({ error: 'Usuário não cadastrado'});
        }
        return res.json(userEmail);
    }
};