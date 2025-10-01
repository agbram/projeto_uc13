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
              name ? {name : {contains:  name }} : undefined,
              email ? { email : {contains: email}} : undefined,
              phone ? { phone : {contains: phone}} : undefined,
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
      console.log(id);

      const u = await prisma.user.delete({
        where: { id },
      });
      console.log(u);
      res.status(200).json(u);
    } catch (err) {
      res.status(404).json("Error: Id nao encontrado!");
    }
  },

  async update(req, res, next) {
    try {
      let body = {};

      if (req.body.pass) body.pass = req.body.pass;
      if (req.body.email) body.email = req.body.email;
      if (req.body.name) body.name = req.body.name;
      if (req.body.birth) body.birth = req.body.birth;
      if (req.body.creditCard) body.creditCard = req.body.creditCard;
      if (req.body.address) body.address = req.body.address;
      if (req.body.phone) body.phone = req.body.phone;
      if (req.body.permission) body.permission = req.body.permission;

      const id = Number(req.params.id);

      const u = await prisma.user.update({
        where: { id },
        data: body,
      });

      res.status(200).json(u);
    } catch (err) {
      res
        .status(404)
        .json("Error: Usuário não encontrado ou não pode ser alterado...");
    }
  },
};
