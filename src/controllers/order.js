// jean
import prisma from "../prisma.js";

export const OrderController = {
  async store(req, res, next) {
    try {
      const { userId, paymentId } = req.body;

      const order = await prisma.stock.create({
        data: {
          userId,
          carts: {
            connect: {id: cart.id}
          },
        },
      });
      //respondendo com status 201-criado e encapsulando no formato json(product)
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  },
};
