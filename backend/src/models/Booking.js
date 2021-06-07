const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    message: String,
    approved: Boolean,
    userCandidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCandidate'
    },
    registerJob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RegisterJob'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);