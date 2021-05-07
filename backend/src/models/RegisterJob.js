const mongoose = require('mongoose');

const RegisterJobSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    cell: Number,
    wage: Number,
    email: String,
    abstract: String,
    prerequisites: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    },
});

RegisterJobSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('RegisterJob', RegisterJobSchema);