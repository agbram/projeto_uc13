//gustavo
import prisma from "../prisma.js";

//assincrona nome_da_funcao(requisicao, resposta, proximo)
export const UserController = {
  async store(req, res, next) {
    console.log("Request body: ", req.body);
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
        permission
      } = req.body;

      //guardando
      const u = await prisma.user.create({
        data: {
          pass,
          email,
          name,
          birth: new Date(birth),
          creditCard,
          address,
          phone,
          permission: Boolean(permission)
        },
      });
      console.log("User created:", u);
      res.status(201).json(u);
      //mensagem de erro
    } catch (err) {
      console.error("Error details:", err);
      next(err);
    }
  },
};
