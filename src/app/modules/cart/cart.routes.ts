import express from 'express';

import { CartController } from './cart.controller';

const router = express.Router();

router.post('/create-cart', CartController.createCart);
router.get('/:email', CartController.getAllCarts);

router.get(
  '/:id',

  CartController.getSingleCart
);

router.delete('/:id', CartController.deleteCart);

router.patch('/update', CartController.updateCart);

export const CartRoutes = router;
