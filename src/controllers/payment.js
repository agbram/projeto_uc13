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
        data: { pix, credit_card, status: Boolean(paymentStatus), value, user, date: new Date(date), order_detail },
      });
      res.status(201).json(p);
    } catch (err) {
      next(err);
    }
  },

  // Listar todos os pagamentos GET /payments
  async index(req, res, next) {
    let query = {}
    
    if (req.query.user) query = {user: req.query.user};

    const payments = await prisma.payment.findMany({
      where: query
    });

    res.status(200).json(payments);
  },

  async show(req, res, _next){
    try{
      const id = Number(req.params.id);
      
      const p = await prisma.payment.findFirstOrThrow({
        where: {id}
      });
  
      req.status(200).json(p)

    }catch(err){
      res.status(404).json({error: "Não encontrado :( "})
    }
  },

  async del(req, res, _next){
    try{
      const id = Number(req.params.id);
      
      const p = await prisma.payment.delete({
        where: {id}
      });
  
      req.status(200).json(p)

    }catch(err){
      res.status(404).json({error: "Não encontrado :("})
    }
  },

};
