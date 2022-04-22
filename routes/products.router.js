
const { response } = require('express');
const express = require('express');
const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handle');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

// router.get('/', (request, response) => {
//   response.json(
//     [
//       {
//         nombre: 'producto 1',
//         precio: 1000
//       },
//       {
//         nombre: 'producto 2',
//         precio: 2000
//       },
//     ]
//   );
// });

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const product = await service.findOne(id);
      if (product != undefined) {
        response.status(200).json(product);
      } else {
        response.status(404).json({
          message: 'not found'
        });
      }
    } catch (error) {
      next(error)
    }

  });


router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  });


router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product)
    } catch (error) {
      next(error);
    }
  });

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json(
    {
      message: 'update',
      data: body,
      id: id
    }
  )
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta)
});


module.exports = router;
