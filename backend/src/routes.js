const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const RegisterJobController = require('./controllers/RegisterJobController');
const RegisterController = require('./controllers/RegisterController');

const routes =  express.Router();
const upload =  multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.get('/registerJobs', RegisterJobController.index);
routes.post('/registerJobs', upload.single('thumbnail'), RegisterJobController.store);

routes.post('/registers', RegisterController.store);

module.exports = routes;