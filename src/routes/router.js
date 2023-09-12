const router = require('express').Router();
const departmentRouter = require('./departmentRoute');
const personRouter = require('./personRoute');

router.use('/department', departmentRouter);
router.use('/person', personRouter);
module.exports = router;
