const mongoose = require('mongoose');

const UserCandidateSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    passwordConfirm: String
});

module.exports = mongoose.model('UserCandidate', UserCandidateSchema);