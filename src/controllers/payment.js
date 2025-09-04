// Bruno
import prisma from "../prisma.js";

//asincrino nome_da função(recebendo, respoder, proximo)
export const PaymentController = {
  async store(req, res, next) {
    try {
      const { pix, credit_card, status, value, user, date, order_detail } =
        req.body;

      const p = await prisma.payment.create({
        data: { pix, credit_card, status, value, user, date, order_detail },
      });
      res.status(201).json(p);
    } catch (err) {
      next(err);
    }
  },
};
