// jean
import prisma from "../prisma.js";

export const StockController = {
  
// Criar um novo stock POST /stocks
  async store(req, res, next) {
    try {
      const {
        productName,
        productType,
        productPrice,
        isInStock,
        amountInStock,
      } = req.body;

      const stock = await prisma.stock.create({
        data: {
          productName,
          productType,
          productPrice,
          isInStock,
          amountInStock,
        },
      });
      //respondendo com status 201-criado e encapsulando no formato json(product)
      res.status(201).json(stock);
    } catch (err) {
      next(err);
    }
  },

  // Listar todos os stocks GET /stocks
  async index (req, res, next) {
    const stocks = await prisma.stock.findMany();
    res.status(200).json(stocks);
  }
};
