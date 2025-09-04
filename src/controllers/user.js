//gustavo
import prisma from "../prisma.js";

//assincrona nome_da_funcao(requisicao, resposta, proximo)
export const UserController = {
  async store(req, res, next) {
    try {
      //procurando
      const {
        pass,
        email,
        name,
        birth,
        creditCard,
        address,
        phone,
        permission,
      } = req.body;

      //guardando
      const u = await prisma.user.create({
        data: {
          pass,
          email,
          name,
          birth,
          creditCard,
          address,
          phone,
          permission,
        },
      });
      res.status(201).json(u);
      //mensagem de erro
    } catch (err) {
      next(err);
    }
  },
};
