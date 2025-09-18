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
        permission,
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
          permission: Boolean(permission),
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

async index(req, res, _next) {
  try {
    const { name, email, phone } = req.query;

    let users;

    if (name || email || phone) {
      users = await prisma.user.findMany({
        where: {
          OR: [
            name ? { name } : undefined,
            email ? { email } : undefined,
            phone ? { phone } : undefined,
          ].filter(Boolean),
        },
      });
    } else {
      // se nao tiver filtro, retorna todos
      users = await prisma.user.findMany();
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuarios!" });
  }
},


  async show(req, res, _next) {
    try {
      const id = Number(req.params.id);

      const u = await prisma.user.findFirstOrThrow({
        where: { id },
      });

      res.status(200).json(u);
    } catch (err) {
      res.status(404).json("Error: Id nao encontrado!");
    }
  },

  async del(req, res, _next) {
    try {
      const id = Number(req.params.id);

      const u = await prisma.user.delete({
        where: { id },
      });
      res.status(200).json(u);
    } catch (err) {
      res.status(404).json("Error: Id nao encontrado!");
    }
  },
};
