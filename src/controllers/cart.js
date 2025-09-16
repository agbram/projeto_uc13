import prisma from "../prisma.js";

export const CartController = {
  async store(req, res, next) {
    try {
      const { productQuantity, stockId } = req.body;

       const stockExists = await prisma.stock.findUnique({
        where: { id: parseInt(stockId) }
      });

      if (!stockExists) {
        return res.status(404).json({ error: "Stock não encontrado" });
      }
      
      const cart = await prisma.cart.create({
        data: {
          productQuantity: parseInt(productQuantity), 
          stockId: parseInt(stockId), 
          },
      });

      res.status(201).json(cart);
    } catch (err) {
      next(err);
    }
  },
  async index (req, res, next) {
    const carts = await prisma.cart.findMany();
    res.status(200).json(carts);
};