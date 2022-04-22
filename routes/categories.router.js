
const express = require('express');
const router = express.Router();

router.get('/:categorieId/products/:productId', (req, res) => {
  const { categorieId, productId } = req.params;
  res.json(
    {
      categorieId,
      productId
    }
  )
});


module.exports = router;
