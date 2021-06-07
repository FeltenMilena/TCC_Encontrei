const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SessionCandidateController = require('./controllers/SessionCandidateController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const RegisterJobController = require('./controllers/RegisterJobController');
const RegisterController = require('./controllers/RegisterController');
const RegisterCandidateController = require('./controllers/RegisterCandidateController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes =  express.Router();
const upload =  multer(uploadConfig);

routes.post('/sessions', SessionController.store);
routes.post('/sessionCandidates', SessionCandidateController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/registerJobs/:registerJob_id/bookings', BookingController.store);

routes.get('/registerJobs', RegisterJobController.index);
routes.post('/registerJobs', upload.single('thumbnail'), RegisterJobController.store);
routes.delete('/registerJobs/:_id', RegisterJobController.suspend);

routes.post('/registers', RegisterController.store);
routes.post('/registerCandidates', RegisterCandidateController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;