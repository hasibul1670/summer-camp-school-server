/* eslint-disable no-unused-vars */
import { ICart } from './cart.interface';
import { Cart } from './cart.model';

const createCart = async (payload: ICart): Promise<ICart> => {
  const CartPayload: ICart = { ...payload };
  const result = await Cart.create(CartPayload);
  return result;
};

const getAllCarts = async (email: string) => {
  const result = await Cart.find({ email: email }).populate('course');
  return result;
};

const getSingleCart = async (id: string) => {
  const result = await Cart.findById(id).populate('course');

  return result;
};

const deleteCart = async (id: string) => {
  const result = await Cart.findByIdAndDelete(id);
  return result;
};

const updateCart = async (payload: Partial<ICart>) => {
  const { email, enrolled } = payload;
  const filter = { email };
  const update = { $set: { enrolled } };
  try {
    const result = await Cart.updateMany(filter, update);
    console.log('Hello',result);
    return result;

  } catch (error) {
    console.log('Hellosasdasdsads',error);
    return [];
  }
};

export const CartService = {
  createCart,
  deleteCart,
  getAllCarts,
  getSingleCart,
  updateCart,
};
