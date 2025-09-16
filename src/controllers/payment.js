// Bruno
import prisma from "../prisma.js";

//asincrino nome_da função(recebendo, respoder, proximo)
export const PaymentController = {
  
  // Criar um novo pagamento POST /payments
  async store(req, res, next) {
    try {
      const { pix, credit_card, paymentStatus, value, user, date, order_detail } =
        req.body;

      const p = await prisma.payment.create({
        data: { pix, credit_card, paymentStatus, value, user, date, order_detail },
      });
      res.status(201).json(p);
    } catch (err) {
      next(err);
    }
  },

  // Listar todos os pagamentos GET /payments
  async index(req, res, next) {
    const payments = await prisma.payment.findMany();
    res.status(200).json(payments);
  }
};
