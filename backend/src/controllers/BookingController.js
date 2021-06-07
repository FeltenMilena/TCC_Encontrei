const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        const { user_id } = req.headers;
        const { registerJob_id } = req.params;
        const { message } = req.body;

        const booking = await Booking.create({
            userCandidate: user_id,
            registerJob: registerJob_id,
            message
        });

        await booking.populate('registerJob').populate('userCandidate').execPopulate();

        const ownerSocket = req.connectedUsers[booking.registerJob.user];

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }
        
        return res.json(booking);
    }
};