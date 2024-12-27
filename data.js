const router = require('express').Router();
router.get('/:data', (req, res) => {
	res.json({ data: req.params.data });
});

module.exports = router;
