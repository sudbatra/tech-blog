const router = require('express').Router();

const apiRoutes = require('./api');
const pagesRoutes = require('./pages');
const homeRoutes = require('./homeRoutes');

router.use('/api',apiRoutes);
router.use('/dashboard',pagesRoutes);
router.use('/', homeRoutes);

module.exports = router;