import "dotenv/config";
import express from "express";
import cors from "cors";

// Routes
import paymentRoutes from "./routes/payment.js";
import purchaseRoutes from "./routes/purchase.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import stockRoutes from "./routes/stock.js";
import userRoutes from "./routes/user.js";
import ruleRoutes from "./routes/rule.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/payments", paymentRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/carts", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/stocks", stockRoutes);
app.use("/users", userRoutes);
app.use("/rules", ruleRoutes); // Changed from "Rules" to "rules" for consistency

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