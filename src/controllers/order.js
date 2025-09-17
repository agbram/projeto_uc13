import prisma from "../prisma.js";

export const OrderController = {
  
  // Criar um novo pedido POST /orders
  async store(req, res, next) {
    try {
      const { userId } = req.body;

      // valida usuário
      const userExists = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
      if (!userExists) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const order = await prisma.order.create({
        data: {
          userId: parseInt(userId),
        },
      });

      res.status(201).json(order);
    } catch (err) {
      console.error(err); // ajuda a ver o erro real no console
      next(err);
    }
  },
  
  // Listar todos os pedidos GET /orders
  async index (req, res, next) {
    const orders = await prisma.order.findMany()
    res.status(200).json(orders);
  },
  
};
