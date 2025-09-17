// Bruno
import prisma from "../prisma.js";

export const PurchaseController = {
  // cria uma purchase a partir de um order
  async store(req, res, next) {
    try {
      const { orderId } = req.body;

      if (!orderId) {
        return res.status(400).json({ error: "orderId é obrigatório." });
      }

      // busca o order e inclui os relacionamentos
      const order = await prisma.order.findUnique({
        where: { id: parseInt(orderId) },
        include: {
          carts: { include: { stock: true } },
          payment: true,
          user: true,
        },
      });

      if (!order) {
        return res.status(404).json({ error: "Order não encontrado." });
      }

      // monta o array de produtos do carrinho
      const items = order.carts.map(c => ({
        product: c.stock.productName,
        quantity: c.productQuantity,
        price: c.stock.productPrice,
      }));

      // calcula totais
      const totalQuantity = items.reduce((acc, p) => acc + p.quantity, 0);
      const totalPrice = items.reduce((acc, p) => acc + p.quantity * p.price, 0);

      // cria a purchase com itens
      const purchase = await prisma.purchase.create({
        data: {
          userId: order.userId,
          orderId: order.id,
          purchasePaymentForm: order.payment?.credit_card ? "credit_card" : "pix",
          purchasedQuantity: totalQuantity,
          purchasePrice: totalPrice,
          isFinished: true,
          isShipped: false,
          items: {
            create: items,
          },
        },
        include: {
          items: true,
          user: true,
          order: true,
        },
      });

      return res.status(201).json(purchase);
    } catch (err) {
      console.error("PurchaseController.store error:", err);
      return next(err);
    }
  },

  // lista todas as purchases
  async index(req, res, next) {
    try {
      const purchases = await prisma.purchase.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
        include: { user: true, items: true, order: true },
      });
      return res.json(purchases);
    } catch (err) {
      console.error("PurchaseController.index error:", err);
      return next(err);
    }
  },

  // mostra uma purchase específica
  async show(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const purchase = await prisma.purchase.findUnique({
        where: { id },
        include: { user: true, items: true, order: true },
      });
      if (!purchase) return res.status(404).json({ error: "Purchase não encontrada" });

      return res.json(purchase);
    } catch (err) {
      console.error("PurchaseController.show error:", err);
      return next(err);
    }
  },
    async show(req, res, _next){
      try{

        const id =Number(req.params.id);
  
        const p = await prisma.purchases.findUniqueOrThrow(
          {
            where: {id}
          });
           res.status(200).json(p);
      } catch (err) {
        res.status(404).json({error: "NÃO ENCONTRADO :("})
      }

    },

    async del(req, res, _next){

      try{

        const id =Number(req.params.id);
  
        const p = await prisma.purchases.delete(
          {
            where: {id}
          });

           res.status(200).json(p);
      } catch (err) {
        res.status(404).json({error: "NÃO ENCONTRADO :("})
      }

    }

};
