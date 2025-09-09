import prisma from "../prisma.js";

export const UserRuleController = {
  async store(req, res, next) {
    try {
      const { userId, ruleId } = req.body;

      // Valida se user existe
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Valida se rule existe
      const rule = await prisma.rule.findUnique({
        where: { id: parseInt(ruleId) },
      });
      if (!rule) {
        return res.status(404).json({ error: "Regra não encontrada" });
      }

      // Cria relação
      const relation = await prisma.userRule.create({
        data: { userId, ruleId },
      });

      res.status(201).json(relation);
    } catch (err) {
      next(err);
    }
  },
};
