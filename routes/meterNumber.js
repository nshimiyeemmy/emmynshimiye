const express = require('express');
const router = express.Router();

const {
    createMeter,
    getMeterNumbers,
    getOneMeter,
    deleteMeter,
  } = require('../controllers/meterNumberController');

  router.route('/meters/new').post(createMeter);
  router.route('/meters/all').get(getMeterNumbers);
  router.route('/meters/:id').get(getOneMeter);
  router.route('/admin/meter/:id').delete(deleteMeter);



  module.exports = router;