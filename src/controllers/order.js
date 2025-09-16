import prisma from "../prisma.js";

export const OrderController = {
  
  // Criar um novo pedido POST /orders
  async store(req, res, next) {
    try {
      const { userId, paymentId, cartIds } = req.body;

      // valida usuário
      const userExists = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
      if (!userExists) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // valida pagamento se informado
      if (paymentId) {
        const paymentExists = await prisma.payment.findUnique({
          where: { id: parseInt(paymentId) },
        });
        if (!paymentExists) {
          return res.status(404).json({ error: "Pagamento não encontrado" });
        }
      }

      // valida carts
      if (!Array.isArray(cartIds) || cartIds.length === 0) {
        return res
          .status(400)
          .json({ error: "cartIds precisa ser um array com pelo menos um id" });
      }

      const cartsToConnect = cartIds.map((id) => ({ id: parseInt(id) }));

      const order = await prisma.order.create({
        data: {
          userId: parseInt(userId),
          paymentId: paymentId ? parseInt(paymentId) : null,
          carts: {
            connect: cartsToConnect,
          },
        },
        include: {
          carts: true,
          user: true,
          payment: true,
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
  }
};
