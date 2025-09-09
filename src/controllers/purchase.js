// Bruno
import prisma from "../prisma.js";

export const PurchaseController = {
  // cria a purchase
  async store(req, res, next) {
    try {
      const {
        purchaseClientName,
        purchaseClientAddress,
        purchasedProducts,
        purchasePaymentForm,
        purchasedQuantity,
        purchasePrice,
        isFinished = false,
        isShipped = false,
      } = req.body;

      // validações básicas
      if (!purchaseClientName || !purchaseClientAddress) {
        return res.status(400).json({ error: "Nome e endereço do cliente são obrigatórios." });
      }

      if (typeof purchasedProducts === "undefined" || purchasedProducts === null) {
        return res.status(400).json({ error: "purchasedProducts é obrigatório." });
      }

      // validar e parsear números
      const qtd = parseInt(purchasedQuantity);
      const price = parseFloat(purchasePrice);

      if (isNaN(qtd) || qtd < 0) {
        return res.status(400).json({ error: "purchasedQuantity inválido." });
      }
      if (isNaN(price) || price < 0) {
        return res.status(400).json({ error: "purchasePrice inválido." });
      }

      // Se vier array, transforma em JSON string (schema atual usa String)
      const productsField = Array.isArray(purchasedProducts)
        ? JSON.stringify(purchasedProducts)
        : String(purchasedProducts);

      const p = await prisma.purchase.create({
        data: {
          purchaseClientName,
          purchaseClientAddress,
          purchasedProducts: productsField,
          purchasePaymentForm: purchasePaymentForm || "",
          purchasedQuantity: qtd,
          purchasePrice: price,
          isFinished: Boolean(isFinished),
          isShipped: Boolean(isShipped),
        },
      });

      return res.status(201).json(p);
    } catch (err) {
      console.error("PurchaseController.store error:", err);
      return next(err);
    }
  },

  // lista (simples)
  async index(req, res, next) {
    try {
      const purchases = await prisma.purchase.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return res.json(purchases);
    } catch (err) {
      console.error("PurchaseController.index error:", err);
      return next(err);
    }
  },

  // mostra uma purchase específica (com purchasedProducts já parseado)
  async show(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const purchase = await prisma.purchase.findUnique({ where: { id } });
      if (!purchase) return res.status(404).json({ error: "Purchase não encontrada" });

      // tenta parsear o campo purchasedProducts (se for JSON string)
      let productsParsed = purchase.purchasedProducts;
      try {
        productsParsed = JSON.parse(purchase.purchasedProducts);
      } catch (e) {
        // se não for JSON, mantemos a string original
      }

      return res.json({ ...purchase, purchasedProducts: productsParsed });
    } catch (err) {
      console.error("PurchaseController.show error:", err);
      return next(err);
    }
  }
};
