const User = require('../models/User');
const RegisterJob = require('../models/RegisterJob');

module.exports = {

    async index(req, res){
        const { prerequisite } = req.query;

        const registerJobs = await RegisterJob.find({ prerequisites : prerequisite});

        return res.json(registerJobs);
    },

    async store(req, res){
        const { filename } = req.file;
        const { company, cell, wage, email, abstract, prerequisites } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({ error: 'Usuário Inesistente'});
        }

        const registerJob = await RegisterJob.create({
            user: user_id,
            thumbnail: filename,
            company,
            cell,
            wage,
            email,
            abstract,
            prerequisites: prerequisites.split(',').map(prerequisite => prerequisite.trim())
        })

        return res.json(registerJob)
    }
};