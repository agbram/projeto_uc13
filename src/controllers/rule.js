//gustavo

import prisma from "../prisma.js";

export const RuleController = {
  async store(req, res, next) {
    try {
      const {
        stockControl,
        lowStockAlert,
        registerProduct,
        disableProduct,
        editStock,
        usersRegistered,
        stockList,
        editUser,
        dashboardInvoicing,
        recipes,
        pricing,
        newOffer,
        shopCart,
        myPurchases,
        profile,
        sumStock,
        disableUser,
        purchasingReport,
        userList,
        userStatus,
        productStatus,
      } = req.body;

      const r = await prisma.rule.create({
        data: {
          stockControl,
          lowStockAlert,
          registerProduct,
          disableProduct,
          editStock,
          usersRegistered,
          stockList,
          editUser,
          dashboardInvoicing,
          recipes,
          pricing,
          newOffer,
          shopCart,
          myPurchases,
          profile,
          sumStock,
          disableUser,
          purchasingReport,
          userList,
          userStatus,
          productStatus,
        },
      });
      res.status(201).json(r);
    } catch (err) {
      next(err);
    }
  },
};
