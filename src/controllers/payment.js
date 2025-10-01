// Bruno
import prisma from "../prisma.js";

//asincrino nome_da função(recebendo, respoder, proximo)
export const PaymentController = {
  
  // Criar um novo pagamento POST /payments
  async store(req, res, next) {
    try {
      const { pix, credit_card, paymentStatus, value, user, date, order_detail } =  req.body;

    

      const p = await prisma.payment.create({
        data: { pix, credit_card, paymentStatus: Boolean(paymentStatus), value, user, date: new Date(date), order_detail },
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
      //console.log(id)
      
      const p = await prisma.payment.findFirstOrThrow({
        where: {id}
      });
      //console.log(p)
  
      res.status(200).json(p);
    }catch(err){
      res.status(404).json({error: "Não encontrado :("})
    }
  },
  async put(req, res, _next){
    try{
      const id = Number(req.params.id);

      let query = {}
      if(req.body.pix) query.pix = req.body.pix;
      if(req.body.credit_card) query.credit_card = req.body.credit_card;
      if(req.body.paymentStatus) query.paymentStatus = req.body.paymentStatus;
      if(req.body.value) query.value = req.body.value;
      if(req.body.user) query.user = req.body.user;
      if(req.body.date) query.date = req.body.date;
      if(req.body.order_detail) query.order_detail = req.body.order_detail;

      const u = prisma.payment.update({
        where: {id},
        data:query
      })
      res.status(200).json(u)
    }catch(err){
      res.status(404).json({error: "Não encontrado :("})
    }
  },

  async del(req, res, _next){
    try{
      const id = Number(req.params.id);
      
      const p = await prisma.payment.delete({
        where: {id}
      });
  
      res.status(200).json(p);

    }catch(err){
      res.status(404).json({error: "Não encontrado :("})
    }
  },

};
