const RegisterJob = require('../models/RegisterJob');

module.exports = {
    async show(req, res) {
        const { user_id } = req.headers;

        const registerJobs = await RegisterJob.find({ user: user_id});

        return res.json(registerJobs);
    }
}