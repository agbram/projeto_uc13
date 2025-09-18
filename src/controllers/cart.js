import prisma from "../prisma.js";

export const CartController = {
  //C Criar um novo carrinho POST /carts
  async store(req, res, next) {
    try {
      const { productQuantity, stockId } = req.body;

      const stockExists = await prisma.stock.findUnique({
        where: { id: parseInt(stockId) },
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

  //R Listar todos os carrinhos GET /carts
  async index(req, res, next) {
    const carts = await prisma.cart.findMany();
    res.status(200).json(carts);
  },

  // Obter um carrinho específico GET /carts/:id
  async show(req, res, _next) {
    try {
      const id = Number(req.params.id);
      let c = await prisma.cart.findFirstOrThrow({
        where: { id },
      });
      res.status(200).json(c);
    } catch (err) {
      res.status(404).json({ error: "Carrinho não encontrado" });
    }
  },

  // Deletar um carrinho DELETE /carts/:id
  async delete(req, res, _next) {
    try {
      const id = Number(req.params.id);
      let cd = await prisma.cart.delete({
        where: { id },
      });
      res.status(200).json(cd);
    } catch (err) {
      res.status(404).json({ error: "Carrinho não encontrado" });
    }
  },
};
