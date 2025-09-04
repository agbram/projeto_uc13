import "dotenv/config";
import express from "express";
import cors from "cors";

// Bruno
import { PaymentRoutes } from "./routes/payment.js";
import { PurchasesRoutes } from "./routes/purchases.js";

// Jean
import { CartRoutes } from "./routes/cart.js";
import { OrderRoutes } from "./routes/order.js";
import { StockRoutes } from "./routes/stock.js";

// Gustavo
import { UserRoutes } from "./routes/user.js";
import { RuleRoutes } from "./routes/rule.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/payments", PaymentRoutes);
app.use("/purchases", PurchasesRoutes);
app.use("/carts", CartRoutes);
app.use("/orders", OrderRoutes);
app.use("/stocks", StockRoutes);
app.use("/users", UserRoutes);
app.use("/Rule", RuleRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.code === "P2002") {
    return res.status(409).json({
      error: "Registro duplicado (unique)",
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      error: "Registro não encontrado",
    });
  }
  res.status(500).json({ error: "Erro interno" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
