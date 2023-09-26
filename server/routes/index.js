const express = require('express');
const router = express.Router();
const imageRouter = require('./imageDetail');

router.use('/images', imageRouter);

module.exports = router;
