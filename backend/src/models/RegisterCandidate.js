const mongoose = require('mongoose');

const RegisterCandidateSchema = new mongoose.Schema({
    email: String,
    password: String
});

module.exports = mongoose.model('RegisterCandidate', RegisterCandidateSchema);