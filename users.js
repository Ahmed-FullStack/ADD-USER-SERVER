const { Router } = require('express');
const router = Router();

router.get('/:usersName', (req, res) => {
	res.json({ user: req.params.usersName });
});
module.exports = router;
