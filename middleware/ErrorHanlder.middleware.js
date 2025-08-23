const express = require('express');
const router = express.Router();

router.use((req, res) => {
  res.status(404).json({ message: 'invalid route, please check your route' });
});
module.exports = router;
