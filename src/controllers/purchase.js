// Bruno
import prisma from "../prisma.js";

export const PurchaseController = {
  // cria uma purchase a partir de um order
  async store(req, res, next) {
    try {

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
        orderBy: { createdAt: "desc" }
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
    async put(req, ret, _next){
      try{
        const id =Number(req.params.id);
        let query  = {}

      }catch(err){
        res.status(404).json({error: "NÃO ENCONTRADO :("})
      }
    },

  async del(req, res, _next){

      try{

        const id = Number(req.params.id);
  
        const p = await prisma.purchases.delete(
          {
            where: {id}
          });

           res.status(200).json(p);
      }catch(err){
        res.status(404).json({error: "NÃO ENCONTRADO :("})
      }

    }

};
