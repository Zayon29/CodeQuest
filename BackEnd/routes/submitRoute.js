const express = require('express');
const router = express.Router();
const { submeterCodigo } = require('../controllers/submitController');

router.post('/', submeterCodigo);

module.exports = router;